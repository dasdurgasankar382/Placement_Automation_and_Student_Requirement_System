package com.college.project.PlacementAutomationandStudentRequirementSystem.company.controller;

import com.college.project.PlacementAutomationandStudentRequirementSystem.company.service.impl.CompanyServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/companies")
@RequiredArgsConstructor
public class CompanyController {
private final CompanyServiceImpl companyService;


}
