import React from "react";
import { Link } from "react-router-dom";
import "./ServiceItem.css";

const ServiceItem = ({ id, slug, title, description, image }) => {
  return (
    <article className="card service-item">
      <div className="service-img">
        <img
          src={image}
          alt={`Hình ảnh minh họa cho dịch vụ ${title}`}
          className="img-fluid"
          loading="lazy"
        />
        <div className="service-overlay">
          <p>{description}</p>
        </div>
      </div>
      <div className="card-body">
        <h3 className="service-title">{title}</h3>
      </div>
      <div className="card-footer">
        <Link
          to={`/dich-vu/${slug}`}
          className="service-detail-btn"
          aria-label={`Xem chi tiết về dịch vụ ${title}`}
        >
          <span>Xem chi tiết</span>
        </Link>
      </div>
    </article>
  );
};

export default React.memo(ServiceItem);
