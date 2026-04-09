package com.college.project.PlacementAutomationandStudentRequirementSystem.student.service.impl;

import com.college.project.PlacementAutomationandStudentRequirementSystem.exception.ResourceNotFoundException;
import com.college.project.PlacementAutomationandStudentRequirementSystem.security.AuthUtil;
import com.college.project.PlacementAutomationandStudentRequirementSystem.student.dto.*;
import com.college.project.PlacementAutomationandStudentRequirementSystem.student.entity.Student;
import com.college.project.PlacementAutomationandStudentRequirementSystem.student.entity.util.PdfDocument;
import com.college.project.PlacementAutomationandStudentRequirementSystem.student.repository.StudentRepository;
import com.college.project.PlacementAutomationandStudentRequirementSystem.student.service.StudentService;
import com.college.project.PlacementAutomationandStudentRequirementSystem.user.entity.User;
import com.college.project.PlacementAutomationandStudentRequirementSystem.user.repository.UserRepository;
import com.college.project.PlacementAutomationandStudentRequirementSystem.util.ApiResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class StudentServiceImpl implements StudentService {

    private final StudentRepository studentRepository;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    private final AuthUtil authUtil;

    @Override
    @Transactional
    public ApiResponse<?> createStudentProfile(StudentProfileRequestDto studentProfileRequestDto) {
//        get id from token
        UUID id = authUtil.getCurrentUserId();
        // Find user through userid by DTO
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User Not exist by id"));
        //User active or not

        // Check student profile exists or not
        if (studentRepository.existsByUser(user)) {
            throw new ResourceNotFoundException("User profile already exist");
        }

        Student newStudent = modelMapper.map(studentProfileRequestDto, Student.class);
        if (newStudent.getSkills() == null) {
            newStudent.setSkills(new ArrayList<>());
        }
        // add resume
        if(studentProfileRequestDto.getResumeFile() == null){
            throw new ResourceNotFoundException("Resume file not found");
        }
        // else add file
        PdfDocument newPdf = new PdfDocument();
        newPdf.setName(studentProfileRequestDto.getResumeFile().getOriginalFilename());
        try {
            newPdf.setData(studentProfileRequestDto.getResumeFile().getBytes());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        newStudent.setUser(user);
        newStudent.setResume(newPdf);
        studentRepository.save(newStudent);
        return new ApiResponse<>("Successfully created", null);
    }

    @Override
    @Transactional
    public ApiResponse<?> updateStudentProfile(StudentProfileUpdateRequestDto studentProfileUpdateRequestDto) {

        User user = userRepository.findById(studentProfileUpdateRequestDto.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not exists"));

        Student student = studentRepository.findByUser(user)
                .orElseThrow(() -> new ResourceNotFoundException("Student profile not exists"));

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
        if (studentProfileUpdateRequestDto.getResumeFile() != null) {
            // else add file
            PdfDocument newPdf = new PdfDocument();
            newPdf.setName(studentProfileUpdateRequestDto.getResumeFile().getOriginalFilename());
            try {
                newPdf.setData(studentProfileUpdateRequestDto.getResumeFile().getBytes());
            } catch (IOException e) {
                throw new RuntimeException(e);
            }

            student.setResume(newPdf);
        }
        if (studentProfileUpdateRequestDto.getGraduationYear() != null) {
            student.setGraduationYear(studentProfileUpdateRequestDto.getGraduationYear());
        }

        studentRepository.save(student);

        return new ApiResponse<>("Updated successfully", null);
    }

    @Override
    public ApiResponse<?> deleteStudentProfile() {
        return null;
    }

    @Override
    public ApiResponse<?> getProfileEmail() {

        UUID id = authUtil.getCurrentUserId();

        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Student student = studentRepository.findByUser(user)
                .orElseThrow(() -> new ResourceNotFoundException("Student not register"));

        return new ApiResponse<>("Success", modelMapper.map(student, StudentProfileDto.class));
    }

    @Override
    public ApiResponse<StudentProfileAdminResponseDto> getProfileById(UUID id) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not exists"));
        StudentProfileAdminResponseDto dto =
                modelMapper.map(student, StudentProfileAdminResponseDto.class);
        dto.setEmail(student.getUser().getEmail());
        return new ApiResponse<>("Successfully fetched", dto);
    }

    @Override
    public ApiResponse<List<StudentProfileDto>> getAllStudents() {
        List<Student> students = studentRepository.findAll();
        return new ApiResponse<>("success", students.stream()
                .map(student -> modelMapper.map(student, StudentProfileDto.class))
                .toList());
    }


}
