package com.sabrina.models;

import java.time.LocalDateTime;

public class TaskDTO {
    private Long id;
    private Long recipientId;
    private String recipientUsername;
    private Long creatorId;
    private String creatorUsername;
    private String creatorNumber;
    private LocalDateTime insertDate;
    private LocalDateTime previousEndDate;
    private String title;
    private String description;
    private String state;
    private Long projectId;
    private String projectName;

    public TaskDTO(
        Long id,
        Long recipientId,
        String recipientUsername,
        Long creatorId,
        String creatorUsername,
        String creatorNumber,
        LocalDateTime insertDate,
        LocalDateTime previousEndDate,
        String title,
        String description,
        String state,
        Long projectId,
        String projectName
    ) {
        this.id = id;
        this.recipientId = recipientId;
        this.recipientUsername = recipientUsername;
        this.creatorId = creatorId;
        this.creatorUsername = creatorUsername;
        this.creatorNumber = creatorNumber;
        this.insertDate = insertDate;
        this.previousEndDate = previousEndDate;
        this.title = title;
        this.description = description;
        this.state = state;
        this.projectId = projectId;
        this.projectName = projectName;
    }

    public Long getId() { return id; }
    public Long getRecipientId() { return recipientId; }
    public String getRecipientUsername() { return recipientUsername; }
    public Long getCreatorId() { return creatorId; }
    public String getCreatorUsername() { return creatorUsername; }
    public String getCreatorNumber() { return creatorNumber; }
    public LocalDateTime getInsertDate() { return insertDate; }
    public LocalDateTime getPreviousEndDate() { return previousEndDate; }
    public String getTitle() { return title; }
    public String getDescription() { return description; }
    public String getState() { return state; }
    public Long getProjectId() { return projectId; }
    public String getProjectName() { return projectName; }
}
