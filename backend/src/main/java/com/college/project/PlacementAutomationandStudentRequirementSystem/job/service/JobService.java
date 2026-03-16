package com.college.project.PlacementAutomationandStudentRequirementSystem.job.service;

import com.college.project.PlacementAutomationandStudentRequirementSystem.job.dto.JobRequestDto;
import com.college.project.PlacementAutomationandStudentRequirementSystem.job.dto.JobResponseDto;
import com.college.project.PlacementAutomationandStudentRequirementSystem.util.ApiResponse;

import java.util.List;
import java.util.UUID;

public interface JobService {
    ApiResponse<?> createJob(JobRequestDto jobRequestDto);

    ApiResponse<?> updateJobProfile(UUID id, JobRequestDto jobRequestDto);

    ApiResponse<?> deleteJob(UUID id);

    List<JobResponseDto> getAllJobs();

    JobResponseDto getJobById(UUID id);
}
