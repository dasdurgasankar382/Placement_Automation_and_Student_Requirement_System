package com.college.project.PlacementAutomationandStudentRequirementSystem.job.service;

import com.college.project.PlacementAutomationandStudentRequirementSystem.job.entity.Job;
import com.college.project.PlacementAutomationandStudentRequirementSystem.student.entity.Student;

public interface MatchingService {

   boolean isEligible(Student student, Job job);

   Long calculateScore(Student student, Job job);
}
