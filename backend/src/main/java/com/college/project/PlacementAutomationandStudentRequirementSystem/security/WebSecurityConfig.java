//package com.college.project.PlacementAutomationandStudentRequirementSystem.security;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.Customizer;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
//import org.springframework.security.web.SecurityFilterChain;
//
//@Configuration
//public class WebSecurityConfig {
//
//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception{
//        httpSecurity
//                .authorizeHttpRequests(auth->auth
//                        .requestMatchers("/auth/**").permitAll()
//                        .requestMatchers("/student/**").authenticated()
//                );
//                .formLogin(Customizer.withDefaults());
//        return httpSecurity.build();
//    }
//}
