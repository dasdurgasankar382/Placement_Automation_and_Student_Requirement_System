package com.college.project.PlacementAutomationandStudentRequirementSystem.company.controller;

import com.college.project.PlacementAutomationandStudentRequirementSystem.company.dto.CompanyRequestDto;
import com.college.project.PlacementAutomationandStudentRequirementSystem.company.dto.CompanyResponseDto;
import com.college.project.PlacementAutomationandStudentRequirementSystem.company.service.impl.CompanyServiceImpl;
import com.college.project.PlacementAutomationandStudentRequirementSystem.company.dto.CompanyJobsResponseDto;
import com.college.project.PlacementAutomationandStudentRequirementSystem.util.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/companies")
@RequiredArgsConstructor
public class CompanyController {
private final CompanyServiceImpl companyService;


@PreAuthorize("hasRole('RECRUITER')")
    @PostMapping //RECRUITER
    public ResponseEntity<ApiResponse<?>> createCompany(@RequestBody CompanyRequestDto companyRequestDto){
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(companyService.addCompany(companyRequestDto));
    }

@PreAuthorize("hasAnyRole('ADMIN', 'STUDENT')")
    @GetMapping  //ADMIN & STUDENT
    public ResponseEntity<List<CompanyResponseDto>> getCompanies(){
        return ResponseEntity.status(HttpStatus.OK)
                .body(companyService.getAllCompanies());
    }

@PreAuthorize("isAuthenticated()")
    @GetMapping("/{id}") //ALL
    public ResponseEntity<CompanyResponseDto> getCompany(@PathVariable UUID id){
        return ResponseEntity.status(HttpStatus.OK)
                .body(companyService.getCompanyById(id));
    }

@PreAuthorize("isAuthenticated()")
    @GetMapping("/{companyId}/jobs") //ALL
    public ResponseEntity<CompanyJobsResponseDto> getCompanyJobs(@PathVariable UUID companyId){
        return ResponseEntity.status(HttpStatus.OK)
                .body(companyService.getCompanyUnderJobs(companyId));
    }
}
