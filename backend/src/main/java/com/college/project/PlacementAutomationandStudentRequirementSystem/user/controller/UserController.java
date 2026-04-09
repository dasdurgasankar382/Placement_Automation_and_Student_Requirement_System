package com.college.project.PlacementAutomationandStudentRequirementSystem.user.controller;

import com.college.project.PlacementAutomationandStudentRequirementSystem.user.Service.impl.UserServiceImpl;
import com.college.project.PlacementAutomationandStudentRequirementSystem.user.dto.UserResponseDto;
import com.college.project.PlacementAutomationandStudentRequirementSystem.user.dto.UserResponseDtoById;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {
    private final UserServiceImpl userService;

@PreAuthorize("hasRole('ADMIN')")
    @GetMapping  //ADMIN
    public ResponseEntity<List<UserResponseDtoById>> getAllUsers(){
        return ResponseEntity.ok(userService
                .getAllUsers());
    }

@PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/{id}")  //ADMIN
    public ResponseEntity<UserResponseDto> getUser(@PathVariable UUID id){
        System.out.println(id);
        return ResponseEntity.ok(userService.getUserById(id));
    }

@PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}/disable")  //ADMIN
    public ResponseEntity<String> disableUser(@PathVariable UUID id){
        return ResponseEntity.ok(userService.disableUser(id));
    }
}
