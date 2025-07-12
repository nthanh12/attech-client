import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useLanguage } from "../../../contexts/LanguageContext";
import { mockProducts } from "../../../utils/mockProducts";

const ProductDetailPage = () => {
  const { lang } = useLanguage();
  const { productSlug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const item = mockProducts.find(p => (lang === "vi" ? p.slugVi === productSlug : p.slugEn === productSlug));
      if (item) {
        setProduct(item);
        setError(null);
      } else {
        setProduct(null);
        setError(lang === "vi" ? "Không tìm thấy sản phẩm" : "Product not found");
      }
      setLoading(false);
    }, 300);
  }, [productSlug, lang]);

  if (loading) {
    return <div>{lang === "vi" ? "Đang tải sản phẩm..." : "Loading product..."}</div>;
  }
  if (error || !product) {
    return (
      <div>
        <h2>{lang === "vi" ? "Không tìm thấy sản phẩm" : "Product not found"}</h2>
        <p>{error || (lang === "vi" ? "Sản phẩm không tồn tại hoặc đã bị xóa." : "Product does not exist or has been deleted.")}</p>
        <Link to={lang === "vi" ? "/san-pham" : "/en/products"}>{lang === "vi" ? "Quay lại danh sách sản phẩm" : "Back to product list"}</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>{lang === "vi" ? product.nameVi : product.nameEn}</h1>
      <p>{lang === "vi" ? product.descriptionVi : product.descriptionEn}</p>
      <div dangerouslySetInnerHTML={{ __html: lang === "vi" ? product.contentVi : product.contentEn }} />
    </div>
  );
};

export default ProductDetailPage; 