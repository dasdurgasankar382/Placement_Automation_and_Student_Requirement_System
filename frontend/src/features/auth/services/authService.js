import api from "../../../services/api";

export const loginUser = (data) => {
  return api.post("/auth/login", data);
};

export const registerUser = (data) => {
  return api.post("/auth/register",data);
};

export const forgotPassword = (data) => {
  return api.post("/auth/forgot-password",data);
};

export const resetPassword = (data) => {
  return api.post("/auth/reset-password",data);
}

export const logoutUser = () => {
  return api.delete("/auth/logout");
}