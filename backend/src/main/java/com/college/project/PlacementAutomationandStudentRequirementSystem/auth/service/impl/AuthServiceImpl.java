package com.college.project.PlacementAutomationandStudentRequirementSystem.auth.service.impl;

import com.college.project.PlacementAutomationandStudentRequirementSystem.auth.dto.*;
import com.college.project.PlacementAutomationandStudentRequirementSystem.auth.service.AuthService;
import com.college.project.PlacementAutomationandStudentRequirementSystem.exception.InvalidCredentialsException;
import com.college.project.PlacementAutomationandStudentRequirementSystem.exception.ResourceAlreadyExistsException;
import com.college.project.PlacementAutomationandStudentRequirementSystem.exception.ResourceNotFoundException;
import com.college.project.PlacementAutomationandStudentRequirementSystem.role.entity.Role;
import com.college.project.PlacementAutomationandStudentRequirementSystem.role.repository.RoleRepository;
import com.college.project.PlacementAutomationandStudentRequirementSystem.security.AuthUtil;
import com.college.project.PlacementAutomationandStudentRequirementSystem.security.CostumeUserDetails;
import com.college.project.PlacementAutomationandStudentRequirementSystem.user.entity.User;
import com.college.project.PlacementAutomationandStudentRequirementSystem.user.repository.UserRepository;
import com.college.project.PlacementAutomationandStudentRequirementSystem.util.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final RoleRepository roleRepository; // validate role
    private final UserRepository userRepository; // register user also load user
    private final ModelMapper modelMapper; // map one obj to another
    private final PasswordEncoder passwordEncoder; //for password encrypt and decrypt
    private final AuthenticationManager authenticationManager; // to delegate authentication to authentication manager
    private final AuthUtil authUtil; // to generate access token

    @Override
    public ApiResponse<?> registerUser(RegisterRequestDto registerRequestDto) {

        //don't need to register for admin
        if ("ADMIN".matches(registerRequestDto.getRole())) {
            throw new ResourceAlreadyExistsException("Admin registration is not allowed");
        }

//        String userRole = authUtil.getCurrentUserRole();
//        System.out.println(userRole);
        Role role = roleRepository.findByRoleName(registerRequestDto.getRole())
                .orElseThrow(() -> new ResourceNotFoundException("Role not found"));

        if (userRepository.existsByEmail(registerRequestDto.getEmail())) {
            throw new ResourceAlreadyExistsException("Email already Registered");
        }

        User user = modelMapper.map(registerRequestDto, User.class);
        user.setRole(role);
        user.setPassword(passwordEncoder.encode(registerRequestDto.getPassword()));

        user.setActive(true);
        userRepository.save(user);

        return new ApiResponse<>("Register Successfully", null);
    }

    @Override
    public ApiResponse<LoginResponseDto> loginUser(LoginRequestDto loginRequestDto) {

       if( !userRepository.existsByEmail(loginRequestDto.getEmail())){
           throw new ResourceNotFoundException("email not registered");
       }

        Authentication authentication;
        try {
            authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequestDto.getEmail(), loginRequestDto.getPassword())
            );
        } catch (BadCredentialsException e) {
            throw new InvalidCredentialsException("Incorrect password");
        }

        CostumeUserDetails userDetails = (CostumeUserDetails) authentication.getPrincipal();
        if (userDetails == null) {
            throw new InvalidCredentialsException("Authentication failed");
        }
        String token = authUtil.generateAccessToken(userDetails);
        return new ApiResponse<>("Login Successfully", new LoginResponseDto(token));
    }

    @Override
    public List<?> getRoles() {
        return roleRepository.findAll();
    }

    @Override
    public ApiResponse<?> forgotPassword(ForgotPasswordRequestDto forgotPasswordRequestDto) {

        User user = userRepository.findByEmail(forgotPasswordRequestDto.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        String validationCode = authUtil.generateValidationCode();
        System.out.println("Validation code for forgot password"+ validationCode);

        // send validation code to user email
        // verify it


        return null;
    }
//    public String setRole(RoleRepodto dto){
//Role role = roleRepository.findByRoleName(dto.getRole())
//        .orElseThrow(() -> new ResourceNotFoundException("Role not found"));
//User user = new User();
//user.setEmail(dto.getEmail());
//user.setRole(role);
//user.setPassword(passwordEncoder.encode(dto.getPassword()));
//        userRepository.save(user);
//
//        return "role set";
//    }
}
