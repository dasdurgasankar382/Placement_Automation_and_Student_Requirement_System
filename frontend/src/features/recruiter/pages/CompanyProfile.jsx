import React, { useEffect, useState } from "react";
import { Building2, MapPin, Globe } from "lucide-react";
import { Input } from "../../../components/ui/Input";
import { Textarea } from "../../../components/ui/Textarea";
import { Button } from "../../../components/ui/Button";
import { createCompany, fetchCompanyProfileData } from "../services/recruiterService";
import { toast } from "react-toastify";

const CompanyProfile = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    website: "",
    description: ""
  });

  useEffect(() =>{
    fetchCompanyProfile();
  }, []);

  const fetchCompanyProfile = async () => {
    try{
      setLoading(true);
      const profileData = await fetchCompanyProfileData();
      setFormData(profileData);
    } catch (error) {
      console.error("Error fetching company profile:", error);
    } finally {
      setLoading(false);
    }
  }



  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      const { data } = await createCompany(formData);
      
      if (data && data.success === false) {
          toast.error(data.message || "Failed to register company.");
      } else {
          toast.success(data?.message || "Company registered successfully!");
      }
    } catch (err) {
      const errorMessage = err?.response?.data?.message || "An error occurred while creating the company profile.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Company Profile</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Register your company identity to post jobs.</p>
      </div>

      <div className="bg-white dark:bg-slate-800/80 backdrop-blur-xl border border-slate-200 dark:border-slate-700 rounded-3xl p-8 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <Input variant="box" required icon={Building2} label="Company Name" type="text" name="name" value={formData.name} onChange={handleChange} placeholder="e.g. Acme Corp" />
            </div>
            
            <div>
              <Input variant="box" required icon={MapPin} label="Headquarters Location" type="text" name="location" value={formData.location} onChange={handleChange} placeholder="e.g. Remote, NY" />
            </div>
            
            <div>
              <Input variant="box" required icon={Globe} label="Website URL" type="text" name="website" value={formData.website} onChange={handleChange} placeholder="e.g. www.acme.com" />
            </div>
          </div>
          
          <div>
            <Textarea variant="box" required label="About Company" name="description" rows={4} value={formData.description} onChange={handleChange} placeholder="Description of the company..." />
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-100 dark:border-slate-700">
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? "Registering..." : "Save Company Profile"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanyProfile;
