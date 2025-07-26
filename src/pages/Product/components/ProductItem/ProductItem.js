import React from "react";
import { useI18n } from "../../../../hooks/useI18n";
import LocalizedLink from "../../../../components/Shared/LocalizedLink";
import "./ProductItem.css";

const ProductItem = ({ 
  product, 
  viewMode 
}) => {
  const { t, currentLanguage } = useI18n();
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
        <LocalizedLink 
          routeKey="PRODUCT_DETAIL"
          params={{ category: product.categorySlug, slug: product.slug }}
          className="attech-product-link"
        >
          {t('frontend.products.viewDetails')}
          <i className="fas fa-arrow-right"></i>
        </LocalizedLink>
      </div>
    </article>
  );
};

export default ProductItem;
