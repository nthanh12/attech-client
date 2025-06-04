import React from "react";
import "../ProductPage/ProductPage.css";
import { Outlet } from "react-router-dom";

const Product = () => {
  return (
    <div className="page-product">
      <div className="product-content">
        <Outlet />
      </div>
    </div>
  );
};

export default Product;
