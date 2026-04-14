import api from "../../../services/api";

export const getDashboardOverview = () => {
  return api.get("/admin/dashboard");
};

// Users Management
export const getAllUsers = () => {
  return api.get("/users");
};

export const deleteUser = (id) => {
  return api.delete(`/users/${id}`);
};

export const disableUser = (id) => {
  return api.put(`/users/${id}/disable`);
};

// Students Management
export const getAllStudentsForAdmin = () => {
  return api.get("/students");
};

export const getStudentProfileForAdmin = (studentId) => {
  return api.get(`/students/${studentId}`);
}

// Jobs Management
export const getAllJobsForAdmin = () => {
  return api.get("/jobs");
};

export const getJobById = (jobId) => {
  return api.get(`/jobs/${jobId}`);
};

// Companies Management
export const getAllCompaniesForAdmin = () => {
  return api.get("/companies");
};

export const getCompanyJobsForAdmin = (companyId) => {
  return api.get(`/companies/${companyId}/jobs`);
};

// Applications Management  
export const getAllApplicationsForAdmin = () => {
  return api.get("/applications");
}

