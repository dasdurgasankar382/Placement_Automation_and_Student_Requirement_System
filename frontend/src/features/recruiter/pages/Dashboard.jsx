import React from "react";
import HeroBanner from "../../../components/ui/HeroBanner";
import CircularStatCard from "../../../components/ui/CircularStatCard";
import DataTable from "../../../components/ui/DataTable";
import CalendarWidget from "../../../components/ui/CalendarWidget";
import ActionListWidget from "../../../components/ui/ActionListWidget";

const mockTableData = [
  { id: 1, name: "John Doe", profession: "UI Designer", status: "Tech interview", color: "blue-500" },
  { id: 2, name: "Ella Clintion", profession: "Content designer", status: "Task", color: "red-400" },
  { id: 3, name: "Mike Tyler", profession: "Node.js Developer", status: "Resume review", color: "emerald-400" },
  { id: 4, name: "Marie Arch", profession: "Node.js Developer", status: "Task", color: "red-400" },
  { id: 5, name: "Sandra Huffman", profession: "UX Designer", status: "Final interview", color: "yellow-400" },
];

const mockApplicantsData = [
  { name: "Lewis S. Cunningham", subtitle: "Applied for iOS Developer", avatarUrl: "" },
  { name: "Danny Nelson", subtitle: "Applied for Node.js Developer", avatarUrl: "" },
  { name: "Jennifer Patterson", subtitle: "Applied for Marketing Manager", avatarUrl: "" },
  { name: "Timothy Watson", subtitle: "Applied for iOS Developer", avatarUrl: "" },
  { name: "Kimberly Rutledge", subtitle: "Applied for Junior UX Designer", avatarUrl: "" },
];

const Dashboard = () => {
  const tableColumns = [
    { header: "Full name", accessor: "name", cellClassName: "font-semibold text-slate-800 dark:text-slate-100" },
    { header: "Profession", accessor: "profession" },
    { 
      header: "Status", 
      render: (row) => (
        <div className="flex items-center gap-2">
          <span className={`h-2 w-2 rounded-full bg-${row.color}`}></span>
          <span className="font-medium text-slate-700 dark:text-slate-300">{row.status}</span>
        </div>
      )
    },
    {
      header: "",
      render: () => <button className="text-slate-400 hover:text-brand-purple">⋮</button>,
      cellClassName: "text-right"
    }
  ];

  return (
    <div className="max-w-[1400px] mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* 1. Hero Banner */}
      <HeroBanner 
        title="Hello Katie!" 
        subtitle="You have 16 new applications. It is a lot of work for today! So let's start 🥳."
        buttonText="review it!"
        buttonLink="/recruiter/jobs"
        illustration={
          <svg className="w-80 h-80 opacity-90" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Simple abstract illustration mimicking the reference graphic */}
            <circle cx="200" cy="150" r="100" fill="white" fillOpacity="0.1"/>
            <rect x="180" y="100" width="120" height="80" rx="8" fill="white" fillOpacity="0.8"/>
            <path d="M190 120h40M190 140h80M190 160h60" stroke="#6366f1" strokeWidth="4" strokeLinecap="round"/>
          </svg>
        }
      />

      <div className="flex flex-col xl:flex-row gap-8">
        {/* Left Column (Stats & Table) */}
        <div className="flex-1 space-y-8">
          
          {/* Stats Title Block */}
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">You need to hire</h3>
            <a href="#" className="font-semibold text-slate-500 hover:text-brand-purple text-sm underline underline-offset-4 decoration-2">see all</a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <CircularStatCard count={3} title="Content Designers" subtitle="(5 candidates)" percentage={75} strokeColor="text-blue-500" />
            <CircularStatCard count={9} title="Node.js Developers" subtitle="(12 candidates)" percentage={25} strokeColor="text-red-400" />
            <CircularStatCard count={1} title="Senior UI Designer" subtitle="(0 candidates)" percentage={0} strokeColor="text-slate-200" />
            <div className="md:hidden lg:block">
              <CircularStatCard count={2} title="Marketing Managers" subtitle="(10 candidates)" percentage={45} strokeColor="text-brand-purple" />
            </div>
          </div>

          <DataTable 
            title="Recruitment progress" 
            actionLabel="See all" 
            columns={tableColumns} 
            data={mockTableData} 
          />
        </div>

        {/* Right Column (Calendar & Applicants) */}
        <div className="xl:w-[400px] flex flex-col gap-8">
          <CalendarWidget />
          <ActionListWidget 
            title="New Applicants" 
            actionLinkText="see all" 
            items={mockApplicantsData} 
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
