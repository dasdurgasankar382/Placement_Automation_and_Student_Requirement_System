package com.college.project.PlacementAutomationandStudentRequirementSystem.service;

import com.college.project.PlacementAutomationandStudentRequirementSystem.admin.dto.AdminResponseDto;
import com.college.project.PlacementAutomationandStudentRequirementSystem.admin.service.impl.AdminServiceImpl;
import com.college.project.PlacementAutomationandStudentRequirementSystem.company.repository.CompanyRepository;
import com.college.project.PlacementAutomationandStudentRequirementSystem.job.entity.util.JobStatus;
import com.college.project.PlacementAutomationandStudentRequirementSystem.job.repository.JobRepository;
import com.college.project.PlacementAutomationandStudentRequirementSystem.user.repository.UserRepository;
import com.college.project.PlacementAutomationandStudentRequirementSystem.util.ApiResponse;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.modelmapper.ModelMapper;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TestRunner {

    @Mock
    private UserRepository userRepository;

    @Mock
    private CompanyRepository companyRepository;

    @Mock
    private JobRepository jobRepository;

    @Mock
    private ModelMapper modelMapper;

    @InjectMocks
    private AdminServiceImpl adminService;

    @Test
    void demonstrateTestOutput() {
        System.out.println("=== RUNNING TEST TO SHOW OUTPUT ===");
        
        // Given - setup mock data
        Long totalUsers = 100L;
        Long activeUsers = 80L;
        Long totalCompanies = 25L;
        Long activeJobs = 15L;

        when(userRepository.count()).thenReturn(totalUsers);
        when(userRepository.countByIsActive()).thenReturn(activeUsers);
        when(companyRepository.countByRoleName()).thenReturn(totalCompanies);
        when(jobRepository.countByJobStatus(JobStatus.OPEN)).thenReturn(activeJobs);

        System.out.println("Mock data setup:");
        System.out.println("- Total Users: " + totalUsers);
        System.out.println("- Active Users: " + activeUsers);
        System.out.println("- Total Companies: " + totalCompanies);
        System.out.println("- Active Jobs: " + activeJobs);

        // When - call the service method
        ApiResponse<?> response = adminService.getProfile();

        System.out.println("\n=== SERVICE RESPONSE ===");
        System.out.println("Response Success: " + response.isSuccess());
        System.out.println("Response Message: " + response.getMessage());
        System.out.println("Response Timestamp: " + response.getTimestamp());

        // Then - examine the response data
        if (response.getData() instanceof AdminResponseDto) {
            AdminResponseDto adminResponse = (AdminResponseDto) response.getData();
            
            System.out.println("\n=== ADMIN RESPONSE DATA ===");
            System.out.println("Total Users: " + adminResponse.getTotalUsers());
            System.out.println("Active Jobs: " + adminResponse.getActiveJobs());
            System.out.println("Total Registered Companies: " + adminResponse.getTotalRegisteredCompany());
            System.out.println("Admin Name: " + adminResponse.getAdminName());
            
            // Assertions to verify the data
            assertEquals(totalUsers, adminResponse.getTotalUsers());
            assertEquals(activeJobs, adminResponse.getActiveJobs());
            assertEquals(totalCompanies, adminResponse.getTotalRegisteredCompany());
            assertEquals("Admin", adminResponse.getAdminName());
            
            System.out.println("\n=== ASSERTIONS PASSED ===");
            System.out.println("✓ Total users match expected value");
            System.out.println("✓ Active jobs match expected value");
            System.out.println("✓ Total companies match expected value");
            System.out.println("✓ Admin name is correct");
        }

        System.out.println("\n=== METHOD CALLS VERIFICATION ===");
        verify(userRepository, times(1)).count();
        verify(userRepository, times(1)).countByIsActive();
        verify(companyRepository, times(1)).countByRoleName();
        verify(jobRepository, times(1)).countByJobStatus(JobStatus.OPEN);
        
        System.out.println("✓ All repository methods called exactly once");
        System.out.println("=== TEST COMPLETED SUCCESSFULLY ===");
    }

    @Test
    void demonstrateFailureScenario() {
        System.out.println("\n=== RUNNING FAILURE SCENARIO TEST ===");
        
        // Given - setup mock data with zero values
        when(userRepository.count()).thenReturn(0L);
        when(userRepository.countByIsActive()).thenReturn(0L);
        when(companyRepository.countByRoleName()).thenReturn(0L);
        when(jobRepository.countByJobStatus(JobStatus.OPEN)).thenReturn(0L);

        System.out.println("Mock data setup (all zeros):");
        System.out.println("- Total Users: 0");
        System.out.println("- Active Users: 0");
        System.out.println("- Total Companies: 0");
        System.out.println("- Active Jobs: 0");

        // When
        ApiResponse<?> response = adminService.getProfile();

        System.out.println("\n=== SERVICE RESPONSE (ZERO DATA) ===");
        System.out.println("Response Success: " + response.isSuccess());
        System.out.println("Response Message: " + response.getMessage());

        if (response.getData() instanceof AdminResponseDto) {
            AdminResponseDto adminResponse = (AdminResponseDto) response.getData();
            
            System.out.println("\n=== ADMIN RESPONSE DATA (ZEROS) ===");
            System.out.println("Total Users: " + adminResponse.getTotalUsers());
            System.out.println("Active Jobs: " + adminResponse.getActiveJobs());
            System.out.println("Total Registered Companies: " + adminResponse.getTotalRegisteredCompany());
            System.out.println("Admin Name: " + adminResponse.getAdminName());
            
            // Verify zero values
            assertEquals(0L, adminResponse.getTotalUsers());
            assertEquals(0L, adminResponse.getActiveJobs());
            assertEquals(0L, adminResponse.getTotalRegisteredCompany());
            
            System.out.println("✓ All values correctly show 0");
        }
        
        System.out.println("=== ZERO DATA TEST COMPLETED SUCCESSFULLY ===");
    }
}
