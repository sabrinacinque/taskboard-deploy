// src/main/java/com/sabrina/entities/Project.java
package com.sabrina.entities;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.*;

@Entity
@Table(name="projects")
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private String description;

    @OneToMany(
        mappedBy    = "project",
        cascade     = CascadeType.ALL,
        orphanRemoval = true
    )
    @JsonManagedReference
    private List<ProjectMember> members = new ArrayList<>();

    @OneToMany(
        mappedBy = "project",
        cascade  = CascadeType.ALL,
        orphanRemoval = true
    )
    private List<Task> tasks = new ArrayList<>();

    // getters & setters...

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public LocalDateTime getStartDate() { return startDate; }
    public void setStartDate(LocalDateTime startDate) { this.startDate = startDate; }

    public LocalDateTime getEndDate() { return endDate; }
    public void setEndDate(LocalDateTime endDate) { this.endDate = endDate; }

    public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public List<ProjectMember> getMembers() { return members; }
    public void setMembers(List<ProjectMember> members) { this.members = members; }

    public List<Task> getTasks() { return tasks; }
    public void setTasks(List<Task> tasks) { this.tasks = tasks; }

    // --- helper methods ---

    public void addMember(ProjectMember m) {
        members.add(m);
        m.setProject(this);
    }

    public void removeMember(ProjectMember m) {
        members.remove(m);
        m.setProject(null);
    }

    public void addTask(Task t) {
        tasks.add(t);
        t.setProject(this);
    }

    public void removeTask(Task t) {
        tasks.remove(t);
        t.setProject(null);
    }
}
