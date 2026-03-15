package com.college.project.PlacementAutomationandStudentRequirementSystem.user.dto;

import lombok.*;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class UserResponseDto {

    private Long id;

    private String email;

    private String role;

    private String createdAt;

}
