// src/main/java/com/sabrina/models/ProjectDTO.java
package com.sabrina.models;

import java.time.LocalDateTime;
import java.util.List;

public class ProjectDTO {
    private Long id;
    private String name;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private String description;
    private List<ProjectMemberDTO> members;

    public ProjectDTO() {}

    public ProjectDTO(Long id, String name,
                      LocalDateTime startDate, LocalDateTime endDate,String description,
                      List<ProjectMemberDTO> members) {
        this.id = id;
        this.name = name;
        this.startDate = startDate;
        this.endDate = endDate;
        this.description = description;
        this.members = members;
    }

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

	public List<ProjectMemberDTO> getMembers() { return members; }
    public void setMembers(List<ProjectMemberDTO> members) { this.members = members; }
}
