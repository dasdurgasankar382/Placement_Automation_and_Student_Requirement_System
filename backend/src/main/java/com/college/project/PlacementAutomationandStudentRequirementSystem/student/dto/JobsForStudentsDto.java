package com.college.project.PlacementAutomationandStudentRequirementSystem.student.dto;

import com.college.project.PlacementAutomationandStudentRequirementSystem.application.entity.util.ApplicationStatus;
import com.college.project.PlacementAutomationandStudentRequirementSystem.job.dto.JobResponseDto;
import lombok.*;

@Data
@Getter
@ToString
public class JobsForStudentsDto {
    // getters
    JobResponseDto job;
    String companyName;
    String companyLocation;
    ApplicationStatus status;

    public JobsForStudentsDto(JobResponseDto job, String companyName, String companyLocation, ApplicationStatus status) {
        this.job = job;
        this.companyName = companyName;
        this.companyLocation = companyLocation;
        this.status = status;
    }

}
