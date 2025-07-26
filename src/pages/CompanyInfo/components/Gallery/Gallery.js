import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { mockNews } from "../../../../utils/mockNews";
import "./Gallery.css";
import { useI18n } from '../../../../hooks/useI18n';
import SEO from "../../../../components/SEO/SEO";

// Move this inside component to access currentLanguage
const getAlbums = (currentLanguage) => mockNews.filter(n => n.status === 1).map(news => ({
  id: news.id,
  title: currentLanguage === 'vi' ? news.titleVi : news.titleEn,
  description: currentLanguage === 'vi' ? news.descriptionVi : news.descriptionEn,
  date: news.timePosted,
  coverImage: news.image,
}));

const Gallery = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  const { currentLanguage } = useI18n();
  const albums = getAlbums(currentLanguage);

  useEffect(() => {
    if (state?.fromGalleryDetail || state?.fromError) {
      window.scrollTo(0, 0);
    }
  }, [state]);

  const handleAlbumClick = (e, albumId) => {
    e.preventDefault();
    const prefix = currentLanguage === 'vi' ? '/thong-tin-cong-ty/thu-vien-cong-ty' : '/en/company/gallery';
    navigate(`${prefix}/${albumId}`, {
      state: { fromGalleryList: true }
    });
  };

  const generateStructuredData = () => {
    const collectionPage = {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": t('frontend.companyInfo.gallery.seoTitle'),
      "description": t('frontend.companyInfo.gallery.seoDescription'),
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
      <SEO 
        title={t('frontend.companyInfo.gallery.pageTitle')}
        description={t('frontend.companyInfo.gallery.pageDescription')}
        url="/thong-tin-cong-ty/thu-vien-cong-ty"
      />

      <main className="gallery-container">
        <section className="gallery-header">
          <div className="section-title" data-aos="fade-up">
            <h1>{t('frontend.companyInfo.gallery.title')}</h1>
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