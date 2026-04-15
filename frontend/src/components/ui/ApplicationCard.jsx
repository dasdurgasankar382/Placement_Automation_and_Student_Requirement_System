import React from "react";
import { Building2, Calendar, CheckCircle2, Clock, XCircle, FileText, Eye, Star, LogOut } from "lucide-react";

const ApplicationCard = ({ application }) => {
  // Status styling logic - mapped to backend uppercase values
  const statusConfig = {
    APPLIED: { icon: Clock, color: "text-blue-600", bg: "bg-blue-100 dark:bg-blue-500/20" },
    REVIEWED: { icon: Eye, color: "text-indigo-600", bg: "bg-indigo-100 dark:bg-indigo-500/20" },
    SHORTLISTED: { icon: Star, color: "text-amber-600", bg: "bg-amber-100 dark:bg-amber-500/20" },
    SELECTED: { icon: CheckCircle2, color: "text-green-600", bg: "bg-green-100 dark:bg-green-500/20" },
    WITHDRAWN: { icon: LogOut, color: "text-slate-600", bg: "bg-slate-100 dark:bg-slate-500/20" },
    REJECTED: { icon: XCircle, color: "text-red-600", bg: "bg-red-100 dark:bg-red-500/20" },
  };

  const status = application?.status || "APPLIED";
  const { icon: StatusIcon, color, bg } = statusConfig[status] || statusConfig.APPLIED;

  const formatStatusLabel = (s) => {
    if (!s) return "Applied";
    return s
      .toLowerCase()
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className="bg-white dark:bg-slate-800/80 backdrop-blur-xl border border-slate-200 dark:border-slate-700 p-5 rounded-2xl flex flex-col sm:flex-row gap-5 items-start sm:items-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      
      {/* Company Icon */}
      <div className="h-12 w-12 rounded-xl bg-slate-50 dark:bg-slate-700 flex items-center justify-center shrink-0">
        <Building2 className="h-6 w-6 text-slate-500 dark:text-slate-400" />
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white truncate">
          {application?.jobTitle || "Frontend Developer"}
        </h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          {application?.company || "Tech Innovators Inc."}
        </p>
        
        <div className="flex items-center gap-4 mt-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            <span>Applied: {application?.appliedDate || "Oct 24, 2026"}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <FileText className="h-3.5 w-3.5" />
            <span className="truncate">Ref: {application?.reference || "APP-2023-891X"}</span>
          </div>
        </div>
      </div>

      {/* Status Badge */}
      <div className={`px-4 py-2 rounded-xl flex items-center gap-2 font-semibold text-sm ${bg} ${color}`}>
        <StatusIcon className="h-4 w-4" />
        {formatStatusLabel(status)}
      </div>
      
    </div>
  );
};

export default ApplicationCard;
