package com.sabrina.models;

/**
 * DTO per ricevere i dati di login dall’utente:
 * identifier (username o email) e password.
 */
public class InputLogin {
    
    private String identifier;
    private String password;

    public InputLogin() {}

    public InputLogin(String identifier, String password) {
        this.identifier = identifier;
        this.password   = password;
    }

    public String getIdentifier() {
        return identifier;
    }
    public void setIdentifier(String identifier) {
        this.identifier = identifier;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "InputLogin{" +
               "identifier='" + identifier + '\'' +
               ", password='[PROTECTED]'" +
               '}';
    }
}
