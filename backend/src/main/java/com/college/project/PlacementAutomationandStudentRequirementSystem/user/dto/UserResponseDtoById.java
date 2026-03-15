package com.college.project.PlacementAutomationandStudentRequirementSystem.user.dto;

import lombok.*;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class UserResponseDtoById {

    private Long id;

    private String email;

    private boolean active;

    private String role;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

}
