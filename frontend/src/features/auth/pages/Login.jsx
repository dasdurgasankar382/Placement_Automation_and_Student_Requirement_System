import { useState } from "react";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import { Form } from "../../../components/ui/Form";
import { LoginHeader } from "../../../components/ui/FormHeader";
import { FormFooter } from "../../../components/ui/FormFooter";
import { loginFields } from "../../../config/forms/authFileds";
import { toast } from "react-toastify";
import { loginUser } from "../services/authService";

export default function LoginPage() {
  const [form, setForm] = useState({
    email: "admin@example.com",
    password: "password123",
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});
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
      console.log(res);
      localStorage.setItem("token", res.data.token);
      toast.success("Login successful");

    } catch (err) {
      setLoading(false);
      console.log(err);
      if (!err.response) {
        // 🔥 Backend not reachable
        toast.error("Server not reachable or CROS blocked");
      } else if (err.response.status === 401) {
        toast.error("Invalid credentials");
      } else {
        toast.error("Something went wrong");
      }

    } finally {
      setLoading(false); // 🔥 always re-enable
    }
  };

  return (
    <Form onSubmit={handleLogin}>
      <LoginHeader
        headerText={"Sign in"}
        pText={"Sign in below to access your account"}
      />
      <div className="mt-5">
        {loginFields.map((field) => (
          <Input
            key={field.name}
            {...field}
            value={form[field.name]}
            onChange={handleChange}
          />
        ))}
        <Button type="submit" text={"Sign in"} />
        <FormFooter text={"Don’t have an account yet?"} linkText={"sign up"} />
      </div>
    </Form>
  );
}
