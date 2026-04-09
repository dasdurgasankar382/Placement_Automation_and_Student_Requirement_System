package com.college.project.PlacementAutomationandStudentRequirementSystem.user.Service;

import com.college.project.PlacementAutomationandStudentRequirementSystem.user.dto.UserResponseDto;
import com.college.project.PlacementAutomationandStudentRequirementSystem.user.dto.UserResponseDtoById;

import java.util.List;
import java.util.UUID;

public interface UserService {
    List<UserResponseDtoById> getAllUsers();

    UserResponseDto getUserById(UUID id);

    String disableUser(UUID id);
}
