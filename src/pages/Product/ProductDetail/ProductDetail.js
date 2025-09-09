import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../ProductDetail/ProductDetail.css";
import * as clientProductService from "../../../services/clientProductService";
import { useI18n } from "../../../hooks/useI18n";
import ErrorPage from "../../../components/Shared/ErrorPage";
import LocalizedLink from "../../../components/Shared/LocalizedLink";
import sanitizeHtml from "sanitize-html";
import { getApiBaseUrl } from "../../../config/apiConfig";

const ProductDetail = () => {
  const { slug: productSlug } = useParams();
  const { t, currentLanguage } = useI18n();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const productData = await clientProductService.getProductBySlug(productSlug);
        
        if (productData) {
          const formattedProduct = clientProductService.formatProductForDisplay(productData, currentLanguage);
          setProduct({ ...productData, ...formattedProduct });
        } else {
          setError("Product not found");
        }
      } catch (err) {
        console.error("Error loading product:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (productSlug) {
      loadProduct();
    }
  }, [productSlug, currentLanguage]);

  if (loading) {
    return (
      <div className="text-center p-5">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <ErrorPage
        title="Sản phẩm không tồn tại"
        message="Xin lỗi, sản phẩm bạn đang tìm kiếm không tồn tại hoặc đã bị xóa."
        suggestions={[
          "Kiểm tra lại đường link",
          "Tìm kiếm sản phẩm khác",
          "Quay lại trang danh sách sản phẩm"
        ]}
        type="product"
        backRoute="HOME"
        backText="Về trang chủ"
        listRoute="PRODUCTS"
        listText="Xem tất cả sản phẩm"
      />
    );
  }

  const getContent = () => {
    return product.displayContent || (currentLanguage === "vi" ? product.contentVi : product.contentEn);
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
    <div className="product-content-wrap">
      {/* Breadcrumb */}
      <nav className="product-breadcrumb">
        <LocalizedLink routeKey="PRODUCTS">
          {t("navigation.products")}
        </LocalizedLink>
        <span className="breadcrumb-sep">/</span>
        <span>{product.displayTitle}</span>
      </nav>

      {/* Card chính */}
      <div className="product-detail-card">
        {/* Ảnh đại diện */}
        {product.imageUrl && (
          <div className="product-detail-imgbox">
            <img 
              src={product.imageUrl.startsWith('http') ? product.imageUrl : `${getApiBaseUrl()}${product.imageUrl}`} 
              alt={product.displayTitle} 
              className="product-detail-img" 
            />
          </div>
        )}
        
        {/* Tiêu đề & mô tả */}
        <h1 className="product-detail-title">{product.displayTitle}</h1>
        <p className="product-detail-desc">{product.displayDescription}</p>
        
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
        {product.attachments && (product.attachments.images?.length > 0 || product.attachments.documents?.length > 0) && (
          <div className="product-attachments">
            <h3>{currentLanguage === 'vi' ? 'Tài liệu đính kèm' : 'Attachments'}</h3>
            
            {/* Images Gallery */}
            {product.attachments.images?.length > 0 && (
              <div className="attachment-section">
                <h4>{currentLanguage === 'vi' ? 'Hình ảnh' : 'Images'}</h4>
                <div className="images-gallery">
                  {product.attachments.images.map((image, index) => (
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
            {product.attachments.documents?.length > 0 && (
              <div className="attachment-section">
                <h4>{currentLanguage === 'vi' ? 'Tài liệu' : 'Documents'}</h4>
                <div className="documents-list">
                  {product.attachments.documents.map((doc, index) => (
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
        <div className="product-detail-backwrap">
          <LocalizedLink routeKey="PRODUCTS" className="product-detail-backbtn">
            <i className="fas fa-arrow-left"></i>{" "}
            {currentLanguage === "vi"
              ? "Quay lại danh sách sản phẩm"
              : "Back to products"}
          </LocalizedLink>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
