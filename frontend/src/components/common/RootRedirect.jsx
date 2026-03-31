import { Navigate } from "react-router-dom";
import { getUserFromToken } from "../../utils/jwt";

function RootRedirect() {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  const user = getUserFromToken(token);

  if (user?.role === "ADMIN") {
    return <Navigate to="/admin/dashboard" />;
  } else if (user?.role === "STUDENT") {
    return <Navigate to="/student/dashboard" />;
  } else if (user?.role === "RECRUITER") {
    return <Navigate to="/recruiter/dashboard" />;
  }

  return <Navigate to="/login" />;
}

export default RootRedirect;