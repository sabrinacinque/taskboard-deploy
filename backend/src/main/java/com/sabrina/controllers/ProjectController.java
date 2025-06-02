// src/main/java/com/sabrina/controllers/ProjectController.java
package com.sabrina.controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import com.sabrina.models.*;
import com.sabrina.services.ProjectService;
import com.sabrina.services.SessionService;

@RestController
@RequestMapping("/api/v1/projects")
@CrossOrigin(origins="*")
public class ProjectController {

    @Autowired private ProjectService projectService;
    @Autowired private SessionService sessionService;

    @GetMapping
    public List<ProjectDTO> getAll(@RequestParam(required = false) Long userId) {
        var projects = (userId != null)
           ? projectService.findProjectsForUser(userId)
           : projectService.findAllProjects();
        return projects.stream()
                       .map(projectService::toDTO)
                       .toList();
    }

    @GetMapping("/{id}")
    public ProjectDTO getById(@PathVariable Long id) {
        var p = projectService.findById(id)
            .orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Project not found: " + id));
        return projectService.toDTO(p);
    }

    @PostMapping("/create")
    public ProjectDTO create(
        @RequestHeader("Authorization") String bearer,
        @RequestBody InputProject input
    ) {
        Long creatorId = sessionService.validateAndGetUserIdFromToken(bearer);
        var p = projectService.createProject(input, creatorId);
        return projectService.toDTO(p);
    }

    @PutMapping("/update/{id}")
    public ProjectDTO update(
        @PathVariable Long id,
        @RequestBody InputProject input
    ) {
        var p = projectService.updateProject(id, input);
        return projectService.toDTO(p);
    }

    @DeleteMapping("/delete/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        projectService.deleteProject(id);
    }

    @GetMapping("/{id}/members")
    public List<ProjectMemberDTO> listMembers(@PathVariable Long id) {
        return projectService.listMembers(id).stream()
                             .map(projectService::toDTO)
                             .toList();
    }

    @PostMapping("/{id}/members")
    public ProjectMemberDTO addMember(
        @PathVariable Long id,
        @RequestBody InputProjectMember input
    ) {
        var m = projectService.addMember(id, input);
        return projectService.toDTO(m);
    }

    @DeleteMapping("/{id}/members/{userId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void removeMember(
        @PathVariable Long id,
        @PathVariable Long userId
    ) {
        projectService.removeMember(id, userId);
    }

}
