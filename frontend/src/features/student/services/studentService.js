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
export const getTotalApplications = () => {
  return api.get("/students/total-applications");
};
export const getInterviewsScheduled = () => {
  return api.get("/students/interviews-scheduled");
};
export const getOffersReceived = () => {
  return api.get("/students/offers-received");
};
