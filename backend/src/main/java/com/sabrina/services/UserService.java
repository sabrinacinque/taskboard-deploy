package com.sabrina.services;

import com.sabrina.entities.User;
import com.sabrina.models.RestSaveUser;
import com.sabrina.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	


	// Registrazione di un nuovo utente
	public RestSaveUser registerUser(User user) {
		User u = null;
		try {
				// Controllo se l'utente esiste già
				System.out.println("Registrazione la useraname dell'utente "+user.toString());
				
				System.out.println("Controllo se l'utente esiste già");
				// Prima la Username
				Optional<User> existingUser = userRepository.findByUsername(user.getUsername());
		        if ( existingUser.isPresent()) {
		        	System.out.println("Username già esistente "+user.getUsername());
		        	System.out.println("Dati utente ");
		            return new RestSaveUser(false, "Username già esistente", null);
		        }
		        
		        System.out.println("Controllo se l'eamail dell'utente esiste già");
		        // Poi la Email
		        Optional<User> existingUserEmail = userRepository.findByEmail(user.getEmail());
		        if (existingUserEmail.isPresent()) {
		        	System.out.println("Email già esistente "+user.getEmail() );
					System.out.println("Dati utente ");
					return new RestSaveUser(false, "Email già esistente", null);
		        }
		        
		        System.out.println("Criptaggio");
			     // Criptazione della password
		        String encodedPassword = this.passwordEncoder.encode(user.getPassword().trim());
		        System.out.println("Password criptata "+encodedPassword);
		        //User(String type, String username, String email, String password, int active) 
		        System.out.println("Sono qui ");
		        u = new User();
		        
		        
		        u.setUsername(user.getUsername().trim());
		        u.setEmail(user.getEmail().trim());
		        u.setActive(true);
		        u.setNumber(user.getNumber());
		        
		        u.setPassword(encodedPassword);
		        System.out.println("Creazione dell'utente "+user.toString());

		        
		        
		        u = this.userRepository.save(u);
		        return new RestSaveUser(true, "Registrazione avvenuta con successo", u);
		}
		catch (Exception e) {
		
			
			return new RestSaveUser(false, "Errore durante la registrazione", null);
		}
		
        
        
	}
	
	
	// Registrazione di un nuovo utente passando i dati e viene creato poi lo user
		public RestSaveUser registerUser(String username, String email, String password, boolean active,String number ) {
			return this.registerUser(new User(username, email, password, active,number));
		}
	
		
		public Optional<User> findByUsername(String username) {
	        return userRepository.findByUsername(username);
	    }

		/** Cerca l'utente per email */
	    public Optional<User> findByEmail(String email) {
	        return userRepository.findByEmail(email);
	    }
	    public Optional<User> findById(Long id) {
	        return userRepository.findById(id);
	    }
	    
	    
	    public boolean updateUsername(Long id, String newUsername) {
	        User u = userRepository.findById(id).orElse(null);
	        if (u == null) return false;
	        u.setUsername(newUsername);
	        userRepository.save(u);
	        return true;
	    }

	    public boolean updatePassword(Long id, String oldPwd, String newPwd) {
	        User u = userRepository.findById(id).orElse(null);
	        if (u == null) return false;
	        if (!passwordEncoder.matches(oldPwd, u.getPassword())) return false;
	        u.setPassword(passwordEncoder.encode(newPwd));
	        userRepository.save(u);
	        return true;
	    }
	    
	    public User saveUser(User user) {
	        return userRepository.save(user);
	    }

	
}
