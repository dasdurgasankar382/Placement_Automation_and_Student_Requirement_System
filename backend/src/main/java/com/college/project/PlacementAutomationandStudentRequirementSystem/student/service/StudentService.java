package com.college.project.PlacementAutomationandStudentRequirementSystem.student.service;

import com.college.project.PlacementAutomationandStudentRequirementSystem.student.dto.*;


import java.util.List;

public interface StudentService {
    StudentProfileResponseDto createStudentProfile(StudentProfileRequestDto studentProfileRequestDto);

    StudentProfileResponseDto updateStudentProfile(StudentProfileUpdateRequestDto studentProfileUpdateRequestDto);

    StudentProfileResponseDto deleteStudentProfile();

    StudentProfileDto getProfileEmail(String email);

    StudentProfileAdminResponseDto getProfileById(Long id);

    List<StudentProfileDto> getAllStudents();
}
