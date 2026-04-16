import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../../components/layout/Sidebar";
import Header from "../../../components/layout/Header";
import { recruiterNavigationLinks } from "../../../config/recruiter/recruiterConfig";

const recruiterTheme = {
  gradient: "from-emerald-500 to-teal-600",
  bgActive: "bg-emerald-500 shadow-emerald-500/30",
  textHover: "hover:text-emerald-600 dark:hover:text-emerald-400",
  bgHover: "hover:bg-emerald-50 dark:hover:bg-slate-800/50"
};

const RecruiterLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen overflow-hidden bg-bg-light dark:bg-bg-dark text-slate-800 dark:text-slate-100 flex transition-colors duration-300">

      <Sidebar
        title="Recruiter Hub"
        navigation={recruiterNavigationLinks}
        theme={recruiterTheme}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">

        <Header
          titleText="Welcome back, Recruiter 👋"
          setSidebarOpen={setSidebarOpen}
          theme={recruiterTheme}
        />

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          <div className="w-full max-w-[1400px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default RecruiterLayout;
