package com.college.project.PlacementAutomationandStudentRequirementSystem.company.repository;

import com.college.project.PlacementAutomationandStudentRequirementSystem.company.entity.Company;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface CompanyRepository extends JpaRepository<Company, UUID> {

    boolean existsByNameAndWebsite(String name, String website);
}