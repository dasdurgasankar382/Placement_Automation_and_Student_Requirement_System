import api from "../../../services/api";

export const getStudentProfile = () => {
  return api.get("/students/me");
};

export const createStudentProfile = (data) => {
  return api.post("/students/profile", data);
};

export const updateStudentProfile = (data) => {
  return api.put("/students/profile", data);
};

export const getStudentById = (id) => {
  return api.get(`/students/${id}`);
};

export const getAllStudents = () => {
  return api.get("/students");
};

export const getStudentDashboardStats = () => {
  return api.get("/applications/student-dashboard");
};

// ==========================================
// PENDING / LATER IMPLEMENTATION APIs
// ==========================================

export const applyForJob = (jobId) => {
  // Sending POST /applications/{jobId} since hitting root /applications threw 405 Method Not Supported
  return api.post(`/applications/${jobId}`, { jobId });
};

export const getStudentApplications = () => {
  return api.get("/applications/my-applications");
};
