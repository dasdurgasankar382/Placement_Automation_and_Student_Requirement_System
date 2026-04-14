import React, { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import { toast } from "react-toastify";
import { getAllJobsForAdmin } from "../services/adminService";
import DataTable from "../../../components/ui/DataTable";
import { useNavigate } from "react-router-dom";

const Jobs = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  const normalizeJob = (job = {}) => {
    const nestedJob = job.job || {};
    return {
      ...job,
      ...nestedJob,
      id: job.id || nestedJob.id,
      title: nestedJob.role || nestedJob.title || job.title || job.role || "Untitled Role",
      companyName: job.companyName || nestedJob.companyName || job.company || "Unknown Company",
      location: job.location || nestedJob.location || "Unknown Location",
      salary: job.salary || nestedJob.salary || nestedJob.package || nestedJob.stipend || "Not Disclosed",
      deadline: job.deadline || nestedJob.deadline || "",
      status: (job.status || nestedJob.status || "").toString().toUpperCase(),
      skills: nestedJob.skills || job.skills || nestedJob.tags || job.tags || [],
      description: job.description || nestedJob.description || "No description provided.",
    };
  };

  const fetchJobs = async () => {
    try {
      const { data } = await getAllJobsForAdmin();
      const jobsData = data?.data || data;
      const jobsArray = Array.isArray(jobsData) ? jobsData : [];
      setJobs(jobsArray.map(normalizeJob));
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to fetch jobs.");
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      header: "Job ID",
      render: (row) => <span className="font-mono text-xs">{String(row.id).substring(0, 8)}...</span>
    },
    {
      header: "Job Role",
      accessor: "title",
      cellClassName: "font-medium text-slate-900 dark:text-white"
    },
    { header: "Company", accessor: "companyName" },
    { header: "Location", accessor: "location" },
    {
      header: "Salary",
      accessor: "salary"
    },
    {
      header: "Deadline",
      accessor: "deadline",
      render: (row) => row.deadline || "Open Until Filled"
    },
    {
      header: "Status",
      render: (row) => (
        <span className={`px-2 py-1 text-xs rounded-full font-medium ${
          row.status === 'OPEN' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400' :
          'bg-slate-100 text-slate-700 dark:bg-slate-500/20 dark:text-slate-400'
        }`}>
          {row.status || "UNKNOWN"}
        </span>
      )
    },
    {
      header: "Actions",
      headerClassName: "text-right",
      cellClassName: "text-right",
      render: (row) => (
        <button
          onClick={() => navigate(`/admin/jobs/${row.id}`)}
          className="text-slate-400 hover:text-blue-500 transition-colors"
          title="View Details"
        >
          <Eye className="h-5 w-5" />
        </button>
      )
    }
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Manage Jobs</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2">Monitor and manage all job postings.</p>
      </div>

      <DataTable 
        columns={columns} 
        data={jobs} 
        onRowClick={(row) => navigate(`/admin/jobs/${row.id}`)}
        emptyMessage="No jobs found." 
      />
    </div>
  );
};

export default Jobs;
