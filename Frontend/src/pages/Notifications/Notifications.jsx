import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";
import "./Notifications.css";

const Notifications = () => {
  const { url, token } = useContext(StoreContext);
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(
        url + "/api/notifications/allNotification",
        {},
        { headers: { token }}
      );
  
      setNotifications(response.data.notifications);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const markAsRead = async (id) => {
    try {
      await axios.post(
        url + "/api/notifications/mark-read",
        { id },
        { headers: { token } }
      );
      setNotifications((prev) =>
        prev.map((notif) =>
          notif._id === id ? { ...notif, read: true } : notif
        )
      );
    } catch (error) {
      console.error("Error marking as read:", error);
    }
  };

  const deleteNotification = async (id) => {
    try {
      await axios.delete(url + `/api/notifications/${id}`, {
        headers: { token },
      });
      setNotifications((prev) => prev.filter((notif) => notif._id !== id));
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchNotifications();
    }
  }, [token]);

  return (
    <div className="notifications-container">
      <h2>Notifications</h2>
      <div className="notifications-list">
        {notifications.length === 0 ? (
          <p className="no-notifications">No notifications available</p>
        ) : (
          notifications.map((notif) => (
            <div
              key={notif._id}
              className={`notification-item ${notif.read ? "read" : "unread"}`}
            >
              <p className="notification-message">{notif.message}</p>
              <div className="notification-actions">
                {!notif.read && (
                  <button
                    className="mark-read-btn"
                    onClick={() => markAsRead(notif._id)}
                  >
                    Mark as Read
                  </button>
                )}
                <button
                  className="delete-btn"
                  onClick={() => deleteNotification(notif._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Notifications;
