import { 
  LayoutDashboard, 
  Building2, 
  Briefcase, 
  PlusCircle,
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

export const applicantStatusColors = {
  APPLIED: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500",
  REVIEWED: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-500",
  SHORTLISTED: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-500",
  SELECTED: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-500",
  WITHDRAWN: "bg-slate-100 text-slate-700 dark:bg-slate-700/50 dark:text-slate-300",
  REJECTED: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-500",
};

export const getAvailableStatusActions = (status) => {
  switch (status) {
    case "APPLIED":
      return ["REVIEWED", "SHORTLISTED", "REJECTED"];
    case "REVIEWED":
      return ["SHORTLISTED", "REJECTED"];
    case "SHORTLISTED":
      return ["SELECTED", "REJECTED"];
    default:
      return [];
  }
};
