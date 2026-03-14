package com.college.project.PlacementAutomationandStudentRequirementSystem.student.entity;

import com.college.project.PlacementAutomationandStudentRequirementSystem.user.entity.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String branch;

    @Column(nullable = false)
    private Float cgpa;

    @Column(nullable = false)
    private String phone;

    @CollectionTable(name = "student_skills",
    joinColumns = @JoinColumn(name = "student_id"))
    private List<String> skills = new ArrayList<>();

    @Column(nullable = false)
    private String resumeUrl;

    @Column(nullable = false)
    private Integer graduationYear;

    @CreationTimestamp
    @Column(nullable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(nullable = false)
    private LocalDateTime updatedAt;

    @OneToOne
    @JoinColumn(name = "user_id",nullable = false)
    private User user;

}
