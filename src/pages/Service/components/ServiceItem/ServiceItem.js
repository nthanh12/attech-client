import React from "react";
import "./ServiceItem.css";
import { useI18n } from "../../../../hooks/useI18n";
import LocalizedLink from "../../../../components/Shared/LocalizedLink";

const ServiceItem = ({ id, slug, title, description, image }) => {
  const { t, currentLanguage } = useI18n();

  return (
    <article className="card service-item">
      <div className="service-img">
        <img
          src={
            image && image.startsWith("http")
              ? image
              : `${process.env.PUBLIC_URL || ""}${image}`
          }
          alt={
            currentLanguage === "vi"
              ? `Hình ảnh cho dịch vụ ${title}`
              : `Image for ${title} service`
          }
          loading="lazy"
          onError={(e) => {
            e.target.src = "";
          }}
        />
      </div>
      <div className="card-body">
        <h3 className="service-title">{title}</h3>
      </div>
      <div className="card-footer">
        <LocalizedLink
          routeKey="SERVICE_DETAIL"
          params={{ slug }}
          className="service-detail-btn"
          aria-label={
            currentLanguage === "vi"
              ? `Xem chi tiết về dịch vụ ${title}`
              : `View details about ${title} service`
          }
        >
          <span>{t("frontend.services.viewDetails")}</span>
        </LocalizedLink>
      </div>
    </article>
  );
};

export default React.memo(ServiceItem);
