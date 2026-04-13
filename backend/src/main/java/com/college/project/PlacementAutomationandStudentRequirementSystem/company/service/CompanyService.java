package com.college.project.PlacementAutomationandStudentRequirementSystem.company.service;


import com.college.project.PlacementAutomationandStudentRequirementSystem.company.dto.CompanyJobsResponseDto;
import com.college.project.PlacementAutomationandStudentRequirementSystem.company.dto.CompanyRequestDto;
import com.college.project.PlacementAutomationandStudentRequirementSystem.company.dto.CompanyResponseDto;
import com.college.project.PlacementAutomationandStudentRequirementSystem.util.ApiResponse;

import java.util.List;
import java.util.UUID;

public interface CompanyService {;

    List<CompanyResponseDto> getAllCompanies();

    ApiResponse<?> addCompany(CompanyRequestDto companyRequestDto);

    CompanyResponseDto getCompanyById();

    CompanyJobsResponseDto getCompanyUnderJobs(UUID companyId);
}
