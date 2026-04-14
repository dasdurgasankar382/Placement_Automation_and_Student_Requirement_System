package com.college.project.PlacementAutomationandStudentRequirementSystem.admin.dto;

import lombok.Data;

@Data
public class AdminResponseDto {

    private Long totalUsers;
    private Long activeJobs;
    private Long totalRegisteredCompany;
    private String adminName;

    public AdminResponseDto(Long totalUsers, Long activeJobs, Long totalRegisteredCompany, String adminName) {
        this.totalUsers = totalUsers;
        this.activeJobs = activeJobs;
        this.totalRegisteredCompany = totalRegisteredCompany;
        this.adminName = adminName;
    }
}
