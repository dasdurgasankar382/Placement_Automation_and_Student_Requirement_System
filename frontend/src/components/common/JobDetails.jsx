import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Briefcase, Building2, MapPin, DollarSign, Calendar, List, ChevronLeft } from "lucide-react";
import { Button } from "../ui/Button";
import api from "../../services/api";
import { toast } from "react-toastify";

import { applyForJob } from "../../features/student/services/studentService";

const JobDetails = ({ role }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);

  useEffect(() => {
    fetchJobDetails();
  }, [id]);

  const fetchJobDetails = async () => {
    try {
      setLoading(true);
      const { data } = await api.get(`/jobs/${id}`);
      const jobData = data.data || data; // Handle typical wrapper if present
      setJob(jobData);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load job details.");
      navigate(role === "ADMIN" ? "/admin/jobs" : "/student/jobs");
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async () => {
    try {
      setApplying(true);
      // Calls POST /applications with body { jobId: id } 
      const { data } = await applyForJob(id);
      
      if (data && data.success === false) {
        toast.error(data.message || "Failed to apply for this job.");
      } else {
        toast.success(data?.message || "Successfully applied for the job!");
        navigate("/student/jobs");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Error applying for this job.");
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!job) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <button 
        onClick={() => navigate(role === "ADMIN" ? "/admin/jobs" : "/student/jobs")}
        className="flex items-center gap-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition-colors"
      >
        <ChevronLeft className="h-5 w-5" /> Back to Jobs List
      </button>

      <div className="bg-white dark:bg-slate-800/80 backdrop-blur-xl border border-slate-200 dark:border-slate-700 rounded-3xl p-8 shadow-sm">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-slate-100 dark:border-slate-700 pb-8">
          <div className="flex items-center gap-5">
            <div className="h-16 w-16 rounded-2xl bg-blue-50 dark:bg-slate-700 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <Building2 className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{job.role || job.title}</h1>
              <p className="text-lg text-slate-500 dark:text-slate-400 font-medium mt-1">Company Details TBA</p>
            </div>
          </div>

          {role === "STUDENT" && (
            <Button variant="primary" onClick={handleApply} disabled={applying} className="w-full md:w-auto px-8 py-3 text-lg font-semibold shadow-lg shadow-blue-500/30">
              {applying ? "Applying..." : "Apply For Job"}
            </Button>
          )}
        </div>

        {/* Quick Info Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-b border-slate-100 dark:border-slate-700">
          <div className="space-y-1">
            <span className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm font-medium"><MapPin className="h-4 w-4"/> Location</span>
            <p className="font-semibold text-slate-900 dark:text-white">{job.location}</p>
          </div>
          <div className="space-y-1">
            <span className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm font-medium"><DollarSign className="h-4 w-4"/> Salary</span>
            <p className="font-semibold text-slate-900 dark:text-white">₹{job.salary?.toLocaleString()}</p>
          </div>
          <div className="space-y-1">
            <span className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm font-medium"><Briefcase className="h-4 w-4"/> Environment</span>
            <p className="font-semibold text-slate-900 dark:text-white">Full-Time</p>
          </div>
          <div className="space-y-1">
            <span className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm font-medium"><Calendar className="h-4 w-4"/> Deadline</span>
            <p className="font-semibold text-slate-900 dark:text-white">{job.deadline || "Open Until Filled"}</p>
          </div>
        </div>

        {/* Details Section */}
        <div className="py-8 space-y-8">
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-4">
              <List className="h-5 w-5 text-blue-500" /> Required Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {(job.skills || []).map((skill, idx) => (
                <span key={idx} className="px-3 py-1.5 bg-blue-50 dark:bg-slate-700/50 text-blue-700 dark:text-blue-300 rounded-lg text-sm font-medium border border-blue-100 dark:border-slate-600">
                  {skill}
                </span>
              ))}
              {(!job.skills || job.skills.length === 0) && <span className="text-slate-500">No specific skills listed.</span>}
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Job Description</h3>
            <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
              {job.description || "No description provided."}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default JobDetails;
