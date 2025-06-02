// src/main/java/com/sabrina/models/RestSessionInfo.java
package com.sabrina.models;

import java.time.LocalDateTime;

public class RestSessionInfo {
    private LocalDateTime date;
    private String ip;
    private Boolean active;

    public RestSessionInfo() {}

    public RestSessionInfo(LocalDateTime date, String ip, Boolean active) {
        this.date   = date;
        this.ip     = ip;
        this.active = active;
    }

    public LocalDateTime getDate() { return date; }
    public void setDate(LocalDateTime date) { this.date = date; }

    public String getIp() { return ip; }
    public void setIp(String ip) { this.ip = ip; }

    public Boolean getActive() { return active; }
    public void setActive(Boolean active) { this.active = active; }
}
