/**
 * Standardized formatters for Roles, Statuses, and Dates
 */

export const getRoleLabel = (role) => {
  if (!role) return "Unknown";
  if (typeof role === "string") return role.toUpperCase();
  return (role.roleName || role.name || String(role.id || "Unknown")).toUpperCase();
};

export const getRoleStyles = (role) => {
  const r = String(role || "").toUpperCase();
  switch (r) {
    case "STUDENT":
      return "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400";
    case "RECRUITER":
      return "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400";
    case "ADMIN":
      return "bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400";
    default:
      return "bg-slate-100 text-slate-700 dark:bg-slate-500/20 dark:text-slate-400";
  }
};

export const getStatusStyles = (status) => {
  const s = String(status || "").toUpperCase();
  switch (s) {
    case "ACTIVE":
    case "OPEN":
    case "VERIFIED":
      return "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800";
    case "DISABLED":
    case "CLOSED":
    case "REJECTED":
    case "SUSPENDED":
      return "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400 border-red-200 dark:border-red-800";
    case "PENDING":
    case "INACTIVE":
      return "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400 border-amber-200 dark:border-amber-800";
    default:
      return "bg-slate-100 text-slate-700 dark:bg-slate-500/20 dark:text-slate-400 border-slate-200 dark:border-slate-800";
  }
};

export const formatDate = (date) => {
  if (!date) return "N/A";
  try {
    const d = new Date(date);
    if (isNaN(d.getTime())) return String(date);
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch {
    return String(date);
  }
};

export const getTrimmedId = (id, length = 8) => {
  const idString = String(id || "");
  return idString.length > length ? `${idString.slice(0, length)}...` : idString;
};

export const formatStatusLabel = (status = "") => {
  if (!status) return "Applied";
  return status
    .toLowerCase()
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
};

export const formatDateTime = (value) => {
  if (!value) return "N/A";
  const date = new Date(value);
  if (isNaN(date.getTime())) return "N/A";

  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const normalizeJob = (job = {}) => {
  const nestedJob = job.job || {};
  return {
    ...job,
    ...nestedJob,
    id: job.id || nestedJob.id,
    title: nestedJob.role || job.role || nestedJob.title || job.title || "Untitled Role",
    companyName: job.companyName || nestedJob.companyName || job.company || "Unknown Company",
    location: job.location || job.companyLocation || nestedJob.location || "Unknown Location",
    salary: (() => {
      const raw = job.salary || nestedJob.salary || nestedJob.package || nestedJob.stipend;
      return raw ? `₹${raw.toLocaleString()}` : "Not Disclosed";
    })(),
    deadline: job.deadline || nestedJob.deadline || "",
    status: (job.jobStatus || job.status || nestedJob.status || "").toString().toUpperCase(),
    skills: job.skills || nestedJob.skills || job.tags || nestedJob.tags || [],
    description: job.description || nestedJob.description || "No description provided.",
  };
};
