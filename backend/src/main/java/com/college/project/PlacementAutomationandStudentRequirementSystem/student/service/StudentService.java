package com.college.project.PlacementAutomationandStudentRequirementSystem.student.service;

import com.college.project.PlacementAutomationandStudentRequirementSystem.application.dto.UpdateStatusRequestDto;
import com.college.project.PlacementAutomationandStudentRequirementSystem.student.dto.*;
import com.college.project.PlacementAutomationandStudentRequirementSystem.util.ApiResponse;


import java.util.List;
import java.util.UUID;

public interface StudentService {

    ApiResponse<?> createStudentProfile(StudentProfileRequestDto studentProfileRequestDto);

    ApiResponse<?> updateStudentProfile(StudentProfileUpdateRequestDto studentProfileUpdateRequestDto);

    ApiResponse<?> deleteStudentProfile();

    ApiResponse<?> getProfileEmail();

    ApiResponse<?> getResume();

    ApiResponse<StudentProfileAdminResponseDto> getProfileById(UUID id);

    ApiResponse<List<StudentProfileDto>> getAllStudents();

    ApiResponse<List<JobsForStudentsDto>> getJobsForStudent();
}
