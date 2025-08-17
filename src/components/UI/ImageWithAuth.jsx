import React, { useState, useEffect } from 'react';
import { getApiBaseUrl } from '../../config/apiConfig';

/**
 * Component hiển thị ảnh cần authentication
 * Sử dụng cho các attachment images từ backend
 */
const ImageWithAuth = ({ 
  src, 
  alt, 
  style, 
  className,
  title,
  fallbackSrc,
  ...otherProps 
}) => {
  const [imageSrc, setImageSrc] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadImage = async () => {
      if (!src) {
        setLoading(false);
        return;
      }

      // Nếu không phải attachment URL thì dùng trực tiếp
      if (!src.includes('/api/attachments/')) {
        setImageSrc(src);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(false);

        const token = localStorage.getItem('auth_token');
        if (!token) {
          throw new Error('No authentication token');
        }

        // Construct full URL for attachment requests
        const baseURL = getApiBaseUrl();
        const fullURL = src.startsWith('http') ? src : `${baseURL}${src}`;

        const response = await fetch(fullURL, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);

        if (isMounted) {
          setImageSrc(blobUrl);
          setLoading(false);
        }

        // Cleanup function để revoke blob URL
        return () => URL.revokeObjectURL(blobUrl);
      } catch (err) {
        console.error('Error loading image:', err);
        if (isMounted) {
          setError(true);
          setLoading(false);
          if (fallbackSrc) {
            setImageSrc(fallbackSrc);
          }
        }
      }
    };

    const cleanup = loadImage();
    
    return () => {
      isMounted = false;
      if (cleanup && typeof cleanup === 'function') {
        cleanup();
      }
    };
  }, [src, fallbackSrc]);

  if (loading) {
    return (
      <div 
        style={{
          ...style,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f5f5f5',
          minHeight: '40px'
        }}
        className={className}
      >
        <span>Loading...</span>
      </div>
    );
  }

  if (error && !fallbackSrc) {
    return (
      <div 
        style={{
          ...style,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f5f5f5',
          minHeight: '40px',
          color: '#999'
        }}
        className={className}
      >
        <span>❌ Image error</span>
      </div>
    );
  }

  return (
    <img
      src={imageSrc}
      alt={alt}
      style={style}
      className={className}
      title={title}
      {...otherProps}
    />
  );
};

export default ImageWithAuth;