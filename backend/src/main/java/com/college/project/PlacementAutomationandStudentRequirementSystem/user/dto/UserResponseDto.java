package com.college.project.PlacementAutomationandStudentRequirementSystem.user.dto;

import com.college.project.PlacementAutomationandStudentRequirementSystem.role.entity.Role;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Data

public class UserResponseDto {

    private UUID id;

    private String email;

    private Role role;

    private LocalDateTime createdAt;

    public UserResponseDto(UUID id, String email, Role role, LocalDateTime createdAt) {
        this.id = id;
        this.email = email;
        this.role = role;
        this.createdAt = createdAt;
    }

}
