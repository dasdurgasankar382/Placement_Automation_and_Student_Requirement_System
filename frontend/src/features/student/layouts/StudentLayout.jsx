import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import StudentSidebar from "../components/layout/StudentSidebar";
import StudentHeader from "../components/layout/StudentHeader";

const StudentLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark text-slate-800 dark:text-slate-100 flex transition-colors duration-300">
      
      <StudentSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        <StudentHeader setSidebarOpen={setSidebarOpen} />

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-6 lg:p-10">
          <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentLayout;
