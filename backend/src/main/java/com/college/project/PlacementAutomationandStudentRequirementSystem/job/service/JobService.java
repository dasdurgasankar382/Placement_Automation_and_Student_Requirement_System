package com.college.project.PlacementAutomationandStudentRequirementSystem.job.service;

import com.college.project.PlacementAutomationandStudentRequirementSystem.job.dto.AdminJobResponseDto;
import com.college.project.PlacementAutomationandStudentRequirementSystem.job.dto.JobRequestDto;
import com.college.project.PlacementAutomationandStudentRequirementSystem.job.dto.JobResponseDto;
import com.college.project.PlacementAutomationandStudentRequirementSystem.util.ApiResponse;

import java.util.List;
import java.util.UUID;

public interface JobService {
    //temp id
    ApiResponse<?> createJob(JobRequestDto jobRequestDto);

    ApiResponse<?> updateJobProfile(UUID id, JobRequestDto jobRequestDto);

    ApiResponse<?> changeJobStatus(UUID id);

    List<AdminJobResponseDto> getAllJobs();

    JobResponseDto getJobById(UUID id);

    ApiResponse<List<JobResponseDto>> getAllJobsByCompany();
}
