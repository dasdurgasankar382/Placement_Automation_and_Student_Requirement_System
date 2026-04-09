package com.college.project.PlacementAutomationandStudentRequirementSystem.job.service.impl;

import com.college.project.PlacementAutomationandStudentRequirementSystem.company.entity.Company;
import com.college.project.PlacementAutomationandStudentRequirementSystem.company.repository.CompanyRepository;
import com.college.project.PlacementAutomationandStudentRequirementSystem.exception.ResourceAlreadyExistsException;
import com.college.project.PlacementAutomationandStudentRequirementSystem.exception.ResourceNotFoundException;
import com.college.project.PlacementAutomationandStudentRequirementSystem.job.dto.JobRequestDto;
import com.college.project.PlacementAutomationandStudentRequirementSystem.job.dto.JobResponseDto;
import com.college.project.PlacementAutomationandStudentRequirementSystem.job.entity.Job;
import com.college.project.PlacementAutomationandStudentRequirementSystem.job.entity.util.JobStatus;
import com.college.project.PlacementAutomationandStudentRequirementSystem.job.repository.JobRepository;
import com.college.project.PlacementAutomationandStudentRequirementSystem.job.service.JobService;
import com.college.project.PlacementAutomationandStudentRequirementSystem.security.AuthUtil;
import com.college.project.PlacementAutomationandStudentRequirementSystem.user.entity.User;
import com.college.project.PlacementAutomationandStudentRequirementSystem.user.repository.UserRepository;
import com.college.project.PlacementAutomationandStudentRequirementSystem.util.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class JobServiceImpl implements JobService {

    private final JobRepository jobRepository;
    private final ModelMapper modelMapper;
    private final UserRepository userRepository;
    private final CompanyRepository companyRepository;
    private final AuthUtil authUtil;

    @Override
    public ApiResponse<?> createJob(JobRequestDto jobRequestDto) {

        // get recruiter id from token and fetch company id
        UUID id = authUtil.getCurrentUserId();

        System.out.println(id);
        // get recruiter
        User recruiter = userRepository.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("Recruiter not found"));
        // get company
        Company company =recruiter.getCompany();
        if(company == null) {
            throw  new ResourceNotFoundException("Company not found");
        }
        //check if same job exists or not
        if (jobRepository.existsByRoleAndDeadline(jobRequestDto.getRole(),jobRequestDto.getDeadline())){
            throw  new ResourceAlreadyExistsException("Same job already registered for the role "+
                    jobRequestDto.getRole()+" with the same deadline "+jobRequestDto.getDeadline());
        }

        Job job = modelMapper.map(jobRequestDto, Job.class);
        job.setJobStatus(JobStatus.open); // mark as job open user can apply
        job.setCompany(company);
        jobRepository.save(job);
        return new ApiResponse<>("Job created successfully",null);
    }

    @Override
    public ApiResponse<?> updateJobProfile(UUID id, JobRequestDto jobRequestDto) {
        Job job = jobRepository.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("Job not exists"));
        modelMapper.map(jobRequestDto, job);
        jobRepository.save(job);
        return new ApiResponse<>("Job Updated Successfully",null);
    }

    @Override
    public ApiResponse<?> changeJobStatus(UUID id) {
        Job job = jobRepository.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("Job not found"));
        if(job.getJobStatus()==JobStatus.closed){
            throw new ResourceAlreadyExistsException("Already job closed for this id" + id);
        }
        job.setJobStatus(JobStatus.closed);
        jobRepository.save(job);
        return new ApiResponse<>("Job closed successfully",null);
    }

    @Override
    public List<JobResponseDto> getAllJobs() {
        List<Job> jobs = jobRepository.findAllByJobStatus(JobStatus.open);
        return jobs.stream().map(job->modelMapper.map(job, JobResponseDto.class)).toList();
    }

    @Override
    public ApiResponse<List<JobResponseDto>> getAllJobsByCompany() {
        // show list of jobs under a company
        UUID userId = authUtil.getCurrentUserId();   // get user id
        User user = userRepository.findById(userId)
                .orElseThrow(()->new ResourceNotFoundException("User not found"));
        // get company id
        UUID companyId = user.getCompany().getId();
        List<JobResponseDto> responseDtoList = jobRepository.findAllByCompanyId(companyId);
        return new ApiResponse<>("Jobs fetched successfully", responseDtoList);
    }

    @Override
    public JobResponseDto getJobById(UUID id) {
        Job job = jobRepository.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("Job not found"));
        if(job.getJobStatus()==JobStatus.closed){
            throw new ResourceAlreadyExistsException("Already job closed for this id " + id);
        }
        return modelMapper.map(job, JobResponseDto.class);
    }


}
