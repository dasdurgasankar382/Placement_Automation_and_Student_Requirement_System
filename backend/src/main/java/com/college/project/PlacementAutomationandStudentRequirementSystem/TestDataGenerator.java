package com.college.project.PlacementAutomationandStudentRequirementSystem;

import com.college.project.PlacementAutomationandStudentRequirementSystem.application.entity.Application;
import com.college.project.PlacementAutomationandStudentRequirementSystem.application.entity.util.ApplicationStatus;
import com.college.project.PlacementAutomationandStudentRequirementSystem.application.repository.ApplicationRepository;
import com.college.project.PlacementAutomationandStudentRequirementSystem.company.entity.Company;
import com.college.project.PlacementAutomationandStudentRequirementSystem.company.repository.CompanyRepository;
import com.college.project.PlacementAutomationandStudentRequirementSystem.job.entity.Job;
import com.college.project.PlacementAutomationandStudentRequirementSystem.job.entity.util.JobStatus;
import com.college.project.PlacementAutomationandStudentRequirementSystem.job.repository.JobRepository;
import com.college.project.PlacementAutomationandStudentRequirementSystem.role.entity.Role;
import com.college.project.PlacementAutomationandStudentRequirementSystem.role.repository.RoleRepository;
import com.college.project.PlacementAutomationandStudentRequirementSystem.student.entity.Student;
import com.college.project.PlacementAutomationandStudentRequirementSystem.student.entity.util.PdfDocument;
import com.college.project.PlacementAutomationandStudentRequirementSystem.student.repository.StudentRepository;
import com.college.project.PlacementAutomationandStudentRequirementSystem.student.repository.PdfDocumentRepository;
import com.college.project.PlacementAutomationandStudentRequirementSystem.user.entity.User;
import com.college.project.PlacementAutomationandStudentRequirementSystem.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Random;
import java.util.UUID;

