export const normalizeJob = (job = {}) => {
  const nestedJob = job.job || {};
  return {
    ...job,
    ...nestedJob,
    id: job.id || nestedJob.id,
    title: nestedJob.role || nestedJob.title || job.title || job.role || "Untitled Role",
    companyName: job.companyName || nestedJob.companyName || job.company || "Unknown Company",
    location: job.location || nestedJob.location || "Unknown Location",
    salary: job.salary || nestedJob.salary || nestedJob.package || nestedJob.stipend || "Not Disclosed",
    deadline: job.deadline || nestedJob.deadline || "",
    status: (job.status || nestedJob.status || "").toString().toUpperCase(),
    skills: nestedJob.skills || job.skills || nestedJob.tags || job.tags || [],
    description: job.description || nestedJob.description || "No description provided.",
  };
};