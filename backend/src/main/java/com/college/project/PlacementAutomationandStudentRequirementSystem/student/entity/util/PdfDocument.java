package com.college.project.PlacementAutomationandStudentRequirementSystem.student.entity.util;

import com.college.project.PlacementAutomationandStudentRequirementSystem.student.entity.Student;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class PdfDocument {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(nullable = false)
    private UUID id;
    @Column(nullable = false)
    private String name;
    @Lob
    @Column(nullable = false)
    private byte[] data;

    @CreationTimestamp
    private LocalDateTime uploadAt;

//    @OneToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "student_id", nullable = false)
//    private Student student;
}
