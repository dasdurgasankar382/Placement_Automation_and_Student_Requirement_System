package com.college.project.PlacementAutomationandStudentRequirementSystem.application.service.impl;

import com.college.project.PlacementAutomationandStudentRequirementSystem.application.dto.ApplicationRequestDto;
import com.college.project.PlacementAutomationandStudentRequirementSystem.application.dto.ApplicationSummaryDto;
import com.college.project.PlacementAutomationandStudentRequirementSystem.application.dto.UpdateStatusRequestDto;
import com.college.project.PlacementAutomationandStudentRequirementSystem.application.entity.Application;
import com.college.project.PlacementAutomationandStudentRequirementSystem.application.entity.util.ApplicationStatus;
import com.college.project.PlacementAutomationandStudentRequirementSystem.application.repository.ApplicationRepository;
import com.college.project.PlacementAutomationandStudentRequirementSystem.application.service.ApplicationService;
import com.college.project.PlacementAutomationandStudentRequirementSystem.exception.ResourceAlreadyExistsException;
import com.college.project.PlacementAutomationandStudentRequirementSystem.exception.ResourceNotFoundException;
import com.college.project.PlacementAutomationandStudentRequirementSystem.job.entity.Job;
import com.college.project.PlacementAutomationandStudentRequirementSystem.job.repository.JobRepository;
import com.college.project.PlacementAutomationandStudentRequirementSystem.security.AuthUtil;
import com.college.project.PlacementAutomationandStudentRequirementSystem.user.entity.User;
import com.college.project.PlacementAutomationandStudentRequirementSystem.user.repository.UserRepository;
import com.college.project.PlacementAutomationandStudentRequirementSystem.util.ApiResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ApplicationServiceImpl implements ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    private final JobRepository jobRepository;
    private final AuthUtil authUtil;

    //copy from gpt
    private static final Map<ApplicationStatus, List<ApplicationStatus>> allowedTransitions = Map.of(
            ApplicationStatus.APPLIED, List.of(ApplicationStatus.WITHDRAWN, ApplicationStatus.SHORTLISTED, ApplicationStatus.REJECTED),
            ApplicationStatus.SHORTLISTED, List.of(ApplicationStatus.WITHDRAWN, ApplicationStatus.SELECTED, ApplicationStatus.REJECTED)
    );

    @Override
    @Transactional
    public ApiResponse<?> createApplication(ApplicationRequestDto applicationRequestDto) {

        // 1. get logged-in user{STUDENT}  (get student from dto for now)
        User student = userRepository.findById(applicationRequestDto.getStudentId())
                .orElseThrow(() -> new ResourceNotFoundException("User not exists"));
        // 2. get job
        Job job = jobRepository.findById(applicationRequestDto.getJobId())
                .orElseThrow(() -> new ResourceNotFoundException("Job not exists"));
        // 3. duplicate apply
        boolean exists = applicationRepository.existsByStudentAndJob(student, job);
        if (exists) {
            throw new ResourceNotFoundException("Application already exists");
        }
        // 4. create new application
        Application application = new Application();
        application.setStudent(student);
        application.setJob(job);
        application.setStatus(ApplicationStatus.APPLIED);
        applicationRepository.save(application);
        return new ApiResponse<>("success", null);
    }

    @Override
    public ApiResponse<?> updateApplicationStatus(UUID id, UpdateStatusRequestDto updateStatusRequestDto) {
        Application application = applicationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Application not exists"));
        validateStatusTransition(application, updateStatusRequestDto.getApplicationStatus());

        application.setStatus(updateStatusRequestDto.getApplicationStatus());

        applicationRepository.save(application);

        return new ApiResponse<>("Updated successfully", Map.of("status", application.getStatus(),
                "allowedStatus", getAllowedStatus(application.getStatus())));
    }

    @Override
    public ApiResponse<?> widhdrawApplication(UUID id) {
        return null;
    }

    @Override
    public ApiResponse<List<ApplicationSummaryDto>> getAllApplications() {
        List<Application> applications = applicationRepository.findAll();
        List<ApplicationSummaryDto> dtoList = applications.stream()
                .map(application -> {
                    ApplicationSummaryDto dto = modelMapper.map(application, ApplicationSummaryDto.class);
                    dto.setAppliedAt(application.getCreatedAt());
                    dto.setStudentName(application.getStudent().getStudent().getName());
                    dto.setJobTitle(application.getJob().getRole());
                    return dto;
                })
                .toList();

        return new ApiResponse<>("Application fetch successfully", dtoList);
    }

    @Override
    public ApiResponse<Integer> getTotalApplications() {
        Long currentUserId = authUtil.getCurrentUserId();
        User currentUser = userRepository.findById(currentUserId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        
        int totalApplications = applicationRepository.countByStudent(currentUser);
        return new ApiResponse<>("Total applications fetched successfully", totalApplications);
    }

    @Override
    public ApiResponse<Integer> getTotalInterviewsScheduled() {
        Long currentUserId = authUtil.getCurrentUserId();
        User currentUser = userRepository.findById(currentUserId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        
        int interviewsScheduled = applicationRepository.countByStudentAndStatus(currentUser, ApplicationStatus.SHORTLISTED);
        return new ApiResponse<>("Interviews scheduled fetched successfully", interviewsScheduled);
    }

    @Override
    public ApiResponse<Integer> getTotalOffersReceived() {
        Long currentUserId = authUtil.getCurrentUserId();
        User currentUser = userRepository.findById(currentUserId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        
        int offersReceived = applicationRepository.countByStudentAndStatus(currentUser, ApplicationStatus.SELECTED);
        return new ApiResponse<>("Offers received fetched successfully", offersReceived);
    }


    //  HELPER METHODS
    private List<ApplicationStatus> getAllowedStatus(ApplicationStatus status) {
        return allowedTransitions.getOrDefault(status, List.of());
//        if (role == Role.Student)
    }

    // 🔥 validation method copy from gpt

    private void validateStatusTransition(Application app, ApplicationStatus newStatus) {

        ApplicationStatus current = app.getStatus();

        List<ApplicationStatus> allowed = allowedTransitions.get(current);

        if (allowed == null || !allowed.contains(newStatus)) {
            throw new ResourceAlreadyExistsException("Invalid status transition");
        }
    }
}
