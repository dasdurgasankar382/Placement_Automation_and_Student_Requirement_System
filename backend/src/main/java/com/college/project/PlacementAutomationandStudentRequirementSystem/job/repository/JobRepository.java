package com.college.project.PlacementAutomationandStudentRequirementSystem.job.repository;

import com.college.project.PlacementAutomationandStudentRequirementSystem.job.entity.Job;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.UUID;

public interface JobRepository extends JpaRepository<Job, UUID> {
    boolean existsByRoleAndDeadline(String role, LocalDate deadline);
}