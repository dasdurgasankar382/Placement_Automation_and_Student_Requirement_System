import React from "react";
import clsx from "clsx";

const ROLE_COLORS = {
  ADMIN: "9333ea", // purple-600
  RECRUITER: "2563eb", // blue-600
  STUDENT: "16a34a", // green-600
  DEFAULT: "1e293b", // slate-800
};

const SIZES = {
  32: "w-8 h-8 text-xs",
  40: "w-10 h-10 text-sm",
  48: "w-12 h-12 text-base",
};

const Avatar = ({ name = "User", role = "DEFAULT", size = 40, className }) => {
  const bgColor = ROLE_COLORS[role.toUpperCase()] || ROLE_COLORS.DEFAULT;
  const formattedName = encodeURIComponent(name);
  const avatarUrl = `https://ui-avatars.com/api/?name=${formattedName}&background=${bgColor}&color=fff&rounded=true&font-size=0.4`;

  return (
    <img
      src={avatarUrl}
      alt={`${name} avatar`}
      className={clsx(
        "rounded-full shadow-sm ring-2 ring-slate-800/50 object-cover",
        SIZES[size] || SIZES[40],
        className
      )}
      loading="lazy"
    />
  );
};

export default Avatar;
