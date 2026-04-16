package com.college.project.PlacementAutomationandStudentRequirementSystem.notification.service;

import com.college.project.PlacementAutomationandStudentRequirementSystem.notification.dto.NotificationResponse;
import java.util.UUID;

public interface NotificationService {
    NotificationResponse getUserNotifications();

    void markAsRead(UUID notificationId);
}
