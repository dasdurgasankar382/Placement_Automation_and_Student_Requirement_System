/* This code snippet is a React component named `Register` that represents a registration form. Here's
a breakdown of what the code is doing: */
/* This code snippet is a React component named `Register` that represents a registration form. Here's
a breakdown of what the code is doing: */
import React from "react";
import { Form } from "../../../components/ui/Form";
import { FormHeader } from "../../../components/ui/FormHeader";
import { Input } from "../../../components/ui/Input";
import { Button } from "../../../components/ui/Button";
import { FormFooter } from "../../../components/ui/FormFooter";

import { registerFields, registerHeaderAndFooterConfig } from "../../../config/forms/authFileds";
import { toast } from "react-toastify";
import { registerUser } from "../services/authService";
import { useNavigate } from "react-router-dom";


const Register = () => {
  const { header, button, footer } = registerHeaderAndFooterConfig;
  const navigate = useNavigate();
  const [form, setForm] = React.useState({
    email: "",
    password: "",
    role: "STUDENT", // default role
  });
  const [loading, setLoading] = React.useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (loading) return; // prevent multiple clicks
    setLoading(true);
    try {
      const res = await registerUser(form);
      toast.success("Registration successful! Please log in.");

      if(res.data.success){
        navigate("/login");
      }
    } catch (err){
      console.error(err);
      if (err.response.status === 409) {
        toast.error("Email already exists.");
      }else if(err.response.status === 401){
        toast.error("Unauthorized");
      }else{
        toast.error(err.response.data?.message || "Registration failed");
      }
    } finally {
      setLoading(false);
    }

  };

  return (
    <Form onSubmit={handleRegister}>
      <FormHeader headerText={header.title} pText={header.subtitle} />
      <div className="mt-0.5">
        {registerFields.map((field) => (
          <Input 
          label={field.label}
          key={field.name}
          {...field} 
          value={form[field.name] || ""}
          onChange={handleChange}/>
          
        ))}

        <Button type={button.type} text={button.text} />
        <FormFooter
          linkPath={footer.link}
          text={footer.text}
          linkText={footer.linkText}
        />
      </div>
    </Form>
  );
};

export default Register;
