import { jwtDecode } from "jwt-decode";

export const getUserFromToken = (token) => {
  try {
    const decoded = jwtDecode(token);
    if (decoded && decoded.role) {
      let role = decoded.role;
      if (Array.isArray(role)) {
        role = role[0];
      }
      if (typeof role === 'string') {
        decoded.role = role.replace(/^ROLE_/i, '').toUpperCase();
      }
    }
    // Handle cases where backend might use 'roles' instead of 'role'
    if (decoded && !decoded.role && decoded.roles) {
      let role = decoded.roles;
      if (Array.isArray(role)) {
        role = role[0];
      }
      if (typeof role === 'string') {
        decoded.role = role.replace(/^ROLE_/i, '').toUpperCase();
      }
    }
    // Handle cases where backend might use 'authorities' (Spring Security default)
    if (decoded && !decoded.role && decoded.authorities) {
      let auths = decoded.authorities;
      if (Array.isArray(auths) && auths.length > 0) {
        let auth = auths[0];
        if (typeof auth === 'object' && auth.authority) {
          auth = auth.authority;
        }
        if (typeof auth === 'string') {
          decoded.role = auth.replace(/^ROLE_/i, '').toUpperCase();
        }
      }
    }
    return decoded;
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