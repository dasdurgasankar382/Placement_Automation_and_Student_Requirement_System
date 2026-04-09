import React, { useState, useEffect } from "react";
import { Briefcase, DollarSign, Calendar, List } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "../../../components/ui/Input";
import { Textarea } from "../../../components/ui/Textarea";
import { Button } from "../../../components/ui/Button";
import { getJobById, updateJob } from "../services/recruiterService";
import { toast } from "react-toastify";

const EditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  
  const [formData, setFormData] = useState({
    role: "",
    salary: "",
    tags: "", // skills
    deadline: "",
    description: ""
  });

  useEffect(() => {
    fetchJobDetails();
  }, [id]);

  const fetchJobDetails = async () => {
    try {
      const { data } = await getJobById(id);
      const job = data.data || data || {}; 
      setFormData({
        role: job.role || "",
        salary: job.salary || "",
        tags: job.skills ? job.skills.join(", ") : "",
        deadline: job.deadline || "",
        description: job.description || ""
      });
    } catch (err) {
      toast.error("Failed to load job details.");
      navigate("/recruiter/jobs");
    } finally {
      setFetching(false);
    }
  };

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
      description: formData.description,
      deadline: formData.deadline
    };

    try {
      setLoading(true);
      const { data } = await updateJob(id, payload);
      
      if (data && data.success === false) {
        toast.error(data.message || "Failed to update job.");
      } else {
        toast.success(data?.message || "Job updated successfully!");
        navigate("/recruiter/jobs");
      }
    } catch (err) {
      const errorMessage = err?.response?.data?.message || "An error occurred while updating the job.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Edit Job Posting</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Update the details of your job.</p>
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
          </div>
          
          <div>
            <Textarea variant="box" label="Job Description" required name="description" rows={6} placeholder="Describe the responsibilities and requirements..." value={formData.description} onChange={handleChange} />
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700">
            <Button variant="ghost" type="button" onClick={() => navigate("/recruiter/jobs")} disabled={loading}>Cancel</Button>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? "Updating..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditJob;
