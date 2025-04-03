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
    <div className={openSidebar ? "sidebar-product resize" : "sidebar-product"}>
      <div className="top-sidebar">
        <button onClick={() => setOpenSidebar(!openSidebar)}>
          <i className="fa fa-solid fa-bars"></i>
        </button>
        <div>{!openSidebar && <span>SẢN PHẨM</span>}</div>
        <hr />
      </div>
      {categories.map((category) => (
        <div key={category.id}>
          <div
            className="sp-nav-button"
            onClick={() => toggleCategory(category.id)}
          >
            {!openSidebar && <span>{category.name}</span>}
            <i
              className={`fas ${
                expandedCategory === category.id
                  ? "fa-chevron-down"
                  : "fa-chevron-right"
              }`}
            ></i>
          </div>

          {expandedCategory === category.id && (
            <>
              {category.subCategories.map((sub, index) =>
                typeof sub === "string" ? (
                  <div key={index} className="sub-nav-button">
                    {!openSidebar && <span>{sub}</span>}
                  </div>
                ) : (
                  <div key={sub.name}>
                    <div
                      className="sub-nav-button"
                      onClick={() => toggleSubCategory(sub.name)}
                    >
                      {!openSidebar && <span>{sub.name}</span>}
                      {!openSidebar && (
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
                      <>
                        {sub.nestedSubCategories?.map((nested, idx) => (
                          <div key={idx} className="nested-sub-nav-button">
                            {!openSidebar && <span>{nested}</span>}
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                )
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default SidebarProduct;
