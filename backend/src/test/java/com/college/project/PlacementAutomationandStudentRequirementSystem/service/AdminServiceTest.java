package com.college.project.PlacementAutomationandStudentRequirementSystem.service;

import com.college.project.PlacementAutomationandStudentRequirementSystem.admin.dto.AdminResponseDto;
import com.college.project.PlacementAutomationandStudentRequirementSystem.admin.service.impl.AdminServiceImpl;
import com.college.project.PlacementAutomationandStudentRequirementSystem.company.repository.CompanyRepository;
import com.college.project.PlacementAutomationandStudentRequirementSystem.job.entity.util.JobStatus;
import com.college.project.PlacementAutomationandStudentRequirementSystem.job.repository.JobRepository;
import com.college.project.PlacementAutomationandStudentRequirementSystem.user.repository.UserRepository;
import com.college.project.PlacementAutomationandStudentRequirementSystem.util.ApiResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.modelmapper.ModelMapper;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AdminServiceTest {

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

    @BeforeEach
    void setUp() {
        // Reset mocks before each test
        reset(userRepository, companyRepository, jobRepository, modelMapper);
    }

    @Test
    void testGetProfile_Success() {
        // Given
        Long expectedTotalUsers = 100L;
        Long expectedTotalActiveUsers = 80L;
        Long expectedTotalRegisteredCompany = 25L;
        Long expectedActiveJobs = 15L;

        when(userRepository.count()).thenReturn(expectedTotalUsers);
        when(userRepository.countByIsActive()).thenReturn(expectedTotalActiveUsers);
        when(companyRepository.countByRoleName()).thenReturn(expectedTotalRegisteredCompany);
        when(jobRepository.countByJobStatus(JobStatus.OPEN)).thenReturn(expectedActiveJobs);

        // When
        ApiResponse<?> response = adminService.getProfile();

        // Then
        assertNotNull(response);
        assertTrue(response.isSuccess());
        assertEquals("Admin profile retrieved successfully", response.getMessage());
        assertNotNull(response.getData());
        assertNotNull(response.getTimestamp());

        // Verify the response data
        AdminResponseDto adminResponse = (AdminResponseDto) response.getData();
        assertEquals(expectedTotalUsers, adminResponse.getTotalUsers());
        assertEquals(expectedActiveJobs, adminResponse.getActiveJobs());
        assertEquals(expectedTotalRegisteredCompany, adminResponse.getTotalRegisteredCompany());
        assertEquals("Admin", adminResponse.getAdminName());

        // Verify repository methods were called
        verify(userRepository, times(1)).count();
        verify(userRepository, times(1)).countByIsActive();
        verify(companyRepository, times(1)).countByRoleName();
        verify(jobRepository, times(1)).countByJobStatus(JobStatus.OPEN);
    }

    @Test
    void testGetProfile_ZeroValues() {
        // Given
        when(userRepository.count()).thenReturn(0L);
        when(userRepository.countByIsActive()).thenReturn(0L);
        when(companyRepository.countByRoleName()).thenReturn(0L);
        when(jobRepository.countByJobStatus(JobStatus.OPEN)).thenReturn(0L);

        // When
        ApiResponse<?> response = adminService.getProfile();

        // Then
        assertNotNull(response);
        assertTrue(response.isSuccess());
        assertEquals("Admin profile retrieved successfully", response.getMessage());

        AdminResponseDto adminResponse = (AdminResponseDto) response.getData();
        assertEquals(0L, adminResponse.getTotalUsers());
        assertEquals(0L, adminResponse.getActiveJobs());
        assertEquals(0L, adminResponse.getTotalRegisteredCompany());
        assertEquals("Admin", adminResponse.getAdminName());

        // Verify repository methods were called
        verify(userRepository, times(1)).count();
        verify(userRepository, times(1)).countByIsActive();
        verify(companyRepository, times(1)).countByRoleName();
        verify(jobRepository, times(1)).countByJobStatus(JobStatus.OPEN);
    }

    @Test
    void testGetProfile_LargeValues() {
        // Given
        Long largeUsers = 1000000L;
        Long largeActiveUsers = 800000L;
        Long largeCompanies = 5000L;
        Long largeJobs = 10000L;

        when(userRepository.count()).thenReturn(largeUsers);
        when(userRepository.countByIsActive()).thenReturn(largeActiveUsers);
        when(companyRepository.countByRoleName()).thenReturn(largeCompanies);
        when(jobRepository.countByJobStatus(JobStatus.OPEN)).thenReturn(largeJobs);

        // When
        ApiResponse<?> response = adminService.getProfile();

        // Then
        assertNotNull(response);
        assertTrue(response.isSuccess());

        AdminResponseDto adminResponse = (AdminResponseDto) response.getData();
        assertEquals(largeUsers, adminResponse.getTotalUsers());
        assertEquals(largeJobs, adminResponse.getActiveJobs());
        assertEquals(largeCompanies, adminResponse.getTotalRegisteredCompany());
        assertEquals("Admin", adminResponse.getAdminName());

        // Verify repository methods were called
        verify(userRepository, times(1)).count();
        verify(userRepository, times(1)).countByIsActive();
        verify(companyRepository, times(1)).countByRoleName();
        verify(jobRepository, times(1)).countByJobStatus(JobStatus.OPEN);
    }

    @Test
    void testGetProfile_ResponseStructure() {
        // Given
        when(userRepository.count()).thenReturn(50L);
        when(userRepository.countByIsActive()).thenReturn(40L);
        when(companyRepository.countByRoleName()).thenReturn(10L);
        when(jobRepository.countByJobStatus(JobStatus.OPEN)).thenReturn(5L);

        // When
        ApiResponse<?> response = adminService.getProfile();

        // Then
        assertNotNull(response);
        assertTrue(response.isSuccess());
        assertNotNull(response.getMessage());
        assertNotNull(response.getData());
        assertNotNull(response.getTimestamp());

        // Verify response structure
        assertInstanceOf(AdminResponseDto.class, response.getData());
        assertTrue(response.getTimestamp() instanceof java.time.LocalDateTime);
    }
}
