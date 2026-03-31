import React from "react";
import { ArrowRight, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";
import { dashboardStatsConfig, mockJobs } from "../../../config/recruiter/recruiterConfig";
import StatCard from "../../../components/ui/StatCard";
import JobCard from "../../../components/ui/JobCard";

const Dashboard = () => {
  return (
    <div className="space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Recruiter Overview</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Manage your job postings and applicants globally.</p>
        </div>
        <Link 
          to="/recruiter/jobs/create" 
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-medium shadow-lg shadow-emerald-500/30 flex items-center gap-2 transition-all hover:pr-4"
        >
          Post a Job <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Structured Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dashboardStatsConfig.map((stat) => (
          <StatCard key={stat.id} {...stat} />
        ))}
      </div>

      {/* Recent Jobs Section */}
      <div className="mt-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-emerald-500" /> Recent Job Postings
          </h2>
          <Link to="/recruiter/jobs" className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">
            View All Jobs &rarr;
          </Link>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {mockJobs.map(job => (
            <JobCard 
              key={job.id} 
              job={job} 
              actionText="View Applicants" 
              onAction={() => alert(`Viewing applicants for ${job.title}`)} 
            />
          ))}
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
