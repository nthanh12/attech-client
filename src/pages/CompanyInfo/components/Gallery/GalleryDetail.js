import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, XIcon } from "lucide-react";
import clientAlbumService from "../../../../services/clientAlbumService";
import { useI18n } from "../../../../hooks/useI18n";
import LocalizedLink from "../../../../components/Shared/LocalizedLink";
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
  <div
    style={{
      position: "fixed",
      left: 0,
      top: 0,
      width: "100vw",
      height: "100vh",
      zIndex: 2000,
      background: "rgba(255,255,255,0.85)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <div
      className="spinner-border text-primary"
      style={{ width: 60, height: 60 }}
      role="status"
    >
      <span className="sr-only">Loading...</span>
    </div>
  </div>
);

const GalleryDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { currentLanguage } = useI18n();
  const [selectedImage, setSelectedImage] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState(null);
  const [images, setImages] = useState([]);

  // Load news data and extract images
  useEffect(() => {
    const loadNewsData = async () => {
      if (!slug) return;

      try {
        setLoading(true);
        console.log("🔍 Loading album with slug:", slug);

        // Get album gallery images (all images including featured)
        const galleryResponse = await clientAlbumService.getAlbumGallery(slug);
        console.log("📸 Gallery response:", galleryResponse);

        if (galleryResponse.success) {
          // Get album detail for title and info
          const albumResponse = await clientAlbumService.getAlbumBySlug(slug);
          console.log("📋 Album detail response:", albumResponse);

          if (albumResponse.success) {
            const formattedAlbum = clientAlbumService.formatAlbumForDisplay(
              albumResponse.data,
              currentLanguage
            );
            console.log("✨ Formatted album:", formattedAlbum);
            setNews(formattedAlbum);

            // If gallery endpoint returns empty, try to use attachments from album detail
            let galleryImages = galleryResponse.data || [];
            if (galleryImages.length === 0 && albumResponse.data.attachments) {
              console.log(
                "🔄 Gallery empty, trying attachments from album detail..."
              );
              const albumAttachments = albumResponse.data.attachments;
              if (
                albumAttachments.images &&
                Array.isArray(albumAttachments.images)
              ) {
                galleryImages = albumAttachments.images;
                console.log("📎 Using album attachments:", galleryImages);
              }
            }

            // Set gallery images URLs
            const attachmentImageUrls = galleryImages.map((img) =>
              clientAlbumService.getImageUrl(
                img.url || img.imageUrl || `/api/attachments/${img.id}`
              )
            );
            
            // Thêm ảnh đại diện vào đầu danh sách nếu có
            const featuredImageUrl = albumResponse.data.imageUrl 
              ? clientAlbumService.getImageUrl(albumResponse.data.imageUrl)
              : null;
            
            const allImageUrls = featuredImageUrl 
              ? [featuredImageUrl, ...attachmentImageUrls.filter(url => url !== featuredImageUrl)] // Tránh duplicate
              : attachmentImageUrls;
              
            console.log("🖼️ Featured image:", featuredImageUrl);
            console.log("🖼️ Attachment images:", attachmentImageUrls);
            console.log("🖼️ Final combined images:", allImageUrls);
            setImages(allImageUrls);
          }
        } else {
          console.warn("❌ Gallery response failed:", galleryResponse.message);
          setNews(null);
          setImages([]);
        }
      } catch (error) {
        console.error("❌ Error loading gallery detail:", error);
        setNews(null);
        setImages([]);
      } finally {
        setLoading(false);
      }
    };

    loadNewsData();
  }, [slug, currentLanguage]);

  const handlePrevious = useCallback(
    (e) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      if (!images.length || !selectedImage) return;
      const currentIndex = images.findIndex((item) => item === selectedImage);
      const previousIndex =
        currentIndex === 0 ? images.length - 1 : currentIndex - 1;
      setSelectedImage(images[previousIndex]);
    },
    [images, selectedImage]
  );

  const handleNext = useCallback(
    (e) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      if (!images.length || !selectedImage) return;
      const currentIndex = images.findIndex((item) => item === selectedImage);
      const nextIndex =
        currentIndex === images.length - 1 ? 0 : currentIndex + 1;
      setSelectedImage(images[nextIndex]);
    },
    [images, selectedImage]
  );

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
  }, [images]);

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

  const handleBackToGallery = useCallback(
    (e) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      const prefix =
        currentLanguage === "vi"
          ? "/thong-tin-cong-ty/thu-vien-cong-ty"
          : "/en/company/gallery";
      navigate(prefix, {
        state: { fromGalleryDetail: true },
      });
    },
    [navigate, currentLanguage]
  );

  const handleFullscreenClick = useCallback((e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setIsFullscreen(true);
  }, []);

  useEffect(() => {
    return () => {
      document.body.style.overflow = "auto";
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
          <LocalizedLink
            to={
              currentLanguage === "vi"
                ? "/thong-tin-cong-ty/thu-vien-cong-ty"
                : "/en/company/gallery"
            }
            className="back-link"
            state={{ fromError: true }}
          >
            Quay lại thư viện
          </LocalizedLink>
        </div>
      </div>
    );
  }

  return (
    <div className="gallery-detail">
      <div className="album-header">
        <LocalizedLink
          to={
            currentLanguage === "vi"
              ? "/thong-tin-cong-ty/thu-vien-cong-ty"
              : "/en/company/gallery"
          }
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
        </LocalizedLink>
        <h1>{news.title || 'Album Gallery'}</h1>
      </div>


      {/* Khung hiển thị ảnh lớn */}
      {selectedImage && (
        <div
          className="featured-image"
          onClick={handleFullscreenClick}
          role="button"
          tabIndex={0}
          aria-label="Xem ảnh phóng to"
        >
          <button
            className="nav-btn prev"
            onClick={handlePrevious}
            aria-label="Ảnh trước"
          >
            <ChevronLeft size={20} />
          </button>
          
          <img src={selectedImage} alt={news.titleVi} loading="eager" />
          
          <button
            className="nav-btn next"
            onClick={handleNext}
            aria-label="Ảnh tiếp theo"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}

      {/* Danh sách ảnh thumbnail */}
      <div className="thumbnail-list">
        {images.map((image, index) => (
          <button
            key={index}
            className={`thumbnail-item ${
              selectedImage === image ? "active" : ""
            }`}
            onClick={() => setSelectedImage(image)}
            aria-label={`Xem ảnh: ${news.titleVi}`}
          >
            <img src={image} alt={news.titleVi} loading="lazy" />
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
            <XIcon size={24} />
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
            <img src={selectedImage} alt={news.titleVi} loading="eager" />
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
