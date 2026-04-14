package com.college.project.PlacementAutomationandStudentRequirementSystem.job.controller;

import com.college.project.PlacementAutomationandStudentRequirementSystem.job.dto.JobRequestDto;
import com.college.project.PlacementAutomationandStudentRequirementSystem.job.dto.JobResponseDto;
import com.college.project.PlacementAutomationandStudentRequirementSystem.job.service.impl.JobServiceImpl;
import com.college.project.PlacementAutomationandStudentRequirementSystem.util.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/jobs")
@RequiredArgsConstructor
public class JobController {
    private final JobServiceImpl jobService;

    @PreAuthorize("hasRole('RECRUITER')")
    @PostMapping
    public ResponseEntity<ApiResponse<?>> createJob(@RequestBody JobRequestDto jobRequestDto) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(jobService.createJob(jobRequestDto));
    }

    @PreAuthorize("hasRole('RECRUITER')")
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<?>> updateJob(@PathVariable UUID id, @RequestBody JobRequestDto jobRequestDto) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(jobService.updateJobProfile(id, jobRequestDto));
    }

    @PreAuthorize("hasRole('RECRUITER')")
    @PutMapping("/close-job/{id}")
    public ResponseEntity<ApiResponse<?>> changeJobStatus(@PathVariable UUID id) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(jobService.changeJobStatus(id));
    }

    @PreAuthorize("isAuthenticated()") // admin
    @GetMapping
    public ResponseEntity<List<JobResponseDto>> getAllJobs() {
        return ResponseEntity.status(HttpStatus.OK)
                .body(jobService.getAllJobs());
    }

    @PreAuthorize("isAuthenticated()")  //recruiter
    @GetMapping("/company-jobs")
    public ResponseEntity<ApiResponse<List<JobResponseDto>>> getAllJobsByCompany() {
        return ResponseEntity.status(HttpStatus.OK)
                .body(jobService.getAllJobsByCompany());
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/{id}")
    public ResponseEntity<JobResponseDto> getJobById(@PathVariable UUID id) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(jobService.getJobById(id));
    }

}
