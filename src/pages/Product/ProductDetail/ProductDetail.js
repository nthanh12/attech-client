import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../ProductDetail/ProductDetail.css";
import { mockProducts } from "../../../utils/mockData";
import { useI18n } from "../../../hooks/useI18n";
import ErrorPage from "../../../components/Shared/ErrorPage";

const ProductDetail = () => {
  const { category, slug } = useParams();
  const { currentLanguage } = useI18n();
  // Map mockProducts sang format i18n
  const products = mockProducts.map((item) => ({
    id: item.id,
    slug: currentLanguage === "vi" ? item.slugVi : item.slugEn,
    title: currentLanguage === "vi" ? item.titleVi : item.titleEn,
    fullTitle: currentLanguage === "vi" ? item.titleVi : item.titleEn,
    category:
      currentLanguage === "vi"
        ? item.productCategorytitleVi
        : item.productCategorytitleEn,
    description:
      currentLanguage === "vi" ? item.descriptionVi : item.descriptionEn,
    image: item.image,
    categorySlug:
      currentLanguage === "vi"
        ? item.productCategorySlugVi
        : item.productCategorySlugEn,
    content: currentLanguage === "vi" ? item.contentVi : item.contentEn,
  }));

  useEffect(() => {
    const foundProduct = products.find(
      (s) => s.slug === slug && s.categorySlug === category
    );
    setProduct(foundProduct);
  }, [slug, category, products]);

  const [product, setProduct] = useState(null);

  if (!product) {
    return (
      <ErrorPage
        title="Sản phẩm không tồn tại"
        message="Xin lỗi, sản phẩm bạn đang tìm kiếm không tồn tại hoặc đã bị xóa."
        suggestions={[
          "Kiểm tra lại đường link",
          "Tìm kiếm sản phẩm khác",
          "Quay lại trang danh sách sản phẩm"
        ]}
        type="product"
        backRoute="HOME"
        backText="Về trang chủ"
        listRoute="PRODUCTS"
        listText="Xem tất cả sản phẩm"
      />
    );
  }

  return (
    <div className="product-detail-container">
      <div className="product-detail-header">
        <div className="product-detail-image">
          <img src={product.image} alt={product.title} />
        </div>
        <div className="product-detail-title">
          <h1>{product.fullTitle}</h1>
          <p>{product.description}</p>
        </div>
      </div>

      <div className="product-detail-body">
        <div
          className="product-detail-content"
          dangerouslySetInnerHTML={{ __html: product.content }}
        />
      </div>
    </div>
  );
};

export default ProductDetail;
