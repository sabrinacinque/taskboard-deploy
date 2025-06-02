package com.sabrina.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.sabrina.models.ContactRequestDto;

@Service
public class ContactEmailService {
    
    private static final Logger logger = LoggerFactory.getLogger(ContactEmailService.class);
    
    @Autowired
    private JavaMailSender mailSender;
    
    @Value("${spring.mail.username}")
    private String fromEmail;
    
    public void sendContactRequest(ContactRequestDto contactRequest) {
        try {
            logger.info("Attempting to send contact email from: {} to: {}", contactRequest.getEmail(), "cinque.sabrina@gmail.com");
            logger.info("Using SMTP configuration with username: {}", fromEmail);
            
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo("cinque.sabrina@gmail.com");
            message.setSubject("TaskBoard Contact: " + contactRequest.getSubject());
            
            String emailBody = String.format(
                "New contact request from TaskBoard:\n\n" +
                "Name: %s\n" +
                "Email: %s\n" +
                "Subject: %s\n\n" +
                "Message:\n%s\n\n" +
                "---\n" +
                "This message was sent from the TaskBoard contact form.",
                contactRequest.getName(),
                contactRequest.getEmail(),
                contactRequest.getSubject(),
                contactRequest.getMessage()
            );
            
            message.setText(emailBody);
            message.setReplyTo(contactRequest.getEmail());
            
            logger.info("Email message prepared, attempting to send...");
            mailSender.send(message);
            logger.info("Contact email sent successfully from: {} to: cinque.sabrina@gmail.com", contactRequest.getEmail());
            
        } catch (Exception e) {
            logger.error("Failed to send contact email from: {} to: cinque.sabrina@gmail.com", contactRequest.getEmail(), e);
            logger.error("Error details: {}", e.getMessage());
            throw new RuntimeException("Failed to send contact request. Please try again later.", e);
        }
    }
}

