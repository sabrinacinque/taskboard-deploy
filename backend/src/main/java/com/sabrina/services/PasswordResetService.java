// src/main/java/com/sabrina/services/PasswordResetService.java
package com.sabrina.services;

import com.sabrina.entities.PasswordResetToken;
import com.sabrina.entities.User;
import com.sabrina.repositories.PasswordResetTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
public class PasswordResetService {
    
    @Autowired
    private PasswordResetTokenRepository tokenRepository;
    
    @Autowired
    private UserService userService;
    
    @Autowired
    private EmailService emailService;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Transactional
    public boolean requestPasswordReset(String email) {
        // Verifica se l'utente esiste
        Optional<User> userOpt = userService.findByEmail(email);
        if (!userOpt.isPresent()) {
            return false;
        }
        
        // Invalida tutti i token precedenti per questa email
        tokenRepository.markAllTokensAsUsedForEmail(email);
        
        // Genera nuovo token
        String token = UUID.randomUUID().toString();
        LocalDateTime expiryDate = LocalDateTime.now().plusHours(1); // Scade in 1 ora
        
        // Salva il token
        PasswordResetToken resetToken = new PasswordResetToken(token, email, expiryDate);
        tokenRepository.save(resetToken);
        
        // Invia email
        try {
            emailService.sendPasswordResetEmail(email, token);
            return true;
        } catch (Exception e) {
            System.err.println("Failed to send reset email: " + e.getMessage());
            return false;
        }
    }
    
    @Transactional
    public boolean resetPassword(String token, String newPassword) {
        // Trova il token
        Optional<PasswordResetToken> tokenOpt = tokenRepository.findByToken(token);
        if (!tokenOpt.isPresent()) {
            return false;
        }
        
        PasswordResetToken resetToken = tokenOpt.get();
        
        // Verifica se il token è valido
        if (resetToken.isUsed() || resetToken.isExpired()) {
            return false;
        }
        
        // Trova l'utente
        Optional<User> userOpt = userService.findByEmail(resetToken.getEmail());
        if (!userOpt.isPresent()) {
            return false;
        }
        
        User user = userOpt.get();
        
        // Aggiorna la password
        String encodedPassword = passwordEncoder.encode(newPassword);
        user.setPassword(encodedPassword);
        userService.saveUser(user); // Dobbiamo aggiungere questo metodo
        
        // Marca il token come usato
        resetToken.setUsed(true);
        tokenRepository.save(resetToken);
        
        return true;
    }
    
    public boolean validateToken(String token) {
        Optional<PasswordResetToken> tokenOpt = tokenRepository.findByToken(token);
        if (!tokenOpt.isPresent()) {
            return false;
        }
        
        PasswordResetToken resetToken = tokenOpt.get();
        return !resetToken.isUsed() && !resetToken.isExpired();
    }
}
