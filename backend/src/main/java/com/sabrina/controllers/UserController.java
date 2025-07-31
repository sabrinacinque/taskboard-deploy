package com.sabrina.controllers;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.sabrina.entities.User;
import com.sabrina.models.RestBasic;
import com.sabrina.models.RestSaveUser;
import com.sabrina.services.UserService;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {
	@Autowired
	private UserService userService;
	
	@PostMapping("/register")
	public RestSaveUser registerUser(@RequestBody User user) {
		user.setActive(true);
		System.out.println("Registrazione utente "+user.toString());
		return this.userService.registerUser(user);
	}

    // in UserController.java
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAccount(@PathVariable Long id) {
      userService.anonymizeAccount(id);
      return ResponseEntity.noContent().build();
}
	
	// Cambia username
    @PutMapping("/{id}/username")
    public RestBasic changeUsername(
        @PathVariable Long id,
        @RequestBody Map<String,String> body
    ) {
        String newUser = body.get("username");
        boolean ok = userService.updateUsername(id, newUser);
        if (ok) return new RestBasic(true, "Username updated");
        else   return new RestBasic(false, "Failed to update username");
    }

    // Cambia password
    @PutMapping("/{id}/password")
    public RestBasic changePassword(
        @PathVariable Long id,
        @RequestBody Map<String,String> body
    ) {
        String oldPwd = body.get("oldPassword");
        String newPwd = body.get("newPassword");
        boolean ok = userService.updatePassword(id, oldPwd, newPwd);
        if (ok) return new RestBasic(true, "Password updated");
        else   return new RestBasic(false, "Failed to update password");
    }

    @GetMapping(params = "email")
    public User findByEmail(@RequestParam String email) {
        return userService.findByEmail(email)
            .orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND,
                "User not found with email: " + email
            ));
    }

     
        @GetMapping(params = "phone")
       public User findByPhone(@RequestParam String phone) {
         return userService.findByNumber(phone)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "User not found with phone: " + phone
                ));
    }  
}
