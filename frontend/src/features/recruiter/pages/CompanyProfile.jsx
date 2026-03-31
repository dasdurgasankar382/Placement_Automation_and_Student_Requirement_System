import React, { useState } from "react";
import { Building2, Mail, MapPin, Globe } from "lucide-react";
import { Input } from "../../../components/ui/Input";
import { Textarea } from "../../../components/ui/Textarea";
import { Button } from "../../../components/ui/Button";

const CompanyProfile = () => {
  const [formData, setFormData] = useState({
    name: "Tech Innovators Inc.",
    email: "contact@techinnovators.com",
    location: "San Francisco, CA",
    website: "https://techinnovators.com",
    description: "Leading the future of AI and sustainable tech."
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Company details saved!");
  };

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Company Profile</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Manage your centralized company identity.</p>
      </div>

      <div className="bg-white dark:bg-slate-800/80 backdrop-blur-xl border border-slate-200 dark:border-slate-700 rounded-3xl p-8 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Input variant="box" icon={Building2} label="Company Name" type="text" name="name" value={formData.name} onChange={handleChange} />
            </div>
            <div>
              <Input variant="box" icon={Mail} label="Contact Email" type="email" name="email" value={formData.email} onChange={handleChange} />
            </div>
            <div>
              <Input variant="box" icon={MapPin} label="Headquarters Location" type="text" name="location" value={formData.location} onChange={handleChange} />
            </div>
            <div>
              <Input variant="box" icon={Globe} label="Website URL" type="url" name="website" value={formData.website} onChange={handleChange} />
            </div>
          </div>
          
          <div>
            <Textarea variant="box" label="About Company" name="description" rows={4} value={formData.description} onChange={handleChange} />
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-100 dark:border-slate-700">
            <Button variant="primary" type="submit">Save Company Profile</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanyProfile;
