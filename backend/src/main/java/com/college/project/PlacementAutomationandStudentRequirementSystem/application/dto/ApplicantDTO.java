package com.college.project.PlacementAutomationandStudentRequirementSystem.application.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ApplicantDTO {

    private UUID applicationId; // for update status
    private UUID studentId;
    private UUID jobId;
    private String role;

    private String studentName;
    private String email;

    private String resumeName;
    private List<String> skills;

    private String applicationStatus;
    private LocalDateTime appliedAt;
}
