import React from "react";

const ChartCard = ({ title, children, subtitle }) => {
  return (
    <div className="bg-[#1e293b]/80 backdrop-blur-md rounded-2xl p-6 border border-slate-700/50 flex flex-col shadow-lg">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-slate-100">{title}</h3>
        {subtitle && <p className="text-sm text-slate-400 mt-1">{subtitle}</p>}
      </div>
      <div className="w-full relative">
        {children}
      </div>
    </div>
  );
};

export default ChartCard;
