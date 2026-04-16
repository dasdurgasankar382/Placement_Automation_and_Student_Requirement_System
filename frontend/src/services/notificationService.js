import api from "./api";

/**
 * Service for handling backend notification APIs
 */
export const getNotifications = async () => {
  const response = await api.get("/notifications");
  // Expected structure: { data: { notifications: [], unreadCount: N } }
  return response.data?.data || response.data || { notifications: [], unreadCount: 0 };
};

export const markAsRead = async (id) => {
  const response = await api.put(`/notifications/${id}/read`);
  return response.data;
};
