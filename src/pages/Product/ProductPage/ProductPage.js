import React, { useState } from "react";
import "../ProductPage/ProductPage.css";
import { Outlet, Route, Routes } from "react-router-dom";
import SidebarProduct from "../components/SiderbarProduct/SidebarProduct";
import ProductList from "../components/ProductList/ProductList";
import ProductDetail from "../ProductDetail/ProductDetail";

const Product = () => {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div className="page-product">
      <SidebarProduct
        openSidebar={openSidebar}
        setOpenSidebar={setOpenSidebar}
      />

      <div
        className={openSidebar ? "product-content resize" : "product-content"}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default Product;
