package com.college.project.PlacementAutomationandStudentRequirementSystem.student.dto;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class StudentProfileUpdateRequestDto {
    private UUID userId;
    private String name;
    private String branch;
    private Float cgpa;
    private String phone;
    private List<String> skills = new ArrayList<>();
    private MultipartFile resumeFile;
    private Integer graduationYear;
}
