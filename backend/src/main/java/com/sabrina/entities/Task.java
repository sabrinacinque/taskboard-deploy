// src/main/java/com/sabrina/entities/Task.java
package com.sabrina.entities;

import java.time.LocalDateTime;
import jakarta.persistence.*;

@Entity
@Table(name = "tasks")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // destinatario
    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id")
    private User user;

    // mittente
    @ManyToOne(optional = false)
    @JoinColumn(name = "creator_id")
    private User creator;

    @Column(name = "insert_date", nullable = false)
    private LocalDateTime insertDate;

    @Column(name = "previous_end_date")
    private LocalDateTime previousEndDate;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private String state;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id")
    private Project project;

    // === getters & setters ===

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public User getCreator() { return creator; }
    public void setCreator(User creator) { this.creator = creator; }

    public LocalDateTime getInsertDate() { return insertDate; }
    public void setInsertDate(LocalDateTime insertDate) { this.insertDate = insertDate; }

    public LocalDateTime getPreviousEndDate() { return previousEndDate; }
    public void setPreviousEndDate(LocalDateTime previousEndDate) { this.previousEndDate = previousEndDate; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getState() { return state; }
    public void setState(String state) { this.state = state; }
    
    public Project getProject() {
        return project;
    }
    public void setProject(Project project) {
        this.project = project;
    }
}
