import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { LogOut, LayoutGrid, MessageSquare } from "lucide-react";
import { logoutUser } from "../../features/auth/services/authService";
import { toast } from "react-toastify";
import SuccessPage from "../../features/auth/components/SuccessPage";

/**
 * Modern Dashboard Sidebar
 * @param {string} title - Main app title or Role title
 * @param {Array} navigation - Array of navigation link objects 
 * @param {boolean} sidebarOpen - State of the sidebar (mobile)
 * @param {Function} setSidebarOpen - Setter for sidebar state
 */
const Sidebar = ({ title, navigation, sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logoutUser(); // Call API to invalidate session/token
      toast.info("Logged out, see you soon 👋");
      localStorage.removeItem("token");
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (error) {
      console.error("Error occurred while logging out:", error);
      toast.error("Failed to log out.");
    }
  };


  return (
    <>
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Architecture */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static flex flex-col ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand/Logo Section */}
        <div className="h-20 flex items-center px-8">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="flex items-center justify-center bg-brand-purple text-white p-2 rounded-lg group-hover:bg-brand-purple-hover transition-colors">
              <LayoutGrid className="h-5 w-5" />
            </div>
            <h1 className="text-xl font-bold text-brand-purple dark:text-indigo-400 group-hover:text-brand-purple-hover transition-colors tracking-tight">
              {title || "AppPortal"}
            </h1>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = location.pathname.includes(item.href) || location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-200 group ${
                  isActive
                    ? "bg-slate-50 dark:bg-slate-800/60 text-brand-purple dark:text-indigo-400 font-semibold"
                    : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/40 hover:text-slate-800 dark:hover:text-slate-200"
                }`}
              >
                {item.icon && (
                  <item.icon
                    className={`h-5 w-5 transition-transform ${
                      isActive ? "scale-110" : "group-hover:scale-110"
                    }`}
                  />
                )}
                <span>{item.name}</span>
                {/* Active Indicator Strip (matches design ref) */}
                {isActive && (
                  <div className="absolute left-0 w-1.5 h-8 bg-brand-purple dark:bg-indigo-400 rounded-r-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Support Banner & Logout */}
        <div className="px-6 pb-6">
          <div className="bg-slate-50 dark:bg-slate-800 rounded-3xl p-6 text-center mb-4 relative overflow-hidden">
            <div className="w-full flex justify-center mb-3">
               <div className="bg-white dark:bg-slate-700 p-3 rounded-full shadow-sm">
                 <MessageSquare className="h-6 w-6 text-brand-purple dark:text-indigo-400" />
               </div>
            </div>
            <h4 className="font-bold text-slate-800 dark:text-slate-100 text-sm">Support 24/7</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-4">Contact us anytime</p>
            <button className="w-full py-2.5 bg-brand-purple hover:bg-brand-purple-hover text-white rounded-xl text-xs font-semibold shadow-md shadow-brand-purple/20 transition-colors">
              Start chat
            </button>
          </div>

          <button 
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 w-full py-3 text-slate-500 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors group font-medium text-sm"
          >
            <LogOut className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
