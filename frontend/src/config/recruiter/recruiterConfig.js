import { 
  LayoutDashboard, 
  Building2, 
  Briefcase, 
  PlusCircle,
  Users,
  Calendar,
  CheckCircle
} from "lucide-react";

export const recruiterNavigationLinks = [
  { name: "Dashboard", href: "/recruiter/dashboard", icon: LayoutDashboard },
  { name: "Company Profile", href: "/recruiter/company", icon: Building2 },
  { name: "My Jobs", href: "/recruiter/jobs", icon: Briefcase },
  { name: "Post Job", href: "/recruiter/jobs/create", icon: PlusCircle },
];

export const dashboardStatsConfig = [
  {
    id: "active_jobs",
    title: "Active Jobs",
    value: "12",
    icon: Briefcase,
    trend: "+2",
    colorClass: "bg-gradient-to-br from-blue-500 to-indigo-600 shadow-blue-500/20"
  },
  {
    id: "total_applicants",
    title: "Total Applicants",
    value: "145",
    icon: Users,
    trend: "+15",
    colorClass: "bg-gradient-to-br from-violet-500 to-purple-600 shadow-violet-500/20"
  },
  {
    id: "interviews_scheduled",
    title: "Interviews Scheduled",
    value: "28",
    icon: Calendar,
    trend: "+5",
    colorClass: "bg-gradient-to-br from-emerald-500 to-teal-600 shadow-emerald-500/20"
  }
];

export const mockJobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "Tech Innovators Inc.",
    type: "Full-time",
    location: "San Francisco, CA (Remote)",
    salary: "$120k - $150k",
    postedAt: "2 days ago",
    experience: "Entry Level",
    tags: ["React", "JavaScript", "Tailwind CSS"],
    applicantsCount: 45
  },
  {
    id: 2,
    title: "Backend Software Engineer",
    company: "DataDrive Solutions",
    type: "Full-time",
    location: "New York, NY",
    salary: "$130k - $160k",
    postedAt: "1 week ago",
    experience: "1-3 Years",
    tags: ["Java", "Spring Boot", "Microservices"],
    applicantsCount: 78
  }
];
