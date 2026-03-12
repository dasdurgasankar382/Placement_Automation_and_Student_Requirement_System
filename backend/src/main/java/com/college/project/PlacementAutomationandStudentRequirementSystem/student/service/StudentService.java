package com.college.project.PlacementAutomationandStudentRequirementSystem.student.service;

import com.college.project.PlacementAutomationandStudentRequirementSystem.student.dto.StudentProfileRequestDto;
import com.college.project.PlacementAutomationandStudentRequirementSystem.student.dto.StudentProfileResponseDto;
import com.college.project.PlacementAutomationandStudentRequirementSystem.student.dto.StudentProfileUpdateRequestDto;

public interface StudentService {
    StudentProfileResponseDto createStudentProfile(StudentProfileRequestDto studentProfileRequestDto);

    StudentProfileResponseDto updateStudentProfile(StudentProfileUpdateRequestDto studentProfileUpdateRequestDto);

    StudentProfileResponseDto deleteStudentProfile();
}
