import React from "react";

const toneStyles = {
  blue: "text-slate-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20",
  emerald: "text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/20",
  red: "text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20",
  purple: "text-slate-400 hover:text-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20",
};

const ApplicantActionButton = ({ icon: Icon, title, onClick, tone = "blue" }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`p-2 rounded-lg transition-colors ${toneStyles[tone] || toneStyles.blue}`}
      title={title}
    >
      <Icon className="h-5 w-5" />
    </button>
  );
};

export default ApplicantActionButton;
