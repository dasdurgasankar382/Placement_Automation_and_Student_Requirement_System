import React, { useState } from "react";
import { Form } from "../../../components/ui/Form";
import { FormHeader } from "../../../components/ui/FormHeader";
import { Input } from "../../../components/ui/Input";
import { Button } from "../../../components/ui/Button";
import { FormFooter } from "../../../components/ui/FormFooter";
import {
  forgotPasswordFields,
  forgotPasswordHeaderAndFooterConfig,
} from "../../../config/forms/authFileds";
import { toast } from "react-toastify";

export default function ForgotPassword() {
  const { header, footer } = forgotPasswordHeaderAndFooterConfig;
  const [form, setForm] = useState({
    email: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    
    // Quick validation
    if (!form.email) {
      toast.error("Please enter your email");
      return;
    }

    setLoading(true);

    try {
      // Placeholder for actual API call, e.g., await forgotPasswordService(form.email)
      console.log("Forgot password submitted for:", form.email);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Password reset link sent to your email");
      setForm({ email: "" });
    } catch (err) {
      console.error(err);
      toast.error("Failed to send reset link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormHeader headerText={header.title} pText={header.subtitle} />
      <div className="mt-5">
        {forgotPasswordFields.map((field) => (
          <Input
            label={field.label}
            key={field.name}
            {...field}
            value={form[field.name]}
            onChange={handleChange}
          />
        ))}
        <Button type="submit" text={loading ? "Sending..." : "Send Reset Link"} />
        <FormFooter
          linkPath={footer.link}
          text={footer.text}
          linkText={footer.linkText}
        />
      </div>
    </Form>
  );
}
