// src/main/java/com/sabrina/models/ProjectMemberDTO.java
package com.sabrina.models;

import com.sabrina.entities.Role;

public class ProjectMemberDTO {
    private Long   id;
    private UserDTO user;
    private Role   role;

    public ProjectMemberDTO() {}
    public ProjectMemberDTO(Long id, UserDTO user, Role role) {
        this.id = id;
        this.user = user;
        this.role = role;
    }
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public UserDTO getUser() { return user; }
    public void setUser(UserDTO user) { this.user = user; }
    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }
}
