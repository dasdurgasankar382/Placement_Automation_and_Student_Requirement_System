import React from "react";
import { Link } from "react-router-dom";

const ProfileStrength = ({ percentage = 75 }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-slate-900 dark:text-white">Profile Strength</h2>
      <div className="bg-white dark:bg-slate-800/80 backdrop-blur-xl border border-slate-200 dark:border-slate-700 rounded-3xl p-6 shadow-sm flex flex-col items-center text-center">
        {/* Circular Progress Indicator */}
        <div className="relative h-32 w-32 mb-6">
          <svg className="h-full w-full" viewBox="0 0 36 36">
            <path
              className="text-slate-100 dark:text-slate-700"
              strokeWidth="3"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="text-blue-500"
              strokeWidth="3"
              strokeDasharray={`${percentage}, 100`}
              strokeLinecap="round"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-slate-900 dark:text-white">{percentage}%</span>
          </div>
        </div>
        <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Looking good!</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
          Add your portfolio link and recent projects to reach 100%.
        </p>
        <Link 
          to="/student/profile"
          className="w-full text-center bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-900 dark:text-white font-medium py-2.5 rounded-xl transition-colors"
        >
          Complete Profile
        </Link>
      </div>
    </div>
  );
};

export default ProfileStrength;
