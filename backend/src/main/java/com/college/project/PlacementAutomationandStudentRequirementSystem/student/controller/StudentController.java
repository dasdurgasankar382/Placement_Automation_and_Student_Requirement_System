package com.college.project.PlacementAutomationandStudentRequirementSystem.student.controller;

import com.college.project.PlacementAutomationandStudentRequirementSystem.student.dto.*;
import com.college.project.PlacementAutomationandStudentRequirementSystem.student.entity.Student;
import com.college.project.PlacementAutomationandStudentRequirementSystem.student.service.impl.StudentServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/students")
@RequiredArgsConstructor
public class StudentController {

    private final StudentServiceImpl studentServiceImpl;

    //access by student
    @PostMapping("/create-profile")
    public ResponseEntity<StudentProfileResponseDto> createProfile(@RequestBody StudentProfileRequestDto studentProfileRequestDto) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(studentServiceImpl.createStudentProfile(studentProfileRequestDto));
    }

    //access by student
    @PatchMapping("/update-profile")
    public ResponseEntity<StudentProfileResponseDto> updateProfile(@RequestBody StudentProfileUpdateRequestDto studentProfileUpdateRequestDto) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(studentServiceImpl.updateStudentProfile(studentProfileUpdateRequestDto));
    }

    //access by student
    @DeleteMapping("/delete-profile")
    public ResponseEntity<StudentProfileResponseDto> deleteProfile() {
        return ResponseEntity
                .status(HttpStatus.NO_CONTENT)
                .body(studentServiceImpl.deleteStudentProfile());
    }

    //access by student
    @GetMapping("/profile/me")
    public ResponseEntity<?> getProfile(@RequestHeader("email") String email){
        //after SECURITY ADD here get user email from JWT

        return ResponseEntity.ok(studentServiceImpl.getProfileEmail(email));
    }

    //access by Recruiter and admin see one particular student
    @GetMapping("/{id}")
    public ResponseEntity<StudentProfileAdminResponseDto> getStudent(@PathVariable Long id){
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(studentServiceImpl.getProfileById(id));
    }

    //access by ADMIN to see all students
    @GetMapping
    public ResponseEntity<List<StudentProfileDto>> getAllStudents(){
        return ResponseEntity.ok(studentServiceImpl.getAllStudents());
    }
}
