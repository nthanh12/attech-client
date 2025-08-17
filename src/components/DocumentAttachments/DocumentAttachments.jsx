import React, { useState, useEffect } from 'react';
import { getDocumentsByEntity, downloadDocument } from '../../services/newDocumentService';
import './DocumentAttachments.css';

const DocumentAttachments = ({ entityType, entityId, title = "File đính kèm" }) => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState({});

  useEffect(() => {
    if (entityType && entityId) {
      fetchDocumentsByEntity();
    }
  }, [entityType, entityId]);

  const fetchDocumentsByEntity = async () => {
    console.log(`📄 DocumentAttachments: Fetching documents for entity ${entityType}/${entityId}`);
    setLoading(true);
    try {
      const response = await getDocumentsByEntity(entityType, entityId);
      const documentsData = Array.isArray(response?.data) ? response.data : (Array.isArray(response) ? response : []);
      
      console.log(`📎 DocumentAttachments: Found ${documentsData.length} documents`);
      setDocuments(documentsData);
    } catch (error) {
      console.error('❌ DocumentAttachments: Failed to fetch documents:', error);
      setDocuments([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (document) => {
    console.log(`⬇️ Downloading document: ${document.fileName}`);
    setDownloading(prev => ({ ...prev, [document.id]: true }));
    
    try {
      await downloadDocument(document.id);
      console.log('✅ Download completed:', document.fileName);
    } catch (error) {
      console.error('❌ Download failed:', error);
      alert('Không thể tải file. Vui lòng thử lại.');
    } finally {
      setDownloading(prev => ({ ...prev, [document.id]: false }));
    }
  };

  const getFileIcon = (fileName) => {
    const ext = fileName?.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'pdf': return 'bi bi-file-earmark-pdf text-danger';
      case 'doc':
      case 'docx': return 'bi bi-file-earmark-word text-primary';
      case 'xls':
      case 'xlsx': return 'bi bi-file-earmark-excel text-success';
      case 'ppt':
      case 'pptx': return 'bi bi-file-earmark-ppt text-warning';
      case 'txt': return 'bi bi-file-earmark-text text-secondary';
      case 'zip':
      case 'rar':
      case '7z': return 'bi bi-file-earmark-zip text-info';
      default: return 'bi bi-file-earmark text-secondary';
    }
  };

  const getFileTypeLabel = (fileName) => {
    const ext = fileName?.split('.').pop()?.toUpperCase();
    return ext || 'FILE';
  };

  const formatFileSize = (bytes) => {
    if (!bytes || bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      return new Date(dateString).toLocaleDateString('vi-VN');
    } catch {
      return '';
    }
  };

  if (loading) {
    return (
      <div className="document-attachments loading">
        <h3 className="attachments-title">{title}</h3>
        <div className="attachments-list">
          {[1, 2, 3].map(i => (
            <div key={i} className="attachment-item skeleton">
              <div className="skeleton-icon"></div>
              <div className="skeleton-content">
                <div className="skeleton-title"></div>
                <div className="skeleton-meta"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (documents.length === 0) {
    return null; // Don't show empty attachments
  }

  return (
    <div className="document-attachments">
      <h3 className="attachments-title">
        <i className="bi bi-file-earmark-text"></i> {title} ({documents.length})
      </h3>
      
      <div className="attachments-list">
        {documents.map((doc) => (
          <div key={doc.id} className="attachment-item">
            <div className="file-icon">
              <i className={getFileIcon(doc.fileName)}></i>
            </div>
            
            <div className="file-info">
              <div className="file-main">
                <h4 className="file-title">
                  {doc.title || doc.fileName}
                </h4>
                <div className="file-meta">
                  <span className="file-type-badge">
                    {getFileTypeLabel(doc.fileName)}
                  </span>
                  {doc.fileSizeInBytes && (
                    <span className="file-size">
                      {formatFileSize(doc.fileSizeInBytes)}
                    </span>
                  )}
                  {doc.createdDate && (
                    <span className="file-date">
                      {formatDate(doc.createdDate)}
                    </span>
                  )}
                  {doc.downloadCount && (
                    <span className="download-count">
                      <i className="bi bi-download"></i> {doc.downloadCount}
                    </span>
                  )}
                </div>
              </div>
              
              {doc.description && (
                <p className="file-description">
                  {doc.description}
                </p>
              )}
              
              {doc.author && (
                <p className="file-author">
                  <i className="bi bi-person"></i> {doc.author}
                </p>
              )}
            </div>
            
            <div className="file-actions">
              <button
                className="download-btn"
                onClick={() => handleDownload(doc)}
                disabled={downloading[doc.id]}
                title="Tải xuống"
              >
                {downloading[doc.id] ? (
                  <>
                    <span className="spinner"></span>
                    Đang tải...
                  </>
                ) : (
                  <>
                    <i className="bi bi-download"></i>
                    Tải xuống
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentAttachments;