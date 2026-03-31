export const loginFields = [
  {
    label: "Email",
    type: "email",
    name: "email",
    placeholder: "Enter your email",
    required: true,
  },
  {
    label: "Password",
    type: "password",
    name: "password",
    placeholder: "Enter your password",
    required: true,
  },
];

export const registerFields = [
  {
    label: "Email",
    type: "email",
    name: "email",
    placeholder: "Enter your email",
    required: true,
  },
  {
    label: "Password",
    type: "password",
    name: "password",
    placeholder: "Create password",
    required: true,
  },
  // here for role i want option as input with 2 fields ("STUDENT","RECRUITER")

  {
    label: "Role",
    type: "select",
    name: "role",
    placeholder: "Enter your role",
    required: true,
    options: [
      { value: "STUDENT", label: "Student" },
      { value: "RECRUITER", label: "Recruiter" },
    ],
  },
];

// add button type and text in header and footer config
export const loginHeaderAndFooterConfig = {
  header: {
    title: "Sign in",
    subtitle: "Sign in below to access your account",
  },
  button: {
    type: "submit",
    text: "Log in"
  },
  footer: {
    text: "Don’t have an account yet?",
    linkText: "Sign up",
    link: "/register",
  },
};

export const registerHeaderAndFooterConfig = {
  header: {
    title: "Create Account",
    subtitle: "Fill details to register",
  },
  button: {
    type: "submit",
    text: "Sign up"
  },
  footer: {
    text: "Already have an account?",
    linkText: "Sign in",
    link: "/login",
  },
};

export const forgotPasswordFields = [
  {
    label: "Email",
    type: "email",
    name: "email",
    placeholder: "Enter your email",
    required: true,
  },
];

export const forgotPasswordHeaderAndFooterConfig = {
  header: {
    title: "Reset Password",
    subtitle: "Enter your email to receive a password reset link",
  },
  footer: {
    text: "Remember your password?",
    linkText: "Sign in",
    link: "/login",
  },
};
export const verifyCodeFields = [
  {
    label: "Verification Code",
    type: "password",
    name: "code",
    placeholder: "Enter verification code",
    required: true,
  },
];

export const resetPasswordFields = [
  {
    label: "New Password",
    type: "password",
    name: "newPassword",
    placeholder: "Enter new password",
    required: true,
  },
  {
    label: "Confirm Password",
    type: "password",
    name: "confirmPassword",
    placeholder: "Confirm new password",
    required: true,
  },
];


export const getRedirectPathBasedOnRole = (role) => {
  if (role === "ADMIN") {
    return "/admin/dashboard";
  }
  if (role === "STUDENT") {
    return "/student/dashboard";
  }
  if (role === "RECRUITER") {
    return "/recruiter/dashboard";
  }
  return "/login";
};
