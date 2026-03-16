package com.college.project.PlacementAutomationandStudentRequirementSystem.company.repository;

import com.college.project.PlacementAutomationandStudentRequirementSystem.company.entity.Company;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompanyRepository extends JpaRepository<Company, Long> {

    boolean existsByNameAndWebsite(String name, String website);
}