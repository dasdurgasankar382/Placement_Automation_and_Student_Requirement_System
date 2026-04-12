import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, User, Download, FileText, Loader, LoaderPinwheel } from "lucide-react";
import { toast } from "react-toastify";
import { getStudentById, getResume } from "../services/recruiterService";
import { Form } from "../../../components/ui/Form";
import { Input } from "../../../components/ui/Input";

const Student = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStudentById(id)
      .then((res) => setStudent(res.data?.data || res.data))
      .catch((err) =>
        toast.error(err?.response?.data?.message || "Failed to load profile"),
      )
      .finally(() => setLoading(false));
  }, [id]);

  const download = async (e) => {
    e.preventDefault();
    try {
      const res = await getResume(id);
      const resume = res.data?.data || res.data;
      if (!resume?.base64Data) throw new Error();

      const blob = new Blob(
        [Uint8Array.from(atob(resume.base64Data), (c) => c.charCodeAt(0))],
        { type: resume.fileType || "application/pdf" },
      );
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = resume.fileName || "resume.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      toast.success("Resume downloaded!");
    } catch (err) {
      console.error(err);
      toast.error("Download failed");
    }
  };

  if (loading)
    return <div className="p-10 text-center animate-pulse">Loading...</div>;
  if (!student)
    return <div className="p-10 text-center">Student not found</div>;
  console.log(student);
  const info = [
    { label: "Full Name", val: student.name},
    { label: "Email Address", val: student.email },
    { label: "Course", val: student.course },
    { label: "Branch", val: student.branch },
    { label: "Phone", val: student.phone },
    { label: "CGPA", val: student.cgpa || student.percentage },
    { label: "Graduation Year", val: student.graduationYear },
    { label: "Skills", val: student.skills?.join(", ") },

  ];

  return (
    <div className="max-w-3xl mx-auto ">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors "
      >
        <ArrowLeft size={18} /> Back
      </button>

      <Form className="">
        <div className="flex items-center gap-4 border-b pb-2 dark:border-slate-700 font-bold">
          <div className="p-4 bg-emerald-100 dark:bg-emerald-900/30 rounded-full text-emerald-600">
            <User size={20} />
          </div>
          <h2 className="text-xl dark:text-white">Student Profile</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
          {info.map(
            (i) =>
              i.val && (
                <Input
                  key={i.label}
                  label={i.label}
                  name={i.label}
                  id={i.label}
                  value={i.val}
                  readOnly={true}
                />
              ),
          )}
        </div>

        <div className="mt-10 p-5 bg-slate-50 dark:bg-slate-900/50 rounded-2xl flex items-center justify-between border dark:border-slate-700">
          <div className="flex items-center gap-3">
            <FileText className="text-emerald-500" />
            <span className="text-sm font-bold dark:text-white truncate max-w-[180px]">
              {student.resumeName}
            </span>
          </div>
          {student.resumeName ? (
            <button
            type="button"
            onClick={download}
            className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 font-bold"
          >
            <Download size={18} /> Download
          </button>
          ) : <Loader size={18} className="animate-spin" />}  
        
        </div>
      </Form>
    </div>
  );
};

export default Student;
