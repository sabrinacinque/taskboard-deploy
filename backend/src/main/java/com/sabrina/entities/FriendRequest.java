// src/main/java/com/sabrina/entities/FriendRequest.java
package com.sabrina.entities;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "friend_requests")
public class FriendRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // chi invia
    @ManyToOne(optional = false)
    @JoinColumn(name = "requester_id")
    private User requester;

    // a chi è indirizzata
    @ManyToOne(optional = false)
    @JoinColumn(name = "target_id")
    private User target;

    @Enumerated(EnumType.STRING)
    @Column(length = 20, nullable = false)
    private Status status; // usa l'enum Status

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    public FriendRequest() {
        // JPA needs this
    }

    public FriendRequest(User requester, User target) {
        this.requester = requester;
        this.target    = target;
        this.status    = Status.PENDING;
        this.createdAt = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getRequester() {
        return requester;
    }

    public void setRequester(User requester) {
        this.requester = requester;
    }

    public User getTarget() {
        return target;
    }

    public void setTarget(User target) {
        this.target = target;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