//@Component
public class TestDataGenerator implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private RoleRepository roleRepository;
    
    @Autowired
    private CompanyRepository companyRepository;
    
    @Autowired
    private StudentRepository studentRepository;
    
    @Autowired
    private PdfDocumentRepository pdfDocumentRepository;
    
    @Autowired
    private JobRepository jobRepository;
    
    @Autowired
    private ApplicationRepository applicationRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;

    private final Random random = new Random();
    
    private final List<String> companyNames = Arrays.asList(
        "Tech Solutions Inc", "Digital Innovations Ltd", "Cloud Systems Co", "Data Analytics Pro",
        "AI Technologies", "Cyber Security Experts", "Mobile App Developers", "Web Design Studio",
        "Software Engineering Co", "IT Consulting Group"
    );
    
    private final List<String> jobRoles = Arrays.asList(
        "Software Engineer", "Full Stack Developer", "Backend Developer", "Frontend Developer",
        "DevOps Engineer", "Data Scientist", "Machine Learning Engineer", "Cloud Architect",
        "Cyber Security Analyst", "Mobile App Developer", "QA Engineer", "Database Administrator",
        "System Administrator", "Network Engineer", "Product Manager", "Technical Lead",
        "Senior Developer", "Junior Developer", "Intern Developer", "Web Developer"
    );
    
    private final List<String> skills = Arrays.asList(
        "Java", "Python", "JavaScript", "React", "Angular", "Node.js", "Spring Boot", "Hibernate",
        "MySQL", "PostgreSQL", "MongoDB", "Docker", "Kubernetes", "AWS", "Azure", "Git",
        "Jenkins", "CI/CD", "Agile", "Scrum", "REST API", "GraphQL", "Microservices", "TDD"
    );
    
    private final List<String> studentNames = Arrays.asList(
        "Alice Johnson", "Bob Smith", "Charlie Brown", "Diana Prince", "Edward Norton",
        "Fiona Green", "George Wilson", "Hannah Montana", "Ian McKellen", "Julia Roberts",
        "Kevin Hart", "Linda Carter", "Michael Jordan", "Nancy Drew", "Oscar Wilde",
        "Patricia Jones", "Quentin Tarantino", "Rachel Green", "Steve Rogers", "Tina Turner"
    );
    
    private final List<String> branches = Arrays.asList(
        "Computer Science", "Information Technology", "Electronics", "Mechanical", "Civil"
    );

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        System.out.println("Adding test data to existing database...");
        
        // Create or get existing roles
        Role companyRole = roleRepository.findByRoleName("RECRUITER")
                .orElseGet(() -> createRole("RECRUITER"));
        Role studentRole = roleRepository.findByRoleName("STUDENT")
                .orElseGet(() -> createRole("STUDENT"));
        
        // Create companies and their recruiters
        List<Company> companies = createCompaniesWithRecruiters(companyRole);
        
        // Create jobs for each company
        List<Job> jobs = createJobsForCompanies(companies);
        
        // Create students
        List<Student> students = createStudents(studentRole);
        
        // Create applications
        createApplications(students, jobs);
        
        System.out.println("Test data generation completed!");
        System.out.println("Created: " + companies.size() + " companies");
        System.out.println("Created: " + jobs.size() + " jobs");
        System.out.println("Created: " + students.size() + " students");
        System.out.println("Created: " + applicationRepository.count() + " applications");
    }
    
    private Role createRole(String roleName) {
        Role role = new Role();
        role.setRoleName(roleName);
        return roleRepository.save(role);
    }
    
    private List<Company> createCompaniesWithRecruiters(Role companyRole) {
        return companyNames.stream().map(companyName -> {
            String email = companyName.toLowerCase().replace(" ", "") + "@company.com";
            
            // Check if user already exists
            User user = userRepository.findByEmail(email).orElseGet(() -> {
                User newUser = new User();
                newUser.setEmail(email);
                newUser.setPassword(passwordEncoder.encode("password123"));
                newUser.setActive(true);
                newUser.setRole(companyRole);
                return userRepository.save(newUser);
            });
            
            // Check if company already exists for this user
            if (companyRepository.findByUser(user).isPresent()) {
                System.out.println("Company already exists for user: " + email);
                return companyRepository.findByUser(user).get();
            }
            
            // Create company
            Company company = new Company();
            company.setName(companyName);
            company.setLocation("City " + (random.nextInt(10) + 1));
            company.setWebsite("https://" + companyName.toLowerCase().replace(" ", "") + ".com");
            company.setDescription(companyName + " is a leading technology company");
            company.setUser(user);
            return companyRepository.save(company);
        }).toList();
    }
    
    private List<Job> createJobsForCompanies(List<Company> companies) {
        return companies.stream().flatMap(company -> {
            return jobRoles.stream().limit(5).map(jobRole -> {
                Job job = new Job();
                job.setRole(jobRole);
                job.setSkills(getRandomSkills());
                job.setSalary(50000.0 + random.nextDouble() * 100000.0);
                job.setDescription("We are looking for a " + jobRole + " to join our team.");
                job.setDeadline(LocalDate.now().plusMonths(random.nextInt(6) + 1));
                job.setJobStatus(JobStatus.OPEN);
                job.setCgpa(6.0f + random.nextFloat() * 2.0f); // CGPA requirement: 6.0-8.0
                job.setCompany(company);
                return jobRepository.save(job);
            });
        }).toList();
    }
    
    private List<Student> createStudents(Role studentRole) {
        return studentNames.stream().map(studentName -> {
            String email = studentName.toLowerCase().replace(" ", "") + "@student.com";
            
            // Check if user already exists
            User user = userRepository.findByEmail(email).orElseGet(() -> {
                User newUser = new User();
                newUser.setEmail(email);
                newUser.setPassword(passwordEncoder.encode("password123"));
                newUser.setActive(true);
                newUser.setRole(studentRole);
                return userRepository.save(newUser);
            });
            
            // Check if student already exists for this user
            if (studentRepository.findByUser(user).isPresent()) {
                System.out.println("Student already exists for user: " + email);
                return studentRepository.findByUser(user).get();
            }
            
            // Create resume
            PdfDocument resume = new PdfDocument();
            resume.setName(studentName + "_resume.pdf");
            resume.setData("dummy resume data".getBytes());
            resume.setFileType("application/pdf");
            resume = pdfDocumentRepository.save(resume);
            
            // Create student
            Student student = new Student();
            student.setName(studentName);
            student.setBranch(branches.get(random.nextInt(branches.size())));
            student.setCgpa(6.0f + random.nextFloat() * 4.0f);
            student.setPhone("+91" + String.format("%10d", random.nextInt(1000000000)));
            student.setSkills(getRandomSkills());
            student.setResume(resume);
            student.setGraduationYear(2024 + random.nextInt(3));
            student.setUser(user);
            return studentRepository.save(student);
        }).toList();
    }
    
    private void createApplications(List<Student> students, List<Job> jobs) {
        students.forEach(student -> {
            // Each student applies to 5-8 random jobs
            int numApplications = 5 + random.nextInt(4);
            List<Job> availableJobs = new java.util.ArrayList<>(jobs);
            java.util.Collections.shuffle(availableJobs);
            
            for (int i = 0; i < Math.min(numApplications, availableJobs.size()); i++) {
                Job job = availableJobs.get(i);
                
                Application application = new Application();
                application.setStudent(student.getUser());
                application.setJob(job);
                application.setStatus(getRandomApplicationStatus());
                applicationRepository.save(application);
            }
        });
    }
    
    private List<String> getRandomSkills() {
        int numSkills = 3 + random.nextInt(4);
        List<String> shuffledSkills = new java.util.ArrayList<>(skills);
        java.util.Collections.shuffle(shuffledSkills);
        return shuffledSkills.subList(0, numSkills);
    }
    
    private ApplicationStatus getRandomApplicationStatus() {
        ApplicationStatus[] statuses = ApplicationStatus.values();
        return statuses[random.nextInt(statuses.length)];
    }
}
