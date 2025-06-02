package com.sabrina.services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sabrina.entities.Project;
import com.sabrina.entities.Task;
import com.sabrina.entities.User;
import com.sabrina.models.InputTask;
import com.sabrina.models.TaskDTO;
import com.sabrina.repositories.ProjectRepository;
import com.sabrina.repositories.TaskRepository;
import com.sabrina.repositories.UserRepository;

@Service
@Transactional
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProjectRepository projectRepository;

    /** Crea un nuovo task: creatorId dal token, recipientId dal DTO */
    public Task createTask(InputTask in, Long creatorId) {
        User creator = userRepository.findById(creatorId)
            .orElseThrow(() -> new IllegalArgumentException("Creator not found: " + creatorId));
        User recipient = userRepository.findById(in.getRecipientId())
            .orElseThrow(() -> new IllegalArgumentException("Recipient not found: " + in.getRecipientId()));

        Task t = new Task();
        t.setCreator(creator);
        t.setUser(recipient);
        t.setInsertDate(
            in.getInsertDate() != null 
            ? in.getInsertDate() 
            : LocalDateTime.now()
        );
        t.setPreviousEndDate(in.getPreviousEndDate());

        // **qui assicuriamo sempre un titolo non-null**
        String title = (in.getTitle() != null && !in.getTitle().isBlank())
            ? in.getTitle()
            : in.getDescription();        // <–– usar description come titolo di default
        t.setTitle(title);

        t.setDescription(in.getDescription());

        

        if (in.getProjectId() != null) {
        	t.setState("taskproject");
            Project p = projectRepository.findById(in.getProjectId())
                .orElseThrow(() -> new IllegalArgumentException("Project not found: " + in.getProjectId()));
            t.setProject(p);
        }else{
        	t.setState(in.getState());
        }

        return taskRepository.save(t);
    }

    /** Restituisce tutti i task */
    public List<Task> findAll() {
        return taskRepository.findAll();
    }

    /** Restituisce un singolo task */
    public Optional<Task> findById(Long id) {
        return taskRepository.findById(id);
    }

    /** Aggiorna un task esistente */
    public Task updateTask(Long id, InputTask in) {
        Task t = taskRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Task not found: " + id));

        if (in.getPreviousEndDate() != null) {
            t.setPreviousEndDate(in.getPreviousEndDate());
        }

        if (in.getDescription() != null) {
            t.setDescription(in.getDescription());
            // Se non ti viene passato un titolo esplicito, aggiorna anche il titolo
            // così rimane sempre non-null e coerente con la descrizione
            if (in.getTitle() == null || in.getTitle().isBlank()) {
                t.setTitle(in.getDescription());
            }
        }
        // Se invece viene passato un titolo esplicito, lascialo sovrascrivere
        if (in.getTitle() != null && !in.getTitle().isBlank()) {
            t.setTitle(in.getTitle());
        }

        if (in.getState() != null) {
            t.setState(in.getState());
        }

        // 🔥 AGGIUNTO: gestione del cambio recipientId
        if (in.getRecipientId() != null) {
            User newRecipient = userRepository.findById(in.getRecipientId())
                .orElseThrow(() -> new IllegalArgumentException("Recipient not found: " + in.getRecipientId()));
            t.setUser(newRecipient);
        }

        // cambio/dissocio progetto
        if (in.getProjectId() != null) {
            Project p = projectRepository.findById(in.getProjectId())
                .orElseThrow(() -> new IllegalArgumentException("Project not found: " + in.getProjectId()));
            t.setProject(p);
        } else if (in.getProjectId() == null) {
            t.setProject(null);
        }

        return taskRepository.save(t);
    }

    /** Cancella un task */
    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }

    /** Task del destinatario */
    public List<Task> findByUser(Long recipientId) {
        return taskRepository.findByUser_Id(recipientId);
    }

    /** Task creati da un utente */
    public List<Task> findByCreator(Long creatorId) {
        return taskRepository.findByCreator_Id(creatorId);
    }

    /** Task di un progetto */
    public List<Task> findByProject(Long projectId) {
        return taskRepository.findByProject_Id(projectId);
    }

    /** Task in uno specifico stato */
    public List<Task> findByState(String state) {
        return taskRepository.findByState(state);
    }

    /** Task di un destinatario in uno stato */
    public List<Task> findByUserAndState(Long recipientId, String state) {
        return taskRepository.findByUser_IdAndState(recipientId, state);
    }

    /** Task di un progetto in uno stato */
    public List<Task> findByProjectAndState(Long projectId, String state) {
        return taskRepository.findByProject_IdAndState(projectId, state);
    }
    
    /**
     * Converte un Task JPA in TaskDTO per l’API
     */
    public TaskDTO toDTO(Task t) {
        Long projId = t.getProject() != null ? t.getProject().getId() : null;
        String projName = t.getProject() != null ? t.getProject().getName() : null;
        String creatorNumber = t.getCreator().getNumber();
        return new TaskDTO(
            t.getId(),
            t.getUser().getId(),
            t.getUser().getUsername(),
            t.getCreator().getId(),
            t.getCreator().getUsername(),
            creatorNumber,
            t.getInsertDate(),
            t.getPreviousEndDate(),
            t.getTitle(),
            t.getDescription(),
            t.getState(),
            projId,
            projName
        );
    }

    /** Esempio: restituisci già i DTO */
    public List<TaskDTO> findAllDTO() {
        return findAll().stream()
                        .map(this::toDTO)
                        .collect(Collectors.toList());
    }

    public List<TaskDTO> findByUserDTO(Long recipientId) {
        return findByUser(recipientId).stream()
                                      .map(this::toDTO)
                                      .collect(Collectors.toList());
    }
    
    public List<TaskDTO> findByProjectDTO(Long projectId) {
        return taskRepository
                 .findByProject_Id(projectId)
                 .stream()
                 .map(this::toDTO)
                 .toList();
    }
}
