import React from "react";
import { Briefcase, Building2, MapPin, DollarSign, Clock } from "lucide-react";
import { Button } from "../../components/ui/Button"; // Assuming reusable button exists

const JobCard = ({ job, onApply, actionText, onAction, onEdit, isClosed ,onClose}) => {
  const status = job?.status?.toString().trim().toUpperCase();
  const isJobApplied = Boolean(
    job?.applied ||
    job?.isApplied ||
    (status && status !== "NOT_APPLIED")
  );

  return (
    <div className="group bg-white dark:bg-slate-800/80 backdrop-blur-xl border border-slate-200 dark:border-slate-700 p-6 rounded-2xl hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1 transition-all duration-300 w-full">
      <div className="flex justify-between items-start gap-4">
        <div className="flex items-center gap-4">
          {/* Company Logo Placeholder */}
          <div className="h-14 w-14 rounded-xl bg-blue-50 dark:bg-slate-700 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-105 transition-transform duration-300">
            <Building2 className="h-7 w-7" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white line-clamp-1">
              {job?.title}
            </h3>
            {job?.company && (
              <p className="text-slate-500 dark:text-slate-400 font-medium">
                {job.company}
              </p>
            )}
          </div>
        </div>
        {job?.type && (
          <div className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1 rounded-full text-xs font-bold tracking-wide">
            {job.type}
          </div>
        )}
      </div>

      <div className="mt-6 grid grid-cols-2 gap-y-3 gap-x-2 text-sm text-slate-600 dark:text-slate-300">
        {job?.location && (
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-slate-400" />
            <span className="truncate">{job?.location || "Unknown Location"}</span>
          </div>
        )}
        {job?.salary && (
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-slate-400" />
            <span>{job.salary}</span>
          </div>
        )}
        {job?.deadline && (
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-slate-400" />
            <span>Deadline: {job.deadline}</span>
          </div>
        )}
        {job?.experience && (
          <div className="flex items-center gap-2">
            <Briefcase className="h-4 w-4 text-slate-400" />
            <span>{job.experience}</span>
          </div>
        )}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {(job?.tags || ["React", "Spring Boot", "AWS"]).map((tag, idx) => (
            <span 
              key={idx}
              className="px-2.5 py-1 bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 rounded-lg text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
        {/* For Recruiter */}
        {isClosed ? 
        <button className="px-3 py-2 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-xl">
          Closed
        </button>
        :(
          <div className="flex items-center gap-3">
            {onClose && (
              <button onClick={onClose} className="px-3 py-2 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/50 text-sm font-medium transition-colors">
                Close
              </button>
            )}
          {onEdit && (
            <button onClick={onEdit} className="px-3 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-600 text-sm font-medium transition-colors">
              Edit
            </button>
          )}
          {actionText && onAction && (
             <button onClick={onAction} className="px-4 py-2 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/30 text-sm font-medium transition-colors">
               {actionText}
             </button>
          )}
          {onApply && (
            <button 
              onClick={isJobApplied ? undefined : onApply}
              disabled={isJobApplied}
              className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all ${
                isJobApplied
                  ? "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed border border-slate-200 dark:border-slate-700 shadow-none"
                  : "bg-slate-900 dark:bg-blue-600 text-white dark:text-white hover:bg-slate-800 dark:hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/20 active:scale-95"
              }`}
            >
              {isJobApplied ? "Applied" : "Apply Now"}
            </button>
          )}
        </div>)}
      </div>
    </div>
  );
};

export default JobCard;
