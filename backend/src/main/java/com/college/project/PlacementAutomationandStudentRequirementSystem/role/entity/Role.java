package com.college.project.PlacementAutomationandStudentRequirementSystem.role.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "roles")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false,unique = true)
    private String roleName;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    public Role(String roleName) {
        this.roleName = roleName;
    }
}
