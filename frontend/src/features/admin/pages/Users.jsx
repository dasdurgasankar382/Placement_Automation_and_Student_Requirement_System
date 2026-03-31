import React, { useEffect, useState } from "react";
import { Trash2, Ban } from "lucide-react";
import { toast } from "react-toastify";
import { getAllUsers, deleteUser, disableUser } from "../services/adminService";
import DataTable from "../../../components/ui/DataTable";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data } = await getAllUsers();
      if (data?.data) {
        setUsers(data.data);
      } else if (Array.isArray(data)) {
        setUsers(data);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to fetch users.");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await deleteUser(id);
      toast.success("User deleted successfully.");
      setUsers(users.filter(u => u.id !== id));
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to delete user.");
    }
  };

  const handleDisable = async (id) => {
    try {
      await disableUser(id);
      toast.success("User status changed successfully.");
      // Optionally re-fetch users or locally map status update
      fetchUsers();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to disable user.");
    }
  };

  const columns = [
    { header: "ID", accessor: "id" },
    { 
      header: "Email", 
      accessor: "email",
      cellClassName: "font-medium text-slate-900 dark:text-white"
    },
    { 
      header: "Role", 
      render: (row) => (
        <span className={`px-2 py-1 text-xs rounded-full font-medium ${
          row.role === 'STUDENT' ? 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400' :
          row.role === 'RECRUITER' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400' :
          'bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400'
        }`}>
          {row.role}
        </span>
      )
    },
    { 
      header: "Status", 
      render: (row) => row.status || "ACTIVE"
    },
    { 
      header: "Actions", 
      headerClassName: "text-right",
      cellClassName: "text-right space-x-3",
      render: (row) => (
        <>
          <button 
            onClick={() => handleDisable(row.id)}
            className="text-slate-400 hover:text-amber-500 transition-colors"
            title="Disable User"
          >
            <Ban className="h-5 w-5" />
          </button>
          <button 
            onClick={() => handleDelete(row.id)}
            className="text-slate-400 hover:text-red-500 transition-colors"
            title="Delete User"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </>
      )
    }
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Manage Users</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">View and manage all system users.</p>
        </div>
      </div>

      <DataTable 
        columns={columns} 
        data={users} 
        emptyMessage="No users found." 
      />
    </div>
  );
};

export default Users;
