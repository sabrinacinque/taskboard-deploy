// src/main/java/com/sabrina/controllers/AuthController.java
package com.sabrina.controllers;

import com.sabrina.models.RestBasic;
import com.sabrina.services.PasswordResetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/auth")
@CrossOrigin(origins = "*")
public class AuthController {
    
    @Autowired
    private PasswordResetService passwordResetService;
    
    @PostMapping("/forgot-password")
    public RestBasic forgotPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        
        if (email == null || email.trim().isEmpty()) {
            return new RestBasic(false, "Email is required");
        }
        
        boolean success = passwordResetService.requestPasswordReset(email.trim());
        
        if (success) {
            return new RestBasic(true, "Password reset email sent successfully");
        } else {
            return new RestBasic(false, "User not found or email could not be sent");
        }
    }
    
    @PostMapping("/reset-password")
    public RestBasic resetPassword(@RequestBody Map<String, String> request) {
        String token = request.get("token");
        String newPassword = request.get("password");
        
        if (token == null || token.trim().isEmpty()) {
            return new RestBasic(false, "Token is required");
        }
        
        if (newPassword == null || newPassword.trim().isEmpty()) {
            return new RestBasic(false, "New password is required");
        }
        
        boolean success = passwordResetService.resetPassword(token.trim(), newPassword.trim());
        
        if (success) {
            return new RestBasic(true, "Password reset successfully");
        } else {
            return new RestBasic(false, "Invalid or expired token");
        }
    }
    
    @GetMapping("/validate-reset-token")
    public RestBasic validateResetToken(@RequestParam String token) {
        if (token == null || token.trim().isEmpty()) {
            return new RestBasic(false, "Token is required");
        }
        
        boolean valid = passwordResetService.validateToken(token.trim());
        
        if (valid) {
            return new RestBasic(true, "Token is valid");
        } else {
            return new RestBasic(false, "Invalid or expired token");
        }
    }
}
