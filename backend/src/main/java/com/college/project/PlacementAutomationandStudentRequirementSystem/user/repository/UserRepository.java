package com.college.project.PlacementAutomationandStudentRequirementSystem.user.repository;

import com.college.project.PlacementAutomationandStudentRequirementSystem.user.dto.UserResponseDto;
import com.college.project.PlacementAutomationandStudentRequirementSystem.user.dto.UserResponseDtoById;
import com.college.project.PlacementAutomationandStudentRequirementSystem.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {
    boolean existsByEmail(String email);

    boolean existsByRole(String roleName);

    Optional<User> findByEmail(String email);

    @Query(""" 
            SELECT new com.college.project.PlacementAutomationandStudentRequirementSystem.user.dto.UserResponseDto(
                        u.id, u.email, u.role, u.createdAt)
                    FROM User u
            """
    )
    List<UserResponseDto> findAllUser();

    @Query(""" 
            SELECT new com.college.project.PlacementAutomationandStudentRequirementSystem.user.dto.UserResponseDtoById
                        (u.id, u.email,  u.isActive, u.role, u.createdAt, u.updatedAt)
                    FROM User u
            """
    )
    Optional<UserResponseDtoById> findByUserid(UUID id);
}
