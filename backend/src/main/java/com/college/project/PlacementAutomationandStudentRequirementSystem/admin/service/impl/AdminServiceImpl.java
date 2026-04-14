package com.college.project.PlacementAutomationandStudentRequirementSystem.admin.service.impl;

import com.college.project.PlacementAutomationandStudentRequirementSystem.admin.dto.RoleRequestDto;
import com.college.project.PlacementAutomationandStudentRequirementSystem.admin.service.AdminService;
import com.college.project.PlacementAutomationandStudentRequirementSystem.exception.ResourceNotFoundException;
import com.college.project.PlacementAutomationandStudentRequirementSystem.role.entity.Role;
import com.college.project.PlacementAutomationandStudentRequirementSystem.role.repository.RoleRepository;
import com.college.project.PlacementAutomationandStudentRequirementSystem.util.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {

    private final RoleRepository roleRepository;
    private final ModelMapper modelMapper;

    @Override
    public ApiResponse<?> getProfile() {
        return null;
    }
}
