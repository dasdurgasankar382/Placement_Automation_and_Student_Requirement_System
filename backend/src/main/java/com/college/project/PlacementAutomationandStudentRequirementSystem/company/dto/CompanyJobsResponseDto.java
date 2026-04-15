package com.college.project.PlacementAutomationandStudentRequirementSystem.company.dto;

import com.college.project.PlacementAutomationandStudentRequirementSystem.job.dto.JobResponseDto;
import com.college.project.PlacementAutomationandStudentRequirementSystem.job.entity.util.JobStatus;
import lombok.*;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CompanyJobsResponseDto {

    private UUID id;
    private String role;
    private String companyName;
    private String CompanyLocation;
    private Double salary;
    private List<String> skills;
    private String description;
    private LocalDate deadline;
    private JobStatus jobStatus;
}
