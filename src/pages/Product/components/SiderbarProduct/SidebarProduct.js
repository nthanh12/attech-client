import React, { useState } from "react";
import "./SidebarProduct.css";

const categories = [
  {
    label: "Tất cả sản phẩm",
    icon: "fas fa-list-alt",
  },
  {
    label: "CNS/ATM",
    icon: "fas fa-broadcast-tower",
    subCategories: [
      { id: "1", label: "Hệ thống ADS-B" },
      { id: "2", label: "Hệ thống AMHS" },
      { id: "3", label: "Hệ thống AMSS" },
    ],
  },
  {
    label: "Các sản phẩm khác",
    icon: "fas fa-broadcast-tower",
    subCategories: [
      { id: "5", label: "Hệ thống đèn hiệu" },
      { id: "6", label: "Shelter" },
      { id: "7", label: "Bàn console" },
    ],
  },
];

const SidebarProduct = ({ openSidebar, setOpenSidebar }) => {
  const [expandedCategory, setExpandedCategory] = useState(null);

  const toggleSubCategories = (index) => {
    setExpandedCategory(expandedCategory === index ? null : index);
  };

  return (
    <div class={openSidebar ? "sidebar-product resize" : "sidebar-product"}>
      <div className="top-sidebar">
        <button onClick={() => setOpenSidebar(!openSidebar)}>
          <i className="fa fa-solid fa-bars"></i>
        </button>
        <div>{!openSidebar && <span>SẢN PHẨM</span>}</div>
        <hr />
      </div>

      {categories.map((category, index) => (
        <div key={index}>
          <div
            className="sp-nav-button"
            aria-label={category.label}
            onClick={() => category.subCategories && toggleSubCategories(index)}
          >
            <i class={category.icon} aria-hidden="true"></i>
            {!openSidebar && <span>{category.label}</span>}
            {category.subCategories && (
              <i
                class={`fas ${
                  expandedCategory === index
                    ? "fa-chevron-down"
                    : "fa-chevron-right"
                }`}
                style={{ marginLeft: "auto" }}
              ></i>
            )}
          </div>

          {expandedCategory === index &&
            category.subCategories &&
            category.subCategories.map((subCategory, subIndex) => (
              <div key={subIndex} className="sub-nav-button">
                {!openSidebar && <span>{subCategory.label}</span>}
              </div>
            ))}
        </div>
      ))}
    </div>
  );
};

export default SidebarProduct;
