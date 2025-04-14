import React from "react";
import { Link } from "react-router-dom";
import "./ServiceItem.css";

const ServiceItem = ({ id, slug, title, description, image }) => {
  return (
    <div className="col-lg-4 col-md-6 mb-4">
      <article className="card service-item">
        <div className="service-img">
          <img
            src={image}
            alt={`Hình ảnh minh họa cho dịch vụ ${title}`}
            className="img-fluid rounded"
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
            to={`/services/${slug}`}
            className="btn btn-primary text-white px-3"
            aria-label={`Xem thêm về dịch vụ ${title}`}
          >
            <i className="fa fa-solid fa-eye" aria-hidden="true"></i> Xem thêm
          </Link>
        </div>
      </article>
    </div>
  );
};

export default React.memo(ServiceItem);
