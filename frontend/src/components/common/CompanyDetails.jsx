import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Building2, MapPin, Globe, ShieldCheck, ChevronLeft, Briefcase, ExternalLink, Mail, Phone, Info } from "lucide-react";
import { getCompanyById, getCompanyJobsForAdmin, verifyCompany } from "../../features/admin/services/adminService";
import JobCard from "../ui/JobCard";
import { toast } from "react-toastify";
import { normalizeJob } from "../../utils/formatters";
import { companyDetailsConfig, getCompanyFieldValue } from "../../config/forms/companyDetailsConfig";

// --- Sub-components for Readability ---

const DetailHeader = ({ company, role, verifying, onVerify }) => (
  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 border-b border-slate-100 dark:border-slate-700 pb-8">
    <div className="flex items-center gap-6">
      <div className="h-14 w-14 rounded-2xl bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center text-purple-600 dark:text-purple-400 shadow-inner">
        <Building2 className="h-7 w-7" />
      </div>
      <div>
        <div className="flex items-start gap-3">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            {getCompanyFieldValue(company, companyDetailsConfig.header.title)}
          </h1>
        </div>
      </div>
    </div>
  </div>
);

const InfoGrid = ({ company }) => {
  const getAbsoluteUrl = (url) => {
    if (!url) return "";
    return url.startsWith("http") ? url : `https://${url}`;
  };

  return (
    <div className="flex flex-col gap-4 py-4">
      {companyDetailsConfig.quickInfo.map((info, idx) => {
        const IconComponent = { MapPin, Globe, Phone }[info.icon];
        const value = getCompanyFieldValue(company, info);

        return (
          <div key={idx} className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <IconComponent className="h-3 w-3" /> {info.label}
            </label>
            {info.isLink && company[info.key] ? (
              <a
                href={getAbsoluteUrl(company[info.key])}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-blue-500 hover:text-blue-600 flex items-center gap-1 group w-fit"
              >
                {value} <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            ) : (
              <p className="font-semibold text-slate-700 dark:text-slate-200">{value}</p>
            )}
          </div>
        );
      })}
    </div>
  );
};

const JobSection = ({ jobs, onNavigateToJob }) => (
  <div className="space-y-6">
    <div className="flex items-center gap-3">
      <Briefcase className="h-6 w-6 text-purple-500" />
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Active Postings ({jobs.length})</h2>
    </div>

    {jobs.length > 0 ? (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {jobs.map((job, idx) => (
          <JobCard
            key={job.id || idx}
            job={job}
            onAction={() => onNavigateToJob(job)}
          />
        ))}
      </div>
    ) : (
      <div className="bg-slate-50 dark:bg-slate-800/30 border border-dashed border-slate-300 dark:border-slate-700 rounded-3xl p-12 text-center">
        <p className="text-slate-500 dark:text-slate-400">This company hasn't posted any jobs yet.</p>
      </div>
    )}
  </div>
);

// --- Main Component ---

const CompanyDetails = ({ role }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [company, setCompany] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState(false);

  useEffect(() => {
    fetchCompanyData();
  }, [id]);

  const fetchCompanyData = async () => {
    // Check if job data was passed via navigation state (optimization)
    if (location.state?.company) {
      // Normalize state data in case it has nested structure
      const stateCompany = location.state.company;
      const normalizedCompany = stateCompany.company ? { ...stateCompany, ...stateCompany.company } : stateCompany;
      setCompany(normalizedCompany);
      setLoading(false);
      fetchCompanyJobs(); // ⚡ Ensure jobs are fetched!
      return;
    }
    try {
      setLoading(true);
      const { data } = await getCompanyById(id);
      setCompany(data.data || data);
      await fetchCompanyJobs();
    } catch (err) {
      toast.error("Failed to load company details.");
      navigate("/admin/companies");
    } finally {
      setLoading(false);
    }
  };

  const fetchCompanyJobs = async () => {
    try {
      const { data } = await getCompanyJobsForAdmin(id);
      const jobsArray = data.data || (Array.isArray(data) ? data : []);
      setJobs(jobsArray.map(normalizeJob));
    } catch (err) {
      console.error("Failed to fetch company jobs", err);
    }
  };

  const handleVerify = async () => {
    try {
      setVerifying(true);
      await verifyCompany(id);
      toast.success("Company verified successfully!");
      setCompany(prev => ({ ...prev, verified: true }));
    } catch (err) {
      toast.error(err?.response?.data?.message || "Verification failed");
    } finally {
      setVerifying(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!company) return null;

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20">
      <button
        onClick={() => navigate("/admin/companies")}
        className="flex items-center gap-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition-colors group"
      >
        <ChevronLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
        <span>Back to Companies</span>
      </button>

      <div className="bg-white dark:bg-slate-800/80 backdrop-blur-xl border border-slate-200 dark:border-slate-700 rounded-3xl p-8 shadow-sm">
        <DetailHeader
          company={company}
          role={role}
          verifying={verifying}
          onVerify={handleVerify}
        />

        <InfoGrid company={company} />

        {company.description && (
          <div className="border-t border-slate-100 dark:border-slate-700 pt-8 mt-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <Info className="h-5 w-5 text-purple-500" /> {companyDetailsConfig.description.title}
            </h3>
            <div className="text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-wrap">
              {getCompanyFieldValue(company, companyDetailsConfig.description)}
            </div>
          </div>
        )}
      </div>

      <JobSection
        jobs={jobs}
        onNavigateToJob={(job) => navigate(`/admin/jobs/${job.id}`, { state: { job } })}
      />
    </div>
  );
};

export default CompanyDetails;
