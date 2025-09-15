import React, { useRef, useState } from 'react';
import { getApiBaseUrl } from '../../config/apiConfig';

// Helper function để xử lý image URL theo environment
const getImageUrl = (relativePath) => {
  if (!relativePath) return '';
  
  // Nếu đã là absolute URL, giữ nguyên
  if (relativePath.startsWith('http')) {
    return relativePath;
  }
  
  // Nếu là relative path, thêm base URL
  const API_BASE_URL = getApiBaseUrl();
  return `${API_BASE_URL}${relativePath}`;
};

const defaultMockUpload = (file) => {
  return new Promise((resolve) => {
    // Tạo base64 URL thay vì blob URL
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result); // Trả về base64 URL
    };
    reader.readAsDataURL(file);
  });
};

const ImageUpload = ({ value, onChange, label = 'Ảnh', disabled = false, uploadApi, error }) => {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef();
  
  // Debug loggingconst handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      // Nếu không có file được chọn, giữ nguyên giá trị cũ
      return;
    }
    
    setUploading(true);
    
    const uploadFn = uploadApi || defaultMockUpload;
    try {
      let url;
      try {
        url = await uploadFn(file);
      } catch (err) {
        // Nếu upload thật lỗi, fallback sang mock
        url = await defaultMockUpload(file);
      }
      
      // Nếu url là object có location, lấy location
      const finalUrl = url && typeof url === 'object' && url.location ? url.location : url;
      
      onChange(finalUrl);
    } finally {
      setUploading(false);
    }
  };

  // Clear input value để có thể chọn lại file cùng tên
  const handleInputClick = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div className="image-upload-component">
      {label && <label>{label}</label>}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        onClick={handleInputClick}
        disabled={disabled || uploading}
        ref={inputRef}
        className={`form-control ${error ? 'is-invalid' : ''}`}
      />
      {uploading && <div style={{ color: '#888', fontSize: 13 }}>Đang upload...</div>}
      {value && (
        <div style={{ marginTop: 8 }}>
          {(() => {
            const imageUrl = typeof value === 'object' && value.location ? value.location : value;
            
            // Prevent invalid image URLs like "string"
            const isValidImageUrl = imageUrl && 
              typeof imageUrl === 'string' && 
              imageUrl.trim() !== '' && 
              imageUrl !== 'string' && 
              imageUrl !== 'undefined' && 
              imageUrl !== 'null' &&
              (imageUrl.startsWith('/') || imageUrl.startsWith('http') || imageUrl.startsWith('blob:'));
              
            if (!isValidImageUrl) {
              return (
                <span style={{ fontSize: '12px', color: '#999', display: 'block', marginTop: '4px' }}>
                  Ảnh không hợp lệ
                </span>
              );
            }

            const fullImageUrl = getImageUrl(imageUrl);return (
              <img 
                src={fullImageUrl} 
                alt="Preview" 
                style={{ width: 80, height: 60, objectFit: 'cover', borderRadius: 4, border: '1px solid #eee' }}
                onError={(e) => {// Simple approach: just hide the image on error
                  if (e.target) {
                    e.target.style.display = 'none';
                  }
                }}
                onLoad={() => {}}
              />
            );
          })()}
        </div>
      )}
    </div>
  );
};

export default ImageUpload; 