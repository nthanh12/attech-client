import React from "react";
import "../../assets/css/Product/SidebarProduct.css";

const SidebarProduct = () => {
  return (
    <div id="sp-nav-bar">
      <input
        id="sp-nav-toggle"
        type="checkbox"
        aria-label="Toggle navigation bar"
      />
      <div id="sp-nav-header">
        <a
          id="sp-nav-title"
          href="https://codepen.io"
          target="_blank"
          rel="noopener noreferrer"
        >
          SẢN PHẨM
        </a>
        <label htmlFor="sp-nav-toggle">
          <span id="sp-nav-toggle-burger"></span>
        </label>
        <hr />
      </div>
      <div id="sp-nav-content">
        <div className="sp-nav-button" aria-label="Tất cả sản phẩm">
          <i className="fas fa-palette" aria-hidden="true"></i>
          <span>Tất cả sản phẩm</span>
        </div>
        <div className="sp-nav-button" aria-label="CNS/ATM">
          <i className="fas fa-images" aria-hidden="true"></i>
          <span>CNS/ATM</span>
        </div>
        <div className="sp-nav-button" aria-label="Các sản phẩm khác">
          <i className="fas fa-thumbtack" aria-hidden="true"></i>
          <span>Các sản phẩm khác</span>
        </div>
        <div className="sp-nav-subgroup" aria-label="Danh mục sản phẩm khác">
          <div className="sp-nav-button" aria-label="Hệ thống đèn hiệu">
            <i className="fas fa-heart" aria-hidden="true"></i>
            <span>Hệ thống đèn hiệu</span>
          </div>
          <div className="sp-nav-button" aria-label="Bán Consoles">
            <i className="fas fa-chart-line" aria-hidden="true"></i>
            <span>Bán Consoles</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarProduct;
