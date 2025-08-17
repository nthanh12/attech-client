import React, { useState, useEffect } from 'react';
import ImageWithAuth from '../../components/UI/ImageWithAuth';
import { getApiUrl } from '../../config/apiConfig';
import './AlbumGallery.css';

const AlbumGallery = ({ 
  albumId, 
  attachments = [], 
  onImageClick = null,
  showLightbox = true,
  gridColumns = 4,
  className = ""
}) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageList, setImageList] = useState([]);

  useEffect(() => {
    // Filter only images from attachments
    const images = attachments.filter(attachment => 
      attachment.contentType && attachment.contentType.startsWith('image/')
    );
    setImageList(images);
  }, [attachments]);

  const getAttachmentUrl = (attachmentId) => {
    return getApiUrl(`/api/attachments/${attachmentId}`);
  };

  const handleImageClick = (index) => {
    if (onImageClick) {
      onImageClick(imageList[index], index);
    } else if (showLightbox) {
      setCurrentImageIndex(index);
      setLightboxOpen(true);
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % imageList.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + imageList.length) % imageList.length);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setLightboxOpen(false);
    } else if (e.key === 'ArrowRight') {
      nextImage();
    } else if (e.key === 'ArrowLeft') {
      prevImage();
    }
  };

  useEffect(() => {
    if (lightboxOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [lightboxOpen]);

  if (!imageList.length) {
    return (
      <div className="album-gallery-empty">
        <div className="empty-state">
          <span className="empty-icon">📸</span>
          <p>Chưa có ảnh nào trong album này</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div 
        className={`album-gallery ${className}`}
        style={{
          '--grid-columns': gridColumns
        }}
      >
        {imageList.map((image, index) => (
          <div 
            key={image.id} 
            className="gallery-item"
            onClick={() => handleImageClick(index)}
          >
            <div className="image-container">
              <ImageWithAuth
                src={getAttachmentUrl(image.id)}
                alt={image.originalFileName || `Image ${index + 1}`}
                className="gallery-image"
              />
              <div className="image-overlay">
                <div className="image-actions">
                  <button className="action-btn view-btn" title="Xem ảnh">
                    👁️
                  </button>
                </div>
              </div>
            </div>
            <div className="image-info">
              <p className="image-name">
                {image.originalFileName || `Image ${index + 1}`}
              </p>
              <p className="image-size">
                {image.fileSize ? `${(image.fileSize / 1024).toFixed(1)} KB` : 'N/A'}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && imageList.length > 0 && (
        <div className="lightbox-overlay" onClick={() => setLightboxOpen(false)}>
          <div className="lightbox-container" onClick={(e) => e.stopPropagation()}>
            <button 
              className="lightbox-close"
              onClick={() => setLightboxOpen(false)}
              title="Đóng (Esc)"
            >
              ✕
            </button>
            
            {imageList.length > 1 && (
              <>
                <button 
                  className="lightbox-nav lightbox-prev"
                  onClick={prevImage}
                  title="Ảnh trước (←)"
                >
                  ‹
                </button>
                <button 
                  className="lightbox-nav lightbox-next"
                  onClick={nextImage}
                  title="Ảnh sau (→)"
                >
                  ›
                </button>
              </>
            )}

            <div className="lightbox-content">
              <ImageWithAuth
                src={getAttachmentUrl(imageList[currentImageIndex].id)}
                alt={imageList[currentImageIndex].originalFileName || `Image ${currentImageIndex + 1}`}
                className="lightbox-image"
              />
            </div>

            <div className="lightbox-info">
              <h4>{imageList[currentImageIndex].originalFileName || `Image ${currentImageIndex + 1}`}</h4>
              <p>
                {currentImageIndex + 1} / {imageList.length}
                {imageList[currentImageIndex].fileSize && (
                  <span> • {(imageList[currentImageIndex].fileSize / 1024).toFixed(1)} KB</span>
                )}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Wrapper component for albums with ID (fetch attachments automatically)
// ⭐ Sử dụng News entity vì Album = News với type đặc biệt
export const AlbumGalleryById = ({ albumId, ...props }) => {
  const [attachments, setAttachments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttachments = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('auth_token');
        // ⭐ Sử dụng News entity thay vì Album
        const response = await fetch(`/api/attachments/entity/News/${albumId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (response.ok) {
          const data = await response.json();
          setAttachments(data.data || []);
        } else {
          console.error('Failed to fetch attachments');
        }
      } catch (error) {
        console.error('Error fetching attachments:', error);
      } finally {
        setLoading(false);
      }
    };

    if (albumId) {
      fetchAttachments();
    }
  }, [albumId]);

  if (loading) {
    return (
      <div className="album-gallery-loading">
        <p>Đang tải ảnh...</p>
      </div>
    );
  }

  return <AlbumGallery attachments={attachments} {...props} />;
};

export default AlbumGallery;