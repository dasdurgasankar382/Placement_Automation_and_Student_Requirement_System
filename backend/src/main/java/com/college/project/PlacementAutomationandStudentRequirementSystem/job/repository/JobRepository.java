package com.college.project.PlacementAutomationandStudentRequirementSystem.job.repository;

import com.college.project.PlacementAutomationandStudentRequirementSystem.company.dto.CompanyJobsResponseDto;
import com.college.project.PlacementAutomationandStudentRequirementSystem.job.dto.JobResponseDto;
import com.college.project.PlacementAutomationandStudentRequirementSystem.job.entity.Job;
import com.college.project.PlacementAutomationandStudentRequirementSystem.job.entity.util.JobStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public interface JobRepository extends JpaRepository<Job, UUID> {
    boolean existsByRoleAndDeadline(String role, LocalDate deadline);

    List<JobResponseDto> findByCompanyIdAndJobStatus(Long companyId, JobStatus jobStatus);

    List<Job> findAllByJobStatus(JobStatus jobStatus);
}