// src/components/ServiceList/ServiceList.js
import React from "react";
import ServiceItem from "../ServiceItem/ServiceItem";
import "../ServiceList/ServiceList.css";
import { services } from "../../../../../src/data/servicesData";

const ServiceList = () => {
  return (
    <>
      <div className="section-header text-center">
        <h2>Dịch vụ</h2>
      </div>
      <div className="row service-row">
        {services.map((service, index) => (
          <ServiceItem
            key={index}
            id={service.id}
            slug={service.slug}
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
