import React, { useState } from "react";
import NotificationSection from "../components/NotificationSection/NotificationSection";
import { useTranslation } from "react-i18next";
import { useI18n } from "../../../hooks/useI18n";
import "./NotificationPage.css";
import { mockNotifications } from "../../../utils/mockNotifications";

const CATEGORIES = [
  {
    slugVi: "tuyen-dung",
    slugEn: "recruitment",
    titleVi: "Tin tuyển dụng",
    titleEn: "Recruitment News"
  },
  {
    slugVi: "moi-nha-cung-cap",
    slugEn: "supplier-invitation",
    titleVi: "Mời nhà cung cấp",
    titleEn: "Supplier Invitation"
  },
  {
    slugVi: "thong-bao-khac",
    slugEn: "other-notifications",
    titleVi: "Thông báo khác",
    titleEn: "Other Notifications"
  }
];

const Notification = () => {
  const { t } = useTranslation();
  const { currentLanguage } = useI18n();
  const [searchTerm, setSearchTerm] = useState("");

  // Lấy ra các category thực sự có trong mockNotifications
  const categoriesInData = CATEGORIES.filter(cat =>
    mockNotifications.some(n => n.notificationCategorySlugVi === cat.slugVi)
  );

  return (
    <div className="notification">
      {categoriesInData.map(cat => {
        const filtered = mockNotifications.filter(
          n => n.notificationCategorySlugVi === cat.slugVi &&
            n.titleVi.toLowerCase().includes(searchTerm.toLowerCase())
        );
        // Sắp xếp giảm dần theo timePosted (mới nhất lên đầu)
        const sorted = filtered.slice().sort((a, b) => new Date(b.timePosted) - new Date(a.timePosted));
        
        console.log('Category Debug:', {
          category: cat,
          filteredCount: filtered.length,
          sortedCount: sorted.length,
          currentLanguage
        });
        
        return (
          <NotificationSection
            key={currentLanguage === 'vi' ? cat.slugVi : cat.slugEn}
            title={currentLanguage === 'vi' ? cat.titleVi : cat.titleEn}
            notifications={sorted}
            type={currentLanguage === 'vi' ? cat.slugVi : cat.slugEn}
          />
        );
      })}
    </div>
  );
};

export default Notification;
