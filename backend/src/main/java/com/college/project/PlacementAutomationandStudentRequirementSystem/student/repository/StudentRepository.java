package com.college.project.PlacementAutomationandStudentRequirementSystem.student.repository;

import com.college.project.PlacementAutomationandStudentRequirementSystem.student.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
}
