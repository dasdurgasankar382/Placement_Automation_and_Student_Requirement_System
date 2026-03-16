package com.college.project.PlacementAutomationandStudentRequirementSystem.company.dto;

import com.college.project.PlacementAutomationandStudentRequirementSystem.job.dto.JobResponseDto;
import lombok.*;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CompanyJobsResponseDto {

    private Long companyId;
    private String companyName;
    private List<JobResponseDto> jobs; //comes from job dto

}
