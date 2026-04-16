package com.college.project.PlacementAutomationandStudentRequirementSystem.job.dto;

import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class JobRequestDto {
    private String role;
    private Double salary;
    private Float cgpa;
    private List<String> skills;
    private String description;
    private LocalDate deadline;
}
