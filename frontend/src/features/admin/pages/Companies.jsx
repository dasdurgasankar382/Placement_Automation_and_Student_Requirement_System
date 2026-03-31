import React, { useEffect, useState } from "react";
import { Building2 } from "lucide-react";
import { toast } from "react-toastify";
import { getAllCompaniesForAdmin } from "../services/adminService";
import DataTable from "../../../components/ui/DataTable";

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const { data } = await getAllCompaniesForAdmin();
      if (data?.data) {
        setCompanies(data.data);
      } else if (Array.isArray(data)) {
        setCompanies(data);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to fetch companies.");
      setCompanies([]);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { header: "ID", accessor: "id" },
    { 
      header: "Company Name", 
      cellClassName: "font-medium text-slate-900 dark:text-white flex items-center gap-2",
      render: (row) => (
        <>
          <Building2 className="h-4 w-4 text-purple-500" />
          {row.name}
        </>
      )
    },
    { 
      header: "Website", 
      render: (row) => (
        <a href={row.website} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">
          {row.website}
        </a>
      )
    },
    { header: "Location", accessor: "location" },
    { 
      header: "Status", 
      render: (row) => (
        <span className={`px-2 py-1 text-xs rounded-full font-medium ${
          row.status === 'VERIFIED' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400' :
          'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400'
        }`}>
          {row.status}
        </span>
      )
    }
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Manage Companies</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">View and verify registered companies.</p>
        </div>
      </div>

      <DataTable 
        columns={columns} 
        data={companies} 
        emptyMessage="No companies found." 
      />
    </div>
  );
};

export default Companies;
