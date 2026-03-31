package com.college.project.PlacementAutomationandStudentRequirementSystem.config;

import io.github.cdimascio.dotenv.Dotenv;
import jakarta.annotation.PostConstruct;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;


@Profile("local")
@Configuration
public class DotEnvConfig {

    @PostConstruct
    public void loadEnv(){
        Dotenv dotenv = Dotenv.load();

        dotenv.entries().forEach(
                entry -> System.setProperty(entry.getKey(), entry.getValue())
        );
    }
}
