package com.college.project.PlacementAutomationandStudentRequirementSystem.student.dto;

import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class StudentProfileUpdateRequestDto {
    private Long userId;
    private String name;
    private String branch;
    private Float cgpa;
    private String phone;
    private List<String> skills = new ArrayList<>();
    private String resumeUrl;
    private Integer graduationYear;
}
