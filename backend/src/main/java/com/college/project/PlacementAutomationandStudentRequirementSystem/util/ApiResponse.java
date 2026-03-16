package com.college.project.PlacementAutomationandStudentRequirementSystem.util;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class ApiResponse<T> {

    private String message;
    private T data;

    public ApiResponse(String success) {
    }
}
