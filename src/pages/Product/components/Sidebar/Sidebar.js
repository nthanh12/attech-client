import React, { useState } from 'react';
import './Sidebar.css';

const Sidebar = ({ isOpen, onClose, selectedCategories, onCategoryChange, products }) => {
  const categories = [
    "CNS/ATM",
    "Hệ thống đèn hiệu",
    "Shelter",
    "Bàn console",
    "Giàn phản xạ VOR",
    "Thiết bị ghi âm/ghi hình",
    "Các sản phẩm dân dụng khác",
    {
      name: "VR 360",
      url: "https://attech.vr360.one/"
    }
  ];

  const [expandedCategory, setExpandedCategory] = useState(null);

  const handleCategoryClick = (category) => {
    // Nếu category là object có url, mở link trong tab mới
    if (typeof category === 'object' && category.url) {
      window.open(category.url, '_blank');
      return;
    }
    
    if (expandedCategory === category) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(category);
    }
  };

  const getProductsByCategory = (category) => {
    return products.filter(product => product.category === category);
  };

  return (
    <>
      <div className={`product-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h3>Danh mục sản phẩm</h3>
          <button className="close-btn" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="sidebar-content">
          <nav className="sidebar-nav">
            {categories.map(category => {
              const categoryName = typeof category === 'object' ? category.name : category;
              return (
                <div key={categoryName} className="menu-category">
                  <div 
                    className={`menu-item ${expandedCategory === categoryName ? 'active' : ''}`}
                    onClick={() => handleCategoryClick(category)}
                  >
                    <span className="menu-text">{categoryName}</span>
                    {typeof category !== 'object' && (
                      <i className={`fas fa-chevron-${expandedCategory === categoryName ? 'up' : 'down'}`}></i>
                    )}
                  </div>
                  
                  {expandedCategory === categoryName && typeof category !== 'object' && (
                    <div className="submenu">
                      {getProductsByCategory(category).map(product => (
                        <div 
                          key={product.id}
                          className="submenu-item"
                          onClick={() => {
                            onCategoryChange(category);
                            if (window.innerWidth <= 768) {
                              onClose();
                            }
                          }}
                        >
                          {product.title}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      </div>
      
      {/* Overlay để click outside đóng sidebar */}
      {isOpen && <div className="sidebar-overlay" onClick={onClose}></div>}
    </>
  );
};

export default Sidebar; 