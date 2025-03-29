import React from "react";
import "../ServiceItem/ServiceItem.css";
import { Link } from "react-router-dom";

const ServiceItem = ({ id, title, description, image }) => {
  return (
    <div className="col-lg-4 col-md-6 wow fadeInUp mb-4" data-wow-delay="0.1s">
      <div className="card service-item">
        <div className="service-img">
          <img src={image} alt={title} className="img-fluid rounded" />
          <div className="service-overlay">
            <p>{description}</p>
          </div>
        </div>
        <div className="card-body">
          <h3 className="service-title">{title}</h3>
        </div>
        <div className="card-footer border-0 bg-light p-2 d-flex justify-content-center">
          <Link
            to={`/services/${id}`}
            className="btn btn-primary text-white px-3"
          >
            <i className="fa fa-solid fa-eye"></i> Xem thêm
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceItem;
