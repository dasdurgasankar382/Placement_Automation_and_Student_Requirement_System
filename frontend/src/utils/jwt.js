import { jwtDecode } from "jwt-decode";

export const getUserFromToken = (token) => {
  try {
    return jwtDecode(token);
  } catch (err) {
    return null;
  }
};

export const isTokenExpired = (token) => {
  const user = getUserFromToken(token);
  // If we can't decode it or there's no expiration, treat it as expired/invalid
  if (!user || !user.exp) return true;
  
  // user.exp is in seconds, Date.now() is in milliseconds
  return user.exp * 1000 < Date.now();
};