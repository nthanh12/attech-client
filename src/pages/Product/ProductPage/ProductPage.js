import React from "react";
import "../ProductPage/ProductPage.css";
import { Outlet, useLocation } from "react-router-dom";
import SEO from "../../../components/SEO/SEO";
import { useI18n } from "../../../hooks/useI18n";

const Product = () => {
  const { currentLanguage } = useI18n();
  const location = useLocation();

  const seoContent = {
    vi: {
      title: "Sản phẩm | ATTECH",
      description:
        "Khám phá các sản phẩm thiết bị hàng không chất lượng cao của ATTECH, phục vụ cho ngành công nghiệp hàng không tại Việt Nam.",
      keywords:
        "sản phẩm ATTECH, thiết bị hàng không, CNS equipment, aviation products",
    },
    en: {
      title: "Products | ATTECH",
      description:
        "Explore ATTECH's high-quality aviation equipment products serving the aviation industry in Vietnam.",
      keywords:
        "ATTECH products, aviation equipment, CNS equipment, aviation products",
    },
  };

  const currentSEO = seoContent[currentLanguage] || seoContent.vi;

  return (
    <>
      <SEO
        title={currentSEO.title}
        description={currentSEO.description}
        keywords={currentSEO.keywords}
        url={location.pathname}
        lang={currentLanguage}
      />
      <div className="page-product">
        <div className="product-content">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Product;
