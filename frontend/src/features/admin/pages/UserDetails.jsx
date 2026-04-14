import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, User, Mail, ShieldCheck, Calendar, Clock, Fingerprint } from "lucide-react";
import { toast } from "react-toastify";
import { getUserById } from "../services/adminService";
import { getRoleLabel, getStatusStyles, formatDate } from "../../../utils/formatters";

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser();
  }, [id]);

  const fetchUser = async () => {
    try {
      const { data } = await getUserById(id);
      const userData = data?.data || data;
      setUser(userData || null);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to load user details.");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <button 
          onClick={() => navigate(-1)} 
          className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> Back
        </button>
        <div className="bg-white dark:bg-slate-800/50 border border-dashed border-slate-200 dark:border-slate-700 rounded-3xl p-16 text-center text-slate-500 dark:text-slate-400">
          No user details available.
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <button 
        onClick={() => navigate(-1)} 
        className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors group"
      >
        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> Back to Users
      </button>

      <div className="bg-white dark:bg-slate-800/80 backdrop-blur-xl border border-slate-200 dark:border-slate-700/50 rounded-3xl p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div className="flex items-center gap-5">
             <div className="h-20 w-20 rounded-3xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-400 border border-slate-200 dark:border-slate-600 shadow-inner">
                <User className="h-10 w-10 text-slate-400 dark:text-slate-500" />
             </div>
             <div>
               <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{user.name || "User Details"}</h1>
               <div className="flex items-center gap-2 mt-2">
                  <span className={`px-2.5 py-1 rounded-lg text-xs font-bold tracking-wider uppercase bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center gap-1.5`}>
                     <Fingerprint className="h-3 w-3" /> {getRoleLabel(user.role)}
                  </span>
                  <span className={`px-2.5 py-1 rounded-lg text-xs font-bold tracking-wider uppercase border-2 ${getStatusStyles(user.status)}`}>
                     {String(user.status || "ACTIVE").toUpperCase()}
                  </span>
               </div>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h3 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest px-1">Identity & Contact</h3>
            
            <div className="group rounded-2xl border border-slate-100 dark:border-slate-700/50 p-5 bg-slate-50/50 dark:bg-slate-800/30 hover:bg-white dark:hover:bg-slate-800 transition-all duration-300 shadow-sm hover:shadow-md">
              <div className="flex items-center gap-3 text-slate-400 mb-2">
                <Mail className="h-4 w-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Email Address</span>
              </div>
              <p className="text-slate-900 dark:text-white font-medium pl-7">{user.email || "N/A"}</p>
            </div>

            <div className="group rounded-2xl border border-slate-100 dark:border-slate-700/50 p-5 bg-slate-50/50 dark:bg-slate-800/30 hover:bg-white dark:hover:bg-slate-800 transition-all duration-300 shadow-sm hover:shadow-md">
              <div className="flex items-center gap-3 text-slate-400 mb-2">
                <ShieldCheck className="h-4 w-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Unique Identifier</span>
              </div>
              <p className="text-slate-900 dark:text-white font-mono text-sm pl-7">{user.id}</p>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest px-1">Account Metadata</h3>
            
            <div className="group rounded-2xl border border-slate-100 dark:border-slate-700/50 p-5 bg-slate-50/50 dark:bg-slate-800/30 hover:bg-white dark:hover:bg-slate-800 transition-all duration-300 shadow-sm hover:shadow-md">
              <div className="flex items-center gap-3 text-slate-400 mb-2">
                <Calendar className="h-4 w-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Registration Date</span>
              </div>
              <p className="text-slate-900 dark:text-white font-medium pl-7">{formatDate(user.createdAt)}</p>
            </div>

            <div className="group rounded-2xl border border-slate-100 dark:border-slate-700/50 p-5 bg-slate-50/50 dark:bg-slate-800/30 hover:bg-white dark:hover:bg-slate-800 transition-all duration-300 shadow-sm hover:shadow-md">
              <div className="flex items-center gap-3 text-slate-400 mb-2">
                <Clock className="h-4 w-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Last Status Update</span>
              </div>
              <p className="text-slate-900 dark:text-white font-medium pl-7">{formatDate(user.updatedAt || user.createdAt)}</p>
            </div>
          </div>
        </div>

        {user.studentProfile && (
          <div className="mt-12 group rounded-3xl border border-slate-100 dark:border-slate-700/50 p-8 bg-slate-50/30 dark:bg-slate-900/40">
            <div className="flex items-center gap-3 mb-6">
               <div className="h-10 w-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-500">
                  <ShieldCheck className="h-5 w-5" />
               </div>
               <h2 className="text-xl font-bold text-slate-900 dark:text-white">Student Academic Profile</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.entries(user.studentProfile).map(([key, value]) => (
                <div key={key} className="space-y-2 group/item">
                  <p className="text-[10px] uppercase font-black tracking-[0.2em] text-slate-400 dark:text-slate-500 group-hover/item:text-blue-500 transition-colors">{key.replace(/([A-Z])/g, " $1")}</p>
                  <p className="text-slate-800 dark:text-slate-200 font-medium">{String(value ?? "N/A")}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDetails;
