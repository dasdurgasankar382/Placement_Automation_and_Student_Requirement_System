package com.college.project.PlacementAutomationandStudentRequirementSystem.user.repository;

import com.college.project.PlacementAutomationandStudentRequirementSystem.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {
    boolean existsByEmail(String email);

    boolean existsByRole(String roleName);

    Optional<User> findByEmail(String email);
}
