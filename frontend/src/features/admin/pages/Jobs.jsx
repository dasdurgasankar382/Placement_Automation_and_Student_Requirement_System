import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getAllJobsForAdmin } from "../services/adminService";
import JobCard from "../../../components/ui/JobCard";
import { useNavigate } from "react-router-dom";
import { normalizeJob } from "../../../utils/formatters";
import { Search, Briefcase } from "lucide-react";

const Jobs = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const filtered = jobs.filter(j => 
      j.title?.toLowerCase().includes(term) ||
      j.data?.location?.toLowerCase().includes(term)
    );
    setFilteredJobs(filtered);
  }, [searchTerm, jobs]);

  const fetchJobs = async () => {
    try {
      const { data } = await getAllJobsForAdmin();
      const jobsData = data?.data || data;
      const jobsArray = Array.isArray(jobsData) ? jobsData : [];
      const normalized = jobsArray.map(normalizeJob);
      setJobs(normalized);
      setFilteredJobs(normalized);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to fetch jobs.");
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Manage Jobs</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">Monitor and manage all job postings.</p>
        </div>

        <div className="relative w-full md:w-80 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-purple-500 transition-colors" />
          <input
            type="text"
            placeholder="Search jobs by title, company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-2xl focus:ring-4 focus:ring-purple-500/10 focus:border-purple-500 outline-none transition-all shadow-sm"
          />
        </div>
      </div>

      {filteredJobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredJobs.map((job) => (
            <JobCard 
              key={job.id} 
              job={job} 
              onAction={() => navigate(`/admin/jobs/${job.id}`, { state: { job } })}
              actionText="View Details"
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-white/50 dark:bg-slate-800/30 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700">
          <Briefcase className="h-12 w-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
          <p className="text-slate-500 dark:text-slate-400 text-lg font-medium">No jobs found.</p>
          <p className="text-slate-400 dark:text-slate-500 mt-1">Try adjusting your search criteria.</p>
        </div>
      )}
    </div>
  );
};

export default Jobs;
