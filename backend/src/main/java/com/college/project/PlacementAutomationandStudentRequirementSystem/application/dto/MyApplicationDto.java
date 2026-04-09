package com.college.project.PlacementAutomationandStudentRequirementSystem.application.dto;

import com.college.project.PlacementAutomationandStudentRequirementSystem.application.entity.util.ApplicationStatus;

import java.time.LocalDateTime;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MyApplicationDto {
    private UUID applicationId;
    private UUID jobId;          // NEW: So the student can click the job
    private String companyName;  // NEW: So the student knows who they applied to
    private String jobTitle;
    private ApplicationStatus status;
    private LocalDateTime appliedAt;
}

