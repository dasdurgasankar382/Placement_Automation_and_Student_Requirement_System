import React from "react";
import { Link } from "react-router-dom";
import { FileText } from "lucide-react";
import ApplicationCard from "../../../../components/ui/ApplicationCard";

const RecentApplications = ({ applications = [] }) => {
  return (
    <div className="lg:col-span-2 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Recent Applications</h2>
        <Link to="/student/applications" className="text-blue-600 dark:text-blue-400 font-medium hover:underline text-sm">
          View All
        </Link>
      </div>
      <div className="bg-white dark:bg-slate-800/80 backdrop-blur-xl border border-slate-200 dark:border-slate-700 rounded-3xl p-2 sm:p-6 shadow-sm">
        {applications.length > 0 ? (
          <div className="space-y-4">
            {applications.slice(0, 2).map((app) => (
              <ApplicationCard key={app.id} application={app} />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-48 text-slate-400 dark:text-slate-500 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl">
            <span className="font-medium flex items-center gap-2">
              <FileText className="h-5 w-5" />
              No applications yet. Start applying!
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentApplications;
