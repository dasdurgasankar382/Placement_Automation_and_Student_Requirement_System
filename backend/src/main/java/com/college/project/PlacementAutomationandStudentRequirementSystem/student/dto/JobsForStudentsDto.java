package com.college.project.PlacementAutomationandStudentRequirementSystem.student.dto;

import com.college.project.PlacementAutomationandStudentRequirementSystem.application.entity.util.ApplicationStatus;
import com.college.project.PlacementAutomationandStudentRequirementSystem.job.dto.JobResponseDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Data
@Getter
public class JobsForStudentsDto {
    // getters
    JobResponseDto job;
    String companyName;
    ApplicationStatus status;

    public JobsForStudentsDto(JobResponseDto job, String companyName, ApplicationStatus status) {
        this.job = job;
        this.companyName = companyName;
        this.status = status;
    }

}
