package com.college.project.PlacementAutomationandStudentRequirementSystem.auth.controller;

import com.college.project.PlacementAutomationandStudentRequirementSystem.auth.dto.ForgotPasswordRequestDto;
import com.college.project.PlacementAutomationandStudentRequirementSystem.auth.dto.LoginRequestDto;
import com.college.project.PlacementAutomationandStudentRequirementSystem.auth.dto.LoginResponseDto;
import com.college.project.PlacementAutomationandStudentRequirementSystem.auth.dto.RegisterRequestDto;
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

    // Keep Backend Alive (Free, 5 min) Add a /health endpoint in Spring Boot:
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
    @GetMapping("/roles")
    public ResponseEntity<List<?>> getRoles(){
        return ResponseEntity.status(HttpStatus.OK).body(authServiceimpl.getRoles());
    }

    @PostMapping
    public ResponseEntity<ApiResponse<?>> forgotPassword(@RequestBody @Valid ForgotPasswordRequestDto forgotPasswordRequestDto){
        return ResponseEntity.status(HttpStatus.OK).body(authServiceimpl.forgotPassword(forgotPasswordRequestDto));
    }

}
