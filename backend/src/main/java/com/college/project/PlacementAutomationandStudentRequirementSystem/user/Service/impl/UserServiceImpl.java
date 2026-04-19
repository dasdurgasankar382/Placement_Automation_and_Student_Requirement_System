package com.college.project.PlacementAutomationandStudentRequirementSystem.user.Service.impl;

import com.college.project.PlacementAutomationandStudentRequirementSystem.exception.ResourceNotFoundException;
import com.college.project.PlacementAutomationandStudentRequirementSystem.user.Service.UserService;
import com.college.project.PlacementAutomationandStudentRequirementSystem.user.dto.UserResponseDto;
import com.college.project.PlacementAutomationandStudentRequirementSystem.user.dto.UserResponseDtoById;
import com.college.project.PlacementAutomationandStudentRequirementSystem.user.entity.User;
import com.college.project.PlacementAutomationandStudentRequirementSystem.user.repository.UserRepository;
import com.college.project.PlacementAutomationandStudentRequirementSystem.util.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final ModelMapper modelMapper;


    @Override
    public ApiResponse<List<UserResponseDto>> getAllUsers() {
        List<UserResponseDto> users = userRepository.findAllUser();
        return new ApiResponse<>("Users get successfully", users);
    }

    @Override
    public ApiResponse<UserResponseDtoById> getUserById(UUID id) {
        UserResponseDtoById user = userRepository.findByUserid(id).orElseThrow(() -> new ResourceNotFoundException("User not found " + id));

        return new ApiResponse<>("User get successfully", user);
    }

    @Override
    public ApiResponse<?> disableUser(UUID id) {
        User user = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        user.setActive(false);
        userRepository.save(user);
        return new ApiResponse<>("User disabled successfully", null);
    }

    @Override
    public ApiResponse<?> enableUser(UUID id) {
        User user = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        user.setActive(true);
        userRepository.save(user);
        return new ApiResponse<>("User enabled successfully", null);
    }
}
