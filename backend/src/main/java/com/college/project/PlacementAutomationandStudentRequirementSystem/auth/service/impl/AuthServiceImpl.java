package com.college.project.PlacementAutomationandStudentRequirementSystem.auth.service.impl;

import com.college.project.PlacementAutomationandStudentRequirementSystem.auth.dto.LoginRequestDto;
import com.college.project.PlacementAutomationandStudentRequirementSystem.auth.dto.LoginResponseDto;
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
//import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final RoleRepository roleRepository; // validate role
    private final UserRepository userRepository; // register user
    private final ModelMapper modelMapper; // map one obj to another
//    private final PasswordEncoder passwordEncoder; //for password encrypt and decrypt

    @Override
    public RegisterResponseDto registerUser(RegisterRequestDto registerRequestDto) {

        Role role = roleRepository.findByRoleName(registerRequestDto.getRoleName())
                .orElseThrow(() -> new ResourceNotFoundException("Role not found"));

        if (userRepository.existsByEmail(registerRequestDto.getEmail())) {
            throw new ResourceAlreadyExistsException("Email already Registered");
        }

        User user = modelMapper.map(registerRequestDto, User.class);
        user.setRole(role);
//        user.setPassword(passwordEncoder.encode(registerRequestDto.getPassword()));

        user.setActive(true);
        userRepository.save(user);

        return new RegisterResponseDto(user.getId(), "Register Successfully");

    }

    @Override
    public LoginResponseDto loginUser(LoginRequestDto loginRequestDto) {
        User user = userRepository.findByEmail(loginRequestDto.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("User not found!"));

        if (!user.getRole().getRoleName().equals((loginRequestDto.getRole()))) {
            throw new ResourceNotFoundException("User not found for the role " + loginRequestDto.getRole());
        }

//        if (!passwordEncoder.matches(loginRequestDto.getPassword(), user.getPassword())) {
//            throw new ResourceNotFoundException("Incorrect password");
//        }

        return new LoginResponseDto("Login Successfully");
    }


    public List getRoles() {
        return roleRepository.findAll();
    }
}
