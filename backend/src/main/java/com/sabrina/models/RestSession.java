package com.sabrina.models;

public class RestSession {

    private Long id;
    private Long userid;
    private String token;

    // Constructors
    public RestSession() {
    }

    public RestSession(Long id, Long userid, String token) {
        this.id = id;
        this.userid = userid;
        this.token = token;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserid() {
        return userid;
    }

    public void setUserid(Long userid) {
        this.userid = userid;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    @Override
    public String toString() {
        return "RestSession [id=" + id + ", userid=" + userid + ", token=" + token + "]";
    }
}
