import React from "react";
import { User, Mail, Shield, ShieldAlert, Eye, Ban, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getRoleLabel, getRoleStyles, getStatusStyles, getTrimmedId } from "../../utils/formatters";

const UserCard = ({ user, onDisable }) => {
  const navigate = useNavigate();
  const status = String(user?.status || "ACTIVE").toUpperCase();
  const roleLabel = getRoleLabel(user?.role);
  const roleStyles = getRoleStyles(user?.role);
  const statusStyles = getStatusStyles(status);

  return (
    <div className="group bg-white dark:bg-slate-800/80 backdrop-blur-xl border border-slate-200 dark:border-slate-700 p-6 rounded-2xl hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1 transition-all duration-300 w-full">
      <div className="flex justify-between items-start gap-4">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-400 group-hover:scale-105 transition-transform duration-300 overflow-hidden border-2 border-slate-100 dark:border-slate-700">
             {user?.profilePicture ? (
               <img src={user.profilePicture} alt={user.name} className="h-full w-full object-cover" />
             ) : (
               <User className="h-7 w-7" />
             )}
          </div>
          <div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white line-clamp-1">
              {user?.name || "Anonymous User"}
            </h3>
            <div className="flex items-center gap-2 mt-1">
               <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase ${roleStyles}`}>
                {roleLabel}
              </span>
              <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase border ${statusStyles}`}>
                {status === 'ACTIVE' ? <CheckCircle2 className="h-2.5 w-2.5" /> : <ShieldAlert className="h-2.5 w-2.5" />}
                {status}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
          <Mail className="h-4 w-4 text-slate-400" />
          <span className="truncate">{user?.email}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 font-mono text-xs">
          <Shield className="h-4 w-4 text-slate-400" />
          <span>ID: {getTrimmedId(user?.id, 12)}</span>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between gap-3">
        <button
          onClick={() => navigate(`/admin/users/${user.id}`, { state: { user } })}
          className="flex-1 px-4 py-2.5 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl font-semibold text-sm hover:bg-slate-200 dark:hover:bg-slate-600 transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          <Eye className="h-4 w-4" /> View Profile
        </button>
        
        {status !== "DISABLED" && onDisable && (
          <button
            onClick={() => onDisable(user.id)}
            className="p-2.5 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 rounded-xl hover:bg-red-100 transition-all active:scale-95 transition-colors"
            title="Disable User"
          >
            <Ban className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default UserCard;
