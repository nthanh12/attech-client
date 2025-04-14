import React from "react";
import { Link } from "react-router-dom";
import "./ProductItem.css";

const ProductItem = ({
  id,
  slug,
  title,
  description,
  image,
  price,
  discount,
}) => {
  return (
    <div className="col-lg-4 col-md-6 mb-4">
      <article className="card product-item">
        <div className="product-img">
          <img
            src={image}
            alt={`Hình ảnh sản phẩm ${title}`}
            className="img-fluid rounded"
            loading="lazy"
          />
          {discount && <span className="product-badge">Giảm {discount}%</span>}
          <div className="product-overlay">
            <p>{description}</p>
          </div>
        </div>
        <div className="card-body">
          <h3 className="product-title">{title}</h3>
          {price && (
            <div className="product-price">
              {discount ? (
                <>
                  <span className="discounted-price">
                    {(price * (1 - discount / 100)).toLocaleString("vi-VN")} VNĐ
                  </span>
                  <span className="original-price">
                    {price.toLocaleString("vi-VN")} VNĐ
                  </span>
                </>
              ) : (
                <span>{price.toLocaleString("vi-VN")} VNĐ</span>
              )}
            </div>
          )}
        </div>
        <div className="card-footer">
          <Link
            to={`/products/${id}/${slug}`}
            className="btn btn-primary text-white"
            aria-label={`Xem chi tiết sản phẩm ${title}`}
          >
            <i className="fa fa-solid fa-eye" aria-hidden="true"></i> Xem thêm
          </Link>
        </div>
      </article>
    </div>
  );
};

export default ProductItem;
