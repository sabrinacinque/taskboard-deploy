package com.sabrina.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sabrina.entities.User;

public interface UserRepository extends JpaRepository <User,Long> {
	
	Optional<User> findByUsername(String username);
	Optional<User> findByEmail(String email);
	Optional<User> findByNumber(String number);
	

	
	

}
