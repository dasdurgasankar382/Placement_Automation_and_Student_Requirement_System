package com.college.project.PlacementAutomationandStudentRequirementSystem.student.dto;

import com.college.project.PlacementAutomationandStudentRequirementSystem.application.entity.util.ApplicationStatus;
import com.college.project.PlacementAutomationandStudentRequirementSystem.job.dto.JobResponseDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JobsForStudentsDto {
    JobResponseDto job;
    String companyName;
    ApplicationStatus status;
}
