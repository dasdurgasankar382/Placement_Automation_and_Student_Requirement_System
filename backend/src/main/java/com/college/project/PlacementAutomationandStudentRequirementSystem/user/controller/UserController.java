package com.college.project.PlacementAutomationandStudentRequirementSystem.user.controller;

import com.college.project.PlacementAutomationandStudentRequirementSystem.user.Service.impl.UserServiceImpl;
import com.college.project.PlacementAutomationandStudentRequirementSystem.user.dto.UserResponseDto;
import com.college.project.PlacementAutomationandStudentRequirementSystem.user.dto.UserResponseDtoById;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {
    private final UserServiceImpl userService;

    @GetMapping  //ADMIN
    public ResponseEntity<List<UserResponseDtoById>> getAllUsers(){
        return ResponseEntity.ok(userService
                .getAllUsers());
    }

    @GetMapping("/{id}")  //ADMIN
    public ResponseEntity<UserResponseDto> getUser(@PathVariable Long id){
        System.out.println(id);
        return ResponseEntity.ok(userService.getUserById(id));
    }

    @PutMapping("/{id}/disable")  //ADMIN
    public ResponseEntity<String> disableUser(@PathVariable Long id){
        return ResponseEntity.ok(userService.disableUser(id));
    }
}
