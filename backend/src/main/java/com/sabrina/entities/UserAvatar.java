// src/main/java/com/sabrina/entities/UserAvatar.java
package com.sabrina.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "user_avatars")
public class UserAvatar {

    @Id
    @Column(name = "user_id")
    private Long userId;

    @Column(name = "avatar_url", nullable = false)
    private String avatarUrl;

    public UserAvatar() {}

    public UserAvatar(Long userId, String avatarUrl) {
        this.userId = userId;
        this.avatarUrl = avatarUrl;
    }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getAvatarUrl() { return avatarUrl; }
    public void setAvatarUrl(String avatarUrl) { this.avatarUrl = avatarUrl; }
}
