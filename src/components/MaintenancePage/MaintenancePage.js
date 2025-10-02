import React from "react";
import "./MaintenancePage.css";
import { MAINTENANCE_MODE } from "../../config/maintenanceConfig";
import { useI18n } from "../../hooks/useI18n";

const MaintenancePage = () => {
  const { currentLanguage } = useI18n();
  const isVi = currentLanguage === "vi";

  // Format thời gian dự kiến
  const formatEstimatedTime = (timeString) => {
    if (!timeString) return "";
    const date = new Date(timeString);
    return date.toLocaleString(isVi ? "vi-VN" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="maintenance-page">
      <div className="maintenance-container">
        {/* Logo */}
        <div className="maintenance-logo">
          <img
            src="/assets/images/header/attech-bo-cuc-dau-trang-chu.png"
            alt="ATTECH Logo"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        </div>
        {/* Icon/Animation */}
        <div className="maintenance-icon">
          <div className="gear-container">
            <i className="fas fa-cog gear-1"></i>
            <i className="fas fa-cog gear-2"></i>
          </div>
        </div>

        {/* Tiêu đề */}
        <h1 className="maintenance-title">
          {isVi ? MAINTENANCE_MODE.message.vi : MAINTENANCE_MODE.message.en}
        </h1>

        {/* Mô tả */}
        <p className="maintenance-description">
          {isVi
            ? MAINTENANCE_MODE.description.vi
            : MAINTENANCE_MODE.description.en}
        </p>

        {/* Thời gian dự kiến */}
        {MAINTENANCE_MODE.estimatedEndTime && (
          <div className="maintenance-time">
            <i className="far fa-clock"></i>
            <span>
              {isVi ? "Dự kiến hoàn thành: " : "Estimated completion: "}
              <strong>
                {formatEstimatedTime(MAINTENANCE_MODE.estimatedEndTime)}
              </strong>
            </span>
          </div>
        )}

        {/* Thông tin liên hệ */}
        {MAINTENANCE_MODE.contact && (
          <div className="maintenance-contact">
            <p>{isVi ? "Liên hệ hỗ trợ:" : "Contact support:"}</p>
            <div className="contact-info">
              {MAINTENANCE_MODE.contact.email && (
                <a href={`mailto:${MAINTENANCE_MODE.contact.email}`}>
                  <i className="far fa-envelope"></i>
                  {MAINTENANCE_MODE.contact.email}
                </a>
              )}
              {MAINTENANCE_MODE.contact.phone && (
                <a href={`tel:${MAINTENANCE_MODE.contact.phone}`}>
                  <i className="fas fa-phone"></i>
                  {MAINTENANCE_MODE.contact.phone}
                </a>
              )}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="maintenance-footer">
          <p>
            &copy; {new Date().getFullYear()} ATTECH - Air Traffic Technical
            Company
          </p>
        </div>
      </div>
    </div>
  );
};

export default MaintenancePage;
