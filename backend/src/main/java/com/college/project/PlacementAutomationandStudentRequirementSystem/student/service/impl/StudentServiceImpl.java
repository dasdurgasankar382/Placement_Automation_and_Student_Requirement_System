package com.college.project.PlacementAutomationandStudentRequirementSystem.student.service.impl;

import com.college.project.PlacementAutomationandStudentRequirementSystem.student.dto.StudentProfileRequestDto;
import com.college.project.PlacementAutomationandStudentRequirementSystem.student.dto.StudentProfileResponseDto;
import com.college.project.PlacementAutomationandStudentRequirementSystem.student.dto.StudentProfileUpdateRequestDto;
import com.college.project.PlacementAutomationandStudentRequirementSystem.student.entity.Student;
import com.college.project.PlacementAutomationandStudentRequirementSystem.student.repository.StudentRepository;
import com.college.project.PlacementAutomationandStudentRequirementSystem.student.service.StudentService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StudentServiceImpl implements StudentService {

    private final StudentRepository studentRepository;
    private final ModelMapper modelMapper;

    @Override
    public StudentProfileResponseDto createStudentProfile(StudentProfileRequestDto studentProfileRequestDto) {

        Student newStudent = modelMapper.map(studentProfileRequestDto,Student.class);
        studentRepository.save(newStudent);
        return null;
    }

    @Override
    public StudentProfileResponseDto updateStudentProfile(StudentProfileUpdateRequestDto studentProfileUpdateRequestDto) {
        return null;
    }

    @Override
    public StudentProfileResponseDto deleteStudentProfile() {
        return null;
    }
}
