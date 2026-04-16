import { 
  CheckCircle, 
  Info, 
  AlertTriangle, 
  UserPlus, 
  Briefcase, 
  Calendar,
  Layers
} from "lucide-react";

/**
 * Configuration for different notification types.
 * Add new types here to update icons and colors globally.
 */
export const NOTIFICATION_TYPES = {
  NEW_APPLICATION: {
    icon: UserPlus,
    color: "text-blue-600 bg-blue-100 dark:bg-blue-500/20 dark:text-blue-400",
    label: "Application",
  },
  JOB_POSTED: {
    icon: Briefcase,
    color: "text-emerald-600 bg-emerald-100 dark:bg-emerald-500/20 dark:text-emerald-400",
    label: "Job Posted",
  },
  SYSTEM_ALERT: {
    icon: AlertTriangle,
    color: "text-red-600 bg-red-100 dark:bg-red-500/20 dark:text-red-400",
    label: "System",
  },
  INTERVIEW_SCHEDULED: {
    icon: Calendar,
    color: "text-purple-600 bg-purple-100 dark:bg-purple-500/20 dark:text-purple-400",
    label: "Interview",
  },
  DEFAULT: {
    icon: Info,
    color: "text-slate-600 bg-slate-100 dark:bg-slate-500/20 dark:text-slate-400",
    label: "Notification",
  }
};
