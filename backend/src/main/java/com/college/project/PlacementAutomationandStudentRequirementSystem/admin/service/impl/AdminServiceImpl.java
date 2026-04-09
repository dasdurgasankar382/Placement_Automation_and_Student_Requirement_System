package com.college.project.PlacementAutomationandStudentRequirementSystem.admin.service.impl;

import com.college.project.PlacementAutomationandStudentRequirementSystem.admin.dto.RoleRequestDto;
import com.college.project.PlacementAutomationandStudentRequirementSystem.exception.ResourceNotFoundException;
import com.college.project.PlacementAutomationandStudentRequirementSystem.role.entity.Role;
import com.college.project.PlacementAutomationandStudentRequirementSystem.role.repository.RoleRepository;
import com.college.project.PlacementAutomationandStudentRequirementSystem.util.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl {

    private final RoleRepository roleRepository;
    private final ModelMapper modelMapper;

    public ApiResponse<?> createRole(RoleRequestDto roleRequestDto) {

//        check role already exists or not
        boolean exists = roleRepository.existsByRoleName(roleRequestDto.getRoleName());
        if (exists) {
            throw new ResourceNotFoundException("Role already exists");
        }
        Role role = modelMapper.map(roleRequestDto, Role.class);
        roleRepository.save(role);
        return new ApiResponse<>("Role created successfully", null);
    }
}
