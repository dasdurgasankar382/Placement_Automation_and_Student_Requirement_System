import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: "https://placement-automation-and-student.onrender.com/placement-automation/api",
});

// attatch token automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// handle expired token or 401 responses globally
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const url = error.config?.url || "";
    const isAuthRoute =
      url.includes("/auth/login") || url.includes("/auth/register");

    if (error.response?.status === 401 && !isAuthRoute) {
      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
    }
    return Promise.reject(error);
  },
);

export default api;
