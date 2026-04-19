import React, { useState } from "react";
import { Briefcase, DollarSign, Calendar, List } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Input } from "../../../components/ui/Input";
import { Textarea } from "../../../components/ui/Textarea";
import { Button } from "../../../components/ui/Button";
import { createJob } from "../services/recruiterService";
import { toast } from "react-toastify";

const CreateJob = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    role: "",
    salary: "",
    tags: "", // skills
    cgpa: "",
    deadline: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Construct exactly what the backend expects
    const payload = {
      role: formData.role,
      salary: parseFloat(formData.salary) || 0,
      skills: formData.tags.split(",").map(tag => tag.trim()).filter(t => t),
      cgpa: parseFloat(formData.cgpa) || 0,
      description: formData.description,
      deadline: formData.deadline
    };

    try {
      setLoading(true);
      const { data } = await createJob(payload);
      
      // If our API wrapper passes, double check success field if it exists
      if (data && data.success === false) {
        toast.error(data.message || "Failed to create job.");
      } else {
        toast.success(data?.message || "Job created successfully!");
        navigate("/recruiter/jobs");
      }
    } catch (err) {
      // Safely handle Axios error payload formats
      const errorMessage = err?.response?.data?.message || "An error occurred while creating the job.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Post a New Job</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Fill out the exact details needed for the database.</p>
      </div>

      <div className="bg-white dark:bg-slate-800/80 backdrop-blur-xl border border-slate-200 dark:border-slate-700 rounded-3xl p-8 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <Input variant="box" icon={Briefcase} label="Job Role" required type="text" name="role" placeholder="e.g. Backend Developer" value={formData.role} onChange={handleChange} />
            </div>
            
            <div>
              <Input variant="box" icon={DollarSign} label="Annual Salary (Numeric)" required type="number" name="salary" placeholder="e.g. 800000" value={formData.salary} onChange={handleChange} />
            </div>

            <div>
              <Input variant="box" icon={Calendar} label="Application Deadline" required type="date" name="deadline" value={formData.deadline} onChange={handleChange} />
            </div>

            <div className="md:col-span-2">
              <Input variant="box" icon={List} label="Key Skills (comma separated)" required type="text" name="tags" placeholder="Java, Spring Boot, MySQL" value={formData.tags} onChange={handleChange} />
            </div>

            <div className="md:col-span-2">
              <Input variant="box" icon={List} label="CGPA (minimum)" required type="number" name="cgpa" placeholder="e.g. 7.0" value={formData.cgpa} onChange={handleChange} />
            </div>
          </div>
          
          <div>
            <Textarea variant="box" label="Job Description" required name="description" rows={6} placeholder="Describe the responsibilities and requirements..." value={formData.description} onChange={handleChange} />
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700">
            <Button variant="ghost" type="button" onClick={() => navigate("/recruiter/jobs")} disabled={loading}>Cancel</Button>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? "Publishing..." : "Publish Job"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateJob;
