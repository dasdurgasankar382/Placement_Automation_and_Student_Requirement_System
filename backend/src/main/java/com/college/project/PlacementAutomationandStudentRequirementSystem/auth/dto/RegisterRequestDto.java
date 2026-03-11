package com.college.project.PlacementAutomationandStudentRequirementSystem.auth.dto;

import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class RegisterRequestDto {
    private String email;
    private String password;
    private String roleName;
}
