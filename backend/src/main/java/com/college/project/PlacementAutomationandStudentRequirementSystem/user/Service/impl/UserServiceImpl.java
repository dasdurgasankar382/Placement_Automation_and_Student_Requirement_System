package com.college.project.PlacementAutomationandStudentRequirementSystem.user.Service.impl;

import com.college.project.PlacementAutomationandStudentRequirementSystem.exception.ResourceNotFoundException;
import com.college.project.PlacementAutomationandStudentRequirementSystem.user.Service.UserService;
import com.college.project.PlacementAutomationandStudentRequirementSystem.user.dto.UserResponseDto;
import com.college.project.PlacementAutomationandStudentRequirementSystem.user.dto.UserResponseDtoById;
import com.college.project.PlacementAutomationandStudentRequirementSystem.user.entity.User;
import com.college.project.PlacementAutomationandStudentRequirementSystem.user.repository.UserRepository;
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
    public List<UserResponseDtoById> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream()
                .map(user -> modelMapper.map(user, UserResponseDtoById.class)
                ).toList();
    }

    @Override
    public UserResponseDto getUserById(UUID id) {
        User user = userRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("User not found " + id));

        UserResponseDto dto = modelMapper.map(user, UserResponseDto.class);
        dto.setRole(user.getRole().getRoleName());
        return dto;
    }

    @Override
    public String disableUser(UUID id) {
        User user = userRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("User not found"));
        System.out.println(user.isActive());
        if(!user.isActive()){
            user.setActive(false);
        }
        userRepository.save(user);
        return "Success";
    }
}
