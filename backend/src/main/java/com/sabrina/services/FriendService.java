// src/main/java/com/sabrina/services/FriendService.java
package com.sabrina.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sabrina.entities.FriendRequest;
import com.sabrina.entities.Status;
import com.sabrina.entities.User;
import com.sabrina.repositories.FriendRequestRepository;
import com.sabrina.repositories.UserRepository;

@Service
public class FriendService {

    @Autowired
    private FriendRequestRepository reqRepo;

    @Autowired
    private UserRepository userRepo;

    public FriendRequest sendRequest(Long fromUserId, Long toUserId) {
        User from = userRepo.findById(fromUserId)
            .orElseThrow(() -> new IllegalArgumentException("User not found: " + fromUserId));
        User to = userRepo.findById(toUserId)
            .orElseThrow(() -> new IllegalArgumentException("User not found: " + toUserId));

        FriendRequest fr = new FriendRequest(from, to);
        return reqRepo.save(fr);
    }

    public List<FriendRequest> listIncoming(Long userId) {
        return reqRepo.findByTarget_IdAndStatus(userId, Status.PENDING);
    }

    public List<FriendRequest> listOutgoing(Long userId) {
        return reqRepo.findByRequester_IdAndStatus(userId, Status.PENDING);
    }

    public FriendRequest respond(Long requestId, boolean accept) {
        FriendRequest fr = reqRepo.findById(requestId)
            .orElseThrow(() -> new IllegalArgumentException("Request not found: " + requestId));
        fr.setStatus(accept ? Status.ACCEPTED : Status.REJECTED);
        return reqRepo.save(fr);
    }

    public List<FriendRequest> findAccepted(Long userId) {
        return reqRepo.findAcceptedConnections(userId);
    }
    
    /**
     * Rimuove un’amicizia già confermata (cioè elimina la FriendRequest con status = ACCEPTED).
     */
    public void deleteConnection(Long requestId) {
        FriendRequest fr = reqRepo.findById(requestId)
            .orElseThrow(() -> new IllegalArgumentException("FriendRequest not found: " + requestId));
        if (fr.getStatus() != Status.ACCEPTED) {
            throw new IllegalStateException("Cannot delete a request that is not ACCEPTED.");
        }
        reqRepo.delete(fr);
    }
}
