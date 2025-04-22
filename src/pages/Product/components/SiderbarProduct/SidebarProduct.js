import React, { useState } from "react";
import "./SidebarProduct.css";

const categories = [
  {
    id: 1,
    name: "CNS/ATM",
    icon: "fas fa-broadcast-tower",
    subCategories: ["Hệ thống ADS-B", "Hệ thống AMHS", "Hệ thống AMSS"],
  },
  {
    id: 2,
    name: "Các sản phẩm khác",
    icon: "fas fa-tools",
    subCategories: [
      {
        name: "Hệ thống đèn hiệu",
        nestedSubCategories: [
          "Đèn chỉ thị góc tiếp cận chính xác - PAPI",
          "Đèn lề đường CHC hai hướng lắp nối",
          "Đèn lề đường lăn lắp nổi LED",
          "Đèn lề đường lăn lắp nổi",
          "Đèn chớp lắp nổi",
          "Đèn pha 1 hướng lắp nổi",
          "Đèn pha xoay",
          "Đèn cao không công nghệ LED",
          "Đèn cao tín hiệu ánh sáng",
        ],
      },
      {
        name: "Cơ khí chế tạo",
        nestedSubCategories: ["Shelter Composite", "Shelter Thép"],
      },
      {
        name: "Bàn console",
        nestedSubCategories: ["ATC consoles", "Technical consoles"],
      },
      {
        name: "Giàn phản xạ VOR",
        nestedSubCategories: ["Dễ phá hủy", "Thép"],
      },
      {
        name: "Thiết bị ghi âm/ ghi hình",
        nestedSubCategories: ["Ghi âm chuyên dụng", "Ghi âm + Ghi hình"],
      },
      {
        name: "Các sản phẩm dân dụng khác",
        nestedSubCategories: [
          "Đồng hồ GPS",
          "Máy cắt Vấu",
          "Máy là",
          "Máy hàn TIG",
          "Máy lốc",
          "Máy hàn quay",
        ],
      },
    ],
  },
];

const CategoryItem = ({
  category,
  isOpen,
  toggleCategory,
  expandedSubCategory,
  toggleSubCategory,
  isSidebarResized,
}) => {
  return (
    <div className="category-item">
      <div
        className="sp-nav-button"
        onClick={() => toggleCategory(category.id)}
        title={category.name}
      >
        <i className={category.icon}></i>
        {!isSidebarResized && <span>{category.name}</span>}
        <i
          className={`fas ${isOpen ? "fa-chevron-down" : "fa-chevron-right"}`}
        ></i>
      </div>

      {isOpen && (
        <div className="sub-categories">
          {category.subCategories.map((sub, index) =>
            typeof sub === "string" ? (
              <div key={index} className="sub-nav-button">
                {!isSidebarResized && <span>{sub}</span>}
              </div>
            ) : (
              <div key={sub.name} className="sub-category-item">
                <div
                  className="sub-nav-button"
                  onClick={() => toggleSubCategory(sub.name)}
                  title={sub.name}
                >
                  {!isSidebarResized && <span>{sub.name}</span>}
                  {!isSidebarResized && (
                    <i
                      className={`fas ${
                        expandedSubCategory === sub.name
                          ? "fa-chevron-down"
                          : "fa-chevron-right"
                      }`}
                    ></i>
                  )}
                </div>
                {expandedSubCategory === sub.name && (
                  <div className="nested-sub-categories">
                    {sub.nestedSubCategories?.map((nested, idx) => (
                      <div key={idx} className="nested-sub-nav-button">
                        {!isSidebarResized && <span>{nested}</span>}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

const SidebarProduct = ({ openSidebar, setOpenSidebar }) => {
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [expandedSubCategory, setExpandedSubCategory] = useState(null);

  const toggleCategory = (id) => {
    setExpandedCategory(expandedCategory === id ? null : id);
  };

  const toggleSubCategory = (name) => {
    setExpandedSubCategory(expandedSubCategory === name ? null : name);
  };

  return (
    <div className={`sidebar-product ${openSidebar ? "resize" : ""}`}>
      <div className="top-sidebar">
        <div className="top-sidebar-content">
          <button
            onClick={() => setOpenSidebar(!openSidebar)}
            aria-label="Toggle Sidebar"
            className="toggle-button"
          >
            <i className="fa fa-solid fa-bars"></i>
          </button>
          {!openSidebar && <span className="sidebar-title">SẢN PHẨM</span>}
        </div>
        <hr className="sidebar-divider" />
      </div>
      <div className="categories">
        {categories.map((category) => (
          <CategoryItem
            key={category.id}
            category={category}
            isOpen={expandedCategory === category.id}
            toggleCategory={toggleCategory}
            expandedSubCategory={expandedSubCategory}
            toggleSubCategory={toggleSubCategory}
            isSidebarResized={openSidebar}
          />
        ))}
      </div>
    </div>
  );
};

export default SidebarProduct;
