import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, User, Mail, ShieldCheck, Calendar, Fingerprint } from "lucide-react";
import { toast } from "react-toastify";
import { getUserById } from "../services/adminService";

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

  const getRoleLabel = (role) => {
    if (!role) return "Unknown";
    if (typeof role === "string") return role;
    return role.roleName || role.name || "Unknown";
  };

  const formatDate = (value) => {
    if (!value) return "N/A";
    try {
      return new Date(value).toLocaleString();
    } catch {
      return String(value);
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
      <div className="max-w-4xl mx-auto p-8 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white mb-6">
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        <div className="text-center py-16 text-slate-500 dark:text-slate-400">No user details available.</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">
        <ArrowLeft className="h-4 w-4" /> Back to Users
      </button>

      <div className="bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-3xl p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">User Details</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2">Detailed profile for the selected user.</p>
          </div>
          <div className="px-4 py-2 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-sm font-medium inline-flex items-center gap-2">
            <Fingerprint className="h-4 w-4" /> {getRoleLabel(user.role)}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="rounded-3xl border border-slate-100 dark:border-slate-700 p-6 bg-slate-50 dark:bg-slate-900/50">
              <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 mb-3">
                <User className="h-5 w-5" />
                <span className="font-semibold">Name</span>
              </div>
              <p className="text-slate-900 dark:text-white">{user.name || user.fullName || user.username || "N/A"}</p>
            </div>

            <div className="rounded-3xl border border-slate-100 dark:border-slate-700 p-6 bg-slate-50 dark:bg-slate-900/50">
              <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 mb-3">
                <Mail className="h-5 w-5" />
                <span className="font-semibold">Email</span>
              </div>
              <p className="text-slate-900 dark:text-white">{user.email || "N/A"}</p>
            </div>

            <div className="rounded-3xl border border-slate-100 dark:border-slate-700 p-6 bg-slate-50 dark:bg-slate-900/50">
              <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 mb-3">
                <Calendar className="h-5 w-5" />
                <span className="font-semibold">Joined</span>
              </div>
              <p className="text-slate-900 dark:text-white">{formatDate(user.createdAt || user.createdAt)}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-3xl border border-slate-100 dark:border-slate-700 p-6 bg-slate-50 dark:bg-slate-900/50">
              <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 mb-3">
                <ShieldCheck className="h-5 w-5" />
                <span className="font-semibold">User ID</span>
              </div>
              <p className="text-slate-900 dark:text-white font-mono">{user.id}</p>
            </div>

            <div className="rounded-3xl border border-slate-100 dark:border-slate-700 p-6 bg-slate-50 dark:bg-slate-900/50">
              <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 mb-3">
                <Clock className="h-5 w-5" />
                <span className="font-semibold">Status</span>
              </div>
              <p className="text-slate-900 dark:text-white">{String(user.status || "ACTIVE").toUpperCase()}</p>
            </div>
          </div>
        </div>

        {user.studentProfile && (
          <div className="mt-8 rounded-3xl border border-slate-100 dark:border-slate-700 p-6 bg-slate-50 dark:bg-slate-900/50">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Student Profile</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(user.studentProfile).map(([key, value]) => (
                <div key={key} className="space-y-1">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">{key.replace(/([A-Z])/g, " $1")}</p>
                  <p className="text-slate-900 dark:text-white">{String(value ?? "N/A")}</p>
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
