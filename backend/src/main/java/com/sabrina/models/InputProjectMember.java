package com.sabrina.models;
import com.sabrina.entities.Role;
public class InputProjectMember {
    private Long   userId;
    private Role   role;
    // getters / setters
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	public Role getRole() {
		return role;
	}
	public void setRole(Role role) {
		this.role = role;
	}
    
}
