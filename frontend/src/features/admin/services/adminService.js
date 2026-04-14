import api from "../../../services/api";

export const getDashboardOverview = () => {
  return api.get("/admin/dashboard");
};

// Users Management
export const getAllUsers = () => {
  return api.get("/users");
};

export const getUserById = (id) => {
  return api.get(`/users/${id}`);
};

export const disableUser = (id) => {
  return api.put(`/users/${id}/disable`);
};

export const enableUser = (id) => {
  return api.put(`/users/${id}/enable`);
};


// Students Management
export const getAllStudentsForAdmin = () => {
  return api.get("/students");
};

export const getStudentProfileForAdmin = (studentId) => {
  return api.get(`/students/${studentId}`);
};

export const updateStudentStatus = (studentId, status) => {
  return api.put(`/students/${studentId}/status`, { status });
};

export const deleteStudent = (studentId) => {
  return api.delete(`/students/${studentId}`);
};

// Jobs Management
export const getAllJobsForAdmin = () => {
  return api.get("/jobs");
};

export const getJobById = (jobId) => {
  return api.get(`/jobs/${jobId}`);
};

export const updateJobStatus = (jobId, status) => {
  return api.put(`/jobs/${jobId}/status`, { status });
};

export const deleteJob = (jobId) => {
  return api.delete(`/jobs/${jobId}`);
};

export const closeJob = (jobId) => {
  return api.put(`/jobs/${jobId}/close`);
};

// Companies Management
export const getAllCompaniesForAdmin = () => {
  return api.get("/companies");
};

export const getCompanyById = (companyId) => {
  return api.get(`/companies/${companyId}`);
};

export const getCompanyJobsForAdmin = (companyId) => {
  return api.get(`/companies/${companyId}/jobs`);
};

export const updateCompanyStatus = (companyId, status) => {
  return api.put(`/companies/${companyId}/status`, { status });
};

export const verifyCompany = (companyId) => {
  return api.put(`/companies/${companyId}/verify`);
};

export const deleteCompany = (companyId) => {
  return api.delete(`/companies/${companyId}`);
};

// Applications Management
export const getAllApplicationsForAdmin = () => {
  return api.get("/applications");
};

export const getApplicationById = (applicationId) => {
  return api.get(`/applications/${applicationId}`);
};

export const updateApplicationStatus = (applicationId, status) => {
  return api.put(`/applications/${applicationId}/status`, { status });
};

export const deleteApplication = (applicationId) => {
  return api.delete(`/applications/${applicationId}`);
};

// Analytics and Reports
export const getAnalyticsData = () => {
  return api.get("/admin/analytics");
};

export const getUserActivityLogs = (page = 1, limit = 50) => {
  return api.get(`/admin/logs/activity?page=${page}&limit=${limit}`);
};

export const getSystemHealth = () => {
  return api.get("/admin/health");
};

