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

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class JobServiceImpl implements JobService {

    private final JobRepository jobRepository;
    private final ModelMapper modelMapper;

    @Override
    public ApiResponse<?> createJob(JobRequestDto jobRequestDto) {
        if (jobRepository.existsByRoleAndDeadline(jobRequestDto.getRole(),jobRequestDto.getDeadline())){
            throw  new ResourceAlreadyExistsException("Same job already registered for the role "+
                    jobRequestDto.getRole()+" with the same deadline "+jobRequestDto.getDeadline());
        }
        Job job = modelMapper.map(jobRequestDto, Job.class);
        job.setJobStatus(JobStatus.open); // mark as job open user can apply
        jobRepository.save(job);
        return new ApiResponse<>("success");
    }

    @Override
    public ApiResponse<?> updateJobProfile(UUID id, JobRequestDto jobRequestDto) {
        Job job = jobRepository.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("Job not exists"));
        modelMapper.map(jobRequestDto, job);
        jobRepository.save(job);
        return new ApiResponse<>("Job Updated Successfully");
    }

    @Override
    public ApiResponse<?> deleteJob(UUID id) {
        Job job = jobRepository.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("Job not found"));
        job.setJobStatus(JobStatus.closed);
        jobRepository.save(job);
        return new ApiResponse<>("Job closed successfully");
    }


}
