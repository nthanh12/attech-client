import React, { useState } from "react";
import NotificationSection from "../components/NotificationSection/NotificationSection";
import "./NotificationPage.css";
import { mockNotifications } from "../../../utils/mockNotifications";

const CATEGORIES = [
  {
    slug: "tuyen-dung",
    title: "Tin tuyển dụng"
  },
  {
    slug: "moi-nha-cung-cap",
    title: "Mời nhà cung cấp"
  },
  {
    slug: "thong-bao-khac",
    title: "Thông báo khác"
  }
];

const Notification = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Lấy ra các category thực sự có trong mockNotifications
  const categoriesInData = CATEGORIES.filter(cat =>
    mockNotifications.some(n => n.notificationCategorySlugVi === cat.slug)
  );

  return (
    <div className="notification">
      {categoriesInData.map(cat => {
        const filtered = mockNotifications.filter(
          n => n.notificationCategorySlugVi === cat.slug &&
            n.titleVi.toLowerCase().includes(searchTerm.toLowerCase())
        );
        // Sắp xếp giảm dần theo timePosted (mới nhất lên đầu)
        const sorted = filtered.slice().sort((a, b) => new Date(b.timePosted) - new Date(a.timePosted));
        return (
          <NotificationSection
            key={cat.slug}
            title={cat.title}
            notifications={sorted.map(item => ({
              id: item.id,
              slug: item.slugVi,
              title: item.titleVi,
              image: item.image,
              date: item.timePosted ? new Date(item.timePosted).toLocaleDateString('vi-VN') : '',
              category: item.notificationCategoryNameVi,
              readTime: undefined,
              notificationCategorySlugVi: item.notificationCategorySlugVi
            }))}
            type={cat.slug}
          />
        );
      })}
    </div>
  );
};

export default Notification;
