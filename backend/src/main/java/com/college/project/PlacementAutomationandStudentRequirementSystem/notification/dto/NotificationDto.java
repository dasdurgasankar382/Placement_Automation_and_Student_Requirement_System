package com.college.project.PlacementAutomationandStudentRequirementSystem.notification.dto;

import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class NotificationDto {

    private UUID id;
    private String message;
    private boolean isRead;
    private LocalDateTime createdAt;

    private String type;        // for routing
    private UUID referenceId;   // for navigation
}
