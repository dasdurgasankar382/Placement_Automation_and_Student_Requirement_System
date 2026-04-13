package com.college.project.PlacementAutomationandStudentRequirementSystem.user.repository.util;

import com.college.project.PlacementAutomationandStudentRequirementSystem.user.entity.User;
import com.college.project.PlacementAutomationandStudentRequirementSystem.user.entity.util.PasswordResetToken;
import jakarta.validation.constraints.NotEmpty;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, UUID> {
    Optional<PasswordResetToken> findByToken(@NotEmpty(message = "token required") String token);

    Optional<PasswordResetToken> findFirstByToken(@NotEmpty(message = "token required") String token);

    void deleteByUser(User user);
}