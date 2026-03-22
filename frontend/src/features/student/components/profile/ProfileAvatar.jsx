import React from "react";

const ProfileAvatar = ({ initials, isEditing, onChangePhoto }) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="h-32 w-32 rounded-3xl bg-gradient-to-tr from-blue-500 to-indigo-500 shadow-xl shadow-blue-500/20 flex items-center justify-center text-white text-4xl font-bold ring-4 ring-white dark:ring-slate-800">
        {initials}
      </div>
      {isEditing && (
        <button 
          type="button" 
          onClick={onChangePhoto}
          className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
        >
          Change Photo
        </button>
      )}
    </div>
  );
};

export default ProfileAvatar;
