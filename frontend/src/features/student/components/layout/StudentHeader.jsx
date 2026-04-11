import React from "react";
import { Menu, Moon, Sun } from "lucide-react";
import { useTheme } from "../../../../context/ThemeContext";

const StudentHeader = ({ setSidebarOpen }) => {

    const { theme: currentTheme, toggleTheme } = useTheme();

  return (
    <header className="h-20 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 lg:px-10 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button 
          className="lg:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="h-6 w-6 text-slate-800 dark:text-slate-200" />
        </button>
        <h2 className="text-xl font-semibold hidden sm:block text-slate-900 dark:text-white">
          Welcome back, Student 👋
        </h2>
      </div>
      <div className="flex items-center gap-4">
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
        {/* User Avatar Circle */}
        <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold shadow-md ring-2 ring-white dark:ring-slate-800 cursor-pointer hover:scale-105 transition-transform">
          S
        </div>
      </div>
    </header>
  );
};

export default StudentHeader;
