import React, { useState } from "react";
import { Form } from "../../../components/ui/Form";
import { FormHeader } from "../../../components/ui/FormHeader";
import { Input } from "../../../components/ui/Input";
import { Button } from "../../../components/ui/Button";
import { FormFooter } from "../../../components/ui/FormFooter";
import {
  resetPasswordFields,
  resetPasswordHeaderAndFooterConfig,
} from "../../../config/forms/authFileds";
import { toast } from "react-toastify";
import { resetPassword } from "../services/authService";

export default function ResetPassword() {
  const { header, footer } = resetPasswordHeaderAndFooterConfig;
  const [form, setForm] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const token = new URLSearchParams(location.search).get("token");

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
      if (!form.newPassword || !form.confirmPassword) {
        toast.error("Please fill in all fields");
        return;
      }
      if (form.newPassword !== form.confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }


    setLoading(true);

    try {      
      // pass token and new password in body as { token: form.token, newPassword: form.newPassword }
      const response = await resetPassword({ token: token, newPassword: form.newPassword });
      
      toast.success(response?.data?.message);
      setForm({ newPassword: "", confirmPassword: "" });
    } catch (err) {
      console.error(err);
      toast.error("Failed to reset password");
    } finally {
      setForm({ newPassword: "", confirmPassword: "" });
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormHeader headerText={header.title} pText={header.subtitle} />
      <div className="mt-5">
        {resetPasswordFields.map((field) => (
          <Input
            label={field.label}
            key={field.name}
            {...field}
            value={form[field.name]}
            onChange={handleChange}
          />
        ))}
        <Button type="submit" text={loading ? "Resetting..." : "Reset Password"} />
        <FormFooter
          linkPath={footer.link}
          text={footer.text}
          linkText={footer.linkText}
        />
      </div>
    </Form>
  );
}
