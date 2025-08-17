import React, { useState, useEffect } from 'react';
import { getFileUrlFromPath, getNewsFileUrl, getMediaFileUrl, getDocumentFileUrl } from '../../services/fileServingService';
import './FileDisplay.css';

const FileDisplay = ({ 
  filePath, 
  fileName, 
  fileType = 'auto', 
  entityType = 'news',
  uploadDate = new Date(),
  showDownload = true,
  showPreview = true,
  className = '',
  style = {}
}) => {
  const [fileUrl, setFileUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const generateFileUrl = () => {
      try {
        setIsLoading(true);
        setError(null);

        // 🎯 Sử dụng endpoint C để lấy file URL
        let url = '';
        
        if (filePath) {
          // Nếu có filePath, sử dụng endpoint C với cấu trúc ngày tháng
          if (entityType === 'news') {
            url = getNewsFileUrl(fileName || filePath.split('/').pop(), uploadDate);
          } else if (entityType === 'media') {
            url = getMediaFileUrl(fileName || filePath.split('/').pop(), uploadDate);
          } else if (entityType === 'documents') {
            url = getDocumentFileUrl(fileName || filePath.split('/').pop(), uploadDate);
          } else {
            // Fallback: sử dụng path trực tiếp
            url = getFileUrlFromPath(filePath);
          }
        } else if (fileName) {
          // Nếu chỉ có fileName, tạo URL theo entityType
          if (entityType === 'news') {
            url = getNewsFileUrl(fileName, uploadDate);
          } else if (entityType === 'media') {
            url = getMediaFileUrl(fileName, uploadDate);
          } else if (entityType === 'documents') {
            url = getDocumentFileUrl(fileName, uploadDate);
          }
        }

        setFileUrl(url);
      } catch (err) {
        console.error('❌ Error generating file URL:', err);
        setError('Không thể tạo URL file');
      } finally {
        setIsLoading(false);
      }
    };

    generateFileUrl();
  }, [filePath, fileName, entityType, uploadDate]);

  // Xác định loại file để hiển thị
  const getFileType = () => {
    if (fileType !== 'auto') return fileType;
    
    const name = fileName || filePath || '';
    const extension = name.split('.').pop()?.toLowerCase();
    
    if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(extension)) {
      return 'image';
    } else if (['mp4', 'webm', 'avi', 'mov'].includes(extension)) {
      return 'video';
    } else if (['mp3', 'wav', 'ogg'].includes(extension)) {
      return 'audio';
    } else if (['pdf'].includes(extension)) {
      return 'pdf';
    } else if (['doc', 'docx'].includes(extension)) {
      return 'word';
    } else if (['xls', 'xlsx'].includes(extension)) {
      return 'excel';
    } else if (['ppt', 'pptx'].includes(extension)) {
      return 'powerpoint';
    } else {
      return 'document';
    }
  };

  const currentFileType = getFileType();

  // Render preview theo loại file
  const renderPreview = () => {
    if (!showPreview || !fileUrl) return null;

    switch (currentFileType) {
      case 'image':
        return (
          <div className="file-preview image-preview">
            <img 
              src={fileUrl} 
              alt={fileName || 'File preview'} 
              onError={() => setError('Không thể tải ảnh')}
            />
          </div>
        );
      
      case 'video':
        return (
          <div className="file-preview video-preview">
            <video controls>
              <source src={fileUrl} type="video/mp4" />
              <source src={fileUrl} type="video/webm" />
              Trình duyệt không hỗ trợ video.
            </video>
          </div>
        );
      
      case 'audio':
        return (
          <div className="file-preview audio-preview">
            <audio controls>
              <source src={fileUrl} type="audio/mpeg" />
              <source src={fileUrl} type="audio/wav" />
              Trình duyệt không hỗ trợ audio.
            </audio>
          </div>
        );
      
      case 'pdf':
        return (
          <div className="file-preview pdf-preview">
            <iframe 
              src={fileUrl} 
              title={fileName || 'PDF preview'}
              width="100%" 
              height="400px"
            />
          </div>
        );
      
      default:
        return (
          <div className="file-preview document-preview">
            <div className="document-icon">
              <i className="bi bi-file-earmark-text"></i>
            </div>
            <div className="document-info">
              <strong>{fileName || 'Document'}</strong>
              <small>Click để tải xuống</small>
            </div>
          </div>
        );
    }
  };

  if (isLoading) {
    return (
      <div className={`file-display loading ${className}`} style={style}>
        <div className="loading-spinner">
          <i className="bi bi-arrow-clockwise spin"></i>
          Đang tải file...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`file-display error ${className}`} style={style}>
        <div className="error-message">
          <i className="bi bi-exclamation-triangle"></i>
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className={`file-display ${currentFileType} ${className}`} style={style}>
      {renderPreview()}
      
      {showDownload && fileUrl && (
        <div className="file-actions">
          <a 
            href={fileUrl} 
            download={fileName}
            className="btn btn-primary btn-sm"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="bi bi-download"></i>
            Tải xuống
          </a>
          
          <a 
            href={fileUrl} 
            className="btn btn-outline-secondary btn-sm"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="bi bi-box-arrow-up-right"></i>
            Mở mới
          </a>
        </div>
      )}
      
      <div className="file-info">
        <small className="text-muted">
          Endpoint: {entityType === 'news' ? 'News' : entityType === 'media' ? 'Media' : 'Documents'} 
          | Loại: {currentFileType}
        </small>
      </div>
    </div>
  );
};

export default FileDisplay;