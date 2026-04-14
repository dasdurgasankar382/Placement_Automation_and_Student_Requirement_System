import React from "react";
import { Eye } from "lucide-react";

export const jobsTableConfig = {
  columns: [
    {
      header: "Job ID",
      render: (row) => React.createElement('span', {
        className: "font-mono text-xs"
      }, `${String(row.id).substring(0, 8)}...`),
      hideOnMobile: true
    },
    {
      header: "Job Role",
      accessor: "title",
      cellClassName: "font-medium text-slate-900 dark:text-white"
    },
    { header: "Company", accessor: "companyName" },
    { 
      header: "Location", 
      accessor: "location",
      hideOnMobile: true
    },
    {
      header: "Salary",
      accessor: "salary",
      hideOnMobile: true
    },
    {
      header: "Deadline",
      accessor: "deadline",
      render: (row) => row.deadline || "Open Until Filled",
      hideOnMobile: true
    },
    {
      header: "Status",
      render: (row) => React.createElement('span', {
        className: `px-2 py-1 text-xs rounded-full font-medium ${
          row.status === 'OPEN' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400' :
          'bg-slate-100 text-slate-700 dark:bg-slate-500/20 dark:text-slate-400'
        }`
      }, row.status || "UNKNOWN")
    },
    {
      header: "Actions",
      headerClassName: "text-right",
      cellClassName: "text-right",
      render: (row, navigate) => React.createElement('button', {
        onClick: () => navigate(`/admin/jobs/${row.id}`),
        className: "text-slate-400 hover:text-blue-500 transition-colors",
        title: "View Details"
      }, React.createElement(Eye, { className: "h-5 w-5" }))
    }
  ]
};