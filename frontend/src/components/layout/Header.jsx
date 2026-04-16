import React, { useState, useRef, useEffect } from "react";
import { Menu, Moon, Sun, Bell, CheckCircle, Info } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { NOTIFICATION_TYPES } from "../../config/notificationConfig";
import { getNotifications, markAsRead } from "../../services/notificationService";
import { formatTimeAgo } from "../../utils/formatters";

/**
 * Modern Dashboard Header with Real-Time Notifications
 */
const Header = ({ titleText, setSidebarOpen, profileName, userRole }) => {
  const { theme: currentTheme, toggleTheme } = useTheme();
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationsList, setNotificationsList] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const dropdownRef = useRef(null);

  const initial = profileName ? profileName.charAt(0).toUpperCase() : "U";

  // Fetch notifications from API
  const fetchNotifications = async () => {
    try {
      const data = await getNotifications();
      // Handle different possible API response structures
      const list = data.notifications || data;
      const count = data.unreadCount ?? list.filter(n => !n.isRead).length;
      
      setNotificationsList(Array.isArray(list) ? list : []);
      setUnreadCount(count);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    }
  };

  useEffect(() => {
    if (userRole === "ADMIN") return;

    fetchNotifications();
    // Optional: Refresh notifications every 60 seconds
    const interval = setInterval(fetchNotifications, 60000);
    return () => clearInterval(interval);
  }, [userRole]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNotificationClick = async (notif) => {
    if (!notif.isRead) {
      try {
        await markAsRead(notif.id);
        // Optimistic UI update
        setNotificationsList(prev => 
          prev.map(n => n.id === notif.id ? { ...n, isRead: true } : n)
        );
        setUnreadCount(prev => Math.max(0, prev - 1));
      } catch (err) {
        console.error("Failed to mark as read:", err);
      }
    }
  };

  return (
    <header className="h-24 bg-transparent flex items-center justify-between px-6 lg:px-10 sticky top-0 z-30">

      {/* Left section: Mobile Menu & Title */}
      <div className="flex items-center gap-4">
        <button
          className="lg:hidden p-2 rounded-lg bg-white dark:bg-slate-800 shadow-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="h-5 w-5" />
        </button>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white hidden sm:block tracking-tight">
          {titleText || "Dashboard"}
        </h2>
      </div>

      {/* Right section: Icons & Profile */}
      <div className="flex items-center gap-3 sm:gap-6">

        {/* Quick Actions (Notifications, Theme) */}
        <div className="flex items-center gap-2 sm:gap-4 text-slate-600 dark:text-slate-400 relative">
          
          {userRole !== "ADMIN" && (
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors relative"
                title="Notifications"
              >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-2 h-2.5 w-2.5 bg-red-500 rounded-full ring-2 ring-white dark:ring-slate-900 animate-pulse"></span>
                )}
              </button>

              {/* Notification Dropdown - MOBILE RESPONSIVE FIX */}
              {showNotifications && (
                <div className="fixed inset-x-4 top-24 sm:absolute sm:right-0 sm:inset-x-auto sm:mt-3 w-auto sm:w-96 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200">
                  <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
                    <h3 className="font-bold text-slate-800 dark:text-white">Notifications</h3>
                    {unreadCount > 0 && (
                      <span className="text-[10px] uppercase tracking-wider bg-brand-purple/10 text-brand-purple px-2 py-0.5 rounded-full font-bold">
                        {unreadCount} Unread
                      </span>
                    )}
                  </div>
                  
                  <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                    {notificationsList.length > 0 ? (
                      notificationsList.map((n) => {
                        const config = NOTIFICATION_TYPES[n.type] || NOTIFICATION_TYPES.DEFAULT;
                        const Icon = config.icon;
                        
                        return (
                          <div 
                            key={n.id} 
                            onClick={() => handleNotificationClick(n)}
                            className={`p-4 border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all cursor-pointer group relative ${!n.isRead ? 'bg-brand-purple/[0.02] dark:bg-brand-purple/[0.03]' : ''}`}
                          >
                            {!n.isRead && (
                              <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-brand-purple"></div>
                            )}
                            <div className="flex gap-3">
                              <div className={`mt-1 p-2 rounded-xl shrink-0 ${config.color}`}>
                                <Icon className="h-4 w-4" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start mb-0.5">
                                  <h4 className={`text-sm font-semibold truncate pr-2 ${n.isRead ? 'text-slate-600 dark:text-slate-400' : 'text-slate-800 dark:text-slate-200'}`}>
                                    {config.label}
                                  </h4>
                                  <span className="text-[10px] text-slate-400 dark:text-slate-500 whitespace-nowrap">
                                    {formatTimeAgo(n.createdAt)}
                                  </span>
                                </div>
                                <p className={`text-xs leading-relaxed ${n.isRead ? 'text-slate-400 dark:text-slate-500' : 'text-slate-500 dark:text-slate-400'}`}>
                                  {n.message}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="p-12 text-center">
                        <div className="h-12 w-12 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Bell className="h-6 w-6 text-slate-300 dark:text-slate-600" />
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">All caught up!</p>
                        <p className="text-slate-400 dark:text-slate-500 text-xs mt-1">No new notifications at the moment.</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-3 bg-slate-50/50 dark:bg-slate-800/20 text-center border-t border-slate-100 dark:border-slate-800">
                    <button className="text-xs font-bold text-brand-purple hover:underline transition-all">
                      View Archive
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          <button
            onClick={toggleTheme}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
            title="Toggle Theme"
          >
            {currentTheme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
        </div>

        {/* Profile Avatar Trigger */}
        <button className="flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800 p-1 pr-2 rounded-full transition-colors">
          <div className="h-10 w-10 relative overflow-hidden rounded-full bg-brand-purple/20 ring-2 ring-white dark:ring-slate-800 shadow-sm flex items-center justify-center">
            <span className="text-brand-purple font-bold text-sm">{initial}</span>
          </div>
        </button>
      </div>
    </header>
  );
};

export default Header;
