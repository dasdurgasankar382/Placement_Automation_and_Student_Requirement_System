package com.college.project.PlacementAutomationandStudentRequirementSystem.company.dto;

import jakarta.persistence.Column;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CompanyRequestDto {

    private String name;
    private String location;
    private String website;
    private String description;

}
