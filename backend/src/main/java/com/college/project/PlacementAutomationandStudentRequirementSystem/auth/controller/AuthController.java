package com.college.project.PlacementAutomationandStudentRequirementSystem.auth.controller;

import com.college.project.PlacementAutomationandStudentRequirementSystem.auth.dto.*;
import com.college.project.PlacementAutomationandStudentRequirementSystem.auth.service.impl.AuthServiceImpl;
import com.college.project.PlacementAutomationandStudentRequirementSystem.util.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "${ALLOWED_ORIGINS}")
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthServiceImpl authServiceimpl;

// Keep Backend Alive (Free tier - Render sleeps)
@RequestMapping(value = "/health", method = {RequestMethod.GET, RequestMethod.HEAD})
public ResponseEntity<String> health() {
    return ResponseEntity.ok("UP");
}

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<?>> register(@RequestBody @Valid RegisterRequestDto registerRequestDto){
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(authServiceimpl.registerUser(registerRequestDto));
//        return ResponseEntity.status(HttpStatus.CREATED).body("User Register Successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponseDto>> login(@RequestBody @Valid LoginRequestDto loginRequestDto){
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(authServiceimpl.loginUser(loginRequestDto));
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<ApiResponse<?>> forgotPassword(@RequestBody @Valid ForgotPasswordRequestDto forgotPasswordRequestDto){
        return ResponseEntity.status(HttpStatus.OK).body(authServiceimpl.forgotPassword(forgotPasswordRequestDto));
    }

    @PostMapping("/reset-password")
    public ResponseEntity<ApiResponse<?>> resetPassword(@RequestBody @Valid ResetPasswordRequestDto resetPasswordRequestDto){
        return ResponseEntity.status(HttpStatus.OK).
                body(authServiceimpl.resetPassword(resetPasswordRequestDto));
    }

    public ResponseEntity<ApiResponse<?>> logoutUser(){
        return ResponseEntity.status(HttpStatus.OK).body(authServiceimpl.logoutUser());
    }

//    @PostMapping("/set-role")
//    public ResponseEntity<String> setRole(@RequestBody RoleRepodto roleRepodto){
//        return ResponseEntity.status(HttpStatus.OK).body(authServiceimpl.setRole(roleRepodto));
//    }

}
