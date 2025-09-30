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
    <article className={`attech-product-item ${viewMode || 'grid'}`}>
      <div className="attech-product-image-wrapper">
        <img
          src={product.image}
          alt={product.title}
          className="attech-product-image"
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="attech-product-content">
        <div className="attech-product-category">{product.category}</div>
        <h3 className="attech-product-title">{product.fullTitle || product.title}</h3>
        <LocalizedLink
          routeKey="PRODUCT_DETAIL"
          params={{ category: product.categorySlug, slug: product.slug }}
          className="attech-product-link"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            color: '#3b82f6',
            textDecoration: 'none',
            fontWeight: '500',
            fontSize: '13px',
            padding: '10px 16px',
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '6px',
            margin: '8px 0 0 0',
            minHeight: '36px',
            transition: 'all 0.2s ease'
          }}
        >
          {t('frontend.products.viewDetails')}
          <i className="fas fa-arrow-right" style={{ fontSize: '10px', transition: 'transform 0.2s ease' }}></i>
        </LocalizedLink>
      </div>
    </article>
  );
};

export default ProductItem;
