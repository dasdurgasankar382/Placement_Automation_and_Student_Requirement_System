package com.college.project.PlacementAutomationandStudentRequirementSystem.job.service.impl;

import com.college.project.PlacementAutomationandStudentRequirementSystem.exception.ResourceAlreadyExistsException;
import com.college.project.PlacementAutomationandStudentRequirementSystem.exception.ResourceNotFoundException;
import com.college.project.PlacementAutomationandStudentRequirementSystem.job.dto.JobRequestDto;
import com.college.project.PlacementAutomationandStudentRequirementSystem.job.dto.JobResponseDto;
import com.college.project.PlacementAutomationandStudentRequirementSystem.job.entity.Job;
import com.college.project.PlacementAutomationandStudentRequirementSystem.job.entity.util.JobStatus;
import com.college.project.PlacementAutomationandStudentRequirementSystem.job.repository.JobRepository;
import com.college.project.PlacementAutomationandStudentRequirementSystem.job.service.JobService;
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

    @Override
    public ApiResponse<?> createJob(JobRequestDto jobRequestDto) {
        //check if same job exists or not
        if (jobRepository.existsByRoleAndDeadline(jobRequestDto.getRole(),jobRequestDto.getDeadline())){
            throw  new ResourceAlreadyExistsException("Same job already registered for the role "+
                    jobRequestDto.getRole()+" with the same deadline "+jobRequestDto.getDeadline());
        }
        Job job = modelMapper.map(jobRequestDto, Job.class);
        job.setJobStatus(JobStatus.open); // mark as job open user can apply
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
    public ApiResponse<?> deleteJob(UUID id) {
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
    public JobResponseDto getJobById(UUID id) {
        Job job = jobRepository.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("Job not found"));
        if(job.getJobStatus()==JobStatus.closed){
            throw new ResourceAlreadyExistsException("Already job closed for this id " + id);
        }
        return modelMapper.map(job, JobResponseDto.class);
    }


}
