package com.college.project.PlacementAutomationandStudentRequirementSystem.student.repository;

import com.college.project.PlacementAutomationandStudentRequirementSystem.student.entity.util.PdfDocument;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface PdfDocumentRepository extends JpaRepository<PdfDocument, UUID> {
}
