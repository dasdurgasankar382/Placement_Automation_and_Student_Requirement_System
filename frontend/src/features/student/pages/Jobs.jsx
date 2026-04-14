import React, { useState, useEffect } from "react";
import JobSearchBar from "../components/jobs/JobSearchBar";
import JobList from "../components/jobs/JobList";
import { toast } from "react-toastify";
import { jobsForStudent } from "../services/studentService";
import { useNavigate } from "react-router-dom";

const Jobs = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    jobsForStudent()
      .then((res) => {
        const data = res.data?.data || res.data || [];
        console.log("Student Jobs API Response:", data);
        setJobs(
          data.map((item, index) => {
            // Handle both flat and nested (item.job) structures
            const job = item.job || item;
            const id = job.id || job.jobId || item.jobId || item.id || `job-${index}`;
            const title = job.role || job.jobTitle || job.title || item.jobTitle || "Untitled Role";
            const company = job.comapnyName || job.companyName || item.companyName || job.company || item.company || "Unknown Company";
            const rawSalary = job.salary || job.package || job.stipend || item.salary;

            return {
              ...item,
              id,
              title,
              company,
              salary: rawSalary ? `₹${rawSalary.toLocaleString()}` : "Not Disclosed",
              tags: job.skills || job.tags || item.skills || [],
              isApplied: item.status === "APPLIED" || !!item.appliedAt || job.isApplied,
            };
          }),
        );
      })
    .catch(() => toast.error("Failed to load jobs"))
    .finally(() => setLoading(false));
  }, []);

  const filteredJobs = jobs.filter(j => 
    [j.title, j.company].some(val => (val || "").toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Browse Jobs</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Discover and apply for your next career opportunity.</p>
      </div>

      <JobSearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <JobList jobs={filteredJobs} onApply={(job) => navigate(`/student/jobs/${job.id}`, { state: { job } })} />
      )}
    </div>
  );
};

export default Jobs;
