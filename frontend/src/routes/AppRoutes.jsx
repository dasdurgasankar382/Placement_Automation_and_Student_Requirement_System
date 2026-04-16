import React from "react";
import { Routes, Route } from "react-router-dom";
import RootRedirect from "../components/common/RootRedirect";
// auth
import LoginPage from "../features/auth/pages/Login";
import RegisterPage from "../features/auth/pages/Register";
import ForgotPassword from "../features/auth/pages/ForgotPassword";
import ResetPassword from "../features/auth/pages/ResetPassword";
import Unauthorized from "../components/common/Unauthorized";

// common
import ProtectedRoute from "../components/common/ProtectedRoute";
import JobDetails from "../components/common/JobDetails";
import CompanyDetails from "../components/common/CompanyDetails";
import UnifiedDashboard from "../components/dashboard/UnifiedDashboard";

// Student
import StudentLayout from "../features/student/layouts/StudentLayout";
import StudentProfile from "../features/student/pages/Profile";
import StudentJobs from "../features/student/pages/Jobs";
import StudentApplications from "../features/student/pages/Applications";

// Recruiter
import RecruiterLayout from "../features/recruiter/layouts/RecruiterLayout";
import RecruiterCompanyProfile from "../features/recruiter/pages/CompanyProfile";
import RecruiterJobsList from "../features/recruiter/pages/JobsList";
import RecruiterCreateJob from "../features/recruiter/pages/CreateJob";
import RecruiterEditJob from "../features/recruiter/pages/EditJob";
import RecruiterApplicants from "../features/recruiter/pages/Applicants";
// Admin
import AdminLayout from "../features/admin/layouts/AdminLayout";
import AdminUsers from "../features/admin/pages/Users";
import AdminUserDetails from "../features/admin/pages/UserDetails";
import AdminJobs from "../features/admin/pages/Jobs";
import AdminCompanies from "../features/admin/pages/Companies";
import Student from "../features/recruiter/pages/Student";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<RootRedirect />} />
      {/* Public */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Admin Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<UnifiedDashboard role="ADMIN" />} />
        <Route path="dashboard" element={<UnifiedDashboard role="ADMIN" />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="users/:id" element={<AdminUserDetails />} />
        <Route path="jobs" element={<AdminJobs />} />
        <Route path="jobs/:id" element={<JobDetails role="ADMIN" />} />
        <Route path="companies" element={<AdminCompanies />} />
        <Route path="companies/:id" element={<CompanyDetails role="ADMIN" />} />
      </Route>

      {/* Student Routes */}
      <Route
        path="/student"
        element={
          <ProtectedRoute allowedRoles={["STUDENT"]}>
            <StudentLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<UnifiedDashboard role="STUDENT" />} />
        <Route path="dashboard" element={<UnifiedDashboard role="STUDENT" />} />
        <Route path="profile" element={<StudentProfile />} />
        <Route path="jobs" element={<StudentJobs />} />
        <Route path="jobs/:id" element={<JobDetails role="STUDENT" />} />
        <Route path="applications" element={<StudentApplications />} />
      </Route>

      {/* Recruiter Routes */}
      <Route
        path="/recruiter"
        element={
          <ProtectedRoute allowedRoles={["RECRUITER"]}>
            <RecruiterLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<UnifiedDashboard role="RECRUITER" />} />
        <Route path="dashboard" element={<UnifiedDashboard role="RECRUITER" />} />
        <Route path="company" element={<RecruiterCompanyProfile />} />
        <Route path="jobs" element={<RecruiterJobsList />} />
        <Route path="jobs/create" element={<RecruiterCreateJob />} />
        <Route path="jobs/edit/:id" element={<RecruiterEditJob />} />
        <Route path="jobs/:jobId/applicants" element={<RecruiterApplicants />} />
        <Route path="applicants" element={<RecruiterApplicants />} />
        <Route path="applicants/:applicationId" element={<RecruiterApplicants />} />
        <Route path="student/:id" element={<Student />} />
      </Route>

    </Routes>
  );
}

export default AppRoutes;
