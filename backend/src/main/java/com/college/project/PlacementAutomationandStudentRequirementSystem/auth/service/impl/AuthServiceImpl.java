package com.college.project.PlacementAutomationandStudentRequirementSystem.auth.service.impl;

import com.college.project.PlacementAutomationandStudentRequirementSystem.auth.dto.*;
import com.college.project.PlacementAutomationandStudentRequirementSystem.auth.service.AuthService;
import com.college.project.PlacementAutomationandStudentRequirementSystem.auth.service.EmailService;
import com.college.project.PlacementAutomationandStudentRequirementSystem.exception.InvalidCredentialsException;
import com.college.project.PlacementAutomationandStudentRequirementSystem.exception.ResourceAlreadyExistsException;
import com.college.project.PlacementAutomationandStudentRequirementSystem.exception.ResourceNotFoundException;
import com.college.project.PlacementAutomationandStudentRequirementSystem.role.entity.Role;
import com.college.project.PlacementAutomationandStudentRequirementSystem.role.repository.RoleRepository;
import com.college.project.PlacementAutomationandStudentRequirementSystem.security.AuthUtil;
import com.college.project.PlacementAutomationandStudentRequirementSystem.security.CostumeUserDetails;
import com.college.project.PlacementAutomationandStudentRequirementSystem.user.entity.User;
import com.college.project.PlacementAutomationandStudentRequirementSystem.user.entity.util.PasswordResetToken;
import com.college.project.PlacementAutomationandStudentRequirementSystem.user.repository.UserRepository;
import com.college.project.PlacementAutomationandStudentRequirementSystem.user.repository.util.PasswordResetTokenRepository;
import com.college.project.PlacementAutomationandStudentRequirementSystem.util.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
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
    private final EmailService emailService; // to send email
    private final PasswordResetTokenRepository passwordResetTokenRepository;

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

        // validate user email
        User user = userRepository.findByEmail(forgotPasswordRequestDto.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        // generate validation code
        String validationCode = authUtil.generateToken();
        System.out.println("Validation code for forgot password"+ validationCode);

        // save validation code in database
        PasswordResetToken passwordResetToken = new PasswordResetToken();
        passwordResetToken.setToken(validationCode);
        passwordResetToken.setUser(user);
        passwordResetToken.setExpiryDate(LocalDateTime.now().plusMinutes(10));
        userRepository.save(user);

        // send validation code to user email
        String requestLink = "http://localhost:8080/auth/reset-password?token=" + validationCode;
        emailService.sendEmail(forgotPasswordRequestDto.getEmail(),"Reset Password", requestLink);

        return new ApiResponse<>("If this email exists, a reset link has been sent.",null);
    }

    @Override
    public ApiResponse<?> resetPassword(ResetPasswordRequestDto resetPasswordRequestDto) {

        PasswordResetToken resetToken = passwordResetTokenRepository.findByToken(resetPasswordRequestDto.getToken())
                .orElseThrow(() -> new ResourceNotFoundException("Token not found"));
        // token already used then throw exception
        if (resetToken.isUsed()) {
            throw new InvalidCredentialsException("Token already used");
        }
        // if time expired throw exception
        if(resetToken.getExpiryDate().isBefore(LocalDateTime.now())){
            throw new InvalidCredentialsException("Token already Expired");
        }

        User user = resetToken.getUser();
        user.setPassword(resetPasswordRequestDto.getNewPassword());
        userRepository.save(user);

        resetToken.setUsed(true);

        return new ApiResponse<>("Password reset successFully",null);
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
