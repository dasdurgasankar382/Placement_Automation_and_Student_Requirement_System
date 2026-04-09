package com.college.project.PlacementAutomationandStudentRequirementSystem.student.entity;

import com.college.project.PlacementAutomationandStudentRequirementSystem.student.entity.util.PdfDocument;
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
import java.util.UUID;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

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

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "resume_id", nullable = false, referencedColumnName = "id")
    private PdfDocument resume;

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
