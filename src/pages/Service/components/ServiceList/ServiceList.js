// src/components/ServiceList/ServiceList.js
import React, { useState, useEffect } from "react";
import ServiceItem from "../ServiceItem/ServiceItem";
import "../ServiceList/ServiceList.css";
import { getServices } from "../../../../services/clientServiceService";
import { useI18n } from "../../../../hooks/useI18n";

const ServiceList = () => {
  const { t, currentLanguage } = useI18n();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadServices = async () => {
      try {
        setLoading(true);
        const servicesResponse = await getServices({ limit: 50 });

        if (servicesResponse.success && servicesResponse.data.length > 0) {
          const formattedServices = servicesResponse.data.map((service) => {
            return {
              id: service.id,
              slug: currentLanguage === "vi" ? service.slugVi : service.slugEn,
              title:
                currentLanguage === "vi" ? service.titleVi : service.titleEn,
              description:
                currentLanguage === "vi"
                  ? service.descriptionVi
                  : service.descriptionEn,
              image: service.imageUrl,
              status: service.status,
            };
          });
          setServices(formattedServices);
        } else {
          setServices([]);
        }
      } catch (error) {
        console.error("❌ Error loading services:", error);
        setServices([]);
      } finally {
        setLoading(false);
      }
    };

    loadServices();
  }, [currentLanguage]);

  if (loading) {
    return (
      <div className="text-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="section-header text-center">
        <h2>{t("frontend.services.title")}</h2>
      </div>
      <div className="row service-row">
        {services
          .filter((s) => s.status === 1)
          .map((service, index) => (
            <ServiceItem
              key={service.id}
              id={service.id}
              slug={service.slug}
              title={service.title}
              description={service.description}
              image={service.image}
            />
          ))}
      </div>
    </>
  );
};

export default ServiceList;
