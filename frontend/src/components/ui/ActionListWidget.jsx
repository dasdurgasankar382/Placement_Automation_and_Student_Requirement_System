import React from "react";
import { MessageSquare, Phone, UserRound } from "lucide-react";

/**
 * Universal Action List Widget
 * Replicates the "New Applicants" vertical list element. 
 * Can be reused for Students (e.g., "Recent Companies"), Admins (e.g., "Recent Users").
 * 
 * @param {string} title - Title of the widget block (e.g., "New Applicants")
 * @param {Array} items - Data array for list items
 * @param {string} actionLinkText - Text for top-right link (e.g., "see all")
 */
const ActionListWidget = ({ title = "Recent Activity", items = [], actionLinkText = "see all" }) => {
  return (
    <div className="bg-bg-light-component dark:bg-bg-dark-component rounded-3xl p-6 lg:p-8 shadow-sm border border-slate-100 dark:border-slate-800">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">{title}</h3>
        {actionLinkText && (
          <a href="#" className="text-sm font-semibold text-slate-500 hover:text-brand-purple underline decoration-slate-300 dark:decoration-slate-600 underline-offset-4 decoration-2">
            {actionLinkText}
          </a>
        )}
      </div>

      <div className="space-y-6">
        {items.map((item, index) => (
          <div key={index} className="flex items-center justify-between group">
            <div className="flex items-center gap-4">
              {/* Avatar Circle */}
              <div className="h-12 w-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 font-bold overflow-hidden">
                {item.avatarUrl ? (
                  <img src={item.avatarUrl} alt={item.name} className="h-full w-full object-cover" />
                ) : (
                  item.name.charAt(0)
                )}
              </div>
              
              <div>
                <h4 className="font-bold text-slate-800 dark:text-slate-100 group-hover:text-brand-purple transition-colors">{item.name}</h4>
                <p className="text-xs text-slate-500 mt-0.5">{item.subtitle}</p>
              </div>
            </div>

            {/* Quick Actions (matching mockup: profile, message, call) */}
            <div className="flex items-center gap-2 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="h-8 w-8 rounded-full bg-blue-50 dark:bg-slate-800 text-blue-500 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-colors">
                <UserRound className="h-4 w-4" />
              </button>
              <button className="h-8 w-8 rounded-full bg-blue-50 dark:bg-slate-800 text-blue-500 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-colors">
                <MessageSquare className="h-4 w-4" />
              </button>
              <button className="h-8 w-8 rounded-full bg-emerald-50 dark:bg-slate-800 text-emerald-500 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-colors">
                <Phone className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActionListWidget;
