package com.college.project.PlacementAutomationandStudentRequirementSystem.auth.service.impl;

import com.college.project.PlacementAutomationandStudentRequirementSystem.auth.dto.RegisterRequestDto;
import com.college.project.PlacementAutomationandStudentRequirementSystem.auth.dto.RegisterResponseDto;
import com.college.project.PlacementAutomationandStudentRequirementSystem.auth.service.AuthService;
import com.college.project.PlacementAutomationandStudentRequirementSystem.exception.ResourceAlreadyExistsException;
import com.college.project.PlacementAutomationandStudentRequirementSystem.exception.ResourceNotFoundException;
import com.college.project.PlacementAutomationandStudentRequirementSystem.role.entity.Role;
import com.college.project.PlacementAutomationandStudentRequirementSystem.role.repository.RoleRepository;
import com.college.project.PlacementAutomationandStudentRequirementSystem.user.entity.User;
import com.college.project.PlacementAutomationandStudentRequirementSystem.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final RoleRepository roleRepository; // validate role
    private final UserRepository userRepository; // register user
    private final ModelMapper modelMapper; // map one obj to another

    public RegisterResponseDto registerUser(RegisterRequestDto registerRequestDto) {

        Role role = roleRepository.findByRoleName(registerRequestDto.getRoleName())
                .orElseThrow(() -> new RuntimeException("Role not found"));

        if(userRepository.existsByEmail(registerRequestDto.getEmail())){
            throw new ResourceAlreadyExistsException("Email already Registered");
        }

        User user = modelMapper.map(registerRequestDto, User.class);
        user.setRole(role);
        user.setActive(true);
        userRepository.save(user);

        return new RegisterResponseDto(user.getId(),"gtqywr4y2354guaddt7833r");

    }
}
