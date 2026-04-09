package com.college.project.PlacementAutomationandStudentRequirementSystem.application.dto;

import lombok.*;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class StudentDashboardDto {
    private long totalApplications;
    private long totalInterviewsScheduled;
    private long totalOffersReceived;
}
