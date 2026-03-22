import { Navigate } from "react-router-dom";
import { getUserFromToken, isTokenExpired } from "../../utils/jwt";
import { toast } from "react-toastify";
import { useEffect } from "react";

function ProtectedRoute({ children, allowedRoles }) {
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token && isTokenExpired(token)) {
      toast.error("Session expired. Please log in again.");
    }
  }, [token]);

  if (!token || isTokenExpired(token)) {
    // Clear invalid or expired token so it doesn't get sent on future requests
    localStorage.removeItem("token");
    return <Navigate to="/login" />;
  }

  const user = getUserFromToken(token);

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
}

export default ProtectedRoute;