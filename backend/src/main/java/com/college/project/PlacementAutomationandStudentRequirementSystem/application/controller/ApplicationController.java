package com.college.project.PlacementAutomationandStudentRequirementSystem.application.controller;

import com.college.project.PlacementAutomationandStudentRequirementSystem.application.dto.*;
import com.college.project.PlacementAutomationandStudentRequirementSystem.application.dto.ApplicantDTO;
import com.college.project.PlacementAutomationandStudentRequirementSystem.application.service.impl.ApplicationServiceImpl;
import com.college.project.PlacementAutomationandStudentRequirementSystem.util.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@PreAuthorize("hasAnyRole('STUDENT', 'RECRUITER')")
@RestController
@RequestMapping("/applications")
@RequiredArgsConstructor
public class ApplicationController {

    private final ApplicationServiceImpl applicationService;

@PreAuthorize("hasRole('STUDENT')")
    @PostMapping("/{jobId}")    //STUDENT
    public ResponseEntity<ApiResponse<?>> applyJobApplication(@PathVariable UUID jobId) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(applicationService.createApplication(jobId));
    }

@PreAuthorize("hasRole('RECRUITER')")
    @PutMapping("/{id}/status") //RECRUITER
    public ResponseEntity<ApiResponse<?>> updateStatus(@PathVariable UUID id, @RequestBody UpdateStatusRequestDto updateStatusRequestDto) {
        return ResponseEntity.status(HttpStatus.ACCEPTED)
                .body(applicationService.updateApplicationStatus(id, updateStatusRequestDto));
    }
    //recruiter can see all applicants for specific posted job
    @PreAuthorize("hasRole('RECRUITER')")
    @GetMapping("/applicants/{jobId}")     //RECRUITER
    public ResponseEntity<ApiResponse<List<ApplicantDTO>>> getAllApplicantsForJob(@PathVariable UUID jobId) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(applicationService.getAllApplicantsForJob(jobId));
    }

@PreAuthorize("hasRole('ADMIN')")
    @GetMapping     //ADMIN
    public ResponseEntity<ApiResponse<List<ApplicationSummaryDto>>> getAllApplications() {
        return ResponseEntity.status(HttpStatus.OK)
                .body(applicationService.getAllApplications());
    }
@PreAuthorize("hasRole('STUDENT')")
        @DeleteMapping("/{id}")
        public ResponseEntity<ApiResponse<?>> withdrawApplication(@PathVariable UUID id){
            return ResponseEntity.status(HttpStatus.OK)
                    .body(applicationService.widhdrawApplication(id));
        }

    @PreAuthorize("hasRole('STUDENT')")
    @GetMapping("/student-dashboard")
    public ResponseEntity<ApiResponse<StudentDashboardDto>> getTotalApplications() {
        return ResponseEntity.status(HttpStatus.OK)
                .body(applicationService.getStudentDashboard());
    }
    @PreAuthorize("hasRole('STUDENT')")
    @GetMapping("/my-applications")
    public ResponseEntity<ApiResponse<List<MyApplicationDto>>> getMyApplications() {
        return ResponseEntity.status(HttpStatus.OK)
                .body(applicationService.getMyApplications());
    }
}
