package com.college.project.PlacementAutomationandStudentRequirementSystem.application.service.impl;

import com.college.project.PlacementAutomationandStudentRequirementSystem.application.dto.*;
import com.college.project.PlacementAutomationandStudentRequirementSystem.application.entity.Application;
import com.college.project.PlacementAutomationandStudentRequirementSystem.application.entity.util.ApplicationStatus;
import com.college.project.PlacementAutomationandStudentRequirementSystem.application.repository.ApplicationRepository;
import com.college.project.PlacementAutomationandStudentRequirementSystem.application.service.ApplicationService;
import com.college.project.PlacementAutomationandStudentRequirementSystem.exception.ResourceAlreadyExistsException;
import com.college.project.PlacementAutomationandStudentRequirementSystem.exception.ResourceNotFoundException;
import com.college.project.PlacementAutomationandStudentRequirementSystem.job.entity.Job;
import com.college.project.PlacementAutomationandStudentRequirementSystem.job.repository.JobRepository;
import com.college.project.PlacementAutomationandStudentRequirementSystem.security.AuthUtil;
import com.college.project.PlacementAutomationandStudentRequirementSystem.student.dto.ResumeResponseDto;
import com.college.project.PlacementAutomationandStudentRequirementSystem.student.entity.Student;
import com.college.project.PlacementAutomationandStudentRequirementSystem.student.entity.util.PdfDocument;
import com.college.project.PlacementAutomationandStudentRequirementSystem.student.repository.StudentRepository;
import com.college.project.PlacementAutomationandStudentRequirementSystem.user.entity.User;
import com.college.project.PlacementAutomationandStudentRequirementSystem.user.repository.UserRepository;
import com.college.project.PlacementAutomationandStudentRequirementSystem.util.ApiResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Base64;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ApplicationServiceImpl implements ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final UserRepository userRepository;
    private final StudentRepository studentRepository;
    private final ModelMapper modelMapper;
    private final JobRepository jobRepository;
    private final AuthUtil authUtil;

    //copy from gpt
    private static final Map<ApplicationStatus, List<ApplicationStatus>> allowedTransitions = Map.of(
            ApplicationStatus.APPLIED, List.of(ApplicationStatus.WITHDRAWN, ApplicationStatus.REVIEWED, ApplicationStatus.SHORTLISTED, ApplicationStatus.REJECTED),
            ApplicationStatus.REVIEWED, List.of(ApplicationStatus.WITHDRAWN, ApplicationStatus.SHORTLISTED, ApplicationStatus.REJECTED),
            ApplicationStatus.SHORTLISTED, List.of(ApplicationStatus.WITHDRAWN, ApplicationStatus.SELECTED, ApplicationStatus.REJECTED)
    );

    @Override
    @Transactional
    public ApiResponse<?> createApplication(UUID jobId) {

        // 1. get logged-in user{STUDENT}
        UUID currentUserId = authUtil.getCurrentUserId();
        User student = userRepository.findById(currentUserId)
                .orElseThrow(() -> new ResourceNotFoundException("User not exists"));
        // 2. get job
        Job job = jobRepository.findById(jobId)
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
    public ApiResponse<StudentDashboardDto> getStudentDashboard() {

        UUID currentUserId = authUtil.getCurrentUserId();

        User currentUser = userRepository.findById(currentUserId)
                .orElseThrow(() -> new ResourceNotFoundException("User not exist"));

        StudentDashboardDto dashboard = applicationRepository.getDashboardStats(currentUser);

        return new ApiResponse<>("Dashboard fetched", dashboard);
    }

    @Override
    public ApiResponse<List<MyApplicationDto>> getMyApplications() {
        UUID currentUserId = authUtil.getCurrentUserId();
        if (currentUserId == null) {
            throw new ResourceNotFoundException("User not found");
        }
        List<MyApplicationDto> dtoList = applicationRepository.findByUserId(currentUserId);

        return new ApiResponse<>("Applications fetched successfully", dtoList);
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
    @Transactional
    public ApiResponse<List<ApplicantDTO>> getAllApplicantsForJob(UUID jobId) {
        UUID recruiterId = authUtil.getCurrentUserId();
        
        // Get the recruiter's company
        User recruiter = userRepository.findById(recruiterId)
                .orElseThrow(() -> new ResourceNotFoundException("Recruiter not found"));
        
        // Get all applications for the specific job
        List<Application> applications = applicationRepository.findAllByJobId(jobId);
        List<ApplicantDTO> dtos = applications.stream().map(a -> {
            System.out.println(a.getJob().getRole());
            ApplicantDTO dto = new ApplicantDTO();
            dto.setApplicationId(a.getId());
            dto.setStudentId(a.getStudent().getStudent().getId());
            dto.setJobId(a.getJob().getId());
            dto.setJobRole(a.getJob().getRole());
            dto.setCompanyName(a.getJob().getCompany().getName());
            dto.setStudentName(a.getStudent().getStudent() != null ? a.getStudent().getStudent().getName() : null);
            dto.setEmail(a.getStudent().getEmail());
            dto.setResumeName(a.getStudent().getStudent() != null && a.getStudent().getStudent().getResume() != null ? a.getStudent().getStudent().getResume().getName() : null);
            dto.setSkills(a.getStudent().getStudent() != null ? a.getStudent().getStudent().getSkills() : null);
            dto.setApplicationStatus(a.getStatus().name());
            dto.setAppliedAt(a.getCreatedAt());
            return dto;
        }).toList();

        return new ApiResponse<>("Company applications fetched successfully", dtos);
    }

    @Override
    @Transactional
    public ApiResponse<?> getApplicantResume(UUID studentId) {

        Student student = studentRepository.findById(studentId).orElseThrow(()->
            new ResourceNotFoundException("Resume exist "));
        PdfDocument pdf = student.getResume();
        String base64 = Base64.getEncoder().encodeToString(pdf.getData());
        ResumeResponseDto resumeResponseDto = new ResumeResponseDto(
                pdf.getName(), pdf.getFileType(), base64
        );

        return new ApiResponse<>("Resume fetched successfully", resumeResponseDto);
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
