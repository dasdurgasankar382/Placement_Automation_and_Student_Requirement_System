import React, { useEffect, useState } from "react";
import { Ban, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getAllUsers, disableUser } from "../services/adminService";
import DataTable from "../../../components/ui/DataTable";

const STATUS_STYLES = {
  ACTIVE: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400",
  DISABLED: "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400",
  INACTIVE: "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400",
  PENDING: "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400",
  SUSPENDED: "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400",
};

const ROLE_STYLES = {
  STUDENT: "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400",
  RECRUITER: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400",
  DEFAULT: "bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400",
};

const getTrimmedId = (id) => {
  const idString = String(id || "");
  return idString.length > 8 ? `${idString.slice(0, 8)}...` : idString;
};

const getRoleLabel = (role) => {
  if (!role) return "Unknown";
  if (typeof role === "string") return role;
  return role.roleName || role.name || String(role.id || "Unknown");
};

const getStatusBadge = (status) => {
  return STATUS_STYLES[String(status || "ACTIVE").toUpperCase()] || "bg-slate-100 text-slate-700 dark:bg-slate-700/30 dark:text-slate-300";
};

const createColumns = (navigate, onDisable) => [
  {
    header: "ID",
    render: (row) => <span className="font-mono">{getTrimmedId(row.id)}</span>,
  },
  {
    header: "Email",
    accessor: "email",
    cellClassName: "font-medium text-slate-900 dark:text-slate-100",
  },
  {
    header: "Role",
    render: (row) => {
      const roleLabel = getRoleLabel(row.role);
      return (
        <span className={`px-2 py-1 text-xs rounded-full font-medium ${ROLE_STYLES[roleLabel] || ROLE_STYLES.DEFAULT}`}>
          {roleLabel}
        </span>
      );
    },
  },
  {
    header: "Status",
    render: (row) => {
      const statusLabel = String(row.status || "ACTIVE").toUpperCase();
      return (
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusBadge(statusLabel)}`}>
          {statusLabel}
        </span>
      );
    },
  },
  {
    header: "Actions",
    headerClassName: "text-right",
    cellClassName: "text-right space-x-3",
    render: (row) => (
      <>
        <button
          onClick={() => navigate(`/admin/users/${row.id}`)}
          className="text-slate-400 hover:text-blue-600 transition-colors"
          title="View User"
        >
          <Eye className="h-5 w-5" />
        </button>
        <button
          onClick={() => onDisable(row.id)}
          className="text-slate-400 hover:text-amber-500 transition-colors"
          title="Disable User"
        >
          <Ban className="h-5 w-5" />
        </button>
      </>
    ),
  },
];

const Users = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const normalizeUser = (user) => ({
    ...user,
    role: getRoleLabel(user.role),
  });

  const fetchUsers = async () => {
    try {
      const { data } = await getAllUsers();
      const usersData = data?.data || data;
      setUsers(Array.isArray(usersData) ? usersData.map(normalizeUser) : []);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to fetch users.");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDisable = async (id) => {
    try {
      await disableUser(id);
      toast.success("User disabled successfully.");
      fetchUsers();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to disable user.");
    }
  };

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

      <DataTable columns={createColumns(navigate, handleDisable)} data={users} emptyMessage="No users found." />
    </div>
  );
};

export default Users;
