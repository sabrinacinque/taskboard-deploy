// src/main/java/com/sabrina/controllers/FriendController.java
package com.sabrina.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.sabrina.entities.FriendRequest;
import com.sabrina.services.FriendService;
import com.sabrina.services.SessionService;

@RestController
@RequestMapping("/api/v1/friends")
public class FriendController {

    @Autowired
    private FriendService friendService;

    @Autowired
    private SessionService sessionService;

    public static class RequestBodyWrapper {
      public Long toUserId;
    }

    @PostMapping("/request")
    public FriendRequest send(
        @RequestBody RequestBodyWrapper body,
        @RequestHeader("Authorization") String bearer
    ) {
        Long fromId = sessionService.validateAndGetUserIdFromToken(bearer);
        return friendService.sendRequest(fromId, body.toUserId);
    }

    @GetMapping("/pending")
    public List<FriendRequest> incoming(
        @RequestHeader("Authorization") String bearer
    ) {
        Long me = sessionService.validateAndGetUserIdFromToken(bearer);
        return friendService.listIncoming(me);
    }

    @GetMapping("/outgoing")
    public List<FriendRequest> outgoing(
        @RequestHeader("Authorization") String bearer
    ) {
        Long me = sessionService.validateAndGetUserIdFromToken(bearer);
        return friendService.listOutgoing(me);
    }

    @PutMapping("/{id}/respond")
    public FriendRequest respond(
        @PathVariable Long id,
        @RequestParam boolean accept,
        @RequestHeader("Authorization") String bearer
    ) {
        sessionService.validateAndGetUserIdFromToken(bearer);
        return friendService.respond(id, accept);
    }

    @GetMapping("/connections")
    public List<FriendRequest> connections(
        @RequestHeader("Authorization") String bearer
    ) {
        Long me = sessionService.validateAndGetUserIdFromToken(bearer);
        return friendService.findAccepted(me);
    }
    
    @DeleteMapping("/{id}")
    public void deleteConnection(
        @PathVariable Long id,
        @RequestHeader("Authorization") String bearer
    ) {
        sessionService.validateAndGetUserIdFromToken(bearer);
        friendService.deleteConnection(id);
    }
}
