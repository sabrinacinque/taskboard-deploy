// src/main/java/com/sabrina/models/InputTask.java
package com.sabrina.models;

import java.time.LocalDateTime;

public class InputTask {
    private Long recipientId;          // prima era userId
    private LocalDateTime insertDate;
    private LocalDateTime previousEndDate;
    private String title;
    private String description;
    private String state;
    private Long creatorId;
    private Long projectId;

    // getters & setters...
    public Long getRecipientId() { return recipientId; }
    public void setRecipientId(Long recipientId) { this.recipientId = recipientId; }
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
	public Long getCreatorId() {
		return creatorId;
	}
	public void setCreatorId(Long creatorId) {
		this.creatorId = creatorId;
	}
	public Long getProjectId() {
		return projectId;
	}
	public void setProjectId(Long projectId) {
		this.projectId = projectId;
	}
    
}
