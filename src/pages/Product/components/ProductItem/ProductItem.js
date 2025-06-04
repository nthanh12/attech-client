import React from "react";
import { Link } from "react-router-dom";
import "./ProductItem.css";

const ProductItem = ({ 
  product, 
  viewMode 
}) => {
  return (
    <article className={`attech-product-item ${viewMode}`}>
      <div className="attech-product-image-wrapper">
        <img 
          src={product.image} 
          alt={product.title} 
          className="attech-product-image"
        />
      </div>

      <div className="attech-product-content">
        <div className="attech-product-category">{product.category}</div>
        <h3 className="attech-product-title">{product.fullTitle || product.title}</h3>
        <Link 
          to={`/products/${product.slug}`} 
          className="attech-product-link"
        >
          Xem chi tiết
          <i className="fas fa-arrow-right"></i>
        </Link>
      </div>
    </article>
  );
};

export default ProductItem;
