import api from "../../../services/api";

// Companies
export const createCompany = (data) => {
  return api.post("/companies", data);
};

export const getCompanyProfile = () => {
  return api.get("/companies/company-profile");
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

export const mapCompanyProfileData = (profileData = {}) => {
  const company = profileData?.data ?? profileData;

  return {
    name: company?.name || "",
    location: company?.location || "",
    website: company?.website || "",
    description: company?.description || "",
  };
};

export const fetchCompanyProfileData = async () => {
  const response = await getCompanyProfile();
  return mapCompanyProfileData(response.data?.data || response.data);
};


// Jobs
export const createJob = (data) => {
  return api.post("/jobs", data);
};

export const updateJob = (id, data) => {
  return api.put(`/jobs/${id}`, data);
};

export const closeJob = (id) => {
  return api.put(`/jobs/close-job/${id}`);
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
  return api.get("/jobs/company-jobs");
};

// Applications
export const getJobApplicants = (jobId) => {
  return api.get(`/applications/applicants/${jobId}`);
};

export const mapApplicantData = (applicant = {}) => {
  return {
    id: applicant.applicationId,
    applicationId: applicant.applicationId,
    studentId: applicant.studentId,
    jobId: applicant.jobId,
    jobTitle: applicant.jobTitle || "Untitled Job",
    companyName: applicant.companyName || "",
    studentName: applicant.studentName || "Unknown Student",
    email: applicant.email || "No email provided",
    resumeName: applicant.resumeName || "",
    skills: Array.isArray(applicant.skills) ? applicant.skills : [],
    applicationStatus: applicant.applicationStatus || "APPLIED",
    appliedAt: applicant.appliedAt || null,
  };
};

export const getJobApplications = async (jobId) => {
  const response = await getJobApplicants(jobId);
  return (response.data?.data || response.data || []).map(mapApplicantData);
};

export const updateApplicationStatus = (id, status) => {
  return api.put(`/applications/${id}/status`, {
    status,
    applicationStatus: status,
  });
};

export const getResume = (studentId) => {
  return api.get(`/applications/applicant/${studentId}/resume`);
};

// Students
export const getStudentById = (id) => {
  return api.get(`/students/${id}`);
}
