import React, { useState, useEffect } from "react";
import { PlusCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import JobCard from "../../../components/ui/JobCard";
import { getRecruiterJobs, closeJob } from "../services/recruiterService";
import { toast } from "react-toastify";

const JobsList = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const { data } = await getRecruiterJobs();
      
      const jobsArray = data?.data || [];
      
      // Map backend payload to frontend expected fields
      const mappedJobs = jobsArray.map(job => ({
        id: job.id,
        title: job.role,
        salary: `₹${job.salary?.toLocaleString()}`,
        deadline: job.deadline,
        tags: job.skills || [],
        status: job.jobStatus || job.status || "OPEN",
        applicantsCount: 0 // Waiting for backend support for applicant counting
      }));
      
      setJobs(mappedJobs);
    } catch (err) {
      console.error("Failed to fetch company jobs:", err);
      toast.error("Failed to load your jobs from server.");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseJob = async (jobId) => {
    if(!window.confirm("Are you sure you want to close this job?")) return;
    try {
      const { data } = await closeJob(jobId);
      if(data?.success !== false) {
        toast.success(data?.message || "Job closed successfully!");
        setJobs(jobs.filter(j => j.id !== jobId)); // Remove from UI dynamically
      } else {
        toast.error(data?.message || "Failed to close job.");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Error closing job.");
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Active Postings</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Manage and track your active job listings.</p>
        </div>
        <Link 
          to="/recruiter/jobs/create" 
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-medium shadow-lg shadow-emerald-500/30 flex items-center gap-2 transition-all hover:scale-105"
        >
          <PlusCircle className="h-5 w-5" /> Post New Job
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-500"></div>
        </div>
      ) : jobs.length === 0 ? (
        <div className="text-center py-20 bg-white/50 dark:bg-slate-800/50 rounded-3xl border border-slate-200 dark:border-slate-700 border-dashed">
          <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300">No active jobs found.</h3>
          <p className="text-slate-500 dark:text-slate-400 mt-2">Create your first job posting to start gathering applicants.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {jobs.map(job => (
            console.log(job),
            <JobCard 
              key={job.id} 
              job={job} 
              onEdit={() => navigate(`/recruiter/jobs/edit/${job.id}`)}
              onClose={() => handleCloseJob(job.id)}
              actionText={`View Applicants `}
              onAction={() => navigate(`/recruiter/jobs/${job.id}/applicants`)} 
              isClosed = {job.status !== "open"}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default JobsList;
