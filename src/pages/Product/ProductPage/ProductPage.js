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
      {/* Sidebar cố định */}
      <SidebarProduct
        openSidebar={openSidebar}
        setOpenSidebar={setOpenSidebar}
      />

      <div class={openSidebar ? "product-content resize" : "product-content"}>
        <Outlet />
      </div>
    </div>
  );
};

export default Product;
