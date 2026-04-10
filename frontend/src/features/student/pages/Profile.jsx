import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import ProfileAvatar from "../components/profile/ProfileAvatar";
import ProfileForm from "../components/profile/ProfileForm";
import { getStudentProfile, createStudentProfile, downloadResume } from "../services/studentService";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [resumeFile, setResumeFile] = useState(null);
  
  const [profile, setProfile] = useState({
    name: "",
    branch: "",
    cgpa: "",
    phone: "",
    graduationYear: "",
    skills: "",
    fileName: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await getStudentProfile();
      if (response.data) {
        setProfile({
          name: response.data.name || "",
          branch: response.data.branch || "",
          cgpa: response.data.cgpa || "",
          phone: response.data.phone || "",
          graduationYear: response.data.graduationYear || "",
          skills: response.data.skills ? response.data.skills.join(", ") : "",
          fileName: response.data.fileName || "",
        });
      }
    } catch (error) {
      console.error("Failed to fetch profile:", error);
      // We don't necessarily show toast here as it might be a new profile, but we can log.
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setResumeFile(e.target.files[0]);
    } else {
      setResumeFile(null);
    }
  };

  const handleDownloadResume = async () => {
    try {
      const response = await downloadResume();
      const base64Data = response.data.base64Data;
      const fileType = response.data.fileType;
      const fileName = response.data.fileName;

      // Convert base64 to blob and download
      const byteCharacters = atob(base64Data);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: fileType });

      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = fileName;
      link.click();
      window.URL.revokeObjectURL(link.href);
      
    } catch (error) {
      console.error("Failed to download resume:", error);
      toast.error("Failed to download resume");
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    
    try {
      const formData = new FormData();
      formData.append("name", profile.name);
      formData.append("branch", profile.branch);
      formData.append("cgpa", profile.cgpa);
      formData.append("phone", profile.phone);
      formData.append("graduationYear", profile.graduationYear);
      
      const skillsArray = profile.skills.split(",").map(s => s.trim()).filter(s => s !== "");
      skillsArray.forEach(skill => formData.append("skills", skill));

      if (resumeFile) {
        formData.append("resumeFile", resumeFile);
      } else if (!profile.fileName) {
        toast.error("Please upload a resume");
        return;
      } else {
        // If the backend requires a file even for updates, user will have to upload again.
        // Let's create an empty file just in case it throws @NotNull exception otherwise
        const emptyFile = new File([""], profile.fileName, { type: "application/octet-stream" });
        formData.append("resumeFile", emptyFile);
      }

      await createStudentProfile(formData);
      setIsEditing(false);
      setResumeFile(null); // Reset the file after saving
      toast.success("Profile saved successfully");
      fetchProfile(); // reload data
    } catch (error) {
      console.error("Failed to save profile:", error);
      toast.error(error.response?.data?.message || "Failed to save profile");
    }
  };

  const getInitials = (name) => {
    if (!name) return "US";
    return name.split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">My Profile</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Manage your personal and academic information.</p>
        </div>
        {!isEditing && (
          <button 
            onClick={() => setIsEditing(true)}
            className="bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 border border-slate-200 dark:border-slate-700 px-5 py-2.5 rounded-xl font-medium shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            Edit Profile
          </button>
        )}
      </div>

      {/* Main Form Container */}
      <div className="bg-white dark:bg-slate-800/80 backdrop-blur-xl border border-slate-200 dark:border-slate-700 rounded-3xl p-6 sm:p-10 shadow-sm">
        {loading ? (
          <div className="flex justify-center items-center py-20 text-slate-500">
            <span className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></span>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row gap-8 items-start">
            
            <ProfileAvatar 
              initials={getInitials(profile.name)} 
              isEditing={isEditing} 
              onChangePhoto={() => alert("Change photo feature")} 
            />

            <ProfileForm 
              profile={profile} 
              isEditing={isEditing} 
              handleChange={handleChange} 
              setIsEditing={setIsEditing} 
              handleSubmit={handleSubmit} 
              handleFileChange={handleFileChange}
              handleDownloadResume={handleDownloadResume}
            />

          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
