import React from "react";
import { PlusCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { mockJobs } from "../../../config/recruiter/recruiterConfig";
import JobCard from "../../../components/ui/JobCard";

const JobsList = () => {
  const navigate = useNavigate();

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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mockJobs.map(job => (
          <JobCard 
            key={job.id} 
            job={job} 
            actionText={`View Applicants (${job.applicantsCount || 0})`}
            onAction={() => navigate(`/recruiter/jobs/${job.id}/applicants`)} 
          />
        ))}
      </div>
    </div>
  );
};

export default JobsList;
