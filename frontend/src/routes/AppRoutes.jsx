import { Routes, Route } from "react-router-dom";
import LoginPage from "../features/auth/pages/Login";
import RegisterPage from "../features/auth/pages/Register";
import RootRedirect from "../components/common/RootRedirect";
import ProtectedRoute from "../components/common/ProtectedRoute";

import StudentLayout from "../features/student/layouts/StudentLayout";
import Dashboard from "../features/student/pages/Dashboard";
import Profile from "../features/student/pages/Profile";
import Jobs from "../features/student/pages/Jobs";
import Applications from "../features/student/pages/Applications";
import ForgotPassword from "../features/auth/pages/ForgotPassword";

// dummy pages
const AdminDashboard = () => <h1>Admin Dashboard</h1>;
const CompanyDashboard = () => <h1>Company Dashboard</h1>;

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<RootRedirect />} />
      {/* Public */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Protected */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* Student Routes */}
      <Route
        path="/student"
        element={
          <ProtectedRoute allowedRoles={["STUDENT"]}>
            <StudentLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="jobs" element={<Jobs />} />
        <Route path="applications" element={<Applications />} />
      </Route>

      <Route
        path="/company/dashboard"
        element={
          <ProtectedRoute allowedRoles={["COMPANY"]}>
            <CompanyDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
