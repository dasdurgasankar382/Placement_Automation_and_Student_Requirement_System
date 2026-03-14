package com.college.project.PlacementAutomationandStudentRequirementSystem.auth.controller;

import com.college.project.PlacementAutomationandStudentRequirementSystem.auth.dto.LoginRequestDto;
import com.college.project.PlacementAutomationandStudentRequirementSystem.auth.dto.LoginResponseDto;
import com.college.project.PlacementAutomationandStudentRequirementSystem.auth.dto.RegisterRequestDto;
import com.college.project.PlacementAutomationandStudentRequirementSystem.auth.dto.RegisterResponseDto;
import com.college.project.PlacementAutomationandStudentRequirementSystem.auth.service.impl.AuthServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthServiceImpl authServiceimpl;

    @PostMapping("/register")
    public ResponseEntity<RegisterResponseDto> register(@RequestBody RegisterRequestDto registerRequestDto){
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(authServiceimpl.registerUser(registerRequestDto));
//        return ResponseEntity.status(HttpStatus.CREATED).body("User Register Successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> login(@RequestBody LoginRequestDto loginRequestDto){
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(authServiceimpl.loginUser(loginRequestDto));
    }
    @GetMapping("/roles")
    public ResponseEntity<List> getRoles(){
        return ResponseEntity.status(HttpStatus.OK).body(authServiceimpl.getRoles());
    }

}
