package com.college.project.PlacementAutomationandStudentRequirementSystem.user.Service;

import com.college.project.PlacementAutomationandStudentRequirementSystem.user.dto.UserResponseDto;
import com.college.project.PlacementAutomationandStudentRequirementSystem.user.dto.UserResponseDtoById;
import com.college.project.PlacementAutomationandStudentRequirementSystem.util.ApiResponse;

import java.util.List;
import java.util.UUID;

public interface UserService {
    ApiResponse<List<UserResponseDto>> getAllUsers();

    ApiResponse<UserResponseDtoById> getUserById(UUID id);

    ApiResponse<?> disableUser(UUID id);

    ApiResponse<?> enableUser(UUID id);
}
