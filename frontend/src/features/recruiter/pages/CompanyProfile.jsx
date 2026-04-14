import React, { useEffect, useState } from "react";
import { Building2, PencilLine } from "lucide-react";
import { toast } from "react-toastify";
import { Button } from "../../../components/ui/Button";
import CompanyProfileForm from "../components/CompanyProfileForm";
import { createCompany, fetchCompanyProfileData } from "../services/recruiterService";

const EMPTY_COMPANY_PROFILE = {
  name: "",
  location: "",
  website: "",
  description: "",
};

const hasCompanyProfileDetails = (profile = EMPTY_COMPANY_PROFILE) =>
  Object.values(profile).some((value) => value?.toString().trim());

const CompanyProfile = () => {
  const [companyProfile, setCompanyProfile] = useState(EMPTY_COMPANY_PROFILE);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [hasCompanyProfile, setHasCompanyProfile] = useState(false);

  useEffect(() => {
    loadCompanyProfile();
  }, []);

  const loadCompanyProfile = async () => {
    try {
      setIsLoading(true);
      const profileData = await fetchCompanyProfileData();
      const profileExists = hasCompanyProfileDetails(profileData);

      setCompanyProfile(profileExists ? profileData : EMPTY_COMPANY_PROFILE);
      setHasCompanyProfile(profileExists);
      setIsEditing(!profileExists);
    } catch (error) {
      console.error("Error fetching company profile:", error);

      const status = error?.response?.status;

      setCompanyProfile(EMPTY_COMPANY_PROFILE);
      setHasCompanyProfile(false);
      setIsEditing(true);

      if (status && status !== 404) {
        toast.error(error?.response?.data?.message || "Failed to load company profile.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCompanyProfile((currentProfile) => ({
      ...currentProfile,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsSaving(true);
      const response = await createCompany(companyProfile);
      const responseData = response.data;

      if (responseData?.success === false) {
        toast.error(responseData.message || "Failed to save company profile.");
        return;
      }

      toast.success(responseData?.message || "Company profile saved successfully!");
      await loadCompanyProfile();
    } catch (error) {
      console.error("Failed to save company profile:", error);
      toast.error(
        error?.response?.data?.message || "An error occurred while saving the company profile.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    if (hasCompanyProfile) {
      loadCompanyProfile();
      return;
    }

    setCompanyProfile(EMPTY_COMPANY_PROFILE);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-start gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Company Profile</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Keep your company identity up to date before posting or managing jobs.
          </p>
        </div>

        {hasCompanyProfile && !isEditing && (
          <Button
            type="button"
            variant="ghost"
            onClick={() => setIsEditing(true)}
            className="border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700"
          >
            <span className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
              <PencilLine className="h-4 w-4" />
              Edit Profile
            </span>
          </Button>
        )}
      </div>

      <div className="bg-white dark:bg-slate-800/80 backdrop-blur-xl border border-slate-200 dark:border-slate-700 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700">
          <div className="h-12 w-12 rounded-2xl bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-300 flex items-center justify-center shrink-0">
            <Building2 className="h-6 w-6" />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              {hasCompanyProfile ? companyProfile.name || "Company details" : "Create your company profile"}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              {hasCompanyProfile
                ? isEditing
                  ? "Update your company information and save the latest details."
                  : "Your saved company details are loaded below. Switch to edit mode whenever you need to update them."
                : "Add your company details once and they will be reused across your recruiter workflow."}
            </p>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20 text-slate-500">
            <span className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></span>
          </div>
        ) : (
          <CompanyProfileForm
            companyProfile={companyProfile}
            isEditing={isEditing}
            isSaving={isSaving}
            hasCompanyProfile={hasCompanyProfile}
            onChange={handleChange}
            onCancel={handleCancel}
            onSubmit={handleSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default CompanyProfile;
