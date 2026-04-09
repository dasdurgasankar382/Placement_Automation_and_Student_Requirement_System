package com.college.project.PlacementAutomationandStudentRequirementSystem.application.repository;

import com.college.project.PlacementAutomationandStudentRequirementSystem.application.dto.MyApplicationDto;
import com.college.project.PlacementAutomationandStudentRequirementSystem.application.dto.StudentDashboardDto;
import com.college.project.PlacementAutomationandStudentRequirementSystem.application.entity.Application;
import com.college.project.PlacementAutomationandStudentRequirementSystem.application.entity.util.ApplicationStatus;
import com.college.project.PlacementAutomationandStudentRequirementSystem.job.entity.Job;
import com.college.project.PlacementAutomationandStudentRequirementSystem.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ApplicationRepository extends JpaRepository<Application, UUID> {
    Optional<Application> findByJobId(UUID jobId);

    boolean existsByStudentAndJob(User student, Job job);

    List<Application> findByStudent(User currentUser);

    List<Application> findByStudentAndStatus(User currentUser, ApplicationStatus applicationStatus);

    @Query("""
            
                        SELECT new com.college.project.PlacementAutomationandStudentRequirementSystem.application.dto.StudentDashboardDto(
                COUNT(a),
                COALESCE(SUM(CASE WHEN a.status = 'SHORTLISTED' THEN 1 ELSE 0 END), 0),
                COALESCE(SUM(CASE WHEN a.status = 'SELECTED' THEN 1 ELSE 0 END), 0)
            )
            FROM Application a
            WHERE a.student = :student
            """)
    StudentDashboardDto getDashboardStats(@Param("student") User student);
    @Query("""
SELECT new com.college.project.PlacementAutomationandStudentRequirementSystem.application.dto.MyApplicationDto(
    a.id,
    j.id,
    c.name,
    j.role,
    a.status,
    a.createdAt
)
FROM Application a
JOIN a.job j
JOIN j.company c
JOIN a.student u
WHERE u.id = :studentId
""")
    List<MyApplicationDto> findByUserId(@Param("studentId") UUID studentId);
}