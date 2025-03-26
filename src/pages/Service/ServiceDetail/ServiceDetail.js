import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../ServiceDetail/ServiceDetail.css";

const ServiceDetail = ({ services }) => {
  const { serviceId } = useParams();
  const [service, setService] = useState(null);

  useEffect(() => {
    const foundService = services.find((s) => s.id === parseInt(serviceId));
    setService(foundService);
  }, [serviceId, services]);

  if (!service) {
    return <div>Đang tải...</div>;
  }

  return (
    <div className="service-detail-container">
      <div className="service-detail-header">
        <div className="service-detail-image">
          <img src={service.image} alt={service.title} />
        </div>
        <div className="service-detail-title">
          <h1>{service.fullTitle}</h1>
          <p>{service.description}</p>
        </div>
      </div>

      <div className="service-detail-content">
        <div className="service-detail-section">
          <h2>Chi Tiết Dịch Vụ</h2>
          <ul>
            {service.details.map((detail, index) => (
              <li key={index}>{detail}</li>
            ))}
          </ul>
        </div>

        <div className="service-detail-grid">
          <div className="service-detail-process">
            <h2>Quy Trình Dịch Vụ</h2>
            <ol>
              {service.process.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>

          <div className="service-detail-benefits">
            <h2>Lợi Ích</h2>
            <ul>
              {service.benefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
