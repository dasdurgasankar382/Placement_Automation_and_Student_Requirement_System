import api from "../../../services/api";

export const loginUser = (data) => {
  return api.post("/auth/login", data);
};

export const registerUser = (data) => {
  return api.post("/auth/register");
};
