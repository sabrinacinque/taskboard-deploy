package com.sabrina.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sabrina.entities.Task;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByUser_Id(Long recipientId);
    List<Task> findByCreator_Id(Long creatorId);
    List<Task> findByProject_Id(Long projectId);
    List<Task> findByState(String state);
    List<Task> findByUser_IdAndState(Long recipientId, String state);
    List<Task> findByProject_IdAndState(Long projectId, String state);
}
