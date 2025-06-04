import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import "./GalleryDetail.css";

const GalleryDetail = () => {
  const { albumId } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Giả lập dữ liệu album, sau này sẽ lấy từ API
  const albumData = {
    "le-trao-chung-chi-iso": {
      title: "Lễ trao chứng chỉ ISO 9001:2015",
      description: "ATTECH vinh dự nhận chứng chỉ ISO 9001:2015 cho hệ thống quản lý chất lượng",
      date: "2023-09-10",
      location: "Trụ sở ATTECH",
      type: "image",
      images: [
        {
          url: "/images/gallery/iso/iso-ceremony1.jpg",
          thumbnail: "/images/gallery/iso/iso-ceremony1-thumb.jpg",
          title: "Lễ trao chứng chỉ ISO 9001:2015",
          description: "Đại diện ATTECH nhận chứng chỉ ISO",
        },
        {
          url: "/images/gallery/iso/iso-ceremony2.jpg",
          thumbnail: "/images/gallery/iso/iso-ceremony2-thumb.jpg",
          title: "Toàn cảnh buổi lễ",
          description: "Toàn cảnh buổi lễ trao chứng chỉ ISO",
        },
        // Thêm nhiều ảnh khác
      ]
    },
    "dao-tao-cns-atm": {
      title: "Đào tạo chuyên môn CNS/ATM 2023",
      description: "Khóa đào tạo nâng cao về hệ thống CNS/ATM cho đội ngũ kỹ thuật",
      date: "2023-10-05",
      location: "Trung tâm đào tạo ATTECH",
      type: "image",
      images: [
        {
          url: "/images/gallery/training/training1.jpg",
          thumbnail: "/images/gallery/training/training1-thumb.jpg",
          title: "Khai giảng khóa đào tạo",
          description: "Buổi khai giảng khóa đào tạo CNS/ATM",
        },
        // Thêm nhiều ảnh khác
      ]
    },
    // Thêm nhiều album khác
  };

  const album = albumData[albumId];

  const handlePrevious = useCallback((e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (!album || !selectedImage) return;
    const currentIndex = album.images.findIndex(
      (item) => item.url === selectedImage.url
    );
    const previousIndex =
      currentIndex === 0 ? album.images.length - 1 : currentIndex - 1;
    setSelectedImage(album.images[previousIndex]);
  }, [album, selectedImage]);

  const handleNext = useCallback((e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (!album || !selectedImage) return;
    const currentIndex = album.images.findIndex(
      (item) => item.url === selectedImage.url
    );
    const nextIndex =
      currentIndex === album.images.length - 1 ? 0 : currentIndex + 1;
    setSelectedImage(album.images[nextIndex]);
  }, [album, selectedImage]);

  // Xử lý cleanup khi component unmount
  useEffect(() => {
    return () => {
      setSelectedImage(null);
      setIsFullscreen(false);
    };
  }, []);

  // Tự động chọn ảnh đầu tiên khi component mount hoặc khi album thay đổi
  useEffect(() => {
    if (album?.images?.length > 0) {
      setSelectedImage(album.images[0]);
    }
  }, [album]);

  // Xử lý phím mũi tên và ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!album) return;
      
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
  }, [album, selectedImage, isFullscreen, handlePrevious, handleNext]);

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
    // Use state object to indicate this is a normal navigation
    navigate("/company/gallery", { 
      replace: true,
      state: { fromGalleryDetail: true } 
    });
  }, [navigate]);

  const handleFullscreenClick = useCallback((e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setIsFullscreen(true);
  }, []);

  // Handle component unmounting
  useEffect(() => {
    return () => {
      // Clean up any listeners or state
      document.body.style.overflow = 'auto';
    };
  }, []);

  if (!album) {
    return (
      <div className="gallery-detail">
        <div className="error-message">
          <h2>Album không tồn tại</h2>
          <Link 
            to="/company/gallery" 
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
          to="/company/gallery"
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
        <h1>{album.title}</h1>
        <div className="album-metadata">
          <time dateTime={album.date}>
            {new Date(album.date).toLocaleDateString("vi-VN")}
          </time>
          <span className="location">{album.location}</span>
        </div>
        <p className="album-description">{album.description}</p>
      </div>

      {/* Khung hiển thị ảnh lớn */}
      <div className="featured-image-container">
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
                src={selectedImage.url}
                alt={selectedImage.title}
                loading="eager"
              />
              <div className="featured-image-caption">
                <h2>{selectedImage.title}</h2>
                <p>{selectedImage.description}</p>
              </div>
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
      </div>

      {/* Danh sách ảnh thumbnail */}
      <div className="thumbnail-list">
        {album.images.map((image, index) => (
          <button
            key={index}
            className={`thumbnail-item ${selectedImage?.url === image.url ? 'active' : ''}`}
            onClick={() => setSelectedImage(image)}
            aria-label={`Xem ảnh: ${image.title}`}
          >
            <img
              src={image.thumbnail}
              alt={image.title}
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
              src={selectedImage.url}
              alt={selectedImage.title}
              loading="eager"
            />
            <div className="fullscreen-caption">
              <h2>{selectedImage.title}</h2>
              <p>{selectedImage.description}</p>
            </div>
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