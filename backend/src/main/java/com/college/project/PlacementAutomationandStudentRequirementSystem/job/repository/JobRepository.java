package com.college.project.PlacementAutomationandStudentRequirementSystem.job.repository;

import com.college.project.PlacementAutomationandStudentRequirementSystem.company.dto.CompanyJobsResponseDto;
import com.college.project.PlacementAutomationandStudentRequirementSystem.job.dto.JobResponseDto;
import com.college.project.PlacementAutomationandStudentRequirementSystem.job.entity.Job;
import com.college.project.PlacementAutomationandStudentRequirementSystem.job.entity.util.JobStatus;
import com.college.project.PlacementAutomationandStudentRequirementSystem.student.dto.JobsForStudentsDto;
import com.college.project.PlacementAutomationandStudentRequirementSystem.student.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public interface JobRepository extends JpaRepository<Job, UUID> {
    boolean existsByRoleAndDeadline(String role, LocalDate deadline);

    List<JobResponseDto> findByCompanyIdAndJobStatus(UUID companyId, JobStatus jobStatus);

    List<Job> findAllByJobStatus(JobStatus jobStatus);

    @Query("SELECT new com.college.project.PlacementAutomationandStudentRequirementSystem.job.dto.JobResponseDto(" +
            "j.id, j.role, j.salary, j.skills, j.description, j.deadline ,j.jobStatus) " +
            "FROM Job j WHERE j.company.id = :companyId")
    List<JobResponseDto> findAllByCompanyId(UUID companyId);

    @Query("""
SELECT DISTINCT new com.college.project.PlacementAutomationandStudentRequirementSystem.student.dto.JobsForStudentsDto(
    new com.college.project.PlacementAutomationandStudentRequirementSystem.job.dto.JobResponseDto(
        j.id, j.role, j.salary, j.skills, j.description, j.deadline, j.jobStatus
    ),
    c.name,
    COALESCE(a.status, 'NOT_APPLIED')
)
FROM Job j
JOIN j.company c
LEFT JOIN Application a
    ON a.job.id = j.id AND a.student.id = :studentId
WHERE j.jobStatus = 'open'
AND j.deadline >= CURRENT_DATE
""")
    List<JobsForStudentsDto> findJobsForStudent(UUID studentId);
}