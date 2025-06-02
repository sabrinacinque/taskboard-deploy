// src/main/java/com/sabrina/services/EmailService.java
package com.sabrina.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    
    @Autowired
    private JavaMailSender mailSender;
    
    @Value("${app.frontend.url}")
    private String frontendUrl;
    
    public void sendPasswordResetEmail(String toEmail, String token) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("Password Reset Request - Taskboard");
        
        String resetUrl = frontendUrl + "/reset-password?token=" + token;
        String text = "Hi,\n\n" +
                     "You requested a password reset for your Taskboard account.\n\n" +
                     "Click the link below to reset your password:\n" +
                     resetUrl + "\n\n" +
                     "This link will expire in 1 hour.\n\n" +
                     "If you didn't request this, please ignore this email.\n\n" +
                     "Best regards,\n" +
                     "Taskboard Team";
        
        message.setText(text);
        message.setFrom("noreply@taskboard.com");
        
        try {
            mailSender.send(message);
            System.out.println("Password reset email sent to: " + toEmail);
        } catch (Exception e) {
            System.err.println("Failed to send email to: " + toEmail);
            e.printStackTrace();
            throw new RuntimeException("Failed to send password reset email");
        }
    }
}
