import React, { useState, useEffect } from "react";
import ApplicationCard from "../../../components/ui/ApplicationCard";
import { getStudentApplications } from "../services/studentService";
import { toast } from "react-toastify";

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const { data } = await getStudentApplications();
        let appsArray = [];
        if (Array.isArray(data)) {
          appsArray = data;
        } else if (data?.data && Array.isArray(data.data)) {
          appsArray = data.data;
        }
        
        // Map backend DTO to frontend ApplicationCard props
        const mappedApps = appsArray.map(app => ({
          id: app.applicationId,
          jobTitle: app.jobTitle,
          company: app.companyName || "Unknown Company",
          status: app.status,
          appliedDate: new Date(app.appliedAt).toLocaleDateString(),
          reference: app.applicationId.substring(0, 8).toUpperCase()
        }));
        
        setApplications(mappedApps);
      } catch (err) {
        console.error("Failed to load applications", err);
        toast.error("Failed to load your applications.");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">My Applications</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Track the status of your recent job applications.</p>
      </div>

      <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl border border-slate-200 dark:border-slate-700 p-2 sm:p-6 rounded-3xl shadow-sm min-h-[300px]">
        {loading ? (
          <div className="flex justify-center items-center h-full pt-10">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
          </div>
        ) : applications.length === 0 ? (
          <div className="text-center py-20">
            <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300">No applications yet.</h3>
            <p className="text-slate-500 dark:text-slate-400 mt-2">Go browse jobs and apply to see them listed here!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {applications.map((app) => (
              <ApplicationCard key={app.id} application={app} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Applications;
