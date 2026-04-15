package com.college.project.PlacementAutomationandStudentRequirementSystem.job.dto;

import com.college.project.PlacementAutomationandStudentRequirementSystem.company.dto.CompanyResponseDto;
import com.college.project.PlacementAutomationandStudentRequirementSystem.company.entity.Company;
import com.college.project.PlacementAutomationandStudentRequirementSystem.job.entity.util.JobStatus;
import lombok.*;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class JobResponseDto {
    private UUID id;
    private String role;
    private Double salary;
    private List<String> skills;
    private String description;
    private LocalDate deadline;
    private JobStatus jobStatus;
    private String companyName;
    private String location;
}