import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { toast } from "react-toastify";
import {
  getJobApplications,
  updateApplicationStatus,
} from "../services/recruiterService";
import ApplicantItem from "../components/ApplicantItem";
import { formatStatusLabel } from "../../../utils/formatters";
import { applicantStatusColors } from "../../../config/recruiter/recruiterConfig";

const Applicants = () => {
  const { jobId } = useParams();
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
            : applicant,
        ),
      );
      toast.success(`Applicant marked as ${formatStatusLabel(newStatus)}.`);
    } catch (error) {
      console.error("Failed to update applicant status:", error);
      toast.error(
        error?.response?.data?.message || "Failed to update applicant status.",
      );
    }
  };

  const handleViewProfile = (applicant) => {
    navigate(`/recruiter/student/${applicant.studentId}`, { state: { student: applicant } });
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
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              Review Applicants
            </h1>
          </div>
          <p className="text-slate-500 dark:text-slate-400 ml-12 mt-1">
            {applicants.length > 0
              ? `Reviewing applicants for ${applicants[0].jobTitle}`
              : jobId
                ? `Showing candidates for Job #${jobId}`
                : "Select a job to review its applicants."}
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
              <ApplicantItem 
                key={applicant.applicationId} 
                applicant={applicant} 
                onUpdateStatus={handleUpdateStatus} 
                onViewProfile={handleViewProfile}
              />
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
