import { 
  LayoutDashboard, 
  User, 
  Briefcase, 
  FileCheck,
  Mail,
  Phone,
  BookOpen,
  Award,
  FileText,
  CheckCircle
} from "lucide-react";

export const studentNavigationLinks = [
  { name: "Dashboard", href: "/student/dashboard", icon: LayoutDashboard },
  { name: "My Profile", href: "/student/profile", icon: User },
  { name: "Browse Jobs", href: "/student/jobs", icon: Briefcase },
  { name: "My Applications", href: "/student/applications", icon: FileCheck },
];

export const profileFieldsConfig = [
  { name: "name", label: "Full Name", type: "text", icon: User },
  { name: "branch", label: "Branch / Major", type: "text", icon: Award },
  { name: "cgpa", label: "CGPA", type: "number", step: "0.01", icon: Award },
  { name: "graduationYear", label: "Graduation Year", type: "number", icon: BookOpen },
  { name: "phone", label: "Phone Number", type: "text", icon: Phone },
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
  },
  {
    id: 3,
    title: "UI/UX Designer",
    company: "Creative Studio",
    type: "Contract",
    location: "Remote",
    salary: "$80/hr",
    postedAt: "3 days ago",
    experience: "Entry Level",
    tags: ["Figma", "Design Systems", "Prototyping"],
  },
];

export const mockApplications = [
  {
    id: 1,
    jobTitle: "Software Engineer Intern",
    company: "Google",
    appliedDate: "Oct 24, 2026",
    status: "Interview",
    reference: "APP-GOOG-001"
  },
  {
    id: 2,
    jobTitle: "Frontend Developer",
    company: "Tech Innovators Inc.",
    appliedDate: "Oct 20, 2026",
    status: "Pending",
    reference: "APP-TECH-892"
  },
  {
    id: 3,
    jobTitle: "Backend Software Engineer",
    company: "DataDrive Solutions",
    appliedDate: "Oct 15, 2026",
    status: "Selected",
    reference: "APP-DATA-441"
  },
  {
    id: 4,
    jobTitle: "UI/UX Designer",
    company: "Creative Studio",
    appliedDate: "Oct 10, 2026",
    status: "Rejected",
    reference: "APP-CRE-902"
  }
];

export const dashboardStatsConfig = [
  {
    id: "total_apps",
    title: "Total Applications",
    value: "12",
    icon: FileText,
    trend: "+3",
    colorClass: "bg-gradient-to-br from-blue-500 to-indigo-600 shadow-blue-500/20"
  },
  {
    id: "interviews",
    title: "Interviews Scheduled",
    value: "3",
    icon: Briefcase,
    trend: "+1",
    colorClass: "bg-gradient-to-br from-violet-500 to-purple-600 shadow-violet-500/20"
  },
  {
    id: "offers",
    title: "Offers Received",
    value: "1",
    icon: CheckCircle,
    trend: "+1",
    colorClass: "bg-gradient-to-br from-emerald-500 to-teal-600 shadow-emerald-500/20"
  }
];
