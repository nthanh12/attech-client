// src/components/ServiceList/ServiceList.js
import React from "react";
import ServiceItem from "../ServiceItem/ServiceItem";
import "../ServiceList/ServiceList.css";
import { mockServices } from "../../../../utils/mockServices";
import { useI18n } from "../../../../hooks/useI18n";

const ServiceList = () => {
  const { t, currentLanguage } = useI18n();
  
  return (
    <>
      <div className="section-header text-center">
        <h2>{t('frontend.services.title')}</h2>
      </div>
      <div className="row service-row">
        {mockServices.filter(s => s.status === 1).map((service, index) => (
          <ServiceItem
            key={service.id}
            id={service.id}
            slug={currentLanguage === 'vi' ? service.slugVi : service.slugEn}
            title={currentLanguage === 'vi' ? service.nameVi : service.nameEn}
            description={currentLanguage === 'vi' ? service.descriptionVi : service.descriptionEn}
            image={service.image}
          />
        ))}
      </div>
    </>
  );
};

export default ServiceList;
