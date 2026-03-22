import React from "react";
import ApplicationCard from "../../../components/ui/ApplicationCard";
import { mockApplications as MOCK_APPLICATIONS } from "../../../config/student/studentConfig";

const Applications = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">My Applications</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Track the status of your recent job applications.</p>
      </div>

      <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl border border-slate-200 dark:border-slate-700 p-2 sm:p-6 rounded-3xl shadow-sm">
        <div className="space-y-4">
          {MOCK_APPLICATIONS.map(app => (
            <ApplicationCard key={app.id} application={app} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Applications;
