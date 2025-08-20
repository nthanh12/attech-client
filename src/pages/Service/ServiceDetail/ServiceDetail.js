import React from "react";
import { useParams } from "react-router-dom";
import { useI18n } from "../../../hooks/useI18n";
import { mockServices } from "../../../utils/mockServices";
import LocalizedLink from "../../../components/Shared/LocalizedLink";
import ErrorPage from "../../../components/Shared/ErrorPage";
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
      <ErrorPage
        title="Dịch vụ không tồn tại"
        message="Xin lỗi, dịch vụ bạn đang tìm kiếm không tồn tại hoặc đã bị xóa."
        suggestions={[
          "Kiểm tra lại đường link",
          "Tìm kiếm dịch vụ khác",
          "Quay lại trang danh sách dịch vụ",
        ]}
        type="service"
        backRoute="HOME"
        backText="Về trang chủ"
        listRoute="SERVICES"
        listText="Xem tất cả dịch vụ"
      />
    );
  }

  // Lấy thông tin hiển thị
  const title = currentLanguage === "vi" ? service.titleVi : service.titleEn;
  const description =
    currentLanguage === "vi" ? service.descriptionVi : service.descriptionEn;
  const content =
    currentLanguage === "vi" ? service.contentVi : service.contentEn;
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
