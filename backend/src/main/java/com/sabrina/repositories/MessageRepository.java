package com.sabrina.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sabrina.entities.Message;

public interface MessageRepository extends JpaRepository<Message,Long>{

}
