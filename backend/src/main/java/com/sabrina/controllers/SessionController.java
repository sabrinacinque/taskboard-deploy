// src/main/java/com/sabrina/controllers/SessionController.java
package com.sabrina.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.sabrina.models.InputLogin;
import com.sabrina.models.RestBasic;
import com.sabrina.models.RestLogin;
import com.sabrina.models.RestSessionInfo;
import com.sabrina.services.SessionService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/v1/sessions")
@CrossOrigin(origins = "https://taskboard-frontend-0ta1.onrender.com", allowCredentials = "true")
public class SessionController {

    @Autowired
    private SessionService sessionService;

    @PostMapping("/login")
    public RestLogin login(
        @RequestBody InputLogin input,
        HttpServletRequest request
    ) {
        return sessionService.authenticateByUserNameAndPassword(input, request);
    }

    // ========== GET di test su /login ========== 
    @GetMapping("/login")
    public RestBasic loginGet() {
        // Risponde sempre con un JSON di tipo { success: true, message: "Login endpoint ok" }
        return new RestBasic(true, "Login endpoint OK");
    }

    @PostMapping("/logout")
    public RestBasic logout(HttpServletRequest request) {
        String auth = request.getHeader("Authorization");
        if (auth == null || !auth.startsWith("Bearer ")) {
            return new RestBasic(false, "Token not provided");
        }
        boolean ok = sessionService.logoutByToken(auth.substring(7));
        return ok
            ? new RestBasic(true, "Logout successful")
            : new RestBasic(false, "Session not found or already inactive");
    }

    @GetMapping("/recent")
    public List<RestSessionInfo> recentSessions(
        @RequestHeader("Authorization") String bearer
    ) {
        Long userId = sessionService.validateAndGetUserIdFromToken(bearer);
        return sessionService.findRecentSessions(userId, 5);
    }
}
