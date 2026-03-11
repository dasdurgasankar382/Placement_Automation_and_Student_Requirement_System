package com.college.project.PlacementAutomationandStudentRequirementSystem.role.repository;

import com.college.project.PlacementAutomationandStudentRequirementSystem.role.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByRoleName(String roleName);

}
