package com.college.project.PlacementAutomationandStudentRequirementSystem.auth.service;

import com.college.project.PlacementAutomationandStudentRequirementSystem.auth.dto.*;
import com.college.project.PlacementAutomationandStudentRequirementSystem.util.ApiResponse;
import jakarta.validation.Valid;

import java.util.List;


public interface AuthService {

    ApiResponse<?> registerUser(RegisterRequestDto loginRequestDto);

    ApiResponse<LoginResponseDto> loginUser(LoginRequestDto loginRequestDto);

    List<?> getRoles();

    ApiResponse<?> forgotPassword(@Valid ForgotPasswordRequestDto forgotPasswordRequestDto);

    ApiResponse<?> resetPassword(@Valid ResetPasswordRequestDto resetPasswordRequestDto);
}
