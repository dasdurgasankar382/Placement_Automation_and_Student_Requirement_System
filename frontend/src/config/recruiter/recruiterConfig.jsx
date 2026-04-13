import { 
  LayoutDashboard, 
  Building2, 
  Briefcase, 
  PlusCircle,
  Users,
  Calendar,
  CheckCircle,
  MapPin,
  Globe
} from "lucide-react";

export const recruiterNavigationLinks = [
  { name: "Dashboard", href: "/recruiter/dashboard", icon: LayoutDashboard },
  { name: "Company Profile", href: "/recruiter/company", icon: Building2 },
  { name: "My Jobs", href: "/recruiter/jobs", icon: Briefcase },
  { name: "Post Job", href: "/recruiter/jobs/create", icon: PlusCircle },
];

export const companyProfileFieldsConfig = [
  {
    name: "name",
    label: "Company Name",
    type: "text",
    icon: Building2,
    placeholder: "e.g. Acme Corp",
    required: true,
    fullWidth: true,
  },
  {
    name: "location",
    label: "Headquarters Location",
    type: "text",
    icon: MapPin,
    placeholder: "e.g. Bengaluru, India",
    required: true,
  },
  {
    name: "website",
    label: "Website URL",
    type: "url",
    icon: Globe,
    placeholder: "e.g. https://www.acme.com",
    required: true,
  },
];

export const dashboardStatsConfig = [
  {
    id: "total_postings",
    title: "Total Postings",
    icon: Briefcase,
    colorClass: "bg-gradient-to-br from-blue-500 to-indigo-600 shadow-blue-500/20",
    strokeColor: "text-blue-500"
  },
  {
    id: "active_postings",
    title: "Active Postings",
    icon: CheckCircle,
    colorClass: "bg-gradient-to-br from-emerald-500 to-teal-600 shadow-emerald-500/20",
    strokeColor: "text-emerald-500"
  }
];

export const recentJobsTableColumns = [
  { header: "Job Role", accessor: "role", cellClassName: "font-semibold text-slate-800 dark:text-slate-100" },
  { header: "Salary", accessor: "salary" },
  { 
    header: "Status", 
    render: (row) => (
      <div className="flex items-center gap-2">
        <span className={`h-2 w-2 rounded-full ${row.jobStatus === 'OPEN' ? 'bg-emerald-500' : 'bg-red-400'}`}></span>
        <span className="font-medium text-slate-700 dark:text-slate-300">{row.jobStatus}</span>
      </div>
    )
  },
  {
    header: "Deadline",
    accessor: "deadline",
    render: (row) => {
      const date = new Date(row.deadline);
      return date.toLocaleDateString("en-IN", { day: '2-digit', month: 'short', year: 'numeric' });
    }
  }
];
