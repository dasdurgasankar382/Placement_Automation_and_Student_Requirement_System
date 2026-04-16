package com.college.project.PlacementAutomationandStudentRequirementSystem.notification.dto;

import lombok.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@Getter
@Setter
public class NotificationResponse {

    private List<NotificationDto> notifications;
    private long unreadCount;

    public NotificationResponse(List<NotificationDto> notifications, long unreadCount) {
        this.notifications = notifications;
        this.unreadCount = unreadCount;
    }
}
