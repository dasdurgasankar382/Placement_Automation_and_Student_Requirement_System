package com.college.project.PlacementAutomationandStudentRequirementSystem.user.dto;

import com.college.project.PlacementAutomationandStudentRequirementSystem.role.entity.Role;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class UserResponseDtoById {

    private UUID id;

    private String email;

    private boolean active;

    private Role role;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;


    public UserResponseDtoById(UUID id, String email, boolean active, Role role, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.email = email;
        this.active = active;
        this.role = role;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
