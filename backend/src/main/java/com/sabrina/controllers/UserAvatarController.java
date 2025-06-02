// src/main/java/com/sabrina/controllers/UserAvatarController.java
package com.sabrina.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import com.sabrina.entities.UserAvatar;
import com.sabrina.services.UserAvatarService;
import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/v1/users/{userId}/avatar")
public class UserAvatarController {

    @Autowired
    private UserAvatarService avatarService;

    @GetMapping
    public UserAvatar getAvatar(@PathVariable Long userId) {
        UserAvatar ua = avatarService.getAvatar(userId);
        if (ua == null) {
            throw new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Avatar non impostato"
            );
        }
        return ua;
    }

    @PutMapping
    public UserAvatar setAvatar(
        @PathVariable Long userId,
        @RequestBody String avatarUrl
    ) {
        return avatarService.setAvatar(userId, avatarUrl);
    }
}
