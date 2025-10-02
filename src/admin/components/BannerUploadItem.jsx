import React, { useState, useRef } from 'react';
import { getApiUrl } from '../../config/apiConfig';
import './BannerUploadItem.css';

const BannerUploadItem = ({ 
  title, 
  description, 
  bannerKey, 
  currentUrl, 
  uploadedAt,
  onUpload, 
  onDelete, 
  uploading 
}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(currentUrl);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  // Handle file selection
  const handleFileSelect = (file) => {
    if (file) {
      setSelectedFile(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle file input change
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    handleFileSelect(file);
  };

  // Handle drag and drop
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        handleFileSelect(file);
      } else {
        alert('Chỉ chấp nhận file hình ảnh!');
      }
    }
  };

  // Handle upload
  const handleUpload = () => {
    if (selectedFile) {
      onUpload(bannerKey, selectedFile);
      setSelectedFile(null);
    }
  };

  // Handle delete
  const handleDelete = () => {
    onDelete(bannerKey);
    setPreview(null);
    setSelectedFile(null);
  };

  // Reset selection
  const handleReset = () => {
    setSelectedFile(null);
    setPreview(currentUrl);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Get full image URL
  const getImageUrl = (url) => {
    if (!url) return null;
    // Handle data URLs (base64) - return as-is for preview
    if (url.startsWith('data:')) return url;
    // Handle absolute URLs
    if (url.startsWith('http')) return url;
    // Handle relative URLs from API
    return getApiUrl(url);
  };

  // Format upload date
  const formatUploadDate = (dateString) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return '';
    }
  };

  return (
    <div className="banner-upload-item">
      <div className="banner-item-header">
        <h3 className="banner-item-title">{title}</h3>
        {uploadedAt && (
          <p className="banner-upload-date">
            Cập nhật: {formatUploadDate(uploadedAt)}
          </p>
        )}
      </div>

      {/* Current Banner Display */}
      <div className="current-banner-section">
        {preview ? (
          <div className="current-banner">
            <img 
              src={selectedFile ? preview : getImageUrl(currentUrl)} 
              alt={title} 
              className="banner-preview-image"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <div className="banner-error-placeholder" style={{ display: 'none' }}>
              <i className="bi bi-exclamation-triangle"></i>
              <span>Không thể tải ảnh</span>
            </div>
            
            {selectedFile && (
              <div className="preview-overlay">
                <span className="preview-label">Preview</span>
              </div>
            )}
          </div>
        ) : (
          <div className="no-banner-placeholder">
            <i className="bi bi-image"></i>
            <span>Chưa có {title.toLowerCase()}</span>
          </div>
        )}
      </div>

      {/* Upload Section */}
      <div className="upload-section">
        {/* Drag & Drop Area */}
        <div 
          className={`upload-dropzone ${dragOver ? 'drag-over' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <i className="bi bi-cloud-upload"></i>
          <span>Kéo thả file vào đây hoặc click để chọn</span>
          <small>JPG, PNG, GIF • Tối đa 5MB</small>
        </div>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileInputChange}
          style={{ display: 'none' }}
        />

        {/* File Info */}
        {selectedFile && (
          <div className="selected-file-info">
            <div className="file-details">
              <i className="bi bi-file-earmark-image"></i>
              <span className="file-name">{selectedFile.name}</span>
              <span className="file-size">
                ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
              </span>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="upload-actions">
          {selectedFile ? (
            <>
              <button
                className="btn btn-primary upload-btn"
                onClick={handleUpload}
                disabled={uploading}
              >
                {uploading ? (
                  <>
                    <i className="bi bi-arrow-clockwise spin"></i>
                    Đang upload...
                  </>
                ) : (
                  <>
                    <i className="bi bi-upload"></i>
                    Upload {title}
                  </>
                )}
              </button>
              
              <button
                className="btn btn-secondary reset-btn"
                onClick={handleReset}
                disabled={uploading}
              >
                <i className="bi bi-x-circle"></i>
                Hủy
              </button>
            </>
          ) : currentUrl ? (
            <button
              className="btn btn-danger delete-btn"
              onClick={handleDelete}
              disabled={uploading}
            >
              <i className="bi bi-trash"></i>
              Xóa {title}
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default BannerUploadItem;