package com.sabrina.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sabrina.entities.ProjectMember;

@Repository
public interface ProjectMemberRepository extends JpaRepository<ProjectMember,Long> {
	  List<ProjectMember> findByProject_Id(Long projectId);
	  void deleteByProject_IdAndUser_Id(Long projectId, Long userId);
}
