# Frontend Features and API Integration Summary

This document provides a comprehensive breakdown of the features added to the frontend, their reliance on APIs, and where the currently integrated backend APIs are located in the codebase.

## 1. Features Added (By Module)

The frontend has been modularized by user roles and functionalities. Here are the features implemented:

### Authentication Module
- **User Log In** & **User Registration**
- **Multi-Step Forgot Password** (Email -> Verification Code -> Reset Password)

### Recruiter Module (Recruiter Dashboard)
- **Recruiter Overview (Dashboard Stats)**
- **Company Profile Management**
- **Job Management:** Contains features like Jobs List and Create New Job.
- **Applicant Tracking:** To view and manage applications for the recruiter's specific jobs.

### Student Module (Student Dashboard)
- **Student Overview (Dashboard Stats)**
- **Student Profile Management**
- **Jobs Library:** Where students can view all active jobs.
- **My Applications:** Where students can view their current application status and history.

### Admin Module (Admin Dashboard)
- **Admin Overview (Dashboard Stats)**
- **Users Management:** List of all registered users (Recruiters, Students).
- **Jobs Management:** Global view of all jobs posted on the platform.
- **Companies Management:**  Global view of all companies registered.

---

## 2. API Requirements for Features

**Yes, every major feature requires an API.** These interfaces act as a window to the backend data and heavily rely on API integration:
- **Listing Data** (e.g., viewing Jobs or Applicants) requires `GET` APIs.
- **Submitting Data** (e.g., adding a Job, updating a Profile) requires `POST` or `PUT` APIs.
- **Dashboard Counters** (e.g., totals for students, applications) require aggregate `GET` APIs.

---

## 3. Location of Added APIs (Frontend Perspective)

The base Axios configuration handles the JWT token and base URL (`http://localhost:8080/placement-automation/api`). It is located in:
`frontend/src/services/api.js`

The backend API integrations are modularly separated into "Service" files based on their domain logic:

### A. Recruiter APIs 
**File path:** `src/features/recruiter/services/recruiterService.js`
- **Add a job:** `createJob(data)` hits `POST /jobs`
- **Find all jobs (general):** `getAllJobs()` hits `GET /jobs`
- **Find jobs for specific recruiter:** `getRecruiterJobs()` hits `GET /recruiter/jobs`
- **Track applicants for a job:** `getJobApplications(jobId)` hits `GET /jobs/{jobId}/applications`
- **Update application status:** `updateApplicationStatus(id, status)` hits `PUT /applications/{id}/status`
- **Other APIs:** `createCompany()`, `getAllCompanies()`, `updateJob()`, `deleteJob()`

### B. Student APIs
**File path:** `src/features/student/services/studentService.js`
- **Fetch profile:** `getStudentProfile()` hits `GET /students/me`
- **Create/Update profile:** `createStudentProfile()` / `updateStudentProfile()` hits `POST` and `PUT` `/students/profile`
- **Get dashboard analytics:** `getStudentDashboardStats()` hits `GET /applications/student-dashboard`
> **⚠️ Note on Job Application:** The actual API method for a student to apply to a job (e.g., `POST /applications` or `POST /jobs/{jobId}/apply`) is currently missing from `studentService.js` and needs to be implemented.

### C. Admin APIs
**File path:** `src/features/admin/services/adminService.js`
- **Get admin dashboard overview:** `getDashboardOverview()` hits `GET /admin/dashboard`
- **Manage Users:** `getAllUsers()`, `deleteUser(id)`, `disableUser(id)`
- **Manage Global Jobs:** `getAllJobsForAdmin()`, `deleteJobForAdmin(id)`
- **Manage Companies:** `getAllCompaniesForAdmin()` hits `GET /admin/companies`

### D. Auth APIs
**File path:** `src/features/auth/services/authService.js`
- **Log In:** `loginUser(data)` hits `POST /auth/login`
- **Register:** `registerUser(data)` hits `POST /auth/register`

---

## 4. Features & API Status Table

| Feature / Action | API Endpoint | API Available (Frontend) | Short Description |
| :--- | :--- | :---: | :--- |
| **User Sign In** | `POST /auth/login` | ✅ Yes | Authenticates user and returns JWT token. |
| **User Registration** | `POST /auth/register` | ✅ Yes | Registers a new user (Student/Recruiter). |
| **Recruiter: Add Job** | `POST /jobs` | ✅ Yes | Allows recruiter to post a new job opening. |
| **Recruiter: View Own Jobs** | `GET /recruiter/jobs` | ✅ Yes | Fetches a list of jobs posted by the recruiter. |
| **Recruiter: Track Applicants** | `GET /jobs/{id}/applications` | ✅ Yes | Shows list of students who applied for a specific job. |
| **Recruiter: Update App Status**| `PUT /applications/{id}/status` | ✅ Yes | Recruiter accepts or rejects a student's application. |
| **Recruiter: Manage Company** | `POST /companies` | ✅ Yes | Registers and manages a company profile. |
| **Student: View Profile** | `GET /students/me` | ✅ Yes | Fetches the logged-in student's personal details. |
| **Student: Update Profile** | `PUT /students/profile`| ✅ Yes | Updates the student's skills, resume, etc. |
| **Student: View All Jobs** | `GET /jobs` | ✅ Yes | Fetches all available jobs to browse on the platform. |
| **Student: Apply for Job** | `POST /applications` | ❌ **No** | *Missing API call.* Allows student to apply for a job. |
| **Student: Get Dashboard Stats**| `GET /applications/...`| ✅ Yes | Fetches numerical statistics for the student dashboard. |
| **Admin: View Dashboard Stats** | `GET /admin/dashboard` | ✅ Yes | Fetches count metrics (jobs, companies, users data). |
| **Admin: Manage Users/Jobs** | `GET /admin/...` | ✅ Yes | Retrieves list of all users and jobs for tracking. |
| **Admin: Delete User/Job** | `DELETE /admin/.../{id}` | ✅ Yes | Allows admin to securely remove entities from the system. |
