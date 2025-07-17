import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../ProductDetail/ProductDetail.css";
import { mockProducts } from '../../../utils/mockData';

const ProductDetail = () => {
  const { category, slug } = useParams();
  const [product, setProduct] = useState(null);
  // Map mockProducts sang format cũ
  const products = mockProducts.map(item => ({
    id: item.id,
    slug: item.slugVi,
    title: item.nameVi,
    fullTitle: item.nameVi,
    category: item.productCategoryNameVi,
    description: item.descriptionVi,
    image: item.image,
    categorySlug: item.productCategorySlugVi,
    content: item.contentVi
  }));

  useEffect(() => {
    const foundProduct = products.find(
      (s) => s.slug === slug && s.categorySlug === category
    );
    setProduct(foundProduct);
  }, [slug, category]);

  if (!product) {
    return <div>Đang tải...</div>;
  }

  return (
    <div className="product-detail-container">
      <div className="product-detail-header">
        <div className="product-detail-image">
          <img src={product.image} alt={product.title} />
        </div>
        <div className="product-detail-title">
          <h1>{product.fullTitle}</h1>
          <p>{product.description}</p>
        </div>
      </div>

      <div className="product-detail-body">
        <div
          className="product-detail-content"
          dangerouslySetInnerHTML={{ __html: product.content }}
        />
      </div>
    </div>
  );
};

export default ProductDetail;
