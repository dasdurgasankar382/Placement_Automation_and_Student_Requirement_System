package com.college.project.PlacementAutomationandStudentRequirementSystem.company.dto;

import com.college.project.PlacementAutomationandStudentRequirementSystem.job.dto.JobResponseDto;
import lombok.*;

import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CompanyJobsResponseDto {

    private UUID companyId;
    private String companyName;
    private List<JobResponseDto> jobs; //comes from job dto

}
