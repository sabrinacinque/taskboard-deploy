package com.sabrina.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.HashMap;
import java.util.Map;

import com.sabrina.models.ContactRequestDto;
import com.sabrina.services.ContactEmailService;



@RestController
@RequestMapping("/api/v1/contact")
public class ContactController {
    
    private static final Logger logger = LoggerFactory.getLogger(ContactController.class);
    
    @Autowired
    private ContactEmailService contactEmailService;
    
    @PostMapping
    public ResponseEntity<Map<String, Object>> sendContactRequest(@RequestBody ContactRequestDto contactRequest) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            logger.info("=== CONTACT REQUEST START ===");
            logger.info("Received contact request from: {} with subject: {}", contactRequest.getEmail(), contactRequest.getSubject());
            logger.info("Request details - Name: {}, Email: {}", contactRequest.getName(), contactRequest.getEmail());
            
            contactEmailService.sendContactRequest(contactRequest);
            
            logger.info("Contact request processed successfully for: {}", contactRequest.getEmail());
            logger.info("=== CONTACT REQUEST END ===");
            
            response.put("success", true);
            response.put("message", "Contact request sent successfully! We'll get back to you soon.");
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            logger.error("=== CONTACT REQUEST ERROR ===");
            logger.error("Error processing contact request from: {}", contactRequest.getEmail(), e);
            logger.error("Error message: {}", e.getMessage());
            logger.error("=== CONTACT REQUEST ERROR END ===");
            
            response.put("success", false);
            response.put("message", "Failed to send contact request. Please try again later.");
            
            return ResponseEntity.status(500).body(response);
        }
    }
}

