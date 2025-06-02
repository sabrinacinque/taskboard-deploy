package com.sabrina.entities;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "sessions")
public class Session {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "date", nullable = false)
    private LocalDateTime date;

    @Column(name = "date_last_action", nullable = false)
    private LocalDateTime dateLastAction;

    @Column(name = "token", nullable = false)
    private String token;

    @Column(name = "ip")
    private String ip;

    @Column(name = "active")
    private Boolean active;

    // Constructors
    public Session() {}

    public Session(Long id, User user, LocalDateTime date, LocalDateTime dateLastAction, String token, String ip, Boolean active) {
        this.id = id;
        this.user = user;
        this.date = date;
        this.dateLastAction = dateLastAction;
        this.token = token;
        this.ip = ip;
        this.active = active;
    }

    // Getters and setters
    public Long getId() {
    	return id; 
    	}
    public void setId(Long id) {
    	this.id = id; 
    	}

    public User getUser() { 
    	return user; 
    	}
    public void setUser(User user) { 
    	this.user = user; 
    	}

    public LocalDateTime getDate() {
    	return date; 
    	}
    public void setDate(LocalDateTime date) { 
    	this.date = date; 
    	}

    public LocalDateTime getDateLastAction() { 
    	return dateLastAction; 
    	}
    public void setDateLastAction(LocalDateTime dateLastAction) { 
    	this.dateLastAction = dateLastAction; 
    	}

    public String getToken() {
    	return token; 
    	}
    public void setToken(String token) { 
    	this.token = token; 
    	}

    public String getIp() { 
    	return ip; 
    	}
    public void setIp(String ip) {
    	this.ip = ip; 
    	}

    public Boolean getActive() { 
    	return active; 
    	}
    public void setActive(Boolean active) { 
    	this.active = active; 
    	}

    @Override
    public String toString() {
        return "Session [id=" + id + ", user=" + user + ", date=" + date + ", dateLastAction=" + dateLastAction + ", token=" + token + ", ip=" + ip + ", active=" + active + "]";
    }
}
