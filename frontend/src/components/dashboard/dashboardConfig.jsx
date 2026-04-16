import React from "react";
import Avatar from "./Avatar";
import { CheckCircle, Clock, XCircle, AlertCircle, PlayCircle } from "lucide-react";

export const CHART_COLORS = ["#a855f7", "#ec4899", "#22c55e", "#ef4444", "#3b82f6"];

export const DASHBOARD_HEADERS = {
  ADMIN: {
    title: "Dashboard Overview",
    subtitle: "Centralized platform analytics and user management.",
  },
  RECRUITER: {
    title: "Dashboard Overview",
    subtitle: "Manage your job postings and applicant pipeline.",
  },
  STUDENT: {
    title: "Dashboard Overview",
    subtitle: "Track your career journey and job applications.",
  },
};

export const getTableColumns = (role) => [
  {
    header: "Created At",
    render: (row) => {
      let dateString = row.createdAt || "N/A";
      let timeString = "";
      
      if (row.createdAt && row.createdAt !== "N/A") {
        const d = new Date(row.createdAt);
        if (!isNaN(d.getTime())) {
          dateString = d.toLocaleDateString(undefined, { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric' 
          });
          timeString = d.toLocaleTimeString(undefined, { 
            hour: '2-digit', 
            minute: '2-digit' 
          });
        }
      }
      
      return (
        <div className="flex flex-col">
          <div className="font-medium text-slate-200">{dateString}</div>
          {timeString && <div className="text-xs text-slate-400 mt-0.5 font-medium">{timeString}</div>}
        </div>
      );
    },
  },
  {
    header: "User / Subject",
    render: (row) => {
      let displayName = row.name;
      const rawString = row.email || "";

      // Fallback: Extract username from email if name is missing
      if (!displayName || displayName.trim() === "") {
        if (rawString.includes("@")) {
          displayName = rawString.split("@")[0];
        } else {
          displayName = rawString || "Unknown";
        }
      }

      // Capitalize first letter for a cleaner look
      if (displayName && displayName.length > 0) {
        displayName = displayName.charAt(0).toUpperCase() + displayName.slice(1);
      }

      return (
        <div className="flex items-center gap-3">
          <Avatar name={displayName} role={role} size={32} />
          <div>
            <div className="font-medium text-slate-200">{displayName}</div>
            <div className="text-xs text-slate-100">{rawString || "N/A"}</div>
          </div>
        </div>
      );
    },
  },
  {
    header: "Status",
    render: (row) => {
      const status = row.status?.toUpperCase() || "UNKNOWN";

      let colorClass = "text-slate-400 bg-slate-400/10 border-slate-400/20";
      let Icon = AlertCircle;

      if (["ACTIVE", "OPEN", "ACCEPTED", "HIRED", "SELECTED"].includes(status)) {
        colorClass = "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";
        Icon = CheckCircle;
      } else if (["PENDING", "IN_PROGRESS", "REVIEW", "APPLIED"].includes(status)) {
        colorClass = "text-amber-400 bg-amber-400/10 border-amber-400/20";
        Icon = Clock;
      } else if (["REJECTED", "CLOSED", "INACTIVE"].includes(status)) {
        colorClass = "text-rose-400 bg-rose-400/10 border-rose-400/20";
        Icon = XCircle;
      } else if (["INTERVIEW"].includes(status)) {
        colorClass = "text-blue-400 bg-blue-400/10 border-blue-400/20";
        Icon = PlayCircle;
      }

      return (
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${colorClass}`}
        >
          <Icon className="w-3.5 h-3.5" />
          {row.status || "UNKNOWN"}
        </span>
      );
    },
  },
];
