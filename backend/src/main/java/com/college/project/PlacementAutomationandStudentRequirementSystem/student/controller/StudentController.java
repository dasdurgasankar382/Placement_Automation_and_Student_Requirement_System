package com.college.project.PlacementAutomationandStudentRequirementSystem.student.controller;

import com.college.project.PlacementAutomationandStudentRequirementSystem.student.dto.StudentProfileRequestDto;
import com.college.project.PlacementAutomationandStudentRequirementSystem.student.dto.StudentProfileResponseDto;
import com.college.project.PlacementAutomationandStudentRequirementSystem.student.dto.StudentProfileUpdateRequestDto;
import com.college.project.PlacementAutomationandStudentRequirementSystem.student.service.impl.StudentServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/student")
@RequiredArgsConstructor
public class StudentController {

    private final StudentServiceImpl studentServiceImpl;

    @PostMapping("/create-profile")
    public ResponseEntity<StudentProfileResponseDto> createProfile(@RequestBody StudentProfileRequestDto studentProfileRequestDto) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(studentServiceImpl.createStudentProfile(studentProfileRequestDto));
    }

    @PatchMapping("/update-profile")
    public ResponseEntity<StudentProfileResponseDto> updateProfile(@RequestBody StudentProfileUpdateRequestDto studentProfileUpdateRequestDto) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(studentServiceImpl.updateStudentProfile(studentProfileUpdateRequestDto));
    }

    @DeleteMapping("/delete-profile")
    public ResponseEntity<StudentProfileResponseDto> deleteProfile() {
        return ResponseEntity
                .status(HttpStatus.NO_CONTENT)
                .body(studentServiceImpl.deleteStudentProfile());
    }

    @GetMapping("/profile/{id}")
    public ResponseEntity<?> getProfile(@PathVariable Long id){
        return ResponseEntity.ok(studentServiceImpl.getProfileId(id));
    }

}
