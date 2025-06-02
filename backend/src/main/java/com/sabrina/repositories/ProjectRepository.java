package com.sabrina.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.sabrina.entities.Project;

@Repository
public interface ProjectRepository extends JpaRepository<Project,Long> {

	List<Project> findByMembers_User_Id(Long userId);

}
