package com.sabrina.models;

public class RestLogin {

    private boolean success;
    private String message;
    private RestSession sessiondata;

    // Constructors
    public RestLogin() {
    }

    public RestLogin(boolean success, String message, RestSession sessiondata) {
        this.success = success;
        this.message = message;
        this.sessiondata = sessiondata;
    }

    // Getters and setters
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

    public RestSession getSessiondata() {
        return sessiondata;
    }

    public void setSessiondata(RestSession sessiondata) {
        this.sessiondata = sessiondata;
    }

    @Override
    public String toString() {
        return "ResLogin [success=" + success + ", message=" + message + ", sessiondata=" + sessiondata + "]";
    }
}
