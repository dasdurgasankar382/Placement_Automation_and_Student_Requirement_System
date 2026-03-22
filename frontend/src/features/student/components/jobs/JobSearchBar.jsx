import React from "react";
import { Search, Filter } from "lucide-react";

const JobSearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
        <input 
          type="text"
          placeholder="Search by job title, company, or keywords..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-white dark:bg-slate-800/80 backdrop-blur-md border border-slate-200 dark:border-slate-700 pl-12 pr-4 py-3.5 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 shadow-sm text-slate-900 dark:text-white transition-all"
        />
      </div>
      <button className="bg-white dark:bg-slate-800/80 backdrop-blur-md border border-slate-200 dark:border-slate-700 px-6 py-3.5 rounded-2xl flex items-center justify-center gap-2 font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 shadow-sm transition-all sm:w-auto w-full">
        <Filter className="h-4 w-4" /> Filters
      </button>
    </div>
  );
};

export default JobSearchBar;
