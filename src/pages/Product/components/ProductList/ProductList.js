import React from "react";
import ProductItem from "../ProductItem/ProductItem";
import "../ProductList/ProductList.css";

const ProductList = ({ products }) => {
  return (
    <>
      <div className="section-header text-center">
        <h2>Sản phẩm</h2>
        <p className="general-text">
          ATTECH, Công ty TNHH Kỹ thuật Quản lý bay, cung cấp dịch vụ thông tin,
          dẫn đường, giám sát hàng không, dịch vụ bay kiểm tra hiệu chuẩn và sản
          xuất công nghiệp hàng không. Với đội ngũ chuyên gia và cơ sở hạ tầng
          hiện đại, ATTECH tự hào là đối tác tin cậy của ngành hàng không Việt
          Nam.
        </p>
      </div>
      <div className="row product-row">
        {products.map((product, index) => (
          <ProductItem
            key={index}
            id={product.id}
            title={product.title}
            description={product.description}
            image={product.image}
            actionLink={product.actionLink}
          />
        ))}
      </div>
    </>
  );
};

export default ProductList;
