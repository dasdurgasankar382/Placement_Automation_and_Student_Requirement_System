import React, { useEffect, useState } from "react";
import { Users, Briefcase, Building2 } from "lucide-react";
import StatCard from "../../../components/ui/StatCard";
import { getDashboardOverview } from "../services/adminService";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    jobs: 0,
    companies: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMetrics();
  }, []);

  const fetchMetrics = async () => {
    try {
      const { data } = await getDashboardOverview();
      const metrics = data?.data || data || { users: 0, jobs: 0, companies: 0 };
      setStats({
        users: metrics?.totalUsers || 0,
        jobs: metrics?.activeJobs || 0,
        companies: metrics?.totalRegisteredCompany || 0,
        ...metrics
      });
    } catch (err) {
      console.error("Dashboard fetch error:", err);
      if (err.response?.status !== 404) {
        toast.error(err?.response?.data?.message || "Failed to fetch dashboard metrics.");
      }
      setStats({ users: 0, jobs: 0, companies: 0 });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Admin Dashboard</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2">Centralized overview of platform activity and metrics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Total Users"
          value={stats.users}
          icon={Users}
          trend="+12%"
          colorClass="bg-purple-500"
        />
        <StatCard
          title="Active Jobs"
          value={stats.jobs}
          icon={Briefcase}
          trend="+5%"
          colorClass="bg-blue-500"
        />
        <StatCard
          title="Registered Companies"
          value={stats.companies}
          icon={Building2}
          trend="+22%"
          colorClass="bg-emerald-500"
        />
      </div>
    </div>
  );
};

export default Dashboard;
