// src/main/java/com/sabrina/services/ProjectService.java
package com.sabrina.services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sabrina.entities.Project;
import com.sabrina.entities.ProjectMember;
import com.sabrina.entities.Role;
import com.sabrina.entities.User;
import com.sabrina.models.InputProject;
import com.sabrina.models.InputProjectMember;
import com.sabrina.models.ProjectDTO;
import com.sabrina.models.ProjectMemberDTO;
import com.sabrina.models.UserDTO;
import com.sabrina.repositories.ProjectMemberRepository;
import com.sabrina.repositories.ProjectRepository;
import com.sabrina.repositories.UserRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepo;

    @Autowired
    private ProjectMemberRepository memberRepo;

    @Autowired
    private UserRepository userRepo;

    /**
     * Crea un nuovo progetto e aggiunge l'utente creator come ADMIN nel project_members.
     */
    public Project createProject(InputProject in, Long creatorId) {
        User creator = userRepo.findById(creatorId)
            .orElseThrow(() -> new IllegalArgumentException("User not found: " + creatorId));

        Project p = new Project();
        p.setName(in.getName());
        p.setStartDate(in.getStartDate() != null ? in.getStartDate() : LocalDateTime.now());
        p.setEndDate(in.getEndDate());
        p.setDescription(in.getDescription());
        p = projectRepo.save(p);

        // aggiungo il creator come ADMIN
        ProjectMember pm = new ProjectMember(p, creator, Role.ADMIN);
        memberRepo.save(pm);

        return p;
    }

    /** Restituisce tutti i progetti */
    public List<Project> findAllProjects() {
        return projectRepo.findAll();
    }

    /** Restituisce un progetto per ID */
    public Optional<Project> findById(Long projectId) {
        return projectRepo.findById(projectId);
    }

    /**
     * Restituisce tutti i progetti di cui l'utente è membro.
     * (assume che ProjectRepository dichiari: List<Project> findByMembers_User_Id(Long userId))
     */
    public List<Project> findProjectsForUser(Long userId) {
        return projectRepo.findByMembers_User_Id(userId);
    }

    /** Aggiorna i campi name, startDate e endDate del progetto */
    public Project updateProject(Long projectId, InputProject in) {
        Project p = projectRepo.findById(projectId)
            .orElseThrow(() -> new IllegalArgumentException("Project not found: " + projectId));

        if (in.getName() != null)      p.setName(in.getName());
        if (in.getStartDate() != null) p.setStartDate(in.getStartDate());
        if (in.getEndDate() != null)   p.setEndDate(in.getEndDate());
        if(in.getDescription() != null) p.setDescription(in.getDescription());

        return projectRepo.save(p);
    }

    /** Cancella un progetto (e in cascata i suoi membri/tasks, se configurato) */
    public void deleteProject(Long projectId) {
        projectRepo.deleteById(projectId);
    }

    public ProjectMember addMember(Long projectId, InputProjectMember in) {
        // Recupera il progetto, altrimenti 404
        Project p = projectRepo.findById(projectId)
            .orElseThrow(() -> new IllegalArgumentException("Project not found: " + projectId));
        // Recupera lo user, altrimenti 404
        User u = userRepo.findById(in.getUserId())
            .orElseThrow(() -> new IllegalArgumentException("User not found: " + in.getUserId()));

        // Controlla se è già membro
        boolean alreadyMember = memberRepo.findByProject_Id(projectId).stream()
            .anyMatch(pm -> pm.getUser().getId().equals(in.getUserId()));
        if (alreadyMember) {
            throw new IllegalArgumentException(
                "User " + in.getUserId() + " is already a member of project " + projectId
            );
        }

        // Altrimenti crea e salva
        ProjectMember pm = new ProjectMember(p, u, in.getRole());
        return memberRepo.save(pm);
    }

    /** Rimuove un membro (by userId) da un progetto */
    public void removeMember(Long projectId, Long userId) {
        memberRepo.deleteByProject_IdAndUser_Id(projectId, userId);
    }

    /** Lista tutti i membri di un progetto */
    public List<ProjectMember> listMembers(Long projectId) {
        return memberRepo.findByProject_Id(projectId);
    }
    
    public ProjectMemberDTO toDTO(ProjectMember m) {
        // Assumi di avere già in questo service il metodo toDTO(User)
        return new ProjectMemberDTO(
            m.getId(),
            toDTO(m.getUser()),
            m.getRole()
        );
    }

    // Mapper per User → UserDTO
    public UserDTO toDTO(User u) {
        return new UserDTO(u.getId(), u.getUsername(), u.getEmail(),u.getNumber());
    }

    // Mapper per Project → DTO
    public ProjectDTO toDTO(Project p) {
        var membersDto = p.getMembers().stream()
                          .map(this::toDTO)
                          .toList();
        return new ProjectDTO(
            p.getId(),
            p.getName(),
            p.getStartDate(),
            p.getEndDate(),
            p.getDescription(),
            membersDto
        );
    }
}
