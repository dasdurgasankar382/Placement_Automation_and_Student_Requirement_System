import React, { useEffect, useState } from "react";
import { Trash2, Eye } from "lucide-react";
import { toast } from "react-toastify";
import { getAllJobsForAdmin, deleteJobForAdmin } from "../services/adminService";
import DataTable from "../../../components/ui/DataTable";
import { useNavigate } from "react-router-dom";

const Jobs = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const { data } = await getAllJobsForAdmin();
      if (data?.data) {
        setJobs(data.data);
      } else if (Array.isArray(data)) {
        setJobs(data);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to fetch jobs.");
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job posting?")) return;
    try {
      await deleteJobForAdmin(id);
      toast.success("Job deleted successfully.");
      setJobs(jobs.filter(j => j.id !== id));
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to delete job.");
    }
  };

  const columns = [
    { 
      header: "Job ID", 
      render: (row) => <span className="font-mono text-xs">{String(row.id).substring(0, 8)}...</span>
    },
    { 
      header: "Title", 
      accessor: "title",
      cellClassName: "font-medium text-slate-900 dark:text-white"
    },
    { header: "Company", accessor: "company" },
    { header: "Location", accessor: "location" },
    { 
      header: "Status", 
      render: (row) => (
        <span className={`px-2 py-1 text-xs rounded-full font-medium ${
          row.status === 'OPEN' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400' :
          'bg-slate-100 text-slate-700 dark:bg-slate-500/20 dark:text-slate-400'
        }`}>
          {row.status}
        </span>
      )
    },
    { 
      header: "Actions", 
      headerClassName: "text-right",
      cellClassName: "text-right space-x-3",
      render: (row) => (
        <>
          <button 
            onClick={() => navigate(`/admin/jobs/${row.id}`)}
            className="text-slate-400 hover:text-blue-500 transition-colors"
            title="View Details"
          >
            <Eye className="h-5 w-5" />
          </button>
          <button 
            onClick={() => handleDelete(row.id)}
            className="text-slate-400 hover:text-red-500 transition-colors"
            title="Delete Job"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </>
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
        emptyMessage="No jobs found." 
      />
    </div>
  );
};

export default Jobs;
