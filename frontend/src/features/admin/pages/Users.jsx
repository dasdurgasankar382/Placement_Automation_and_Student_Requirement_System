import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getAllUsers, disableUser, enableUser } from "../services/adminService";
import UserCard from "../../../components/ui/UserCard";
import { Search } from "lucide-react";
import { getRoleLabel } from "../../../utils/formatters";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const filtered = users.filter(u => 
      u.name?.toLowerCase().includes(term) ||
      u.email?.toLowerCase().includes(term) ||
      u.roleLabel?.toLowerCase().includes(term)
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  const normalizeUser = (user) => ({
    ...user,
    roleLabel: getRoleLabel(user.role),
  });

  const fetchUsers = async () => {
    try {
      const { data } = await getAllUsers();
      const usersData = data?.data || data;
      const normalized = Array.isArray(usersData) ? usersData.map(normalizeUser) : [];
      setUsers(normalized);
      setFilteredUsers(normalized);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to fetch users.");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDisable = async (id) => {
    if (!window.confirm("Are you sure you want to disable this user?")) return;
    try {
      await disableUser(id);
      toast.success("User disabled successfully.");
      fetchUsers();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to disable user.");
    }
  };

  const handleEnable = async (id) => {
    try {
      await enableUser(id);
      toast.success("User enabled successfully.");
      fetchUsers();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to enable user.");
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
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Manage Users</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">View and manage all system users.</p>
        </div>

        <div className="relative w-full md:w-80 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-purple-500 transition-colors" />
          <input
            type="text"
            placeholder="Search users by name, email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-2xl focus:ring-4 focus:ring-purple-500/10 focus:border-purple-500 outline-none transition-all shadow-sm"
          />
        </div>
      </div>

      {filteredUsers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <UserCard 
              key={user.id} 
              user={user} 
              onDisable={handleDisable}
              onEnable={handleEnable}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-white/50 dark:bg-slate-800/30 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700">
          <User className="h-12 w-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
          <p className="text-slate-500 dark:text-slate-400 text-lg font-medium">No users found.</p>
          <p className="text-slate-400 dark:text-slate-500 mt-1">Try adjusting your search criteria.</p>
        </div>
      )}
    </div>
  );
};

export default Users;
