package com.college.project.PlacementAutomationandStudentRequirementSystem.student.controller;

import com.college.project.PlacementAutomationandStudentRequirementSystem.application.dto.UpdateStatusRequestDto;
import com.college.project.PlacementAutomationandStudentRequirementSystem.student.dto.*;
import com.college.project.PlacementAutomationandStudentRequirementSystem.student.entity.Student;
import com.college.project.PlacementAutomationandStudentRequirementSystem.student.service.impl.StudentServiceImpl;
import com.college.project.PlacementAutomationandStudentRequirementSystem.util.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/students")
@RequiredArgsConstructor
public class StudentController {

    private final StudentServiceImpl studentServiceImpl;

    @PreAuthorize("hasRole('STUDENT')")
    //access by student
    @PostMapping(value = "/create-profile" ,consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse<?>> createProfile(@Valid @ModelAttribute StudentProfileRequestDto studentProfileRequestDto) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(studentServiceImpl.createStudentProfile(studentProfileRequestDto));
    }

    @PreAuthorize("hasRole('STUDENT')")
    //access by student
    @PatchMapping("/update-profile")
    public ResponseEntity<ApiResponse<?>> updateProfile(@RequestBody StudentProfileUpdateRequestDto studentProfileUpdateRequestDto) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(studentServiceImpl.updateStudentProfile(studentProfileUpdateRequestDto));
    }

    @PreAuthorize("hasRole('STUDENT')")
    //access by student
    @DeleteMapping("/delete-profile")
    public ResponseEntity<ApiResponse<?>> deleteProfile() {
        return ResponseEntity
                .status(HttpStatus.NO_CONTENT)
                .body(studentServiceImpl.deleteStudentProfile());
    }

    @PreAuthorize("hasRole('STUDENT')")
    //access by student
    @GetMapping("/profile/me")
    public ResponseEntity<ApiResponse<?>> getProfile() {
        //after SECURITY ADD here get user email from JWT

        return ResponseEntity.ok(studentServiceImpl.getProfileEmail());
    }

    @PreAuthorize("hasRole('STUDENT', 'RECRUITER)")
    //access by student
    @GetMapping("/profile/me/resume")
    public ResponseEntity<ApiResponse<?>> getResume() {
        return ResponseEntity.ok(studentServiceImpl.getResume());
    }

    @PreAuthorize("hasAnyRole('RECRUITER', 'ADMIN')")
    //access by Recruiter and admin see one particular student
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<StudentProfileAdminResponseDto>> getStudent(@PathVariable UUID id) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(studentServiceImpl.getProfileById(id));
    }

    @PreAuthorize("hasRole('ADMIN')")
    //access by ADMIN to see all students
    @GetMapping
    public ResponseEntity<ApiResponse<List<StudentProfileDto>>> getAllStudents() {
        return ResponseEntity.ok(studentServiceImpl.getAllStudents());
    }
}
