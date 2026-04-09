package com.college.project.PlacementAutomationandStudentRequirementSystem.application.dto;

import lombok.*;

import java.util.UUID;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ApplicationRequestDto {
    private UUID jobId;
    private UUID studentId;
}
