import { Routes, Route } from "react-router-dom";
import LoginPage from "../features/auth/pages/Login";
import RegisterPage from "../features/auth/pages/Register";
import RootRedirect from "../components/common/RootRedirect";
import ProtectedRoute from "../components/common/ProtectedRoute";
import ForgotPassword from "../features/auth/pages/ForgotPassword";

// Student
import StudentLayout from "../features/student/layouts/StudentLayout";
import StudentDashboard from "../features/student/pages/Dashboard";
import StudentProfile from "../features/student/pages/Profile";
import StudentJobs from "../features/student/pages/Jobs";
import StudentApplications from "../features/student/pages/Applications";

// Recruiter
import RecruiterLayout from "../features/recruiter/layouts/RecruiterLayout";
const RecruiterDashboard = () => <h1>Recruiter Dashboard</h1>;

// Admin
import AdminLayout from "../features/admin/layouts/AdminLayout";
import AdminDashboard from "../features/admin/pages/Dashboard";
import AdminUsers from "../features/admin/pages/Users";
import AdminJobs from "../features/admin/pages/Jobs";
import AdminCompanies from "../features/admin/pages/Companies";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<RootRedirect />} />
      {/* Public */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Admin Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="jobs" element={<AdminJobs />} />
        <Route path="companies" element={<AdminCompanies />} />
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
        <Route index element={<StudentDashboard />} />
        <Route path="dashboard" element={<StudentDashboard />} />
        <Route path="profile" element={<StudentProfile />} />
        <Route path="jobs" element={<StudentJobs />} />
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
        <Route index element={<RecruiterDashboard />} />
        <Route path="dashboard" element={<RecruiterDashboard />} />
      </Route>

    </Routes>
  );
}

export default AppRoutes;
