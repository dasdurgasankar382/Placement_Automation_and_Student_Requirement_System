import React, { useState, useEffect } from "react";
import HeroBanner from "../../../components/ui/HeroBanner";
import CircularStatCard from "../../../components/ui/CircularStatCard";
import DataTable from "../../../components/ui/DataTable";
import { getRecruiterJobs, fetchCompanyProfileData } from "../services/recruiterService";
import { dashboardStatsConfig, recentJobsTableColumns } from "../../../config/recruiter/recruiterConfig";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [companyInfo, setCompanyInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Wrap calls to handle 404s gracefully
        const safeFetch = async (fetchFn, defaultValue = []) => {
          try {
            const res = await fetchFn();
            return res.data?.data || res.data || res;
          } catch (err) {
            if (err.response?.status === 404) return defaultValue;
            throw err;
          }
        };

        const [jobsData, companyData] = await Promise.all([
          safeFetch(getRecruiterJobs, []),
          safeFetch(fetchCompanyProfileData, null)
        ]);
        
        setJobs(Array.isArray(jobsData) ? jobsData : []);
        setCompanyInfo(companyData);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        // Only show error toast for non-404 errors
        if (error.response?.status !== 404) {
          toast.error("Failed to load dashboard metrics.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getStatValue = (id) => {
    if (id === "total_postings") return jobs.length;
    if (id === "active_postings") return jobs.filter(j => (j.jobStatus || j.status) === 'OPEN').length;
    return 0;
  };

  const getPercentage = (id) => {
    if (jobs.length === 0) return 0;
    if (id === "active_postings") return Math.round((getStatValue("active_postings") / jobs.length) * 100);
    return 100;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* 1. Hero Banner */}
      <HeroBanner 
        title={`Welcome to ${companyInfo?.name || "Recruiter"}!`}
        subtitle={`Welcome to! You have ${getStatValue("active_postings")} active job postings.`}
        buttonText="View Postings"
        buttonLink="/recruiter/jobs"
        illustration={
          <svg className="w-80 h-80 opacity-90" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="200" cy="150" r="100" fill="white" fillOpacity="0.1"/>
            <rect x="180" y="100" width="120" height="80" rx="8" fill="white" fillOpacity="0.8"/>
            <path d="M190 120h40M190 140h80M190 160h60" stroke="#6366f1" strokeWidth="4" strokeLinecap="round"/>
          </svg>
        }
      />

      <div className="flex flex-col gap-8">
        {/* Stats & Table Section */}
        <div className="space-y-8">
          
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Quick Summary</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dashboardStatsConfig.map((stat) => (
              <CircularStatCard 
                key={stat.id}
                count={getStatValue(stat.id)}
                title={stat.title}
                percentage={getPercentage(stat.id)}
                strokeColor={stat.strokeColor}
                subtitle={stat.id === "active_postings" ? "Currently available" : "Total lifetime postings"}
              />
            ))}
          </div>

          <DataTable 
            title="Recent Job Postings" 
            actionLabel="See all" 
            columns={recentJobsTableColumns} 
            navlink={"/recruiter/jobs"}
            data={jobs.slice(0, 5)} 
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
