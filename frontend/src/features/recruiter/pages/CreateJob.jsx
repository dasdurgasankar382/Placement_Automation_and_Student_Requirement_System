import React, { useState } from "react";
import { Briefcase, MapPin, DollarSign, Clock, List } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Input } from "../../../components/ui/Input";
import { Textarea } from "../../../components/ui/Textarea";
import { Button } from "../../../components/ui/Button";

const CreateJob = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    type: "Full-time",
    location: "",
    salary: "",
    experience: "",
    description: "",
    tags: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Job created successfully!");
    navigate("/recruiter/jobs");
  };

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Post a New Job</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Fill out the details below to attract top talent.</p>
      </div>

      <div className="bg-white dark:bg-slate-800/80 backdrop-blur-xl border border-slate-200 dark:border-slate-700 rounded-3xl p-8 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <Input variant="box" icon={Briefcase} label="Job Title" required type="text" name="title" placeholder="e.g. Senior Frontend Developer" value={formData.title} onChange={handleChange} />
            </div>
            
            <div>
              <Input variant="box" type="select" icon={Clock} label="Employment Type" name="type" value={formData.type} onChange={handleChange} options={[
                {label: "Full-time", value: "Full-time"},
                {label: "Part-time", value: "Part-time"},
                {label: "Contract", value: "Contract"},
                {label: "Internship", value: "Internship"}
              ]} />
            </div>

            <div>
              <Input variant="box" icon={MapPin} label="Location" required type="text" name="location" placeholder="e.g. Remote, San Francisco" value={formData.location} onChange={handleChange} />
            </div>

            <div>
              <Input variant="box" icon={DollarSign} label="Salary Range" type="text" name="salary" placeholder="e.g. $120k - $150k" value={formData.salary} onChange={handleChange} />
            </div>

            <div>
              <Input variant="box" icon={Briefcase} label="Experience Level" type="text" name="experience" placeholder="e.g. 3-5 Years" value={formData.experience} onChange={handleChange} />
            </div>

            <div className="md:col-span-2">
              <Input variant="box" icon={List} label="Key Skills / Tags (comma separated)" type="text" name="tags" placeholder="React, Node.js, AWS" value={formData.tags} onChange={handleChange} />
            </div>
          </div>
          
          <div>
            <Textarea variant="box" label="Job Description" required name="description" rows={6} placeholder="Describe the responsibilities and requirements..." value={formData.description} onChange={handleChange} />
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700">
            <Button variant="ghost" type="button" onClick={() => navigate("/recruiter/jobs")}>Cancel</Button>
            <Button variant="primary" type="submit">Publish Job</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateJob;
