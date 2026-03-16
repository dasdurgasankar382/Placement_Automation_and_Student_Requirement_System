package com.college.project.PlacementAutomationandStudentRequirementSystem.company.dto;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CompanyResponseDto {
    private Long id;
    private String name;
    private String location;
    private String website;
    private String description;
}
