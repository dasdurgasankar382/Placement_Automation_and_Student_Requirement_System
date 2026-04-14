package com.college.project.PlacementAutomationandStudentRequirementSystem.company.service.impl;

import com.college.project.PlacementAutomationandStudentRequirementSystem.company.dto.CompanyJobsResponseDto;
import com.college.project.PlacementAutomationandStudentRequirementSystem.company.dto.CompanyRequestDto;
import com.college.project.PlacementAutomationandStudentRequirementSystem.company.dto.CompanyResponseDto;
import com.college.project.PlacementAutomationandStudentRequirementSystem.company.entity.Company;
import com.college.project.PlacementAutomationandStudentRequirementSystem.company.repository.CompanyRepository;
import com.college.project.PlacementAutomationandStudentRequirementSystem.company.service.CompanyService;
import com.college.project.PlacementAutomationandStudentRequirementSystem.exception.ResourceAlreadyExistsException;
import com.college.project.PlacementAutomationandStudentRequirementSystem.exception.ResourceNotFoundException;
import com.college.project.PlacementAutomationandStudentRequirementSystem.job.dto.JobResponseDto;
import com.college.project.PlacementAutomationandStudentRequirementSystem.job.entity.util.JobStatus;
import com.college.project.PlacementAutomationandStudentRequirementSystem.job.repository.JobRepository;
import com.college.project.PlacementAutomationandStudentRequirementSystem.security.AuthUtil;
import com.college.project.PlacementAutomationandStudentRequirementSystem.user.entity.User;
import com.college.project.PlacementAutomationandStudentRequirementSystem.user.repository.UserRepository;
import com.college.project.PlacementAutomationandStudentRequirementSystem.util.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CompanyServiceImpl implements CompanyService {

    private final CompanyRepository companyRepository;
    private final JobRepository jobRepository;
    private final AuthUtil authUtil;
    private final ModelMapper modelMapper;
    private final UserRepository userRepository;

    @Override
    public ApiResponse<?> addCompany(CompanyRequestDto companyRequestDto) {

        if (companyRepository.existsByNameAndWebsite(companyRequestDto.getName(),companyRequestDto.getWebsite())){
            throw new ResourceAlreadyExistsException("already company registered");
        }
//        get current userId from token
        UUID userId = authUtil.getCurrentUserId();
        User user = userRepository.findById(userId).orElseThrow(
                ()->new ResourceNotFoundException("User not exists")
        );
        Company company = modelMapper.map(companyRequestDto, Company.class);
        company.setUser(user);
        companyRepository.save(company);
        return new ApiResponse<>("Company created successfully",null);
    }

    @Override
    public List<CompanyResponseDto> getAllCompanies() {
        List<Company> companies = companyRepository.findAll();
        return companies.stream()
                .map(company->modelMapper.map(company, CompanyResponseDto.class))
                .toList();
    }

    @Override
    public CompanyResponseDto getCompanyById() {
        UUID recruiterId = authUtil.getCurrentUserId();
        User user = userRepository.findById(recruiterId).orElseThrow(
                ()->new ResourceNotFoundException("User not exists")
        );
        Company company = companyRepository.findByUser(user)
                .orElseThrow(()->new ResourceNotFoundException("Company not found"));
        return modelMapper.map(company, CompanyResponseDto.class);
    }

    @Override
    public CompanyJobsResponseDto getCompanyUnderJobs(UUID companyId) {
        UUID userId = authUtil.getCurrentUserId();
        userRepository.findById(userId).orElseThrow(
                ()->new ResourceNotFoundException("User not exists")
        );
        // can add if recruiter and student have profile or not
        Company company = companyRepository.findById(companyId)
                .orElseThrow(()->new ResourceNotFoundException("Company not found"));
        List<JobResponseDto> jobs =
                jobRepository.findByCompanyIdAndJobStatus(companyId, JobStatus.open);
        CompanyJobsResponseDto dto = new CompanyJobsResponseDto();
        dto.setCompanyId(companyId);
        dto.setCompanyName(company.getName());
        dto.setJobs(jobs);
        return dto;
    }
}
