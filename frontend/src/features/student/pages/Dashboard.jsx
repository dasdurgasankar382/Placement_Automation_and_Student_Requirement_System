import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { dashboardStatsConfig, mockApplications } from "../../../config/student/studentConfig";
import StatCard from "../components/dashboard/StatCard";
import RecentApplications from "../components/dashboard/RecentApplications";
import ProfileStrength from "../components/dashboard/ProfileStrength";

const Dashboard = () => {
  return (
    <div className="space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Dashboard Overview</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Track your placement journey and activities.</p>
        </div>
        <Link 
          to="/student/jobs" 
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium shadow-lg shadow-blue-500/30 flex items-center gap-2 transition-all hover:pr-4"
        >
          Find Jobs <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Structured Stats Grid mapping over config using micro-component */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dashboardStatsConfig.map((stat) => (
          <StatCard key={stat.id} {...stat} />
        ))}
      </div>

      {/* Modular Body Components */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <RecentApplications applications={mockApplications} />
        <ProfileStrength percentage={75} />
      </div>

    </div>
  );
};

export default Dashboard;
