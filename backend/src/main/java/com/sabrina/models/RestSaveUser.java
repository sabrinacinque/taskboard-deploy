package com.sabrina.models;

import com.sabrina.entities.User;

public class RestSaveUser {
	
	private boolean success;
	private String message;
	private User user;
	
	public RestSaveUser() {
	
	}
	
	public RestSaveUser(boolean success, String message, User user) {			
		this.success = success;
		this.message = message;
		this.user = user;
	}
	
	public boolean isSuccess() {
		return success;
	}
	
	public void setSuccess(boolean success) {
		this.success = success;
	}
	
	public String getMessage() {
		return message;
	}
	
	public void setMessage(String message) {
		this.message = message;
	}
	
	
	public User getUser() {
		return user;
	}
	
	public void setUser(User user) {
		this.user = user;
	}
	
	@Override
	public String toString() {
		return "ResponseSaveUser [success=" + success + ", message=" + message + ", user=" + user + "]";
	}

}
