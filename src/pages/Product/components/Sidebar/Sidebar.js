import React, { useState } from 'react';
import './Sidebar.css';
import menuItems from '../../../../components/Shared/Layout/Header/Navbar/menuItem';
import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen, onClose, selectedCategories, onCategoryChange, products }) => {
  // Lấy danh mục sản phẩm từ menuItem.js
  const productMenu = menuItems.find(item => item.key === 'products');
  const categories = productMenu?.submenu || [];

  // Log kiểm tra dữ liệu categories
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
    // Nếu là object đặc biệt (VR 360), không lọc
    if (category.url) return [];
    return products.filter(product => product.categorySlug === category.slug);
  };

  // Render danh mục cha/con
  return (
    <>
      <div className={`product-sidebar${isOpen ? ' open' : ''}`}>
        <div className="sidebar-header">
          <h3>Danh mục sản phẩm</h3>
          <button className="close-btn" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="sidebar-content">
          <nav className="sidebar-nav">
            {categories
              .filter(
                sub =>
                  sub &&
                  typeof sub === 'object' &&
                  !!sub.labelVi &&
                  !!sub.pathVi &&
                  typeof sub.pathVi === 'string' &&
                  sub.pathVi.trim() !== ''
              )
              .map((sub, idx) => (
                <Link
                  to={sub.pathVi}
                  key={sub.key || sub.pathVi || idx}
                  className="menu-item"
                  onClick={onClose}
                >
                  <span className="menu-text">{sub.labelVi}</span>
                </Link>
              ))}
          </nav>
        </div>
      </div>
      {isOpen && <div className="sidebar-overlay" onClick={onClose}></div>}
    </>
  );
};

export default Sidebar; 