package com.college.project.PlacementAutomationandStudentRequirementSystem.security;

import com.college.project.PlacementAutomationandStudentRequirementSystem.role.entity.Role;
import com.college.project.PlacementAutomationandStudentRequirementSystem.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.jspecify.annotations.NonNull;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@RequiredArgsConstructor
public class CostumeUserDetails implements UserDetails {

    private final User user;

    public Long getUserId() {
        return user.getId() != null ? user.getId() : null;
    }

    public String getRole() {
        return user.getRole().getRoleName();
    }

    @Override
    public @NonNull String getUsername() {
        return  user.getEmail();
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        
        return List.of(
                new SimpleGrantedAuthority("ROLE_"+getRole())
        );
    }
}
