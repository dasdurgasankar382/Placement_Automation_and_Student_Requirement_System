import React, { useState } from "react";
import ProfileAvatar from "../components/profile/ProfileAvatar";
import ProfileForm from "../components/profile/ProfileForm";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    university: "State University",
    major: "Computer Science",
    gpa: "3.8/4.0",
    skills: "React, Node.js, Spring Boot, Python",
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    setIsEditing(false);
    // Add logic to save profile to API here
  };

  const getInitials = (name) => {
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
          />

        </div>
      </div>
    </div>
  );
};

export default Profile;
