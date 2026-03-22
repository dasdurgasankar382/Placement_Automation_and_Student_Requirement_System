import React from "react";
import JobCard from "../../../../components/ui/JobCard";

const JobList = ({ jobs, onApply }) => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white">
        {jobs.length} {jobs.length === 1 ? 'Job' : 'Jobs'} Found
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {jobs.map(job => (
          <JobCard 
            key={job.id} 
            job={job} 
            onApply={() => onApply(job)} 
          />
        ))}
      </div>
      {jobs.length === 0 && (
        <div className="text-center py-20 bg-white/50 dark:bg-slate-800/50 rounded-3xl border border-slate-200 dark:border-slate-700 border-dashed">
          <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300">No jobs found matching your criteria.</h3>
          <p className="text-slate-500 dark:text-slate-400 mt-2">Try adjusting your search keywords or filters.</p>
        </div>
      )}
    </div>
  );
};

export default JobList;
