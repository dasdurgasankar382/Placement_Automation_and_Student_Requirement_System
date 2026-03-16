package com.college.project.PlacementAutomationandStudentRequirementSystem.company.controller;

import com.college.project.PlacementAutomationandStudentRequirementSystem.company.dto.CompanyRequestDto;
import com.college.project.PlacementAutomationandStudentRequirementSystem.company.dto.CompanyResponseDto;
import com.college.project.PlacementAutomationandStudentRequirementSystem.company.service.impl.CompanyServiceImpl;
import com.college.project.PlacementAutomationandStudentRequirementSystem.company.dto.CompanyJobsResponseDto;
import com.college.project.PlacementAutomationandStudentRequirementSystem.util.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/companies")
@RequiredArgsConstructor
public class CompanyController {
private final CompanyServiceImpl companyService;


    @PostMapping //RECRUITER
    public ResponseEntity<ApiResponse<?>> createCompany(@RequestBody CompanyRequestDto companyRequestDto){
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(companyService.addCompany(companyRequestDto));
    }

    @GetMapping  //ADMIN & STUDENT
    public ResponseEntity<List<CompanyResponseDto>> getCompanies(){
        return ResponseEntity.status(HttpStatus.OK)
                .body(companyService.getAllCompanies());
    }

    @GetMapping("/{id}") //ALL
    public ResponseEntity<CompanyResponseDto> getCompany(@PathVariable Long id){
        return ResponseEntity.status(HttpStatus.OK)
                .body(companyService.getCompanyById(id));
    }

    @GetMapping("/{companyId}/jobs") //ALL
    public ResponseEntity<CompanyJobsResponseDto> getCompanyJobs(@PathVariable Long companyId){
        return ResponseEntity.status(HttpStatus.OK)
                .body(companyService.getCompanyUnderJobs(companyId));
    }
}
