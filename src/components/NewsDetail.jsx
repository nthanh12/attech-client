import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getNewsBySlug } from '../services/newsService';
import { getApiUrl } from '../config/apiConfig';
import ImageWithAuth from './UI/ImageWithAuth';

const NewsDetail = () => {
  const { slug } = useParams();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNewsDetail = async () => {
      if (!slug) return;
      
      setLoading(true);
      setError(null);
      
      try {const response = await getNewsBySlug(slug);// Handle documentation format: {statusCode: 200, data: {...}}
        if (response && response.statusCode === 200 && response.data) {
          setNews(response.data);} else {
          throw new Error('Invalid response format from server');
        }
      } catch (err) {setError(err.message || 'Không thể tải thông tin tin tức');
      } finally {
        setLoading(false);
      }
    };

    fetchNewsDetail();
  }, [slug]);

  if (loading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <div>Đang tải...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', color: 'red' }}>
        <div>Lỗi: {error}</div>
      </div>
    );
  }

  if (!news) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <div>Không tìm thấy tin tức</div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <article style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <header style={{ marginBottom: '2rem', borderBottom: '1px solid #eee', paddingBottom: '1rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#333' }}>
          {news.titleVi}
        </h1>
        
        {news.titleEn && (
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#666', fontWeight: 'normal' }}>
            {news.titleEn}
          </h2>
        )}
        
        <div style={{ display: 'flex', gap: '2rem', fontSize: '0.9rem', color: '#777' }}>
          <time>📅 {formatDate(news.timePosted)}</time>
          {news.isOutstanding && (
            <span style={{ color: '#e74c3c', fontWeight: 'bold' }}>⭐ Nổi bật</span>
          )}
        </div>
        
        {news.imageUrl && (
          <img 
            src={news.imageUrl.startsWith('/') 
              ? getApiUrl(news.imageUrl)
              : news.imageUrl
            }
            alt={news.titleVi} 
            style={{ 
              width: '100%', 
              maxHeight: '400px', 
              objectFit: 'cover', 
              borderRadius: '8px',
              marginTop: '1rem'
            }}
            onError={(e) => {e.target.style.display = 'none';
            }}
          />
        )}
      </header>
      
      {news.descriptionVi && (
        <div style={{ 
          fontSize: '1.1rem', 
          lineHeight: '1.6', 
          marginBottom: '2rem',
          padding: '1rem',
          backgroundColor: '#f8f9fa',
          borderRadius: '4px',
          borderLeft: '4px solid #007bff'
        }}>
          {news.descriptionVi}
        </div>
      )}
      
      <div 
        style={{ 
          fontSize: '1rem', 
          lineHeight: '1.8', 
          marginBottom: '2rem'
        }}
        dangerouslySetInnerHTML={{ __html: news.contentVi }}
      />
      
      {/* English content (if available) */}
      {news.contentEn && (
        <div style={{ marginTop: '3rem', padding: '2rem', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <h3 style={{ marginBottom: '1rem', color: '#495057' }}>English Version</h3>
          {news.descriptionEn && (
            <div style={{ 
              fontSize: '1.1rem', 
              marginBottom: '1rem',
              fontStyle: 'italic',
              color: '#666'
            }}>
              {news.descriptionEn}
            </div>
          )}
          <div 
            style={{ fontSize: '1rem', lineHeight: '1.8' }}
            dangerouslySetInnerHTML={{ __html: news.contentEn }}
          />
        </div>
      )}
      
      {/* Attachments */}
      {news.attachments && news.attachments.length > 0 && (
        <aside style={{ 
          marginTop: '3rem', 
          padding: '1.5rem', 
          backgroundColor: '#e9ecef', 
          borderRadius: '8px' 
        }}>
          <h3 style={{ marginBottom: '1rem', color: '#495057' }}>📎 Tài liệu đính kèm</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {news.attachments.map(file => (
              <li key={file.id} style={{ marginBottom: '0.5rem' }}>
                <a 
                  href={file.filePath.startsWith('/') 
                    ? getApiUrl(file.filePath)
                    : file.filePath
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ 
                    color: '#007bff', 
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  📄 {file.originalFileName}
                  <span style={{ fontSize: '0.8rem', color: '#6c757d' }}>
                    ({(file.fileSizeInBytes / 1024).toFixed(1)}KB)
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </aside>
      )}

      {/* Debug information (only in development) */}
      {process.env.NODE_ENV === 'development' && (
        <details style={{ 
          marginTop: '3rem', 
          padding: '1rem', 
          backgroundColor: '#fff3cd', 
          border: '1px solid #ffeaa7',
          borderRadius: '4px'
        }}>
          <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
            🐛 Debug Information (Development Only)
          </summary>
          <pre style={{ 
            fontSize: '0.8rem', 
            marginTop: '1rem', 
            overflow: 'auto',
            backgroundColor: '#f8f9fa',
            padding: '1rem',
            borderRadius: '4px'
          }}>
            {JSON.stringify(news, null, 2)}
          </pre>
        </details>
      )}
    </article>
  );
};

export default NewsDetail;