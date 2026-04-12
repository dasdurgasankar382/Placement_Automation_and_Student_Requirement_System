import api from "../../../services/api";

export const getStudentProfile = () => {
  return api.get("/students/profile/me");
};

export const mapStudentProfileData = (profileData = {}) => {
  return {
    name: profileData.name || "",
    branch: profileData.branch || "",
    cgpa: profileData.cgpa || "",
    phone: profileData.phone || "",
    graduationYear: profileData.graduationYear || "",
    skills: Array.isArray(profileData.skills) ? profileData.skills.join(", ") : "",
    fileName: profileData.fileName || "",
  };
};

export const fetchStudentProfileData = async () => {
  const response = await getStudentProfile();
  return mapStudentProfileData(response.data?.data);
};

export const createStudentProfile = (data) => {
  return api.post("/students/create-profile", data);
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


export const jobsForStudent = () => {
  return api.get("/students/jobs/for-student");
}

// applications
export const applyForJob = (jobId) => {
  // Sending POST /applications/{jobId} since hitting root /applications threw 405 Method Not Supported
  return api.post(`/applications/${jobId}`, { jobId });
};

export const getStudentApplications = () => {
  return api.get("/applications/my-applications");
};
  export const getStudentDashboardStats = () => {
    return api.get("/applications/student-dashboard");
  };
