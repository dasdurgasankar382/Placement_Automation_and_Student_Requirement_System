package com.college.project.PlacementAutomationandStudentRequirementSystem.notification.service.impl;

import com.college.project.PlacementAutomationandStudentRequirementSystem.notification.dto.NotificationDto;
import com.college.project.PlacementAutomationandStudentRequirementSystem.notification.dto.NotificationResponse;
import com.college.project.PlacementAutomationandStudentRequirementSystem.notification.entity.Notification;
import com.college.project.PlacementAutomationandStudentRequirementSystem.notification.repository.NotificationRepository;
import com.college.project.PlacementAutomationandStudentRequirementSystem.notification.service.NotificationService;
import com.college.project.PlacementAutomationandStudentRequirementSystem.security.AuthUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;
    private final AuthUtil authUtil;

    @Override
    public NotificationResponse getUserNotifications() {

        UUID userId = authUtil.getCurrentUserId();

        List<Notification> notifications =
                notificationRepository.findActiveNotifications(userId);

        long unreadCount =
                notificationRepository.countUnread(userId);

        List<NotificationDto> dtos = notifications.stream()
                .map(this::mapToDto)
                .toList();

        return new NotificationResponse(dtos, unreadCount);
    }

    @Override
    public void markAsRead(UUID notificationId) {

        Notification n = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new RuntimeException("Notification not found"));

        // 🔒 security check
        UUID userId = authUtil.getCurrentUserId();
        if (!n.getUserId().equals(userId)) {
            throw new RuntimeException("Unauthorized");
        }

        n.setRead(true);
        notificationRepository.save(n);
    }

    // 🔥 Mapper (important)
    private NotificationDto mapToDto(Notification n) {

        NotificationDto dto = new NotificationDto();

        dto.setId(n.getId());
        dto.setMessage(n.getMessage());
        dto.setRead(n.isRead());
        dto.setCreatedAt(n.getCreatedAt());

        dto.setType(n.getType().name());
        dto.setReferenceId(n.getReferenceId());

        return dto;
    }
}