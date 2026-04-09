import React from "react";

/**
 * Universal Circular Progress Stat Card Component
 * Replicates the "You need to hire" cards from the reference image.
 * 
 * @param {string | number} count - The main large number
 * @param {string} title - Primary title (e.g., "Content Designers")
 * @param {string} subtitle - Secondary text (e.g., "(5 candidates)")
 * @param {number} percentage - Completion percentage (0-100)
 * @param {string} strokeColor - Tailwind color class for the stroke (e.g., "text-blue-500")
 */
const CircularStatCard = ({ 
  count, 
  title, 
  subtitle, 
  percentage = 0, 
  strokeColor = "text-brand-purple" 
}) => {
  // SVG circular properties
  const radius = 24; // smaller aesthetic ring
  const strokeWidth = 5;
  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="bg-bg-light-component dark:bg-bg-dark-component rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 flex items-center justify-between hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4">
        <h3 className="text-4xl font-bold text-slate-900 dark:text-white relative top-0.5">
          {count}
        </h3>
        <div className="flex flex-col">
          <span className="font-semibold text-slate-800 dark:text-slate-100 text-sm">{title}</span>
          <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{subtitle}</span>
        </div>
      </div>
      
      {/* Circular Progress Ring matching the mockup */}
      <div className="relative flex items-center justify-center">
        {percentage > 0 && (
          <span className="absolute font-bold text-[10px] text-slate-700 dark:text-slate-300">
            {percentage}%
          </span>
        )}
        <svg
          height={radius * 2}
          width={radius * 2}
          className="transform -rotate-90"
        >
          {/* Background Ring */}
          <circle
            stroke="currentColor"
            fill="transparent"
            strokeWidth={strokeWidth}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            className="text-slate-100 dark:text-slate-700"
          />
          {/* Progress Ring */}
          <circle
            stroke="currentColor"
            fill="transparent"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference + " " + circumference}
            style={{ strokeDashoffset }}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            className={`${strokeColor} transition-all duration-1000 ease-out`}
          />
        </svg>
      </div>
    </div>
  );
};

export default CircularStatCard;
