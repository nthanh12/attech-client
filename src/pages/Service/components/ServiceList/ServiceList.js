// src/components/ServiceList/ServiceList.js
import React from "react";
import ServiceItem from "../ServiceItem/ServiceItem";
import "../ServiceList/ServiceList.css";
import { mockServices } from "../../../../utils/mockServices";

const ServiceList = () => {
  return (
    <>
      <div className="section-header text-center">
        <h2>Dịch vụ</h2>
      </div>
      <div className="row service-row">
        {mockServices.filter(s => s.status === 1).map((service, index) => (
          <ServiceItem
            key={service.id}
            id={service.id}
            slug={service.slugVi}
            title={service.nameVi}
            description={service.descriptionVi}
            image={service.image}
          />
        ))}
      </div>
    </>
  );
};

export default ServiceList;
