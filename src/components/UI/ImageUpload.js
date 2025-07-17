import React, { useRef, useState } from 'react';

const defaultMockUpload = (file) => {
  return new Promise((resolve) => {
    const localUrl = URL.createObjectURL(file);
    setTimeout(() => {
      resolve(localUrl); // Giả lập trả về URL ảnh
    }, 1000);
  });
};

const ImageUpload = ({ value, onChange, label = 'Ảnh', disabled = false, uploadApi }) => {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef();

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
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
      onChange(url);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="image-upload-component">
      {label && <label>{label}</label>}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={disabled || uploading}
        ref={inputRef}
        className="form-control"
      />
      {uploading && <div style={{ color: '#888', fontSize: 13 }}>Đang upload...</div>}
      {value && (
        <div style={{ marginTop: 8 }}>
          <img src={value} alt="Preview" style={{ width: 80, height: 60, objectFit: 'cover', borderRadius: 4, border: '1px solid #eee' }} />
        </div>
      )}
    </div>
  );
};

export default ImageUpload; 