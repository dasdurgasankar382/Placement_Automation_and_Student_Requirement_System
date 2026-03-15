package com.college.project.PlacementAutomationandStudentRequirementSystem.student.service.impl;

import com.college.project.PlacementAutomationandStudentRequirementSystem.exception.ResourceAlreadyExistsException;
import com.college.project.PlacementAutomationandStudentRequirementSystem.exception.ResourceNotFoundException;
import com.college.project.PlacementAutomationandStudentRequirementSystem.student.dto.*;
import com.college.project.PlacementAutomationandStudentRequirementSystem.student.entity.Student;
import com.college.project.PlacementAutomationandStudentRequirementSystem.student.repository.StudentRepository;
import com.college.project.PlacementAutomationandStudentRequirementSystem.student.service.StudentService;
import com.college.project.PlacementAutomationandStudentRequirementSystem.user.entity.User;
import com.college.project.PlacementAutomationandStudentRequirementSystem.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class StudentServiceImpl implements StudentService {

    private final StudentRepository studentRepository;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    @Override
    @Transactional
    public StudentProfileResponseDto createStudentProfile(StudentProfileRequestDto studentProfileRequestDto) {

        // Find user through userid by DTO
        User user = userRepository.findById(studentProfileRequestDto.getUser_id())
                .orElseThrow(()->new ResourceNotFoundException("User Not exist by id"));

        //User active or not

        // Check student profile exists or not
        if(studentRepository.existsByUser(user)) {
                return new StudentProfileResponseDto("User profile already exist");
        }

        Student newStudent = modelMapper.map(studentProfileRequestDto,Student.class);
        if(newStudent.getSkills() == null) {
            newStudent.setSkills(new ArrayList<>());
        }
        newStudent.setUser(user);
        studentRepository.save(newStudent);
        return new StudentProfileResponseDto("Successfully created");
    }

    @Override
    @Transactional
    public StudentProfileResponseDto updateStudentProfile(StudentProfileUpdateRequestDto studentProfileUpdateRequestDto) {

        User user = userRepository.findById(studentProfileUpdateRequestDto.getUserId())
                .orElseThrow(()->new ResourceNotFoundException("User not exists"));

        Student student = studentRepository.findByUser(user)
                .orElseThrow(()-> new ResourceNotFoundException("Student profile not exists"));

        if (studentProfileUpdateRequestDto.getName() != null) {
            student.setName(studentProfileUpdateRequestDto.getName());
        }
        if (studentProfileUpdateRequestDto.getBranch() != null) {
            student.setBranch(studentProfileUpdateRequestDto.getBranch());
        }
        if (studentProfileUpdateRequestDto.getCgpa() != null) {
            student.setCgpa(studentProfileUpdateRequestDto.getCgpa());
        }
        if (studentProfileUpdateRequestDto.getPhone() != null) {
            student.setPhone(studentProfileUpdateRequestDto.getPhone());
        }
        if (studentProfileUpdateRequestDto.getSkills() != null) {
            student.setSkills(studentProfileUpdateRequestDto.getSkills());
        }
        if (studentProfileUpdateRequestDto.getResumeUrl() != null) {
            student.setResumeUrl(studentProfileUpdateRequestDto.getResumeUrl());
        }
        if (studentProfileUpdateRequestDto.getGraduationYear() != null) {
            student.setGraduationYear(studentProfileUpdateRequestDto.getGraduationYear());
        }

        studentRepository.save(student);

        return new StudentProfileResponseDto("Updated successfully");
    }

    @Override
    public StudentProfileResponseDto deleteStudentProfile() {
        return null;
    }

    @Override
    public StudentProfileDto getProfileEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Student student = studentRepository.findByUser(user)
                .orElseThrow(()->new ResourceNotFoundException("Student not register"));

        return modelMapper.map(student, StudentProfileDto.class);
    }

    @Override
    public StudentProfileAdminResponseDto getProfileById(Long id) {
        Student student = studentRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("User not exists"));
        StudentProfileAdminResponseDto dto =
                modelMapper.map(student, StudentProfileAdminResponseDto.class);
        dto.setEmail(student.getUser().getEmail());
        return dto;
    }

    @Override
    public List<StudentProfileDto> getAllStudents() {
        List<Student> students = studentRepository.findAll();
        return students.stream()
                .map(student->modelMapper.map(student, StudentProfileDto.class))
                .toList();
    }


}
