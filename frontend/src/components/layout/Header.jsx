import React from "react";
import { Menu, Moon, Sun, Search, Mail, Bell, ChevronDown } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

/**
 * Modern Dashboard Header
 * @param {string} titleText - The title (e.g., "Dashboard")
 * @param {Function} setSidebarOpen - Setter for mobile sidebar toggle
 */
const Header = ({ titleText, setSidebarOpen, profileName }) => {
  const { theme: currentTheme, toggleTheme } = useTheme();
  const initial = profileName ? profileName.charAt(0).toUpperCase() : "U";
  return (
    <header className="h-24 bg-transparent flex items-center justify-between px-6 lg:px-10 sticky top-0 z-30">
      
      {/* Left section: Mobile Menu & Title */}
      <div className="flex items-center gap-4">
        <button
          className="lg:hidden p-2 rounded-lg bg-white dark:bg-slate-800 shadow-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="h-5 w-5" />
        </button>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white hidden sm:block tracking-tight">
          {titleText || "Dashboard"}
        </h2>
      </div>
      
      {/* Right section: Icons & Profile */}
      <div className="flex items-center gap-3 sm:gap-6">
        
        {/* Quick Actions (Search, Messages, Notifications, Theme) */}
        <div className="flex items-center gap-2 sm:gap-4 text-slate-600 dark:text-slate-400">
          {/* <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors hidden sm:block">
            <Search className="h-5 w-5" />
          </button>
          
          <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors hidden sm:block">
            <Mail className="h-5 w-5" />
          </button>

          <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-2 h-2 w-2 bg-red-500 rounded-full ring-2 ring-bg-light dark:ring-bg-dark"></span>
          </button> */}

          <button
            onClick={toggleTheme}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
            title="Toggle Theme"
          >
            {currentTheme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Profile Avatar Trigger */}
        <button className="flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800 p-1 pr-2 rounded-full transition-colors">
          <div className="h-10 w-10 relative overflow-hidden rounded-full bg-brand-purple/20 ring-2 ring-white dark:ring-slate-800 shadow-sm flex items-center justify-center">
            {/* Fallback avatar visual */}
            <span className="text-brand-purple font-bold text-sm">{initial}</span>
          </div>
          <ChevronDown className="h-4 w-4 text-slate-500 hidden sm:block" />
        </button>
      </div>
    </header>
  );
};

export default Header;
