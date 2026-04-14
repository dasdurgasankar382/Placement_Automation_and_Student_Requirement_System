package com.college.project.PlacementAutomationandStudentRequirementSystem.company.repository;

import com.college.project.PlacementAutomationandStudentRequirementSystem.company.entity.Company;
import com.college.project.PlacementAutomationandStudentRequirementSystem.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;
import java.util.UUID;

public interface CompanyRepository extends JpaRepository<Company, UUID> {

    boolean existsByNameAndWebsite(String name, String website);

    Optional<Company> findByUser(User user);

    @Query(
            """
            SELECT COUNT(c)
            FROM Company c
            """
    )
    Long countByRoleName();
}