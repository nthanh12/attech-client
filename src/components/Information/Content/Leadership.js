import React from "react";
import "../../../assets/css/Information/Leadership.css";

const Leadership = () => {
  const leaders = [
    {
      title: "Chủ tịch Công ty",
      name: "Ông Lê Tiến Thịnh",
      imageUrl:
        "https://attech.com.vn/wp-content/uploads/2015/09/CT-Le-Tien-Thinh.jpg",
    },
    {
      title: "Giám đốc",
      name: "Ông Nguyễn Hoàng Giang",
      imageUrl:
        "https://attech.com.vn/wp-content/uploads/2015/09/GD-Hoang-Giang.jpg",
    },
    {
      title: "Phó Giám đốc",
      name: "Ông Đinh Nhật Minh",
      imageUrl:
        "https://attech.com.vn/wp-content/uploads/2015/09/PGD-Dinh-Nhat-Minh.jpg",
    },
    {
      title: "Phó Giám đốc",
      name: "Ông Nguyễn Như Thành",
      imageUrl:
        "https://attech.com.vn/wp-content/uploads/2015/09/A-Thanh-PGD-final.jpg",
    },
    {
      title: "Phó Giám đốc",
      name: "Ông Phan Quốc Hưng",
      imageUrl:
        "https://attech.com.vn/wp-content/uploads/2015/09/PGD-PhanQuocHung.jpg",
    },
  ];

  return (
    <div className="leadership">
      <h2>Ban Lãnh Đạo Công Ty</h2>
      <div className="leader chairman">
        <img src={leaders[0].imageUrl} alt={leaders[0].name} />
        <h3>{leaders[0].name}</h3>
        <p>{leaders[0].title}</p>
      </div>
      <div className="leader director">
        <img src={leaders[1].imageUrl} alt={leaders[1].name} />
        <h3>{leaders[1].name}</h3>
        <p>{leaders[1].title}</p>
      </div>
      <div className="deputy-directors">
        {leaders.slice(2).map((leader, index) => (
          <div key={index} className="leader">
            <img src={leader.imageUrl} alt={leader.name} />
            <h3>{leader.name}</h3>
            <p>{leader.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leadership;
