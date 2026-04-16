package com.college.project.PlacementAutomationandStudentRequirementSystem.notification.controller;

import com.college.project.PlacementAutomationandStudentRequirementSystem.notification.dto.NotificationResponse;
import com.college.project.PlacementAutomationandStudentRequirementSystem.notification.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/notifications")
@RequiredArgsConstructor
public class NotificationController {
    private final NotificationService notificationService;

    @PreAuthorize("hasAnyRole('STUDENT', 'RECRUITER')")
    @GetMapping
    public ResponseEntity<NotificationResponse> getNotifications() {
        return ResponseEntity.ok(notificationService.getUserNotifications());
    }

    @PutMapping("/{id}/read")
    public ResponseEntity<String> markAsRead(@PathVariable UUID id) {
        notificationService.markAsRead(id);
        return ResponseEntity.ok("Notification marked as read");
    }
}
