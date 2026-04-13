package com.college.project.PlacementAutomationandStudentRequirementSystem.config;

import com.college.project.PlacementAutomationandStudentRequirementSystem.role.entity.Role;
import com.college.project.PlacementAutomationandStudentRequirementSystem.role.repository.RoleRepository;
import com.college.project.PlacementAutomationandStudentRequirementSystem.user.entity.User;
import com.college.project.PlacementAutomationandStudentRequirementSystem.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final RoleRepository roleRepo;
    private final UserRepository userRepo;
    private final PasswordEncoder encoder;

    @Override
    public void run(String... args) {

        // 1. Create Roles if not exist
        if (roleRepo.count() == 0) {
            roleRepo.saveAll(List.of(
                    new Role("ADMIN"),
                    new Role("STUDENT"),
                    new Role("RECRUITER")
            ));
        }

        // 2. Create Admin if not exist
        if (userRepo.findByEmail("janmejaya@gmail.com").isEmpty()) {
            User admin = new User();
            Role adminRole = roleRepo.findByRoleName("ADMIN").orElseThrow(()->new RuntimeException("Role not found"));
            admin.setEmail("janmejaya@gmail.com");
            admin.setPassword(encoder.encode("admin1234"));
            admin.setRole(adminRole);
            userRepo.save(admin);
        }
    }
}