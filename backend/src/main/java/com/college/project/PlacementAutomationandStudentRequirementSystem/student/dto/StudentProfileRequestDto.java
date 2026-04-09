package com.college.project.PlacementAutomationandStudentRequirementSystem.student.dto;


import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class StudentProfileRequestDto {

    @NotNull
    private String name;
    @NotNull
    private String branch;
    @NotNull
    private Float cgpa;
    @NotNull
    private String phone;
    @NotNull
    private List<String> skills = new ArrayList<>();
    @NotNull
    private MultipartFile resumeFile;
    @NotNull
    private Integer graduationYear;

}
