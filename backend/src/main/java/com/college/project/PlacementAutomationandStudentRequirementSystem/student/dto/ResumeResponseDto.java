package com.college.project.PlacementAutomationandStudentRequirementSystem.student.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResumeResponseDto {
    private String fileName;
    private String fileType;
    private String base64Data;
}