import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { mockNews } from "../../../../utils/mockNews";
import "./Gallery.css";
import { useLanguage } from '../../../../contexts/LanguageContext';

const albums = mockNews.filter(n => n.status === 1).map(news => ({
  id: news.id,
  title: news.titleVi,
  description: news.descriptionVi,
  date: news.timePosted,
  coverImage: news.image,
}));

const Gallery = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  const { lang } = useLanguage();

  useEffect(() => {
    if (state?.fromGalleryDetail || state?.fromError) {
      window.scrollTo(0, 0);
    }
  }, [state]);

  const handleAlbumClick = (e, albumId) => {
    e.preventDefault();
    const prefix = lang === 'vi' ? '/thong-tin-cong-ty/thu-vien-cong-ty' : '/company/gallery';
    navigate(`${prefix}/${albumId}`, {
      state: { fromGalleryList: true }
    });
  };

  const generateStructuredData = () => {
    const collectionPage = {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Thư viện hình ảnh ATTECH",
      "description": "Bộ sưu tập hình ảnh từ các bài viết của Công ty TNHH Kỹ thuật Quản lý bay (ATTECH)",
      "hasPart": albums.map(album => ({
        "@type": "ImageGallery",
        "name": album.title,
        "description": album.description,
        "image": album.coverImage,
        "datePublished": album.date,
      })),
    };
    return JSON.stringify(collectionPage);
  };

  return (
    <>
      <Helmet>
        <title>Thư Viện Ảnh - ATTECH</title>
        <meta name="description" content="Thư viện ảnh từ các bài viết của công ty ATTECH" />
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
                    <div className="media-metadata">
                      <time dateTime={album.date}>
                        {new Date(album.date).toLocaleDateString("vi-VN")}
                      </time>
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