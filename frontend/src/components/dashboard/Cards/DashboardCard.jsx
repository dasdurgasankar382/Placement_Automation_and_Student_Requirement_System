import React from "react";
import clsx from "clsx";

const DashboardCard = ({ title, value, icon: Icon, trend, trendUp = true }) => {
  return (
    <div className="bg-[#1e293b]/80 backdrop-blur-md rounded-2xl p-5 border border-slate-700/50 hover:shadow-lg hover:shadow-purple-500/10 hover:-translate-y-1 transition-all duration-300 ease-out group">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-slate-400 text-sm font-medium tracking-wide">
            {title}
          </p>
          <div className="flex items-baseline gap-3">
            <h3 className="text-3xl font-bold text-slate-100">{value}</h3>
            {trend && (
              <span
                className={clsx(
                  "text-sm font-medium px-2 py-0.5 rounded-full",
                  trendUp
                    ? "text-emerald-400 bg-emerald-400/10"
                    : "text-rose-400 bg-rose-400/10"
                )}
              >
                {trend}
              </span>
            )}
          </div>
        </div>
        {Icon && (
          <div className="p-3 bg-slate-800 rounded-xl group-hover:bg-purple-500/20 group-hover:text-purple-400 transition-colors duration-300">
            <Icon className="w-6 h-6 text-slate-400 group-hover:text-purple-400" />
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardCard;
