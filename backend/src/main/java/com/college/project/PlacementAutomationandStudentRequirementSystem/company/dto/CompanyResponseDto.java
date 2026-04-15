package com.college.project.PlacementAutomationandStudentRequirementSystem.company.dto;

import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CompanyResponseDto {
    private UUID id;
    private String name;
    private String location;
    private String website;
    private String description;
}
