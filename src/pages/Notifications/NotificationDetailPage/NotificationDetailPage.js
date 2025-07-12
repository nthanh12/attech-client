import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useLanguage } from "../../../contexts/LanguageContext";
import { mockNotifications } from "../../../utils/mockNotifications";

const NotificationDetailPage = () => {
  const { lang } = useLanguage();
  const { notificationSlug } = useParams();
  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const item = mockNotifications.find(n => (lang === "vi" ? n.slugVi === notificationSlug : n.slugEn === notificationSlug));
      if (item) {
        setNotification(item);
        setError(null);
      } else {
        setNotification(null);
        setError(lang === "vi" ? "Không tìm thấy thông báo" : "Notification not found");
      }
      setLoading(false);
    }, 300);
  }, [notificationSlug, lang]);

  if (loading) {
    return <div>{lang === "vi" ? "Đang tải thông báo..." : "Loading notification..."}</div>;
  }
  if (error || !notification) {
    return (
      <div>
        <h2>{lang === "vi" ? "Không tìm thấy thông báo" : "Notification not found"}</h2>
        <p>{error || (lang === "vi" ? "Thông báo không tồn tại hoặc đã bị xóa." : "Notification does not exist or has been deleted.")}</p>
        <Link to={lang === "vi" ? "/thong-bao" : "/en/notifications"}>{lang === "vi" ? "Quay lại danh sách thông báo" : "Back to notification list"}</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>{lang === "vi" ? notification.titleVi : notification.titleEn}</h1>
      <p>{lang === "vi" ? notification.descriptionVi : notification.descriptionEn}</p>
      <div dangerouslySetInnerHTML={{ __html: lang === "vi" ? notification.contentVi : notification.contentEn }} />
    </div>
  );
};

export default NotificationDetailPage; 