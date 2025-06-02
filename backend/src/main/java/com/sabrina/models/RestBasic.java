package com.sabrina.models;

/**
 * DTO generico per risposte di esito (success/message)
 */
public class RestBasic {
    private boolean success;
    private String message;

    public RestBasic() {}

    public RestBasic(boolean success, String message) {
        this.success = success;
        this.message = message;
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
}
