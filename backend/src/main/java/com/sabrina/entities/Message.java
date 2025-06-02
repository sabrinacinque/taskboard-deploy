package com.sabrina.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "messages")
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "from_user_id")
    private User fromUser;

    @ManyToOne
    @JoinColumn(name = "to_user_id")
    private User toUser;

    @Column(name = "title")
    private String title;

    @Column(name = "message")
    private String message;

    @Column(name = "readed")
    private Boolean readed;

    // Constructors
    public Message() {}

    public Message(Long id, User fromUser, User toUser, String title, String message, Boolean readed) {
        this.id = id;
        this.fromUser = fromUser;
        this.toUser = toUser;
        this.title = title;
        this.message = message;
        this.readed = readed;
    }

    // Getters and setters
    public Long getId() { 
    	return id; 
    	}
    public void setId(Long id) { 
    	this.id = id;
    	}

    public User getFromUser() { 
    	return fromUser; 
    	}
    public void setFromUser(User fromUser) { 
    	this.fromUser = fromUser; 
    	}

    public User getToUser() { 
    	return toUser; 
    	}
    public void setToUser(User toUser) { 
    	this.toUser = toUser; 
    	}

    public String getTitle() { 
    	return title; 
    	}
    public void setTitle(String title) { 
    	this.title = title; 
    	}

    public String getMessage() { 
    	return message; 
    	}
    public void setMessage(String message) { 
    	this.message = message; 
    	}

    public Boolean getReaded() { 
    	return readed; 
    	}
    public void setReaded(Boolean readed) { 
    	this.readed = readed; 
    	}

    @Override
    public String toString() {
        return "Message [id=" + id + ", fromUser=" + fromUser + ", toUser=" + toUser + ", title=" + title + ", message=" + message + ", readed=" + readed + "]";
    }
}