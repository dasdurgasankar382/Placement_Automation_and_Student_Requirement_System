package com.college.project.PlacementAutomationandStudentRequirementSystem.application.repository;

import com.college.project.PlacementAutomationandStudentRequirementSystem.application.entity.Application;
import com.college.project.PlacementAutomationandStudentRequirementSystem.application.entity.util.ApplicationStatus;
import com.college.project.PlacementAutomationandStudentRequirementSystem.job.entity.Job;
import com.college.project.PlacementAutomationandStudentRequirementSystem.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface ApplicationRepository extends JpaRepository<Application, UUID> {
    Optional<Application> findByJobId(UUID jobId);

    boolean existsByStudentAndJob(User student, Job job);

    int countByStudent(User currentUser);

    int countByStudentAndStatus(User currentUser, ApplicationStatus applicationStatus);
}