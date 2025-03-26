import React from "react";

const DropdownNews = ({ categories, onSelectCategory }) => {
  const categories = [
    {
      id: "activity",
      name: "Tin hoạt động",
      subcategories: [
        { id: "company", name: "Hoạt động công ty" },
        { id: "party", name: "Đảng bộ công ty" },
        { id: "youth", name: "Đoàn thanh niên công ty" },
        { id: "union", name: "Công đoàn công ty" },
      ],
    },
    { id: "aviation", name: "Tin ngành hàng không" },
    { id: "law", name: "Tuyên truyền pháp luật" },
  ];

  return (
    <div className="dropdown-news">
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            <button onClick={() => onSelectCategory(category.id)}>
              {category.name}
            </button>
            {category.subcategories && (
              <ul>
                {category.subcategories.map((sub) => (
                  <li key={sub.id}>
                    <button onClick={() => onSelectCategory(sub.id)}>
                      {sub.name}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropdownNews;
