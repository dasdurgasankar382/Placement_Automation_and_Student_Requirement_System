import React from "react";
import { Save, Download, Upload } from "lucide-react";
import { profileFieldsConfig } from "../../../../config/student/studentConfig";

const ProfileForm = ({ profile, isEditing, handleChange, setIsEditing, handleSubmit, handleFileChange, handleDownloadResume }) => {
  return (
    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
      {profileFieldsConfig.map((field) => (
        <div key={field.name} className="space-y-1">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
            <field.icon className="h-4 w-4" /> {field.label}
          </label>
          <input 
            type={field.type}
            name={field.name}
            step={field.step}
            value={profile[field.name] || ""}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-70 disabled:bg-slate-100 dark:disabled:bg-slate-800 transition-all text-slate-900 dark:text-white"
          />
        </div>
      ))}

      <div className="sm:col-span-2 space-y-1">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Skills (comma separated)</label>
        <textarea 
          name="skills"
          value={profile.skills || ""}
          onChange={handleChange}
          disabled={!isEditing}
          rows={3}
          className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-70 disabled:bg-slate-100 dark:disabled:bg-slate-800 transition-all text-slate-900 dark:text-white resize-none"
        />
      </div>

      <div className="sm:col-span-2 space-y-1">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
          <Upload className="h-4 w-4" /> Resume File
        </label>
        {isEditing ? (
          <input 
            type="file"
            name="resumeFile"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500 transition-all text-slate-900 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        ) : (
          profile.fileName ? (
            <div className="flex items-center gap-4">
              <span className="text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 truncate max-w-sm">
                {profile.fileName}
              </span>
              <button 
                type="button"
                onClick={handleDownloadResume}
                className="flex items-center gap-2 px-4 py-2.5 bg-green-50 text-green-600 hover:bg-green-100 border border-green-200 rounded-xl font-medium transition-colors"
                title="Download Resume"
              >
                <Download className="h-4 w-4" /> Download
              </button>
            </div>
          ) : (
            <span className="text-slate-500 italic block py-2.5 px-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700">No resume uploaded</span>
          )
        )}
      </div>

      {isEditing && (
        <div className="col-span-1 sm:col-span-2 mt-4 flex justify-end gap-4 border-t border-slate-100 dark:border-slate-700 pt-6">
          <button 
            type="button" 
            onClick={() => setIsEditing(false)}
            className="px-6 py-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 font-medium transition-colors"
          >
            Cancel
          </button>
          <button 
            type="button"
            onClick={handleSubmit}
            className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-lg shadow-blue-500/30 flex items-center gap-2 transition-all"
          >
            <Save className="h-4 w-4" /> Save Changes
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileForm;
