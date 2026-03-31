import { useState } from "react";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import { Form } from "../../../components/ui/Form";
import { FormHeader } from "../../../components/ui/FormHeader";
import { FormFooter } from "../../../components/ui/FormFooter";
import {
  loginFields,
  loginHeaderAndFooterConfig,
  getRedirectPathBasedOnRole,
} from "../../../config/forms/authFileds";
import { toast } from "react-toastify";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { getUserFromToken } from "../../../utils/jwt";

export default function LoginPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const { header, button, footer } = loginHeaderAndFooterConfig;
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault(); //  THIS STOPS PAGE REFRESH

    if (loading) return; //  prevent multiple clicks
    setLoading(true); // disable button

    console.log("login clicked");
    try {
      const res = await loginUser(form);
      const token = res.data.data?.token || res.data.token;
      console.log(res);
      localStorage.setItem("token", token);
      toast.success("Login successful");

      // Extract role from jwt
      const userPayload = getUserFromToken(token);
      console.log(userPayload);

      // 🔥 ROLE BASED REDIRECT
      if (userPayload?.role) {
        navigate(getRedirectPathBasedOnRole(userPayload.role));
      } else {
        toast.error("Failed to decode user role");
      }

    } catch (err) {
      
      console.log(err);
      if (!err.response) {
        // 🔥 Backend not reachable
        toast.error("Server not reachable or CROS blocked");
      } else if (err.response.status === 401) {
        toast.error("Invalid credentials");
      } else if (err.response.status === 404) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false); // 🔥 always re-enable
    }
  };

  return (
    <Form onSubmit={handleLogin}>
      <FormHeader headerText={header.title} pText={header.subtitle} />
      <div className="mt-5">
        {loginFields.map((field) => (
          <Input
            key={field.name}
            {...field}
            value={form[field.name]}
            onChange={handleChange}
          />
        ))}
        <div className="">
          <a
            href={"/forgot-password"}
            className="font-medium text-blue-400 hover:text-blue-500 hover:transition-all"
          >
            Forgot your password?
          </a>{" "}
        </div>
        <Button type={button.type} text={button.text} />
        <FormFooter
          linkPath={footer.link}
          text={footer.text}
          linkText={footer.linkText}
        />
      </div>
    </Form>
  );
}
