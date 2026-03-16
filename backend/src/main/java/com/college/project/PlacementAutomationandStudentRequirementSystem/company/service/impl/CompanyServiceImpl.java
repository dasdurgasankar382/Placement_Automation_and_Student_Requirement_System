package com.college.project.PlacementAutomationandStudentRequirementSystem.company.service.impl;

import com.college.project.PlacementAutomationandStudentRequirementSystem.company.dto.CompanyJobsResponseDto;
import com.college.project.PlacementAutomationandStudentRequirementSystem.company.dto.CompanyRequestDto;
import com.college.project.PlacementAutomationandStudentRequirementSystem.company.dto.CompanyResponseDto;
import com.college.project.PlacementAutomationandStudentRequirementSystem.company.entity.Company;
import com.college.project.PlacementAutomationandStudentRequirementSystem.company.repository.CompanyRepository;
import com.college.project.PlacementAutomationandStudentRequirementSystem.company.service.CompanyService;
import com.college.project.PlacementAutomationandStudentRequirementSystem.exception.ResourceAlreadyExistsException;
import com.college.project.PlacementAutomationandStudentRequirementSystem.exception.ResourceNotFoundException;
import com.college.project.PlacementAutomationandStudentRequirementSystem.util.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CompanyServiceImpl implements CompanyService {

    private final CompanyRepository companyRepository;
    private final ModelMapper modelMapper;

    @Override
    public ApiResponse<?> addCompany(CompanyRequestDto companyRequestDto) {
        if (companyRepository.existsByNameAndWebsite(companyRequestDto.getName(),companyRequestDto.getWebsite())){
            throw new ResourceAlreadyExistsException("already company registered");
        }
        Company company = modelMapper.map(companyRequestDto, Company.class);
        companyRepository.save(company);
        return new ApiResponse<>("Success");
    }

    @Override
    public List<CompanyResponseDto> getAllCompanies() {
        List<Company> companies = companyRepository.findAll();
        return companies.stream()
                .map(company->modelMapper.map(company, CompanyResponseDto.class))
                .toList();
    }

    @Override
    public CompanyResponseDto getCompanyById(Long id) {
        Company company = companyRepository.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("Company not found"));
        return modelMapper.map(company, CompanyResponseDto.class);
    }

    @Override
    public CompanyJobsResponseDto getCompanyUnderJobs(Long companyId) {
        Company company = companyRepository.findById(companyId)
                .orElseThrow(()->new ResourceNotFoundException("Company not found"));

        return modelMapper.map(company, CompanyJobsResponseDto.class);
    }
}
