import React, { useState, useEffect } from "react";
import NotificationSection from "../components/NotificationSection/NotificationSection";
import { useTranslation } from "react-i18next";
import { useI18n } from "../../../hooks/useI18n";
import "./NotificationPage.css";
import { getNotifications, getNotificationCategories } from "../../../services/clientNotificationService";


const Notification = () => {
  const { t } = useTranslation();
  const { currentLanguage } = useI18n();
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load categories and notifications from API
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // Load categories
        const categoriesData = await getNotificationCategories();
        setCategories(categoriesData);
        
        // Load all notifications
        const notificationsData = await getNotifications({
          pageIndex: 1,
          pageSize: 50 // Get enough notifications for all categories
        });
        setNotifications(notificationsData.items || []);
        
      } catch (error) {
        console.error("❌ Error loading notification data:", error);
        setCategories([]);
        setNotifications([]);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  // Filter categories that have notifications
  const categoriesInData = categories.filter(cat =>
    notifications.some(n => n.notificationCategoryId === cat.id)
  );

  if (loading) {
    return (
      <div className="notification">
        <div className="loading">
          <p>Đang tải thông báo...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="notification">
      {categoriesInData.length > 0 ? (
        categoriesInData.map(cat => {
          const filtered = notifications.filter(
            n => n.notificationCategoryId === cat.id &&
              (currentLanguage === 'vi' ? n.titleVi : n.titleEn).toLowerCase().includes(searchTerm.toLowerCase())
          );
          // Sắp xếp giảm dần theo timePosted (mới nhất lên đầu)
          const sorted = filtered.slice().sort((a, b) => new Date(b.timePosted) - new Date(a.timePosted));
          
          return (
            <NotificationSection
              key={cat.id}
              title={currentLanguage === 'vi' ? cat.titleVi : cat.titleEn}
              notifications={sorted}
              type={currentLanguage === 'vi' ? cat.slugVi : cat.slugEn}
            />
          );
        })
      ) : (
        <div className="no-notifications">
          <p>Không có thông báo nào.</p>
        </div>
      )}
    </div>
  );
};

export default Notification;
