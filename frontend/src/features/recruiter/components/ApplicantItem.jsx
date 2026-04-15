import React from "react";
import { User } from "lucide-react";
import { applicantStatusColors, getAvailableStatusActions } from "../../../config/recruiter/recruiterConfig";
import { formatStatusLabel, formatDateTime } from "../../../utils/formatters";

const ApplicantItem = ({ applicant, onUpdateStatus, onViewProfile }) => {
  const availableActions = getAvailableStatusActions(applicant.applicationStatus);

  return (
    <li className="p-6 flex flex-col xl:flex-row items-start xl:items-center justify-between gap-6 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
      <div className="flex items-center gap-4 w-full xl:w-auto">
        <div className="h-12 w-12 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400">
          <User className="h-6 w-6" />
        </div>
        <div>
          <h3
            className="font-semibold text-slate-900 dark:text-white text-base hover:underline cursor-pointer"
            onClick={() => onViewProfile(applicant)}
          >
            {applicant.studentName}
          </h3>
          <p className="text-slate-500 dark:text-slate-400">
            {applicant.email}
          </p>
          <div className="flex flex-col gap-1 mt-1">
            <p className="text-xs text-slate-400">
              Applied: {formatDateTime(applicant.appliedAt)}
            </p>
            <p className="text-xs text-slate-400">
              Job Role: {applicant.jobTitle}
            </p>
            {applicant.resumeName && (
              <p className="text-xs text-slate-400">
                Resume: {applicant.resumeName}
              </p>
            )}
          </div>
          {applicant.skills && applicant.skills.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {applicant.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-2.5 py-1 bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 rounded-lg text-xs font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4 w-full xl:w-auto justify-between xl:justify-end">
        <span
          className={`px-3 py-1 rounded-full font-semibold text-xs ${
            applicantStatusColors[applicant.applicationStatus] || applicantStatusColors.APPLIED
          }`}
        >
          {formatStatusLabel(applicant.applicationStatus)}
        </span>

        {availableActions.length > 0 && (
          <select
            onChange={(e) => {
              if (e.target.value) {
                onUpdateStatus(applicant.applicationId, e.target.value);
                e.target.value = ""; // Reset after selection
              }
            }}
            defaultValue=""
            className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-colors cursor-pointer"
          >
            <option value="" disabled>
              Action...
            </option>
            {availableActions.map((status) => (
              <option key={status} value={status}>
                Mark as {formatStatusLabel(status)}
              </option>
            ))}
          </select>
        )}
      </div>
    </li>
  );
};

export default ApplicantItem;
