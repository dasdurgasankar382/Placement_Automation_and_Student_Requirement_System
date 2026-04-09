package com.college.project.PlacementAutomationandStudentRequirementSystem.config;

import io.github.cdimascio.dotenv.Dotenv;
import jakarta.annotation.PostConstruct;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;


@Configuration
public class DotEnvConfig {

    @Profile("1ocal")
    @PostConstruct
    public void loadEnv(){
        Dotenv dotenv = Dotenv.load();

        dotenv.entries().forEach(
                entry -> System.setProperty(entry.getKey(), entry.getValue())
        );
    }
}
