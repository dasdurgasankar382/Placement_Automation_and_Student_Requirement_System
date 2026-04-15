import React from "react";
import { Building2, Globe, MapPin, ExternalLink, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getStatusStyles } from "../../utils/formatters";

const CompanyCard = ({ company, onVerify }) => {
  const navigate = useNavigate();
  const getAbsoluteUrl = (url) => {
    if (!url) return "";
    return url.startsWith("http://") || url.startsWith("https://") ? url : `https://${url}`;
  };

  const status = company?.verified ? "VERIFIED" : "PENDING";
  const statusStyles = getStatusStyles(status);

  return (
    <div className="group bg-white dark:bg-slate-800/80 backdrop-blur-xl border border-slate-200 dark:border-slate-700 p-6 rounded-2xl hover:shadow-xl hover:shadow-purple-500/5 hover:-translate-y-1 transition-all duration-300 w-full">
      <div className="flex justify-between items-start gap-4">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-xl bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center text-purple-600 dark:text-purple-400 group-hover:scale-105 transition-transform duration-300">
            <Building2 className="h-7 w-7" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white line-clamp-1">
              {company?.name}
            </h3>
            <div className="flex items-center gap-2 mt-1">
               <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase ${statusStyles}`}>
                {status}
              </span>
            </div>
          </div>
        </div>
        {company?.website && (
          <a
            href={getAbsoluteUrl(company.website)}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-slate-50 dark:bg-slate-700/50 text-slate-400 hover:text-blue-500 rounded-lg transition-colors"
            onClick={(e) => e.stopPropagation()}
            title="Visit Website"
          >
            <ExternalLink className="h-5 w-5" />
          </a>
        )}
      </div>

      <div className="mt-6 space-y-3">
        {company?.location && (
          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
            <MapPin className="h-4 w-4 text-slate-400" />
            <span>{company.location}</span>
          </div>
        )}
        {company?.website && (
          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
            <Globe className="h-4 w-4 text-slate-400" />
            <span className="truncate">{company.website.replace(/^https?:\/\//, '')}</span>
          </div>
        )}
      </div>

      <div className="mt-8 flex items-center justify-between gap-3">
        <button
          onClick={() => navigate(`/admin/companies/${company.id}`, { state: { company } })}
          className="flex-1 px-4 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-semibold text-sm hover:bg-slate-800 dark:hover:bg-slate-100 transition-all active:scale-95"
        >
          View Details
        </button>
        
        {status !== "VERIFIED" && onVerify && (
          <button
            onClick={() => onVerify(company.id)}
            className="p-2.5 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl hover:bg-emerald-100 transition-all active:scale-95"
            title="Verify Company"
          >
            <ShieldCheck className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default CompanyCard;
