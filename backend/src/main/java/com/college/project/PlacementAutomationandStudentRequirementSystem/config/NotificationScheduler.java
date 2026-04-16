package com.college.project.PlacementAutomationandStudentRequirementSystem.config;

import com.college.project.PlacementAutomationandStudentRequirementSystem.notification.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
public class NotificationScheduler {

    private final NotificationRepository notificationRepository;

    @Scheduled(fixedRate = 24 * 60 * 60 * 1000) // every 24h
    public void cleanupNotifications() {
        notificationRepository.deleteByExpiresAtBefore(LocalDateTime.now());
    }
}