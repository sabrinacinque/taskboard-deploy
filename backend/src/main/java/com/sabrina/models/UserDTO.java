// src/main/java/com/sabrina/models/UserDTO.java
package com.sabrina.models;

public class UserDTO {
    private Long   id;
    private String username;
    private String email;
    private String number;
    
    public UserDTO() {}
    public UserDTO(Long id, String username, String email,String number) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.number = number;
    }
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
	public String getNumber() {
		return number;
	}
	public void setNumber(String number) {
		this.number = number;
	}
    
}
