import React from "react";
import { TrendingUp } from "lucide-react";

const StatCard = ({ title, value, icon: Icon, trend, colorClass }) => (
  <div className="bg-white dark:bg-slate-800/80 backdrop-blur-xl border border-slate-200 dark:border-slate-700 p-6 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 group">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-slate-500 dark:text-slate-400 font-medium">{title}</p>
        <h3 className="text-4xl font-bold mt-2 text-slate-900 dark:text-white">{value}</h3>
      </div>
      <div className={`p-4 rounded-2xl ${colorClass} group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
    </div>
    <div className="mt-4 flex items-center gap-2 text-sm font-medium text-emerald-600 dark:text-emerald-400">
      <TrendingUp className="h-4 w-4" />
      <span>{trend}</span>
      <span className="text-slate-400 dark:text-slate-500 font-normal ml-1">from last month</span>
    </div>
  </div>
);

export default StatCard;
