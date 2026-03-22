package com.college.project.PlacementAutomationandStudentRequirementSystem.security;

import com.college.project.PlacementAutomationandStudentRequirementSystem.exception.ResourceNotFoundException;
import com.college.project.PlacementAutomationandStudentRequirementSystem.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.jspecify.annotations.NullMarked;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CostumeUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public@NullMarked UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Called by Spring Security during authentication to load user from database
        // username parameter will be the email from login request
        // Must return UserDetails object or throw UsernameNotFoundException if user not found
        return userRepository.findByEmail(username)
                .map(CostumeUserDetails::new)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }
}
