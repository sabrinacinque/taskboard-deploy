// src/main/java/com/sabrina/controllers/TaskController.java
package com.sabrina.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
 
import com.sabrina.models.InputTask;
import com.sabrina.models.TaskDTO;
import com.sabrina.services.SessionService;
import com.sabrina.services.TaskService;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.http.HttpStatus;

@RestController
@RequestMapping("/api/v1/tasks")
public class TaskController {

    @Autowired private TaskService taskService;
    @Autowired private SessionService sessionService;

    /** 
     * GET /api/v1/tasks?userId=…&projectId=…
     */
    @GetMapping
    public List<TaskDTO> getAll(
        @RequestParam(required = false) Long userId,
        @RequestParam(required = false) Long projectId
    ) {
        if (projectId != null) {
            return taskService.findByProjectDTO(projectId);
        }
        if (userId != null) {
            return taskService.findByUserDTO(userId);
        }
        return taskService.findAllDTO();
    }

    /** POST /api/v1/tasks/create */
    @PostMapping("/create")
    public TaskDTO create(
      @RequestHeader("Authorization") String bearer,
      @RequestBody InputTask input
    ) {
      Long creatorId = sessionService.validateAndGetUserIdFromToken(bearer);
      var t = taskService.createTask(input, creatorId);
      return taskService.toDTO(t);
    }

    /** PUT /api/v1/tasks/update/{id} */
    @PutMapping("/update/{id}")
    public TaskDTO update(
        @PathVariable Long id,
        @RequestBody InputTask in
    ) {
        var t = taskService.updateTask(id, in);
        return taskService.toDTO(t);
    }

    /** DELETE /api/v1/tasks/delete/{id} */
    @DeleteMapping("/delete/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        taskService.deleteTask(id);
    }
}
