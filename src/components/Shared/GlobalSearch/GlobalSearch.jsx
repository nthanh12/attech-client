import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '../../../hooks/useI18n';
import { searchGlobal, formatSearchResults } from '../../../services/globalSearchService';
import './GlobalSearch.css';

const GlobalSearch = ({ isOpen, onClose }) => {
  const { t, currentLanguage } = useI18n();
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [searchTime, setSearchTime] = useState(null);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);
  const searchTimeoutRef = useRef(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Close search on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  // Debounced search function
  const performSearch = useCallback(async (searchKeyword) => {
    if (!searchKeyword || searchKeyword.trim().length < 2) {
      setResults([]);
      setTotalResults(0);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await searchGlobal(searchKeyword, 5);
      
      if (response.success) {
        const formattedResults = formatSearchResults(response.results, currentLanguage);
        setResults(formattedResults);
        setTotalResults(response.totalResults);
        setSearchTime(response.searchTime);
      } else {
        setError(response.error || 'Có lỗi xảy ra khi tìm kiếm');
        setResults([]);
        setTotalResults(0);
      }
    } catch (err) {
      setError('Không thể kết nối đến server');
      setResults([]);
      setTotalResults(0);
    } finally {
      setLoading(false);
    }
  }, [currentLanguage]);

  // Handle input change with debounce
  const handleInputChange = (e) => {
    const value = e.target.value;
    setKeyword(value);

    // Clear previous timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // Set new timeout for search
    searchTimeoutRef.current = setTimeout(() => {
      performSearch(value);
    }, 300); // 300ms debounce
  };

  // Handle result click
  const handleResultClick = () => {
    onClose();
    setKeyword('');
    setResults([]);
    setTotalResults(0);
  };

  // Handle overlay click
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="global-search-overlay" onClick={handleOverlayClick}>
      <div className="global-search-container">
        <div className="search-header">
          <div className="search-input-container">
            <i className="fa fa-search search-icon"></i>
            <input
              ref={inputRef}
              type="text"
              className="global-search-input"
              placeholder={currentLanguage === 'vi' ? 'Tìm kiếm tin tức, thông báo, sản phẩm, dịch vụ...' : 'Search news, notifications, products, services...'}
              value={keyword}
              onChange={handleInputChange}
              autoComplete="off"
            />
            <button className="search-close-button" onClick={onClose}>
              <i className="fa fa-times"></i>
            </button>
          </div>
        </div>

        <div className="search-content">
          {loading && (
            <div className="search-loading">
              <i className="fa fa-spinner fa-spin"></i>
              <span>{currentLanguage === 'vi' ? 'Đang tìm kiếm...' : 'Searching...'}</span>
            </div>
          )}

          {error && (
            <div className="search-error">
              <i className="fa fa-exclamation-circle"></i>
              <span>{error}</span>
            </div>
          )}

          {!loading && !error && keyword.length >= 2 && totalResults === 0 && (
            <div className="search-no-results">
              <i className="fa fa-search"></i>
              <h3>{currentLanguage === 'vi' ? 'Không tìm thấy kết quả' : 'No results found'}</h3>
              <p>{currentLanguage === 'vi' 
                ? `Không tìm thấy kết quả nào cho "${keyword}"` 
                : `No results found for "${keyword}"`
              }</p>
              <small>
                {currentLanguage === 'vi' 
                  ? 'Thử sử dụng từ khóa khác hoặc kiểm tra chính tả' 
                  : 'Try different keywords or check spelling'
                }
              </small>
            </div>
          )}

          {!loading && !error && totalResults > 0 && (
            <div className="search-results">
              <div className="search-stats">
                <span>
                  {currentLanguage === 'vi' 
                    ? `Tìm thấy ${totalResults} kết quả cho "${keyword}"` 
                    : `Found ${totalResults} results for "${keyword}"`
                  }
                </span>
              </div>

              {results.map((category, categoryIndex) => (
                <div key={categoryIndex} className="search-category">
                  <h4 className="category-title">
                    {category.categoryName} ({category.count})
                  </h4>
                  
                  <div className="category-items">
                    {category.items.map((item, itemIndex) => (
                      <Link
                        key={itemIndex}
                        to={item.url}
                        className="search-result-item"
                        onClick={handleResultClick}
                      >
                        {item.imageUrl && (
                          <div className="item-image">
                            <img 
                              src={item.imageUrl} 
                              alt={item.title}
                              onError={(e) => {
                                e.target.style.display = 'none';
                              }}
                            />
                          </div>
                        )}
                        
                        <div className="item-content">
                          <h5 className="item-title">{item.title}</h5>
                          {item.description && (
                            <p className="item-description">{item.description}</p>
                          )}
                          <div className="item-meta">
                            <span className={`item-type type-${item.type}`}>
                              {item.type === 'news' && (currentLanguage === 'vi' ? 'Tin tức' : 'News')}
                              {item.type === 'notification' && (currentLanguage === 'vi' ? 'Thông báo' : 'Notification')}
                              {item.type === 'product' && (currentLanguage === 'vi' ? 'Sản phẩm' : 'Product')}
                              {item.type === 'service' && (currentLanguage === 'vi' ? 'Dịch vụ' : 'Service')}
                            </span>
                            {item.createdDate && (
                              <span className="item-date">
                                {new Date(item.createdDate).toLocaleDateString(currentLanguage === 'vi' ? 'vi-VN' : 'en-US')}
                              </span>
                            )}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && !error && keyword.length < 2 && (
            <div className="search-placeholder">
              <i className="fa fa-search search-placeholder-icon"></i>
              <h3>{currentLanguage === 'vi' ? 'Tìm kiếm toàn cục' : 'Global Search'}</h3>
              <p>
                {currentLanguage === 'vi' 
                  ? 'Nhập ít nhất 2 ký tự để tìm kiếm trong tin tức, thông báo, sản phẩm và dịch vụ' 
                  : 'Enter at least 2 characters to search across news, notifications, products and services'
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GlobalSearch;