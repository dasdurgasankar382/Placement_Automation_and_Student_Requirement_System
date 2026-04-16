package com.college.project.PlacementAutomationandStudentRequirementSystem.notification.repository;

import com.college.project.PlacementAutomationandStudentRequirementSystem.notification.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, UUID> {
        @Query("""
        SELECT n FROM Notification n
        WHERE n.userId = :userId
        AND n.expiresAt > CURRENT_TIMESTAMP
        ORDER BY n.createdAt DESC
    """)
        List<Notification> findActiveNotifications(UUID userId);

        @Query("""
        SELECT COUNT(n) FROM Notification n
        WHERE n.userId = :userId
        AND n.isRead = false
        AND n.expiresAt > CURRENT_TIMESTAMP
    """)
        long countUnread(UUID userId);

        void deleteByExpiresAtBefore(LocalDateTime time);

}
