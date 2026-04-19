import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  Users,
  Briefcase,
  Layers,
  Activity,
  CheckCircle,
  Clock,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

import DashboardCard from "./Cards/DashboardCard";
import ChartCard from "./Cards/ChartCard";
import UserTable from "./Tables/UserTable";
import Avatar from "./Avatar";
import { CHART_COLORS, DASHBOARD_HEADERS, getTableColumns } from "./dashboardConfig";

// Admin Services
import {
  getDashboardOverview,
  getAllUsers,
  getAllApplicationsForAdmin,
  getAllJobsForAdmin,
} from "../../features/admin/services/adminService";

// Recruiter Services
import {
  getRecruiterJobs,
  fetchCompanyProfileData,
  getJobApplications,
} from "../../features/recruiter/services/recruiterService";

// Student Services
import {
  getStudentDashboardStats,
  getStudentApplications,
} from "../../features/student/services/studentService";


const UnifiedDashboard = ({ role = "STUDENT" }) => {
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState({});
  const [recentActivity, setRecentActivity] = useState([]);
  const [chartData, setChartData] = useState({
    donut: [],
    bar: [],
    line: [],
  });
  const [isClient, setIsClient] = useState(false);
  const [showChart, setShowChart] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Ultimate fix: Wait for all layout animations/grid shifts to settle
    const timer = setTimeout(() => setShowChart(true), 500);
    fetchDashboardData();
    return () => clearTimeout(timer);
  }, [role]);

  const safeFetch = async (fetchFn, defaultValue) => {
    try {
      const res = await fetchFn();
      return res.data?.data || res.data || res || defaultValue;
    } catch (err) {
      if (err.response?.status !== 404) {
        console.error("Fetch error:", err);
      }
      return defaultValue;
    }
  };

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      if (role === "ADMIN") {
        const [overview, users, jobs, applications] = await Promise.all([
          safeFetch(getDashboardOverview, { totalUsers: 0, activeJobs: 0, totalRegisteredCompany: 0 }),
          safeFetch(getAllUsers, []),
          safeFetch(getAllJobsForAdmin, []),
          safeFetch(getAllApplicationsForAdmin, [])
        ]);

        const usersList = Array.isArray(users) ? users : [];
        const appsList = Array.isArray(applications) ? applications : [];
        const jobsList = Array.isArray(jobs) ? jobs : [];

        setMetrics({
          users: overview.totalUsers || usersList.length,
          jobs: overview.activeJobs || jobsList.length,
          companies: overview.totalRegisteredCompany || 0,
          apps: appsList.length,
        });

        // Set Recent Activity (latest users)
        setRecentActivity(
          usersList
            .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
            .slice(0, 10)
            .map((u) => ({
              id: u.id,
              name: u.name,
              email: u.email,
              status: u.status || "ACTIVE",
              avatarRole: "ADMIN",
              createdAt: u.createdAt || "N/A"
            }))
        );

        // Prepare chart data
        // 1. Donut: App status
        const statusCount = appsList.reduce((acc, app) => {
          acc[app.status || app.applicationStatus || "PENDING"] = (acc[app.status || app.applicationStatus || "PENDING"] || 0) + 1;
          return acc;
        }, {});
        setChartData((prev) => ({
          ...prev,
          donut: Object.entries(statusCount).map(([k, v]) => ({ name: k, value: v })),
        }));

        // 2. Bar: Jobs per company
        const companyJobs = jobsList.reduce((acc, job) => {
          const cName = job.company?.name || job.companyName || "Unknown";
          acc[cName] = (acc[cName] || 0) + 1;
          return acc;
        }, {});
        setChartData((prev) => ({
          ...prev,
          bar: Object.entries(companyJobs).slice(0, 10).map(([k, v]) => ({ name: k, jobs: v })),
        }));

      } else if (role === "RECRUITER") {
        const [jobs, profile] = await Promise.all([
          safeFetch(getRecruiterJobs, []),
          safeFetch(fetchCompanyProfileData, {}),
        ]);

        const jobsList = Array.isArray(jobs) ? jobs : [];
        const activeJobs = jobsList.filter(j => j.status === 'OPEN' || j.jobStatus === 'OPEN');
        console.log(jobsList)

        // Fetch all generic data
        setMetrics({
          totalJobs: jobsList.length,
          activeJobs: activeJobs.length,
          totalApplicants: jobsList.reduce((sum, job) => sum + (job.applicantsCount || 0), 0)
        });

        // Activity: Recent Applicants (instead of Jobs)
        // Fetch applicants from all jobs
        const applicantsNested = await Promise.all(
          jobsList.map((j) => safeFetch(() => getJobApplications(j.id), []))
        );
        const allApplicants = applicantsNested.flat();

        setRecentActivity(
          allApplicants
            .sort((a, b) => new Date(b.appliedAt || 0) - new Date(a.appliedAt || 0))
            .slice(0, 10)
            .map((app) => ({
              id: app.id || app.applicationId,
              name: app.studentName || "Unknown Student",
              email: app.jobTitle || "Untitled Job",
              status: app.applicationStatus || "PENDING",
              avatarRole: "STUDENT",
              createdAt: app.appliedAt || "N/A"
            }))
        );

        // Chart Data (Bar) - Jobs vs Roles or just active vs closed
        setChartData((prev) => ({
          ...prev,
          donut: [
            { name: "Active", value: activeJobs.length },
            { name: "Closed", value: jobsList.length - activeJobs.length }
          ]
        }));

      } else if (role === "STUDENT") {
        const [stats, applications] = await Promise.all([
          safeFetch(getStudentDashboardStats, {}),
          safeFetch(getStudentApplications, []),
        ]);

        const appsList = Array.isArray(applications) ? applications : [];

        setMetrics({
          totalApps: stats.totalApplications || stats.totalApps || appsList.length,
          interviews: stats.totalInterviewsScheduled || stats.interviews || appsList.filter(a => a.status === 'INTERVIEW').length,
          offers: stats.totalOffersReceived || stats.offers || appsList.filter(a => a.status === 'OFFER' || a.status === 'ACCEPTED').length,
        });

        // Activity: Recent Apps
        setRecentActivity(
          appsList
            .sort((a, b) => new Date(b.createdAt || b.appliedAt || 0) - new Date(a.createdAt || a.appliedAt || 0))
            .slice(0, 10)
            .map((app) => ({
              id: app.id || app.applicationId,
              name: app.job?.role || app.job?.title || app.jobTitle || app.role || "Untitled Job",
              email: app.company?.name || app.companyName || "Unknown Company",
              status: app.status || app.applicationStatus || "PENDING",
              avatarRole: "STUDENT",
              createdAt: app.createdAt || app.appliedAt || "N/A"
            }))
        );

        // Charts
        const statusCount = appsList.reduce((acc, app) => {
          const st = app.status || app.applicationStatus || "PENDING";
          acc[st] = (acc[st] || 0) + 1;
          return acc;
        }, {});

        setChartData((prev) => ({
          ...prev,
          donut: Object.entries(statusCount).map(([k, v]) => ({ name: k, value: v })),
        }));
      }

    } catch (err) {
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  const tableColumns = getTableColumns(role);

  return (
    <div className="w-full flex flex-col gap-6 animate-in fade-in duration-500">
      {/* Header section */}
      <div className="flex-none">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
          {DASHBOARD_HEADERS[role]?.title || "Dashboard Overview"}
        </h1>
        <p className="text-slate-400 mt-2">
          {DASHBOARD_HEADERS[role]?.subtitle || ""}
        </p>
      </div>

      {/* KPI Cards */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {role === "ADMIN" && (
          <>
            <DashboardCard title="Total Users" value={metrics.users} icon={Users} trend="+12%" />
            <DashboardCard title="Total Jobs" value={metrics.jobs} icon={Briefcase} trend="+8%" />
            <DashboardCard title="Applications" value={metrics.apps} icon={Layers} trend="+24%" />
            <DashboardCard title="Registered Co." value={metrics.companies} icon={Activity} />
          </>
        )}
        {role === "RECRUITER" && (
          <>
            <DashboardCard title="Total Jobs" value={metrics.totalJobs} icon={Briefcase} />
            <DashboardCard title="Active Postings" value={metrics.activeJobs} icon={Activity} trend="+2%" />
            <DashboardCard title="Total Applicants" value={metrics.totalApplicants} icon={Users} />
          </>
        )}
        {role === "STUDENT" && (
          <>
            <DashboardCard title="Total Applications" value={metrics.totalApps} icon={Layers} />
            <DashboardCard title="Interviews" value={metrics.interviews} icon={Clock} trend="+1" />
            <DashboardCard title="Offers" value={metrics.offers} icon={CheckCircle} />
          </>
        )}
      </div>

      {/* Bottom Content Area */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Charts Section */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          {(role === "ADMIN" || role === "STUDENT" || role === "RECRUITER") && chartData.donut.length > 0 && (
            <div>
              <ChartCard title="Status Breakdown">
                <div className="w-full min-h-[300px] relative flex items-center justify-center">
                  {showChart && isClient && chartData.donut.length > 0 ? (
                    <ResponsiveContainer width="99%" height={300} debounce={200}>
                      <PieChart>
                        <Pie
                          data={chartData.donut}
                          innerRadius="60%"
                          outerRadius="80%"
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {chartData.donut.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc', borderRadius: '8px' }}
                          itemStyle={{ color: '#f8fafc' }}
                        />
                        <Legend iconType="circle" />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-[300px] w-full flex items-center justify-center">
                      <div className="animate-pulse text-slate-500 text-sm">Preparing chart...</div>
                    </div>
                  )}
                </div>
              </ChartCard>
            </div>
          )}

          {role === "ADMIN" && chartData.bar.length > 0 && (
            <div>
              <ChartCard title="Jobs per Company">
                <div className="w-full min-h-[300px] relative flex items-center justify-center">
                  {showChart && isClient && chartData.bar.length > 0 ? (
                    <ResponsiveContainer width="99%" height={300} debounce={200}>
                      <BarChart data={chartData.bar}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                        <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                        <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                        <Tooltip
                          contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc', borderRadius: '8px' }}
                          cursor={{ fill: '#334155', opacity: 0.4 }}
                        />
                        <Bar dataKey="jobs" fill="url(#colorPurple)" radius={[4, 4, 0, 0]} />
                        <defs>
                          <linearGradient id="colorPurple" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#a855f7" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#ec4899" stopOpacity={0.8} />
                          </linearGradient>
                        </defs>
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-[300px] w-full flex items-center justify-center">
                      <div className="animate-pulse text-slate-500 text-sm">Preparing chart...</div>
                    </div>
                  )}
                </div>
              </ChartCard>
            </div>
          )}

        </div>

        {/* Activity Table */}
        <div className="lg:col-span-2">
          <UserTable
            title="Recent Activity"
            columns={tableColumns}
            data={recentActivity}
            role={role}
            seeAllLink={
              role === "ADMIN" 
                ? "/admin/users" 
                : role === "RECRUITER" 
                  ? "/recruiter/applicants" 
                  : role === "STUDENT" 
                    ? "/student/applications" 
                    : null
            }
          />
        </div>
      </div>

    </div>
  );
};

export default UnifiedDashboard;
