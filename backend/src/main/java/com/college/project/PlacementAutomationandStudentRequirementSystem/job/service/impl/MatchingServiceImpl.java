package com.college.project.PlacementAutomationandStudentRequirementSystem.job.service.impl;

import com.college.project.PlacementAutomationandStudentRequirementSystem.job.entity.Job;
import com.college.project.PlacementAutomationandStudentRequirementSystem.job.service.MatchingService;
import com.college.project.PlacementAutomationandStudentRequirementSystem.student.entity.Student;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class MatchingServiceImpl implements MatchingService {
    private static final Map<String, String> SKILL_SYNONYMS = Map.of(
            "js", "javascript",
            "node", "nodejs",
            "reactjs", "react",
            "springboot", "spring",
            "html5", "html",
            "css3", "css"
    );

    private String normalize(String skill) {
        if (skill == null) return "";

        String cleaned = skill.trim().toLowerCase()
                .replaceAll("[^a-z0-9]", "");

        return SKILL_SYNONYMS.getOrDefault(cleaned, cleaned);
    }

    private boolean isMatch(String studentSkill, String jobSkill) {
        return studentSkill.equals(jobSkill) ||
                studentSkill.contains(jobSkill) ||
                jobSkill.contains(studentSkill);
    }

    @Override
    public Long calculateScore(Student student, Job job) {

        if (job.getSkills() == null || job.getSkills().isEmpty()) return 0L;

        List<String> studentSkills = student.getSkills().stream()
                .map(this::normalize)
                .toList();

        List<String> jobSkills = job.getSkills().stream()
                .map(this::normalize)
                .toList();

        double totalScore = 0;
        double maxScore = 0;

        for (int i = 0; i < jobSkills.size(); i++) {

            String jobSkill = jobSkills.get(i);

            // 🔥 weight: first skills more important
            double weight = (i < 2) ? 2.0 : 1.0;
            maxScore += weight;

            boolean matched = studentSkills.stream()
                    .anyMatch(s -> isMatch(s, jobSkill));

            if (matched) {
                totalScore += weight;
            }
        }

        return (long) ((totalScore * 100) / maxScore);
    }
    @Override
    public boolean isEligible(Student student, Job job) {

        if (student.getCgpa() < job.getCgpa()) return false;
        Long score = calculateScore(student, job);
        return score >= 60; // you can tune
    }
}
