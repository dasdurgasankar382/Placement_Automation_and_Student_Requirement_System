import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getAllCompaniesForAdmin, verifyCompany } from "../services/adminService";
import CompanyCard from "../../../components/ui/CompanyCard";
import { Search, Building2 } from "lucide-react";

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCompanies();
  }, []);

  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const filtered = companies.filter(c => 
      c.name?.toLowerCase().includes(term) ||
      c.location?.toLowerCase().includes(term)
    );
    setFilteredCompanies(filtered);
  }, [searchTerm, companies]);

  const fetchCompanies = async () => {
    try {
      const { data } = await getAllCompaniesForAdmin();
      const results = data?.data || (Array.isArray(data) ? data : []);
      setCompanies(results);
      setFilteredCompanies(results);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to fetch companies.");
      setCompanies([]);
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (id) => {
    try {
      await verifyCompany(id);
      toast.success("Company verified successfully!");
      fetchCompanies(); // Refresh list
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to verify company.");
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
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Manage Companies</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">View and verify registered companies.</p>
        </div>
        
        <div className="relative w-full md:w-80 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-purple-500 transition-colors" />
          <input
            type="text"
            placeholder="Search companies by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-2xl focus:ring-4 focus:ring-purple-500/10 focus:border-purple-500 outline-none transition-all shadow-sm"
          />
        </div>
      </div>

      {filteredCompanies.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCompanies.map((company) => (
            <CompanyCard 
              key={company.id} 
              company={company} 
              onVerify={handleVerify}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-white/50 dark:bg-slate-800/30 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700">
          <Building2 className="h-12 w-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
          <p className="text-slate-500 dark:text-slate-400 text-lg font-medium">No companies found.</p>
          <p className="text-slate-400 dark:text-slate-500 mt-1">Try adjusting your search criteria.</p>
        </div>
      )}
    </div>
  );
};

export default Companies;
