import React from "react";
import { Link } from "react-router-dom";
import { ShieldAlert } from "lucide-react";

export default function Unauthorized() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-bg-light dark:bg-bg-dark text-slate-900 dark:text-slate-100 p-4">
      <ShieldAlert className="h-24 w-24 text-red-500 mb-6" />
      <h1 className="text-4xl font-bold mb-2">Access Denied</h1>
      <p className="text-lg text-slate-500 dark:text-slate-400 mb-8 max-w-md text-center">
        You don't have permission to view this page. Please log in with an account that has the proper clearance.
      </p>
      <Link 
        to="/login"
        className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl shadow-lg shadow-red-500/30 font-medium transition-all"
      >
        Return to Login
      </Link>
    </div>
  );
}
