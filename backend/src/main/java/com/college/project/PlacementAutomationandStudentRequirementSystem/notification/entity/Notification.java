package com.college.project.PlacementAutomationandStudentRequirementSystem.notification.entity;

import com.college.project.PlacementAutomationandStudentRequirementSystem.notification.entity.utill.NotificationType;
import com.college.project.PlacementAutomationandStudentRequirementSystem.role.entity.Role;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Getter
@Setter
@Table(
        name = "notification",
        indexes = {
                @Index(columnList = "userId"),
                @Index(columnList = "createdAt"),
                @Index(columnList = "expiryAt")
        }
)
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    // 🔥 Who will receive this notification
    @Column(nullable = false)
    private UUID userId;

    // 🔥 Message shown in UI
    @Column(nullable = false)
    private String message;

    // 🔥 Read status
    @Column(nullable = false)
    private boolean isRead = false;

    // 🔥 Type for frontend routing
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private NotificationType type;

    // 🔥 Reference to related entity (jobId, applicationId, etc.)
    @Column(nullable = false)
    private UUID referenceId;

    // 🔥 Optional (for multi-role handling)
    private String targetRole;

    // 🔥 Expiry (for 30 days rule)
    @Column(nullable = false)
    private LocalDateTime expiresAt;

    // 🔥 Audit fields
    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

}
