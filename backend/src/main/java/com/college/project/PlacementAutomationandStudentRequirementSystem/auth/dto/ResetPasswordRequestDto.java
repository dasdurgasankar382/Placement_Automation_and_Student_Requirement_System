package com.college.project.PlacementAutomationandStudentRequirementSystem.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResetPasswordRequestDto {
    @NotEmpty(message = "token required")
    private String token;
    @NotEmpty(message = "newPassword required")
    private String newPassword;
}
