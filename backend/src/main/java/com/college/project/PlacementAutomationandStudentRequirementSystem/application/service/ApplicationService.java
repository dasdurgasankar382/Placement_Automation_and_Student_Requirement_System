package com.college.project.PlacementAutomationandStudentRequirementSystem.application.service;

import com.college.project.PlacementAutomationandStudentRequirementSystem.application.dto.ApplicantDTO;
import com.college.project.PlacementAutomationandStudentRequirementSystem.application.dto.ApplicationSummaryDto;
import com.college.project.PlacementAutomationandStudentRequirementSystem.application.dto.MyApplicationDto;
import com.college.project.PlacementAutomationandStudentRequirementSystem.application.dto.StudentDashboardDto;
import com.college.project.PlacementAutomationandStudentRequirementSystem.application.dto.UpdateStatusRequestDto;
import com.college.project.PlacementAutomationandStudentRequirementSystem.util.ApiResponse;

import java.util.List;
import java.util.UUID;

public interface ApplicationService {
    ApiResponse<?> createApplication(UUID jobId);

    ApiResponse<List<ApplicationSummaryDto>> getAllApplications();

    ApiResponse<?> updateApplicationStatus(UUID id, UpdateStatusRequestDto updateStatusRequestDto);

    ApiResponse<?> widhdrawApplication(UUID id);

    ApiResponse<StudentDashboardDto> getStudentDashboard();

    ApiResponse<List<MyApplicationDto>> getMyApplications();

    ApiResponse<List<ApplicantDTO>> getAllApplicantsForJob(UUID jobId);
}
