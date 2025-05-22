import React from "react";
import { Link } from "react-router-dom";
import "./ProductItem.css";

const ProductItem = ({ product, viewMode }) => {
  const { id, slug, title, description, image, category } = product;

  return (
    <div className={`product-item ${viewMode}`}>
      <div className="product-image">
        <Link to={`/products/${slug}`}>
          <img src={image} alt={title} loading="lazy" />
        </Link>
      </div>
      <div className="product-content">
        <div className="product-category">{category}</div>
        <h3 className="product-title">
          <Link to={`/products/${slug}`}>{title}</Link>
        </h3>
        <p className="product-description">{description}</p>
        <Link to={`/products/${slug}`} className="product-link">
          Xem chi tiết <i className="fas fa-arrow-right"></i>
        </Link>
      </div>
    </div>
  );
};

export default ProductItem;
