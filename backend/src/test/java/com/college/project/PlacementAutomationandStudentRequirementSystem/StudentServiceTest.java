package com.college.project.PlacementAutomationandStudentRequirementSystem;


import com.college.project.PlacementAutomationandStudentRequirementSystem.exception.ResourceNotFoundException;
import com.college.project.PlacementAutomationandStudentRequirementSystem.job.repository.JobRepository;
import com.college.project.PlacementAutomationandStudentRequirementSystem.security.AuthUtil;
import com.college.project.PlacementAutomationandStudentRequirementSystem.student.dto.JobsForStudentsDto;
import com.college.project.PlacementAutomationandStudentRequirementSystem.student.entity.Student;
import com.college.project.PlacementAutomationandStudentRequirementSystem.student.repository.StudentRepository;
import com.college.project.PlacementAutomationandStudentRequirementSystem.student.service.impl.StudentServiceImpl;
import com.college.project.PlacementAutomationandStudentRequirementSystem.user.entity.User;
import com.college.project.PlacementAutomationandStudentRequirementSystem.user.repository.UserRepository;
import com.college.project.PlacementAutomationandStudentRequirementSystem.util.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest;
import org.springframework.boot.jdbc.test.autoconfigure.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Profile;
import org.springframework.test.context.bean.override.mockito.MockitoBean;

import java.util.List;
import java.util.UUID;

import static org.mockito.Mockito.when;
@SpringBootTest
@Profile("test")
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class JobRepositoryTest {

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private StudentRepository repo;

    @Autowired
    private UserRepository userRepository;

    @Test
    void testQuery() {

        User user = userRepository.findAll().getFirst();
        Student student = repo.findByUser(user).orElseThrow();

        List<JobsForStudentsDto> list =
                jobRepository.findJobsForStudent(student.getId());

        list.forEach(System.out::println);
    }
}