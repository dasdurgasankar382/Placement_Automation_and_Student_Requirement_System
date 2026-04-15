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
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.beans.factory.annotation.Value;
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
    
    @Value("${FRONTEND_URL}")
    private String frontendUrl;

    @Override
    public ApiResponse<?> registerUser(RegisterRequestDto registerRequestDto) {

        //don't need to register for admin
        if ("ADMIN".matches(registerRequestDto.getRole())) {
            throw new ResourceAlreadyExistsException("Admin registration is not allowed");
        }

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
        // no need extra check already checked by Authentication Manager
        Authentication authentication;
        try {
            authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequestDto.getEmail(), loginRequestDto.getPassword())
            );
        } catch (BadCredentialsException e) {
            throw new InvalidCredentialsException("Invalid email or password");
        } catch (DisabledException e){
            throw new InvalidCredentialsException("Your account is deactivated. Contact admin.");
        }

        Object principal = authentication.getPrincipal();
        if (!(principal instanceof CostumeUserDetails userDetails)){
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

        // save validation code in database
        PasswordResetToken passwordResetToken = new PasswordResetToken();
        passwordResetToken.setToken(validationCode);
        passwordResetToken.setUser(user);
        passwordResetToken.setExpiryDate(LocalDateTime.now().plusMinutes(10));
        passwordResetTokenRepository.save(passwordResetToken);

        // send validation code to user email
        String requestLink = frontendUrl+"/reset-password?token=" + validationCode;
        emailService.sendEmailWithHtml(forgotPasswordRequestDto.getEmail(),"Reset Password", requestLink);

        return new ApiResponse<>("If this email exists, a reset link has been sent.",null);
    }

    @Override
    @Transactional
    public ApiResponse<?> resetPassword(ResetPasswordRequestDto dto) {

        PasswordResetToken resetToken = passwordResetTokenRepository
                .findFirstByToken(dto.getToken())
                .orElseThrow(() -> new ResourceNotFoundException("Invalid token"));

        // ✅ check already used
        if (resetToken.isUsed()) {
            throw new InvalidCredentialsException("Token already used");
        }

        // ✅ check expiry
        if (resetToken.getExpiryDate().isBefore(LocalDateTime.now())) {
            throw new InvalidCredentialsException("Token expired");
        }
        User user = resetToken.getUser();

        // ✅ encode password (VERY IMPORTANT)
        user.setPassword(passwordEncoder.encode(dto.getNewPassword()));
        userRepository.save(user);

        // ✅ mark token as used
        resetToken.setUsed(true);
        passwordResetTokenRepository.save(resetToken);

        // ✅ optional: delete all tokens of this user (clean DB)
        passwordResetTokenRepository.deleteByUser(user);

        return new ApiResponse<>("Password reset successfully", null);
    }

    @Override
    public ApiResponse<?> logoutUser() {
        authUtil.clearToken();
        return new ApiResponse<>("Logout successfully", null);
    }
}
