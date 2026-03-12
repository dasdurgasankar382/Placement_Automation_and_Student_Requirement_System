package com.college.project.PlacementAutomationandStudentRequirementSystem.student.dto;


import lombok.*;

import java.util.List;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class StudentProfileRequestDto {

    private String name;
    private String branch;
    private Float cgpa;
    private String phone;
    private List<String> skills;
    private String resumeUrl;
    private Integer graduationYear;
}
