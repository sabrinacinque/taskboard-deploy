package com.sabrina.repositories;

import org.springframework.data.domain.Pageable;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import com.sabrina.entities.Session;

public interface SessionRepository extends JpaRepository<Session, Long> {
    
    // Prima: findByUserIdAndActive → non esiste la proprietà userId
    // Adesso:
    List<Session> findByUser_IdAndActive(Long userId, boolean active);
    
    Optional<Session> findByToken(String token);
    
    Page<Session> findByUser_IdOrderByDateDesc(Long userId, Pageable pageable);
}
