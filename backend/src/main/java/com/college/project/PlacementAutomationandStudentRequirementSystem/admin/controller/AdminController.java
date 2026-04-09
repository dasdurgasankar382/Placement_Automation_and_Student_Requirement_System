package com.college.project.PlacementAutomationandStudentRequirementSystem.admin.controller;

import com.college.project.PlacementAutomationandStudentRequirementSystem.admin.dto.RoleRequestDto;
import com.college.project.PlacementAutomationandStudentRequirementSystem.admin.service.impl.AdminServiceImpl;
import com.college.project.PlacementAutomationandStudentRequirementSystem.util.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {

private final AdminServiceImpl adminService;

    @PostMapping("/create-role")
    public ResponseEntity<ApiResponse<?>> createRole(@Valid @RequestBody RoleRequestDto roleRequestDto){
        return ResponseEntity.ok(adminService.createRole(roleRequestDto));
    }
}
