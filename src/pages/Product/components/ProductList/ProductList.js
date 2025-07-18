import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductItem from "../ProductItem/ProductItem";
import Sidebar from "../Sidebar/Sidebar";
import "../ProductList/ProductList.css";
import { mockProducts, mockProductCategories } from '../../../../utils/mockData';

// Map mockProducts sang format cũ cho ProductItem
const products = mockProducts.map(item => ({
  id: item.id,
  slug: item.slugVi,
  title: item.nameVi,
  fullTitle: item.nameVi,
  category: item.productCategoryNameVi,
  description: item.descriptionVi,
  image: item.image,
  categorySlug: item.productCategorySlugVi
}));

// Tạo mảng categories từ mockProductCategories
const categories = mockProductCategories.map(cat => ({
  name: cat.nameVi,
  slug: cat.slugVi
}));

// CategoryNav component
const CategoryNav = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="attech-category-nav">
      <button
        className={`attech-category-btn ${!selectedCategory ? 'active' : ''}`}
        onClick={() => onSelectCategory('')}
      >
        Tất cả sản phẩm
      </button>
      {categories.map(cat => (
        <button
          key={cat.slug}
          className={`attech-category-btn ${selectedCategory === cat.slug ? 'active' : ''}`}
          onClick={() => onSelectCategory(cat.slug)}
        >
          {cat.name}
        </button>
      ))}
      {/* Nút Vẻ 360 giống các nút khác */}
      <button
        className="attech-category-btn"
        onClick={() => window.open('https://attech.vr360.one/', '_blank')}
      >
        VR 360
      </button>
    </div>
  );
};

const ProductList = () => {
  const { category } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [viewMode, setViewMode] = useState("grid");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState(category || "");
  const [favoriteProducts, setFavoriteProducts] = useState(() => {
    const saved = localStorage.getItem("favoriteProducts");
    return saved ? JSON.parse(saved) : [];
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Thêm state cho phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  // Đồng bộ selectedCategory với route
  useEffect(() => {
    setSelectedCategory(category || "");
  }, [category]);

  useEffect(() => {
    let result = [...products];
    
    if (selectedCategory) {
      result = result.filter(product => 
        product.categorySlug === selectedCategory
      );
    }

    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter(product =>
        product.title.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower)
      );
    }

    result.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return (a.title || '').localeCompare(b.title || '');
        case "category":
          return (a.category || '').localeCompare(b.category || '');
        default:
          return 0;
      }
    });
    // Log kiểm tra thứ tự sản phẩm sau khi sort
    console.log('Sorted products:', result.map(p => ({ title: p.title, category: p.category })));

    setFilteredProducts(result);
    setCurrentPage(1);
  }, [selectedCategory, searchTerm, sortBy]);

  // Khôi phục lại phân trang như ban đầu
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Log khi render danh sách sản phẩm
  console.log('Render products:', currentProducts.map(p => p.title));

  const navigate = useNavigate();
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setIsSidebarOpen(false);
    if (category) {
      navigate(`/san-pham/${category}`);
    } else {
      navigate('/san-pham');
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (e) => {
    setSortBy(e.target.value);
  };

  const handleViewMode = (mode) => {
    setViewMode(mode);
  };

  const handleToggleFavorite = (product) => {
    setFavoriteProducts(prev => {
      const isFavorite = prev.some(p => p.id === product.id);
      if (isFavorite) {
        return prev.filter(p => p.id !== product.id);
      }
      return [...prev, product];
    });
  };

  // Component phân trang
  const Pagination = () => {
    const pageNumbers = [];
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    if (endPage - startPage < 4) {
      if (currentPage <= 3) {
        endPage = Math.min(5, totalPages);
      } else {
        startPage = Math.max(1, totalPages - 4);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="attech-pagination">
        <button
          className="attech-pagination-button"
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
        >
          <i className="fas fa-angle-double-left"></i>
        </button>
        
        <button
          className="attech-pagination-button"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <i className="fas fa-angle-left"></i>
        </button>

        {pageNumbers.map(number => (
          <button
            key={number}
            className={`attech-pagination-button ${currentPage === number ? 'active' : ''}`}
            onClick={() => handlePageChange(number)}
          >
            {number}
          </button>
        ))}

        <button
          className="attech-pagination-button"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <i className="fas fa-angle-right"></i>
        </button>

        <button
          className="attech-pagination-button"
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          <i className="fas fa-angle-double-right"></i>
        </button>

        {/* Tạm thời bỏ thông tin phân trang khi tắt phân trang */}
        <span className="attech-pagination-info">
          1-{filteredProducts.length} / {filteredProducts.length}
        </span>
      </div>
    );
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="attech-product-list-container">
      <div className="attech-controls-wrapper">
        <div className="attech-controls-inner">
          <div className="attech-controls-top">
            <button 
              className="attech-filter-toggle-btn"
              onClick={() => setIsSidebarOpen(true)}
            >
              <i className="fas fa-filter"></i>
              <span>Menu</span>
            </button>

            <div className="attech-search-container">
              <i className="fas fa-search attech-search-icon"></i>
              <input
                type="text"
                className="attech-search-input"
                placeholder="Tìm kiếm sản phẩm..."
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>

            <div className="attech-product-filters">
              <select 
                className="attech-sort-select"
                value={sortBy}
                onChange={handleSort}
              >
                <option value="name">Sắp xếp theo tên</option>
                <option value="category">Sắp xếp theo danh mục</option>
              </select>

              <div className="attech-view-mode">
                <button
                  className={`attech-view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => handleViewMode('grid')}
                >
                  <i className="fas fa-th"></i>
                </button>
                <button
                  className={`attech-view-btn ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => handleViewMode('list')}
                >
                  <i className="fas fa-list"></i>
                </button>
              </div>
            </div>
          </div>

          <div className="attech-controls-bottom">
            <CategoryNav
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={handleCategoryChange}
            />
          </div>
        </div>
      </div>

      <div className={`attech-product-grid ${viewMode}`}>
        {currentProducts.length > 0 ? (
          currentProducts.map((product, index) => (
            <div 
              key={product.id} 
              className="attech-product-item-wrapper"
              style={{
                animation: `fadeIn 0.3s ease-in-out forwards ${index * 0.1}s`
              }}
            >
              <ProductItem
                product={product}
                viewMode={viewMode}
                onToggleFavorite={handleToggleFavorite}
                isFavorite={favoriteProducts.some(p => p.id === product.id)}
              />
            </div>
          ))
        ) : (
          <div className="attech-no-products">
            <i className="fas fa-box-open"></i>
            <p>Không tìm thấy sản phẩm phù hợp</p>
          </div>
        )}
      </div>

      {currentProducts.length > 0 && <Pagination />}

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        selectedCategories={[selectedCategory]}
        onCategoryChange={handleCategoryChange}
        products={products}
      />
    </div>
  );
};

export default ProductList;
