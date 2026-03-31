import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, User, FileText, CheckCircle, XCircle } from "lucide-react";

const initialApplicants = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", status: "Pending", appliedAt: "Oct 24, 2026" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", status: "Reviewed", appliedAt: "Oct 22, 2026" },
  { id: 3, name: "Charlie Davis", email: "charlie@example.com", status: "Selected", appliedAt: "Oct 20, 2026" },
];

const statusColors = {
  Pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500",
  Reviewed: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-500",
  Selected: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-500",
  Rejected: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-500"
};

const Applicants = () => {
  const { jobId } = useParams();
  const [applicants, setApplicants] = useState(initialApplicants);

  const updateStatus = (id, newStatus) => {
    setApplicants(applicants.map(app => app.id === id ? { ...app, status: newStatus } : app));
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Link to="/recruiter/jobs" className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-500">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Review Applicants</h1>
          </div>
          <p className="text-slate-500 dark:text-slate-400 ml-12 mt-1">Showing candidates for Job #{jobId}</p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800/80 backdrop-blur-xl border border-slate-200 dark:border-slate-700 rounded-3xl shadow-sm overflow-hidden text-sm">
        <ul className="divide-y divide-slate-200 dark:divide-slate-700/50">
          {applicants.map((app) => (
            <li key={app.id} className="p-6 flex flex-col sm:flex-row items-center justify-between gap-6 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="h-12 w-12 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400">
                  <User className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white text-base">{app.name}</h3>
                  <p className="text-slate-500 dark:text-slate-400">{app.email}</p>
                  <p className="text-xs text-slate-400 mt-1">Applied: {app.appliedAt}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                <span className={`px-3 py-1 rounded-full font-semibold text-xs ${statusColors[app.status]}`}>
                  {app.status}
                </span>

                <div className="flex items-center gap-2">
                  <button onClick={() => updateStatus(app.id, "Reviewed")} className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors" title="Mark as Reviewed">
                    <FileText className="h-5 w-5" />
                  </button>
                  <button onClick={() => updateStatus(app.id, "Selected")} className="p-2 text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg transition-colors" title="Select Candidate">
                    <CheckCircle className="h-5 w-5" />
                  </button>
                  <button onClick={() => updateStatus(app.id, "Rejected")} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors" title="Reject Candidate">
                    <XCircle className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        {applicants.length === 0 && (
          <div className="p-8 text-center text-slate-500 dark:text-slate-400">
            No applicants yet. Keep promoting your job!
          </div>
        )}
      </div>
    </div>
  );
};

export default Applicants;
