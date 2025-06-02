// src/main/java/com/sabrina/services/UserAvatarService.java
package com.sabrina.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.sabrina.entities.UserAvatar;
import com.sabrina.repositories.UserAvatarRepository;

@Service
public class UserAvatarService {

    @Autowired
    private UserAvatarRepository avatarRepo;

    /** Ritorna l’avatar scelto (o null se non impostato) */
    public UserAvatar getAvatar(Long userId) {
        return avatarRepo.findByUserId(userId).orElse(null);
    }

    /** Crea o aggiorna l’avatar per questo user */
    public UserAvatar setAvatar(Long userId, String url) {
        UserAvatar ua = avatarRepo.findByUserId(userId)
            .orElse(new UserAvatar(userId, url));
        ua.setAvatarUrl(url);
        return avatarRepo.save(ua);
    }
}
