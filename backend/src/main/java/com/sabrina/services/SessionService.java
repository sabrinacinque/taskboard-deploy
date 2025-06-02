// src/main/java/com/sabrina/services/SessionService.java
package com.sabrina.services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.sabrina.entities.Session;
import com.sabrina.entities.User;
import com.sabrina.models.InputLogin;
import com.sabrina.models.RestLogin;
import com.sabrina.models.RestSession;
import com.sabrina.models.RestSessionInfo;
import com.sabrina.repositories.SessionRepository;

import jakarta.servlet.http.HttpServletRequest;

@Service
public class SessionService {

    @Autowired
    private SessionRepository sessionRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Session createSession(Long userId, HttpServletRequest request) {
        // disattiva tutte le vecchie
        sessionRepository.findByUser_IdAndActive(userId, true)
            .forEach(s -> {
                s.setActive(false);
                sessionRepository.save(s);
            });

        // genera token unico
        String token;
        do {
            token = UUID.randomUUID().toString();
        } while (sessionRepository.findByToken(token).isPresent());

        // costruisci e salva
        User user = userService.findById(userId)
            .orElseThrow(() -> new IllegalStateException("User not found " + userId));

        Session s = new Session();
        s.setUser(user);
        LocalDateTime now = LocalDateTime.now();
        s.setDate(now);
        s.setDateLastAction(now);
        s.setToken(token);
        String ip = request.getHeader("X-Forwarded-For");
        s.setIp(ip != null ? ip : request.getRemoteAddr());
        s.setActive(true);
        return sessionRepository.save(s);
    }

    public RestLogin authenticateByUserNameAndPassword(InputLogin input, HttpServletRequest request) {
        String iden = input.getIdentifier().trim();
        String pwd  = input.getPassword();

        Optional<User> opt = userService.findByUsername(iden);
        if (opt.isEmpty()) {
            opt = userService.findByEmail(iden);
        }
        if (opt.isEmpty()) {
            return new RestLogin(false, "User not found", null);
        }

        User user = opt.get();
        if (!passwordEncoder.matches(pwd, user.getPassword())) {
            return new RestLogin(false, "Invalid credentials", null);
        }

        Session session = createSession(user.getId(), request);
        if (session == null) {
            return new RestLogin(false, "Could not create session", null);
        }

        RestSession dto = new RestSession(session.getId(), user.getId(), session.getToken());
        return new RestLogin(true, "Login successful", dto);
    }

    /** Disattiva la sessione (active=false) trovata tramite token */
    public boolean logoutByToken(String token) {
        Optional<Session> opt = sessionRepository.findByToken(token);
        if (opt.isEmpty()) return false;
        Session s = opt.get();
        if (!s.getActive()) return false;
        s.setActive(false);
        sessionRepository.save(s);
        return true;
    }

    /** Restituisce le ultime `limit` sessioni (date, ip, active) per quell’utente */
    public List<RestSessionInfo> findRecentSessions(Long userId, int limit) {
        return sessionRepository
            .findByUser_IdOrderByDateDesc(userId, PageRequest.of(0, limit))
            .stream()
            .map(s -> new RestSessionInfo(s.getDate(), s.getIp(), s.getActive()))
            .collect(Collectors.toList());
    }

    /**
     * Dato un header "Bearer <token>", verifica che la sessione sia attiva
     * e restituisce l'userId associato.
     */
    /** Valida l’header e ritorna l’ID utente */
    public Long validateAndGetUserIdFromToken(String bearerHeader) {
        if (bearerHeader == null || !bearerHeader.startsWith("Bearer ")) {
            throw new ResponseStatusException(
               HttpStatus.UNAUTHORIZED, "Missing or invalid Authorization header"
            );
        }
        String token = bearerHeader.substring(7);
        Session s = sessionRepository.findByToken(token)
            .orElseThrow(() ->
               new ResponseStatusException(
                   HttpStatus.UNAUTHORIZED, "Invalid session token"
               )
            );
        if (!Boolean.TRUE.equals(s.getActive())) {
            throw new ResponseStatusException(
               HttpStatus.UNAUTHORIZED, "Session is not active"
            );
        }
        return s.getUser().getId();
    }
}
