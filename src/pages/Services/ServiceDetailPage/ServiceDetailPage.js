import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useLanguage } from "../../../contexts/LanguageContext";
import { mockServices } from "../../../utils/mockServices";

const ServiceDetailPage = () => {
  const { lang } = useLanguage();
  const { serviceSlug } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const item = mockServices.find(s => (lang === "vi" ? s.slugVi === serviceSlug : s.slugEn === serviceSlug));
      if (item) {
        setService(item);
        setError(null);
      } else {
        setService(null);
        setError(lang === "vi" ? "Không tìm thấy dịch vụ" : "Service not found");
      }
      setLoading(false);
    }, 300);
  }, [serviceSlug, lang]);

  if (loading) {
    return <div>{lang === "vi" ? "Đang tải dịch vụ..." : "Loading service..."}</div>;
  }
  if (error || !service) {
    return (
      <div>
        <h2>{lang === "vi" ? "Không tìm thấy dịch vụ" : "Service not found"}</h2>
        <p>{error || (lang === "vi" ? "Dịch vụ không tồn tại hoặc đã bị xóa." : "Service does not exist or has been deleted.")}</p>
        <Link to={lang === "vi" ? "/dich-vu" : "/en/services"}>{lang === "vi" ? "Quay lại danh sách dịch vụ" : "Back to service list"}</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>{lang === "vi" ? service.nameVi : service.nameEn}</h1>
      <p>{lang === "vi" ? service.descriptionVi : service.descriptionEn}</p>
      <div dangerouslySetInnerHTML={{ __html: lang === "vi" ? service.contentVi : service.contentEn }} />
    </div>
  );
};

export default ServiceDetailPage; 