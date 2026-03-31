package com.college.project.PlacementAutomationandStudentRequirementSystem.application.service;

import com.college.project.PlacementAutomationandStudentRequirementSystem.application.dto.ApplicationRequestDto;
import com.college.project.PlacementAutomationandStudentRequirementSystem.application.dto.ApplicationSummaryDto;
import com.college.project.PlacementAutomationandStudentRequirementSystem.application.dto.UpdateStatusRequestDto;
import com.college.project.PlacementAutomationandStudentRequirementSystem.util.ApiResponse;

import java.util.List;
import java.util.UUID;

public interface ApplicationService {
    ApiResponse<?> createApplication(ApplicationRequestDto applicationRequestDto);

    ApiResponse<List<ApplicationSummaryDto>> getAllApplications();

    ApiResponse<?> updateApplicationStatus(UUID id, UpdateStatusRequestDto updateStatusRequestDto);

    ApiResponse<?> widhdrawApplication(UUID id);

    ApiResponse<Integer> getTotalApplications();

    ApiResponse<Integer> getTotalInterviewsScheduled();

    ApiResponse<Integer> getTotalOffersReceived();
}
