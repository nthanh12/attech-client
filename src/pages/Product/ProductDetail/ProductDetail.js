import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../ProductDetail/ProductDetail.css";

const ProductDetail = ({ products }) => {
  const { productId } = useParams();
  const [product, setproduct] = useState(null);

  useEffect(() => {
    const foundproduct = products.find((s) => s.id === parseInt(productId));
    setproduct(foundproduct);
  }, [productId, products]);

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

      <div className="product-detail-content">
        <div className="product-detail-section">
          <h2>Chi Tiết Dịch Vụ</h2>
          <ul>
            {product.details.map((detail, index) => (
              <li key={index}>{detail}</li>
            ))}
          </ul>
        </div>

        <div className="product-detail-grid">
          <div className="product-detail-process">
            <h2>Quy Trình Dịch Vụ</h2>
            <ol>
              {product.process.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>

          <div className="product-detail-benefits">
            <h2>Lợi Ích</h2>
            <ul>
              {product.benefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
