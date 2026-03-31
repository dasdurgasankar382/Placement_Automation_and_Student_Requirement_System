import api from "../../../services/api";

// Companies
export const createCompany = (data) => {
  return api.post("/companies", data);
};

export const getAllCompanies = () => {
  return api.get("/companies");
};

export const getCompanyById = (id) => {
  return api.get(`/companies/${id}`);
};

export const getCompanyJobs = (companyId) => {
  return api.get(`/companies/${companyId}/jobs`);
};

// Jobs
export const createJob = (data) => {
  return api.post("/jobs", data);
};

export const updateJob = (id, data) => {
  return api.put(`/jobs/${id}`, data);
};

export const deleteJob = (id) => {
  return api.delete(`/jobs/${id}`);
};

export const getAllJobs = () => {
  return api.get("/jobs");
};

export const getJobById = (id) => {
  return api.get(`/jobs/${id}`);
};

export const getRecruiterJobs = () => {
  return api.get("/recruiter/jobs");
};

// Applications
export const getJobApplications = (jobId) => {
  return api.get(`/jobs/${jobId}/applications`);
};

export const updateApplicationStatus = (id, status) => {
  return api.put(`/applications/${id}/status`, { status });
};
