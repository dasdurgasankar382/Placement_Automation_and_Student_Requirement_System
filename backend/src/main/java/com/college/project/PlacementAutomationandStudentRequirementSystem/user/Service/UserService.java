package com.college.project.PlacementAutomationandStudentRequirementSystem.user.Service;

import com.college.project.PlacementAutomationandStudentRequirementSystem.user.dto.UserResponseDto;
import com.college.project.PlacementAutomationandStudentRequirementSystem.user.dto.UserResponseDtoById;

import java.util.List;

public interface UserService {
    List<UserResponseDtoById> getAllUsers();

    UserResponseDto getUserById(Long id);

    String disableUser(Long id);
}
