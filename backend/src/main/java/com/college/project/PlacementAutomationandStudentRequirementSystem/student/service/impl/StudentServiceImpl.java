package com.college.project.PlacementAutomationandStudentRequirementSystem.student.service.impl;

import com.college.project.PlacementAutomationandStudentRequirementSystem.exception.ResourceNotFoundException;
import com.college.project.PlacementAutomationandStudentRequirementSystem.job.entity.Job;
import com.college.project.PlacementAutomationandStudentRequirementSystem.job.repository.JobRepository;
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
import java.util.*;

@Service
@RequiredArgsConstructor
public class StudentServiceImpl implements StudentService {

    private final StudentRepository studentRepository;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    private final AuthUtil authUtil;
    private final JobRepository jobRepository;

    // Centralized method to get user
    private User returnUser() {
        // get id from token
        UUID id = authUtil.getCurrentUserId();
        // Find user through userid by DTO
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User Not exist by id"));
    }

    @Override
    @Transactional
    public ApiResponse<?> createStudentProfile(StudentProfileRequestDto studentProfileRequestDto) {

        User user = returnUser();
        // Check student profile exists or not
        if (studentRepository.existsByUser(user)) {
            throw new ResourceNotFoundException("User profile already exist");
        }

        Student newStudent = modelMapper.map(studentProfileRequestDto, Student.class);
        if (newStudent.getSkills() == null) {
            newStudent.setSkills(new ArrayList<>());
        }
        // add resume
        if (studentProfileRequestDto.getResumeFile() == null) {
            throw new ResourceNotFoundException("Resume file not found");
        }
        // else add file
        PdfDocument newPdf = new PdfDocument();
        newPdf.setName(studentProfileRequestDto.getResumeFile().getOriginalFilename());
        try {
            newPdf.setData(studentProfileRequestDto.getResumeFile().getBytes());
            newPdf.setFileType(studentProfileRequestDto.getResumeFile().getContentType());
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

        Student student = studentRepository.findByUser(returnUser())
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
    @Transactional
    public ApiResponse<?> getProfileEmail() {
        System.out.println(returnUser());
        Optional<Student> student = studentRepository.findByUser(returnUser());
        if(student.isEmpty()){
            return new ApiResponse<>("Profile not exists", null);
        }
        StudentProfileDto dto = modelMapper.map(student, StudentProfileDto.class);

        PdfDocument pdf = student.get().getResume();
        dto.setFileName(pdf.getName());

        return new ApiResponse<>("Success", dto);
    }

    @Override
    @Transactional
    public ApiResponse<?> getResume() {

        Student student = studentRepository.findByUser(returnUser())
                .orElseThrow(() -> new ResourceNotFoundException("Student not register"));
        PdfDocument pdf = student.getResume();
        String base64 = Base64.getEncoder().encodeToString(pdf.getData());
        ResumeResponseDto resumeResponseDto = new ResumeResponseDto(
                pdf.getName(), pdf.getFileType(), base64
        );

        return new ApiResponse<>("Resume fetched successfully", resumeResponseDto);
    }

    @Override
    @Transactional
    public ApiResponse<StudentProfileAdminResponseDto> getProfileById(UUID id) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not exists"));
        StudentProfileAdminResponseDto dto =
                modelMapper.map(student, StudentProfileAdminResponseDto.class);
        dto.setResumeName(student.getResume().getName());
        dto.setEmail(student.getUser().getEmail());
        return new ApiResponse<>("Successfully fetched", dto);
    }

    @Override
    @Transactional
    public ApiResponse<List<JobsForStudentsDto>> getJobsForStudent() {
        Student student = studentRepository.findByUser(returnUser())
                .orElseThrow(() -> new ResourceNotFoundException("Student Don't have profile"));

        List<JobsForStudentsDto> jobList = jobRepository.findJobsForStudent(student.getId());
        return new ApiResponse<>("Job fetched successfully", jobList);
    }

    @Override
    public ApiResponse<List<StudentProfileDto>> getAllStudents() {
        List<Student> students = studentRepository.findAll();
        return new ApiResponse<>("success", students.stream()
                .map(student -> modelMapper.map(student, StudentProfileDto.class))
                .toList());
    }


}
