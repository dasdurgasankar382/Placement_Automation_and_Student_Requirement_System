package com.college.project.PlacementAutomationandStudentRequirementSystem.admin.controller;

import com.college.project.PlacementAutomationandStudentRequirementSystem.admin.dto.RoleRequestDto;
import com.college.project.PlacementAutomationandStudentRequirementSystem.admin.service.impl.AdminServiceImpl;
import com.college.project.PlacementAutomationandStudentRequirementSystem.util.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {

private final AdminServiceImpl adminService;

    @GetMapping("/profile")
    public ResponseEntity<ApiResponse<?>> getProfile() {
        return ResponseEntity.ok(adminService.getProfile());
    }
}
