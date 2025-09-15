import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useI18n } from "../../../hooks/useI18n";
import * as clientServiceService from "../../../services/clientServiceService";
import LocalizedLink from "../../../components/Shared/LocalizedLink";
import ErrorPage from "../../../components/Shared/ErrorPage";
import sanitizeHtml from "sanitize-html";
import { getApiBaseUrl } from "../../../config/apiConfig";
import "./ServiceDetail.css";
// Fixed webpack hot reload issue

const ServiceDetail = () => {
  const { slug: serviceSlug } = useParams();
  const { t, currentLanguage } = useI18n();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadService = async () => {
      try {
        setLoading(true);
        const serviceData = await clientServiceService.getServiceBySlug(serviceSlug);
        
        if (serviceData) {
          const formattedService = clientServiceService.formatServiceForDisplay(serviceData, currentLanguage);
          setService({ ...serviceData, ...formattedService });
        } else {
          setError("Service not found");
        }
      } catch (err) {setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (serviceSlug) {
      loadService();
    }
  }, [serviceSlug, currentLanguage]);

  if (loading) {
    return (
      <div className="text-center p-5">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (error || !service) {
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

  const getContent = () => {
    return service.displayContent || (currentLanguage === "vi" ? service.contentVi : service.contentEn);
  };

  const formatFileSize = (bytes) => {
    if (!bytes || bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileTypeDisplay = (contentType) => {
    if (!contentType) return 'Unknown';
    if (contentType.includes('pdf')) return 'PDF';
    if (contentType.includes('word')) return 'Word';
    if (contentType.includes('excel') || contentType.includes('spreadsheet')) return 'Excel';
    if (contentType.includes('powerpoint') || contentType.includes('presentation')) return 'PowerPoint';
    if (contentType.includes('image')) return 'Image';
    if (contentType.includes('text')) return 'Text';
    return contentType.split('/')[1]?.toUpperCase() || 'File';
  };

  return (
    <div className="service-content-wrap">
      {/* Breadcrumb */}
      <nav className="service-breadcrumb">
        <LocalizedLink routeKey="SERVICES">
          {t("navigation.services")}
        </LocalizedLink>
        <span className="breadcrumb-sep">/</span>
        <span>{service.displayTitle}</span>
      </nav>

      {/* Card chính */}
      <div className="service-detail-card">
        {/* Ảnh đại diện */}
        {service.imageUrl && (
          <div className="service-detail-imgbox">
            <img 
              src={service.imageUrl.startsWith('http') ? service.imageUrl : `${getApiBaseUrl()}${service.imageUrl}`} 
              alt={service.displayTitle} 
              className="service-detail-img" 
            />
          </div>
        )}
        
        {/* Tiêu đề & mô tả */}
        <h1 className="service-detail-title">{service.displayTitle}</h1>
        <p className="service-detail-desc">{service.displayDescription}</p>
        
        {/* Nội dung chi tiết */}
        <div className="article-content">
          <div
            dangerouslySetInnerHTML={{
              __html: sanitizeHtml(getContent(), {
                allowedTags: sanitizeHtml.defaults.allowedTags.concat([
                  "img",
                  "figure",
                  "figcaption",
                ]),
                allowedAttributes: {
                  ...sanitizeHtml.defaults.allowedAttributes,
                  img: [
                    "src",
                    "alt",
                    "title",
                    "class",
                    "width",
                    "height",
                    "loading",
                  ],
                  figure: ["class"],
                  figcaption: ["class"],
                  div: ["style", "class"],
                  p: ["style", "class"],
                  span: ["style", "class"],
                  a: ["href", "target", "rel"],
                },
                allowedStyles: {
                  "*": {
                    color: [/^\#(0x)?[0-9a-f]+$/i, /^rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)$/],
                    "text-align": [/^left$/, /^right$/, /^center$/, /^justify$/],
                    "font-size": [/^\d+(?:px|em|%)$/],
                    "font-weight": [/^(?:normal|bold|bolder|lighter|[1-9]00)$/],
                  },
                },
              }),
            }}
          />
        </div>

        {/* Attachments Section */}
        {service.attachments && (service.attachments.images?.length > 0 || service.attachments.documents?.length > 0) && (
          <div className="service-attachments">
            <h3>{currentLanguage === 'vi' ? 'Tài liệu đính kèm' : 'Attachments'}</h3>
            
            {/* Images Gallery */}
            {service.attachments.images?.length > 0 && (
              <div className="attachment-section">
                <h4>{currentLanguage === 'vi' ? 'Hình ảnh' : 'Images'}</h4>
                <div className="images-gallery">
                  {service.attachments.images.map((image, index) => (
                    <div key={image.id} className="gallery-item">
                      <img
                        src={`${getApiBaseUrl()}${image.url}`}
                        alt={image.originalFileName}
                        className="gallery-image"
                        loading="lazy"
                        onClick={() => window.open(`${getApiBaseUrl()}${image.url}`, '_blank')}
                      />
                      <div className="image-info">
                        <span className="file-name">{image.originalFileName}</span>
                        <span className="file-size">{formatFileSize(image.fileSize)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Documents List */}
            {service.attachments.documents?.length > 0 && (
              <div className="attachment-section">
                <h4>{currentLanguage === 'vi' ? 'Tài liệu' : 'Documents'}</h4>
                <div className="documents-list">
                  {service.attachments.documents.map((doc, index) => (
                    <div key={doc.id} className="document-item">
                      <div className="doc-icon">
                        <i className={`fas ${doc.contentType.includes('pdf') ? 'fa-file-pdf' : 'fa-file'}`}></i>
                      </div>
                      <div className="doc-info">
                        <a
                          href={`${getApiBaseUrl()}${doc.url}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="doc-name"
                        >
                          {doc.originalFileName}
                        </a>
                        <div className="doc-meta">
                          <span className="doc-type">{getFileTypeDisplay(doc.contentType)}</span>
                          <span className="doc-size">{formatFileSize(doc.fileSize)}</span>
                        </div>
                      </div>
                      <a
                        href={`${getApiBaseUrl()}${doc.url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="download-btn"
                        aria-label={`Download ${doc.originalFileName}`}
                      >
                        <i className="fas fa-download"></i>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
        
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
