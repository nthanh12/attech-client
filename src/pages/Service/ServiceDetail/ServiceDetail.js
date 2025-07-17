import React from "react";
import { useParams, Link } from "react-router-dom";
import { useLanguage } from "../../../contexts/LanguageContext";
import { mockServices } from "../../../utils/mockServices";
import "./ServiceDetail.css";

const ServiceDetail = () => {
  const { serviceSlug } = useParams();
  const { lang } = useLanguage();

  const service = mockServices.find((s) =>
    lang === "vi" ? s.slugVi === serviceSlug : s.slugEn === serviceSlug
  );

  if (!service) return <div>Không tìm thấy dịch vụ</div>;

  // Lấy thông tin hiển thị
  const title = lang === "vi" ? service.nameVi : service.nameEn;
  const description = lang === "vi" ? service.descriptionVi : service.descriptionEn;
  const content = lang === "vi" ? service.contentVi : service.contentEn;
  const category = lang === "vi" ? service.serviceCategoryNameVi : service.serviceCategoryNameEn;
  const categorySlug = lang === "vi" ? service.serviceCategorySlugVi : service.serviceCategorySlugEn;
  const postedDate = new Date(service.timePosted).toLocaleDateString(lang === "vi" ? "vi-VN" : "en-US");

  return (
    <div className="service-content-wrap">
      {/* Breadcrumb */}
      <nav className="service-breadcrumb">
        <Link to="/dich-vu">{lang === "vi" ? "Dịch vụ" : "Services"}</Link>
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
        <div className="service-detail-content cns-container" dangerouslySetInnerHTML={{ __html: content }} />
        {/* Nút quay lại */}
        <div className="service-detail-backwrap">
          <Link to="/dich-vu" className="service-detail-backbtn">
            <i className="fas fa-arrow-left"></i> {lang === "vi" ? "Quay lại danh sách dịch vụ" : "Back to services"}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
