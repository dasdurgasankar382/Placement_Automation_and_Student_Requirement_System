import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, User, FileText, CheckCircle, XCircle } from "lucide-react";
import { toast } from "react-toastify";
import { getJobApplications, updateApplicationStatus } from "../services/recruiterService";

const statusColors = {
  PENDING: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500",
  REVIEWED: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-500",
  SELECTED: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-500",
  REJECTED: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-500",
};

const formatStatusLabel = (status = "") => {
  if (!status) return "Pending";
  return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
};

const formatAppliedAt = (value) => {
  if (!value) return "N/A";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "N/A";

  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const Applicants = () => {
  const { jobId } = useParams();
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!jobId) {
      setApplicants([]);
      setLoading(false);
      return;
    }

    fetchApplicants();
  }, [jobId]);

  const fetchApplicants = async () => {
    try {
      setLoading(true);
      const applicantsArray = await getJobApplications(jobId);
      setApplicants(applicantsArray);
    } catch (error) {
      console.error("Failed to load applicants:", error);
      toast.error("Failed to load applicants.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (applicationId, newStatus) => {
    try {
      await updateApplicationStatus(applicationId, newStatus);
      setApplicants((currentApplicants) =>
        currentApplicants.map((applicant) =>
          applicant.applicationId === applicationId
            ? { ...applicant, applicationStatus: newStatus }
            : applicant
        )
      );
      toast.success(`Applicant marked as ${formatStatusLabel(newStatus)}.`);
    } catch (error) {
      console.error("Failed to update applicant status:", error);
      toast.error(error?.response?.data?.message || "Failed to update applicant status.");
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Link
              to="/recruiter/jobs"
              className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-500"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Review Applicants</h1>
          </div>
          <p className="text-slate-500 dark:text-slate-400 ml-12 mt-1">
            {jobId ? `Showing candidates for Job #${jobId}` : "Select a job to review its applicants."}
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800/80 backdrop-blur-xl border border-slate-200 dark:border-slate-700 rounded-3xl shadow-sm overflow-hidden text-sm">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-500"></div>
          </div>
        ) : (
          <ul className="divide-y divide-slate-200 dark:divide-slate-700/50">
            {applicants.map((applicant) => (
              <li
                key={applicant.applicationId}
                className="p-6 flex flex-col xl:flex-row items-start xl:items-center justify-between gap-6 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
              >
                <div className="flex items-center gap-4 w-full xl:w-auto">
                  <div className="h-12 w-12 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400">
                    <User className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white text-base">{applicant.studentName}</h3>
                    <p className="text-slate-500 dark:text-slate-400">{applicant.email}</p>
                    <p className="text-xs text-slate-400 mt-1">Applied: {formatAppliedAt(applicant.appliedAt)}</p>
                    <p className="text-xs text-slate-500 mt-1">
                      Job: {applicant.jobTitle}
                      {applicant.companyName ? ` | ${applicant.companyName}` : ""}
                    </p>
                    {applicant.resumeName && (
                      <p className="text-xs text-slate-500 mt-1">Resume: {applicant.resumeName}</p>
                    )}
                    {applicant.skills.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {applicant.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2.5 py-1 bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 rounded-lg text-xs font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4 w-full xl:w-auto justify-between xl:justify-end">
                  <span
                    className={`px-3 py-1 rounded-full font-semibold text-xs ${
                      statusColors[applicant.applicationStatus] || statusColors.PENDING
                    }`}
                  >
                    {formatStatusLabel(applicant.applicationStatus)}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleUpdateStatus(applicant.applicationId, "REVIEWED")}
                      className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                      title="Mark as Reviewed"
                    >
                      <FileText className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(applicant.applicationId, "SELECTED")}
                      className="p-2 text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg transition-colors"
                      title="Select Candidate"
                    >
                      <CheckCircle className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(applicant.applicationId, "REJECTED")}
                      className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      title="Reject Candidate"
                    >
                      <XCircle className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        {!loading && applicants.length === 0 && (
          <div className="p-8 text-center text-slate-500 dark:text-slate-400">
            {jobId
              ? "No applicants found yet for this job."
              : "Open applicants from a specific job posting to review candidates."}
          </div>
        )}
      </div>
    </div>
  );
};

export default Applicants;
