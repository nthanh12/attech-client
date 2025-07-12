import React from "react";
import { useParams } from "react-router-dom";
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

  return (
    <div>
      <h1>{lang === "vi" ? service.nameVi : service.nameEn}</h1>
      <div
        dangerouslySetInnerHTML={{
          __html: lang === "vi" ? service.contentVi : service.contentEn,
        }}
      />
    </div>
  );
};

export default ServiceDetail;
