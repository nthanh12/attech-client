import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { mockNews } from "../../../../utils/mockNews";
import { useLanguage } from '../../../../contexts/LanguageContext';
import "./GalleryDetail.css";

function extractImagesFromContent(content) {
  if (!content) return [];
  const imgRegex = /<img[^>]+src=["']([^"'>]+)["'][^>]*>/g;
  let match;
  const images = [];
  while ((match = imgRegex.exec(content)) !== null) {
    images.push(match[1]);
  }
  return images;
}

// Spinner đơn giản (có thể dùng lại Spinner của Header nếu muốn)
const GallerySpinner = () => (
  <div style={{
    position: 'fixed', left: 0, top: 0, width: '100vw', height: '100vh', zIndex: 2000,
    background: 'rgba(255,255,255,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center'
  }}>
    <div className="spinner-border text-primary" style={{ width: 60, height: 60 }} role="status">
      <span className="sr-only">Loading...</span>
    </div>
  </div>
);

const GalleryDetail = () => {
  const { albumId } = useParams();
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const [selectedImage, setSelectedImage] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Tìm bài viết mockNews theo id
  const news = mockNews.find(n => String(n.id) === String(albumId));
  // Lấy danh sách ảnh: chỉ các ảnh trong contentVi (không lấy cover)
  const images = news ? extractImagesFromContent(news.contentVi) : [];

  // Hiệu ứng loading khi albumId thay đổi
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, [albumId]);

  const handlePrevious = useCallback((e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (!images.length || !selectedImage) return;
    const currentIndex = images.findIndex((item) => item === selectedImage);
    const previousIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    setSelectedImage(images[previousIndex]);
  }, [images, selectedImage]);

  const handleNext = useCallback((e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (!images.length || !selectedImage) return;
    const currentIndex = images.findIndex((item) => item === selectedImage);
    const nextIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    setSelectedImage(images[nextIndex]);
  }, [images, selectedImage]);

  useEffect(() => {
    return () => {
      setSelectedImage(null);
      setIsFullscreen(false);
    };
  }, []);

  useEffect(() => {
    if (images.length > 0) {
      setSelectedImage(images[0]);
    }
  }, [albumId]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!images.length) return;
      if (e.key === "ArrowLeft") {
        handlePrevious();
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "Escape") {
        if (isFullscreen) {
          handleCloseFullscreen();
        } else {
          handleBackToGallery();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [images, selectedImage, isFullscreen, handlePrevious, handleNext]);

  const handleCloseFullscreen = useCallback((e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setIsFullscreen(false);
  }, []);

  const handleBackToGallery = useCallback((e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const prefix = lang === 'vi' ? '/thong-tin-cong-ty/thu-vien-cong-ty' : '/company/gallery';
    navigate(prefix, {
      state: { fromGalleryDetail: true }
    });
  }, [navigate, lang]);

  const handleFullscreenClick = useCallback((e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setIsFullscreen(true);
  }, []);

  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  if (loading) {
    return <GallerySpinner />;
  }

  if (!news) {
    return (
      <div className="gallery-detail">
        <div className="error-message">
          <h2>Album không tồn tại</h2>
          <Link
            to={lang === 'vi' ? '/thong-tin-cong-ty/thu-vien-cong-ty' : '/company/gallery'}
            className="back-link"
            state={{ fromError: true }}
          >
            Quay lại thư viện
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="gallery-detail">
      <div className="album-header">
        <Link
          to={lang === 'vi' ? '/thong-tin-cong-ty/thu-vien-cong-ty' : '/company/gallery'}
          className="back-button"
          aria-label="Quay lại thư viện"
          state={{ fromGalleryDetail: true }}
          onClick={(e) => {
            e.preventDefault();
            handleBackToGallery(e);
          }}
        >
          <ChevronLeft size={24} />
          <span>Quay lại thư viện</span>
        </Link>
        <p className="album-description">{news.titleVi}</p>
        <div className="album-metadata">
          <time dateTime={news.timePosted}>
            {new Date(news.timePosted).toLocaleDateString("vi-VN")}
          </time>
        </div>
      </div>

      {/* Khung hiển thị ảnh lớn */}
      {selectedImage && (
        <>
          <button
            className="nav-btn prev"
            onClick={handlePrevious}
            aria-label="Ảnh trước"
          >
            <ChevronLeft size={30} />
          </button>

          <div
            className="featured-image"
            onClick={handleFullscreenClick}
            role="button"
            tabIndex={0}
            aria-label="Xem ảnh phóng to"
          >
            <img
              src={selectedImage}
              alt={news.titleVi}
              loading="eager"
            />
          </div>

          <button
            className="nav-btn next"
            onClick={handleNext}
            aria-label="Ảnh tiếp theo"
          >
            <ChevronRight size={30} />
          </button>
        </>
      )}

      {/* Danh sách ảnh thumbnail */}
      <div className="thumbnail-list">
        {images.map((image, index) => (
          <button
            key={index}
            className={`thumbnail-item ${selectedImage === image ? 'active' : ''}`}
            onClick={() => setSelectedImage(image)}
            aria-label={`Xem ảnh: ${news.titleVi}`}
          >
            <img
              src={image}
              alt={news.titleVi}
              loading="lazy"
            />
          </button>
        ))}
      </div>

      {/* Fullscreen Image View */}
      {isFullscreen && selectedImage && (
        <div
          className="fullscreen-view"
          onClick={handleCloseFullscreen}
          role="dialog"
          aria-modal="true"
        >
          <button
            className="close-btn"
            onClick={handleCloseFullscreen}
            aria-label="Đóng"
          >
            <X size={24} />
          </button>
          <button
            className="nav-btn prev"
            onClick={handlePrevious}
            aria-label="Ảnh trước"
          >
            <ChevronLeft size={30} />
          </button>
          <div
            className="fullscreen-image-container"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage}
              alt={news.titleVi}
              loading="eager"
            />
          </div>
          <button
            className="nav-btn next"
            onClick={handleNext}
            aria-label="Ảnh tiếp theo"
          >
            <ChevronRight size={30} />
          </button>
        </div>
      )}
    </div>
  );
};

export default GalleryDetail; 