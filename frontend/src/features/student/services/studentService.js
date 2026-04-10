import api from "../../../services/api";

export const getStudentProfile = () => {
  return api.get("/students/profile/me");
};

export const createStudentProfile = (data) => {
  return api.post("/students/create-profile", data, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
};

export const downloadResume = () => {
  return api.get("/students/profile/me/resume");
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
