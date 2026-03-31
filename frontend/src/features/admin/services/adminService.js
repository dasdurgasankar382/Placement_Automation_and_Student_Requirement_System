import api from "../../../services/api";

export const getDashboardOverview = () => {
  return api.get("/admin/dashboard");
};

// Users Management
export const getAllUsers = () => {
  return api.get("/admin/users");
};

export const deleteUser = (id) => {
  return api.delete(`/admin/user/${id}`);
};

export const disableUser = (id) => {
  return api.put(`/users/${id}/disable`);
};

// Jobs Management
export const getAllJobsForAdmin = () => {
  return api.get("/admin/jobs");
};

export const deleteJobForAdmin = (id) => {
  return api.delete(`/admin/job/${id}`);
};

// Companies Management
export const getAllCompaniesForAdmin = () => {
  return api.get("/admin/companies");
};
