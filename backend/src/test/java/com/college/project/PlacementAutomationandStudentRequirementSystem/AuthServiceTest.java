package com.college.project.PlacementAutomationandStudentRequirementSystem;

import com.college.project.PlacementAutomationandStudentRequirementSystem.auth.dto.LoginRequestDto;
import com.college.project.PlacementAutomationandStudentRequirementSystem.auth.service.impl.AuthServiceImpl;
import lombok.RequiredArgsConstructor;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class AuthServiceTest {

    @Autowired
    private  AuthServiceImpl authService;

    @Test
    public void authServiceTest(){

        LoginRequestDto dto = new LoginRequestDto("janemjaya@gmail.com","test123","ADMIN");
        authService.loginUser( dto);

    }

}
