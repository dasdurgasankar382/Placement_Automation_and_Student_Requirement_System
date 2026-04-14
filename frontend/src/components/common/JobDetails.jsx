import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Briefcase, Building2, MapPin, DollarSign, Calendar, List, ChevronLeft } from "lucide-react";
import { Button } from "../ui/Button";
import api from "../../services/api";
import { toast } from "react-toastify";
import { applyForJob } from "../../features/student/services/studentService";
import { jobDetailsConfig, getJobFieldValue } from "../../config/forms/jobDetailsConfig";

const JobDetails = ({ role }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [isApplied, setIsApplied] = useState(false);

  useEffect(() => {
    fetchJobDetails();
  }, [id]);

  const fetchJobDetails = async () => {
    // Check if job data was passed via navigation state (optimization)
    if (location.state?.job) {
      // Normalize state data in case it has nested structure
      const stateJob = location.state.job;
      const normalizedJob = stateJob.job ? { ...stateJob, ...stateJob.job } : stateJob;
      setJob(normalizedJob);
      setLoading(false);
      return;
    }

    // Fallback to API call if no state (direct URL access, page refresh, etc.)
    try {
      setLoading(true);
      const { data } = await api.get(`/jobs/${id}`); // here recall for job by id but on "/student/jobs/{jobId}" this all jobs with job id present 
     // why recall 
      const jobData = data.data || data; // Handle typical wrapper if present

      // Handle nested job structure: { companyName: "TCS", job: { description: "...", deadline: "..." } }
      const normalizedJob = jobData.job ? { ...jobData, ...jobData.job } : jobData;
      if (normalizedJob.status === "APPLIED" || normalizedJob.appliedAt) {
        setIsApplied(true);
      }

      setJob(normalizedJob);
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
        navigate("/student/applications");
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
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                {getJobFieldValue(job, jobDetailsConfig.header.title)}
              </h1>
              <p className="text-lg text-slate-500 dark:text-slate-400 font-medium mt-1">
                {getJobFieldValue(job, jobDetailsConfig.header.subtitle)}
              </p>
            </div>
          </div>

          {role === "STUDENT" && (
            <Button variant="primary" onClick={handleApply} disabled={applying || isApplied} className="w-full md:w-auto px-8 py-3 text-lg font-semibold shadow-lg shadow-blue-500/30">
              {/* if job already applied then show ad applied */}
              {isApplied ? "Already Applied" : (applying ? "Applying..." : "Apply For Job")}
            </Button>
          )}
        </div>

        {/* Quick Info Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-b border-slate-100 dark:border-slate-700">
          {jobDetailsConfig.quickInfo.map((info, idx) => {
            const IconComponent = { MapPin, DollarSign, Briefcase, Calendar }[info.icon];
            return (
              <div key={idx} className="space-y-1">
                <span className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm font-medium">
                  <IconComponent className="h-4 w-4"/> {info.label}
                </span>
                <p className="font-semibold text-slate-900 dark:text-white">
                  {getJobFieldValue(job, info)}
                </p>
              </div>
            );
          })}
        </div>

        {/* Details Section */}
        <div className="py-8 space-y-8">
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-4">
              <List className="h-5 w-5 text-blue-500" /> {jobDetailsConfig.skills.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              {getJobFieldValue(job, jobDetailsConfig.skills).map((skill, idx) => (
                <span key={idx} className="px-3 py-1.5 bg-blue-50 dark:bg-slate-700/50 text-blue-700 dark:text-blue-300 rounded-lg text-sm font-medium border border-blue-100 dark:border-slate-600">
                  {skill}
                </span>
              ))}
              {getJobFieldValue(job, jobDetailsConfig.skills).length === 0 && (
                <span className="text-slate-500">{jobDetailsConfig.skills.emptyMessage}</span>
              )}
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">{jobDetailsConfig.description.title}</h3>
            <div className={`prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 leading-relaxed ${jobDetailsConfig.description.preserveFormatting ? 'whitespace-pre-wrap' : ''}`}>
              {getJobFieldValue(job, jobDetailsConfig.description)}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default JobDetails;
