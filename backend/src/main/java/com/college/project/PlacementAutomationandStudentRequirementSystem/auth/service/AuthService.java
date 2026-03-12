package com.college.project.PlacementAutomationandStudentRequirementSystem.auth.service;

import com.college.project.PlacementAutomationandStudentRequirementSystem.auth.dto.LoginRequestDto;
import com.college.project.PlacementAutomationandStudentRequirementSystem.auth.dto.LoginResponseDto;
import com.college.project.PlacementAutomationandStudentRequirementSystem.auth.dto.RegisterRequestDto;
import com.college.project.PlacementAutomationandStudentRequirementSystem.auth.dto.RegisterResponseDto;


public interface AuthService {

    RegisterResponseDto registerUser(RegisterRequestDto loginRequestDto);

    LoginResponseDto loginUser(LoginRequestDto loginRequestDto);

}
