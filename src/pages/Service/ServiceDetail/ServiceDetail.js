import React from "react";
import { useParams } from "react-router-dom";
import { useI18n } from "../../../hooks/useI18n";
import { mockServices } from "../../../utils/mockServices";
import LocalizedLink from "../../../components/Shared/LocalizedLink";
import "./ServiceDetail.css";

const ServiceDetail = () => {
  const { slug: serviceSlug } = useParams();
  const { t, currentLanguage } = useI18n();

  const service = mockServices.find((s) =>
    currentLanguage === "vi"
      ? s.slugVi === serviceSlug
      : s.slugEn === serviceSlug
  );

  if (!service) {
    return (
      <div className="service-not-found">
        <h2>{t("frontend.services.noServices")}</h2>
        <LocalizedLink routeKey="SERVICES" className="back-link">
          {t("common.back")}
        </LocalizedLink>
      </div>
    );
  }

  // Lấy thông tin hiển thị
  const title = currentLanguage === "vi" ? service.titleVi : service.titleEn;
  const description =
    currentLanguage === "vi" ? service.descriptionVi : service.descriptionEn;
  const content =
    currentLanguage === "vi" ? service.contentVi : service.contentEn;
  const category =
    currentLanguage === "vi"
      ? service.serviceCategorytitleVi
      : service.serviceCategorytitleEn;
  const categorySlug =
    currentLanguage === "vi"
      ? service.serviceCategorySlugVi
      : service.serviceCategorySlugEn;
  const postedDate = new Date(service.timePosted).toLocaleDateString(
    currentLanguage === "vi" ? "vi-VN" : "en-US"
  );

  return (
    <div className="service-content-wrap">
      {/* Breadcrumb */}
      <nav className="service-breadcrumb">
        <LocalizedLink routeKey="SERVICES">
          {t("navigation.services")}
        </LocalizedLink>
        <span className="breadcrumb-sep">/</span>
        <span>{title}</span>
      </nav>

      {/* Card chính */}
      <div className="service-detail-card">
        {/* Ảnh đại diện */}
        <div className="service-detail-imgbox">
          <img src={service.image} alt={title} className="service-detail-img" />
        </div>
        {/* Thông tin nhanh */}
        <div className="service-detail-meta">
          <span className="service-detail-category">
            <i className="fas fa-layer-group"></i> {category}
          </span>
          <span className="service-detail-date">
            <i className="far fa-calendar-alt"></i> {postedDate}
          </span>
        </div>
        {/* Tiêu đề & mô tả */}
        <h1 className="service-detail-title">{title}</h1>
        <p className="service-detail-desc">{description}</p>
        {/* Nội dung chi tiết */}
        <div
          className="service-detail-content cns-container"
          dangerouslySetInnerHTML={{ __html: content }}
        />
        {/* Nút quay lại */}
        <div className="service-detail-backwrap">
          <LocalizedLink routeKey="SERVICES" className="service-detail-backbtn">
            <i className="fas fa-arrow-left"></i>{" "}
            {currentLanguage === "vi"
              ? "Quay lại danh sách dịch vụ"
              : "Back to services"}
          </LocalizedLink>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
