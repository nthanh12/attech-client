// src/components/ServiceList/ServiceList.js
import React from "react";
import ServiceItem from "../ServiceItem/ServiceItem";
import "../ServiceList/ServiceList.css";

const ServiceList = ({ services }) => {
  return (
    <>
      <div className="section-header text-center">
        <h2>Dịch vụ</h2>
        <p className="general-text">
          ATTECH, Công ty TNHH Kỹ thuật Quản lý bay, cung cấp dịch vụ thông tin,
          dẫn đường, giám sát hàng không, dịch vụ bay kiểm tra hiệu chuẩn và sản
          xuất công nghiệp hàng không. Với đội ngũ chuyên gia và cơ sở hạ tầng
          hiện đại, ATTECH tự hào là đối tác tin cậy của ngành hàng không Việt
          Nam.
        </p>
      </div>
      <div className="row service-row">
        {services.map((service, index) => (
          <ServiceItem
            key={index}
            id={service.id}
            title={service.title}
            description={service.description}
            image={service.image}
            actionLink={service.actionLink}
          />
        ))}
      </div>
    </>
  );
};

export default ServiceList;
