import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import "./Gallery.css";

const Gallery = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;

  // Reset scroll position when coming back from gallery detail
  useEffect(() => {
    if (state?.fromGalleryDetail || state?.fromError) {
      window.scrollTo(0, 0);
    }
  }, [state]);

  const albums = [
    {
      id: "le-trao-chung-chi-iso",
      title: "Lễ trao chứng chỉ ISO 9001:2015",
      description: "ATTECH vinh dự nhận chứng chỉ ISO 9001:2015 cho hệ thống quản lý chất lượng",
      date: "2023-09-10",
      location: "Trụ sở ATTECH",
      coverImage: "/images/gallery/iso/iso-ceremony1-thumb.jpg",
      imageCount: 8,
    },
    {
      id: "dao-tao-cns-atm",
      title: "Đào tạo chuyên môn CNS/ATM 2023",
      description: "Khóa đào tạo nâng cao về hệ thống CNS/ATM cho đội ngũ kỹ thuật",
      date: "2023-10-05",
      location: "Trung tâm đào tạo ATTECH",
      coverImage: "/images/gallery/training/training1-thumb.jpg",
      imageCount: 12,
    },
    {
      id: "du-an-cns-atm",
      title: "Dự án lắp đặt hệ thống CNS/ATM",
      description: "Triển khai lắp đặt và vận hành hệ thống CNS/ATM tại các sân bay",
      date: "2023-12-15",
      location: "Sân bay quốc tế Nội Bài",
      coverImage: "/images/gallery/cns-project1-thumb.jpg",
      imageCount: 15,
    },
    // Thêm nhiều album khác
  ];

  const handleAlbumClick = (e, albumId) => {
    e.preventDefault();
    navigate(`/company/gallery/${albumId}`, {
      state: { fromGalleryList: true }
    });
  };

  // Structured data for SEO
  const generateStructuredData = () => {
    const collectionPage = {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Thư viện hình ảnh ATTECH",
      "description": "Bộ sưu tập hình ảnh về các hoạt động, dự án và sự kiện của Công ty TNHH Kỹ thuật Quản lý bay (ATTECH)",
      "hasPart": albums.map(album => ({
        "@type": "ImageGallery",
        "name": album.title,
        "description": album.description,
        "image": album.coverImage,
        "datePublished": album.date,
        "locationCreated": album.location,
      })),
    };
    return JSON.stringify(collectionPage);
  };

  return (
    <>
      <Helmet>
        <title>Thư Viện Ảnh - ATTECH</title>
        <meta name="description" content="Thư viện ảnh về các hoạt động và dự án của công ty ATTECH" />
        <title>Thư viện hình ảnh - ATTECH</title>
        <meta
          name="description"
          content="Khám phá bộ sưu tập hình ảnh về các hoạt động, dự án và sự kiện của Công ty TNHH Kỹ thuật Quản lý bay (ATTECH)"
        />
        <script type="application/ld+json">{generateStructuredData()}</script>
      </Helmet>

      <main className="gallery-container">
        <section className="gallery-header">
          <div className="section-title" data-aos="fade-up">
            <h1>Thư Viện Công Ty</h1>
          </div>
        </section>

        <section className="gallery-content">
          <div className="gallery-grid" data-aos="fade-up" role="grid">
            {albums.map((album, index) => (
              <div
                key={album.id}
                className="gallery-item"
                data-aos="fade-up"
                data-aos-delay={index * 100}
                onClick={(e) => handleAlbumClick(e, album.id)}
                role="link"
                tabIndex={0}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleAlbumClick(e, album.id);
                  }
                }}
              >
                <article className="gallery-item-inner">
                  <img
                    src={album.coverImage}
                    alt={album.title}
                    className="gallery-thumbnail"
                    loading="lazy"
                  />
                  <div className="gallery-item-overlay">
                    <h2 className="media-title">{album.title}</h2>
                    <p className="media-description">{album.description}</p>
                    <div className="media-metadata">
                      <time dateTime={album.date}>
                        {new Date(album.date).toLocaleDateString("vi-VN")}
                      </time>
                      <span className="image-count">{album.imageCount} ảnh</span>
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default Gallery; 