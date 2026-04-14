package com.college.project.PlacementAutomationandStudentRequirementSystem.admin.service.impl;

import com.college.project.PlacementAutomationandStudentRequirementSystem.admin.dto.AdminResponseDto;
import com.college.project.PlacementAutomationandStudentRequirementSystem.admin.dto.RoleRequestDto;
import com.college.project.PlacementAutomationandStudentRequirementSystem.admin.service.AdminService;
import com.college.project.PlacementAutomationandStudentRequirementSystem.company.repository.CompanyRepository;
import com.college.project.PlacementAutomationandStudentRequirementSystem.exception.ResourceNotFoundException;
import com.college.project.PlacementAutomationandStudentRequirementSystem.job.entity.util.JobStatus;
import com.college.project.PlacementAutomationandStudentRequirementSystem.job.repository.JobRepository;
import com.college.project.PlacementAutomationandStudentRequirementSystem.role.entity.Role;
import com.college.project.PlacementAutomationandStudentRequirementSystem.role.repository.RoleRepository;
import com.college.project.PlacementAutomationandStudentRequirementSystem.user.repository.UserRepository;
import com.college.project.PlacementAutomationandStudentRequirementSystem.util.ApiResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {

    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    private final CompanyRepository companyRepository;
    private final JobRepository jobRepository;

    @Override
    @Transactional
    public ApiResponse<?> getProfile() {
        // get total user
        Long totalUsers = userRepository.count();
        // active user count by is active = true
        Long totalActiveUsers = userRepository.countByIsActive();
        
        // get total registered companies
        Long totalRegisteredCompany = companyRepository.countByRoleName();
        
        // get active jobs count using existing method
        Long activeJobs = (long) jobRepository.findAllByJobStatus(JobStatus.open).size();
        
        // Create admin response DTO
        AdminResponseDto adminResponse = new AdminResponseDto(
            totalUsers, 
            activeJobs, 
            totalRegisteredCompany, 
            "Admin" // You might want to get actual admin name from security context
        );
        
        return new ApiResponse<>("Admin profile retrieved successfully", adminResponse);
    }
}
