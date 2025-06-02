// src/main/java/com/sabrina/repositories/FriendRequestRepository.java
package com.sabrina.repositories;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.sabrina.entities.FriendRequest;
import com.sabrina.entities.Status;

public interface FriendRequestRepository extends JpaRepository<FriendRequest, Long> {
    
    List<FriendRequest> findByTarget_IdAndStatus(Long targetId, Status status);
    
    @Query("""
    	    select fr from FriendRequest fr
    	    where (fr.requester.id = :userId or fr.target.id = :userId)
    	      and fr.status = 'ACCEPTED'
    	    order by fr.createdAt desc
    	   """)
    	  List<FriendRequest> findAcceptedConnections(@Param("userId") Long userId);
    
    List<FriendRequest> findByRequester_IdAndStatus(Long requesterId, Status status);
    	

}
