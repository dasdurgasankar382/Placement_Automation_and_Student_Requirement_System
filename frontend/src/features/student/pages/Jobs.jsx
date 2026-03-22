import React, { useState } from "react";
import { mockJobs as MOCK_JOBS } from "../../../config/student/studentConfig";
import JobSearchBar from "../components/jobs/JobSearchBar";
import JobList from "../components/jobs/JobList";

const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredJobs = MOCK_JOBS.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    job.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleApply = (job) => {
    alert(`Applying for ${job.title}...`);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Browse Jobs</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Discover and apply for your next career opportunity.</p>
      </div>

      <JobSearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <JobList jobs={filteredJobs} onApply={handleApply} />

    </div>
  );
};

export default Jobs;
