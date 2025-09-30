import React, { useMemo } from 'react';
import { getApiBaseUrl } from '../../../../config/apiConfig';

// Utility functions
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

// Image Gallery Component
const ImageGallery = React.memo(({ images, currentLanguage }) => {
  if (!images?.length) return null;

  return (
    <div className="attachment-section">
      <h4>{currentLanguage === 'vi' ? 'Hình ảnh' : 'Images'}</h4>
      <div className="images-gallery">
        {images.map((image, index) => (
          <div key={image.id} className="gallery-item">
            <img
              src={`${getApiBaseUrl()}${image.url}`}
              alt={image.originalFileName}
              className="gallery-image"
              loading="lazy"
              onClick={() => window.open(`${getApiBaseUrl()}${image.url}`, '_blank')}
            />
            <div className="image-caption">
              <span className="image-title">{image.originalFileName?.split('.')[0] || `Hình ${index + 1}`}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

// Documents List Component
const DocumentsList = React.memo(({ documents, currentLanguage }) => {
  if (!documents?.length) return null;

  return (
    <div className="attachment-section">
      <h4>{currentLanguage === 'vi' ? 'Tài liệu' : 'Documents'}</h4>
      <div className="documents-list">
        {documents.map((doc, index) => (
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
  );
});

// Main ServiceAttachments Component
const ServiceAttachments = ({ attachments, currentLanguage }) => {
  const { hasImages, hasDocuments } = useMemo(() => ({
    hasImages: attachments?.images?.length > 0,
    hasDocuments: attachments?.documents?.length > 0
  }), [attachments]);

  if (!hasImages && !hasDocuments) return null;

  return (
    <div className="service-attachments">
      <h3>{currentLanguage === 'vi' ? 'Tài liệu đính kèm' : 'Attachments'}</h3>

      <ImageGallery images={attachments.images} currentLanguage={currentLanguage} />
      <DocumentsList documents={attachments.documents} currentLanguage={currentLanguage} />
    </div>
  );
};

export default ServiceAttachments;