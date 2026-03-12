package com.college.project.PlacementAutomationandStudentRequirementSystem.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
@AllArgsConstructor
public class LoginRequestDto {

    private String email;
    private String password;
    private String role;

}
