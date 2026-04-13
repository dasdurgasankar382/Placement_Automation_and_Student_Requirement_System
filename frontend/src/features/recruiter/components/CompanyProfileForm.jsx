import React from "react";
import { Save } from "lucide-react";
import { Button } from "../../../components/ui/Button";
import { companyProfileFieldsConfig } from "../../../config/recruiter/recruiterConfig.jsx";

const inputClassName =
  "w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-70 disabled:bg-slate-100 dark:disabled:bg-slate-800 transition-all text-slate-900 dark:text-white";

const CompanyProfileForm = ({
  companyProfile,
  isEditing,
  isSaving,
  hasCompanyProfile,
  onChange,
  onCancel,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {companyProfileFieldsConfig.map((field) => (
          <div
            key={field.name}
            className={field.fullWidth ? "md:col-span-2 space-y-2" : "space-y-2"}
          >
            <label
              htmlFor={field.name}
              className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2"
            >
              <field.icon className="h-4 w-4" />
              {field.label}
            </label>

            <input
              id={field.name}
              type={field.type}
              name={field.name}
              value={companyProfile[field.name] || ""}
              onChange={onChange}
              placeholder={field.placeholder}
              disabled={!isEditing || isSaving}
              required={field.required}
              className={inputClassName}
            />
          </div>
        ))}

        <div className="md:col-span-2 space-y-2">
          <label
            htmlFor="description"
            className="text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            About Company
          </label>

          <textarea
            id="description"
            name="description"
            value={companyProfile.description || ""}
            onChange={onChange}
            placeholder="Share what your company does, its mission, culture, and hiring focus."
            disabled={!isEditing || isSaving}
            required
            rows={5}
            className={`${inputClassName} resize-y`}
          />
        </div>
      </div>

      {isEditing && (
        <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-700">
          {hasCompanyProfile && (
            <Button
              type="button"
              variant="ghost"
              onClick={onCancel}
              disabled={isSaving}
              className="hover:bg-slate-100 dark:hover:bg-slate-700"
            >
              Cancel
            </Button>
          )}

          <Button variant="primary" type="submit" disabled={isSaving}>
            <span className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              {isSaving ? "Saving..." : hasCompanyProfile ? "Save Changes" : "Create Company Profile"}
            </span>
          </Button>
        </div>
      )}
    </form>
  );
};

export default CompanyProfileForm;
