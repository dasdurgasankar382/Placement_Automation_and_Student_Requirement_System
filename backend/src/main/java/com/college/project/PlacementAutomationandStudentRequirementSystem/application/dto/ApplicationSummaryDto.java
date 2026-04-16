package com.college.project.PlacementAutomationandStudentRequirementSystem.application.dto;

import com.college.project.PlacementAutomationandStudentRequirementSystem.application.entity.util.ApplicationStatus;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ApplicationSummaryDto {
    private UUID applicationId;
    private String studentName;
    private String jobTitle;
    private ApplicationStatus status;
    private LocalDateTime createdAt;
}
