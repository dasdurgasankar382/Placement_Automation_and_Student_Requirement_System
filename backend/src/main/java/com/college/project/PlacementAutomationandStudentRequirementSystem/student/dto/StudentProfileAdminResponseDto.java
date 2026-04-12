package com.college.project.PlacementAutomationandStudentRequirementSystem.student.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StudentProfileAdminResponseDto {
    private String name;
    private String branch;
    private Float cgpa;
    private String phone;
    private String email;
    private List<String> skills = new ArrayList<>();
    private String resumeName;
    private Integer graduationYear;
}
