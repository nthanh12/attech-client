import React, { useState } from "react";
import "../Content/ContentInfo.css";
import { Award, Globe, Target } from "lucide-react";

const CustomContentInfo = ({ backgroundImage }) => {
  const [activeTab, setActiveTab] = useState("overview");

  const data = {
    overview: [
      {
        icon: <Globe className="custom-icon" />,
        text: "Lắp đặt công trình kỹ thuật quan trọng tại sân bay Đà Nẵng",
        description:
          "Đưa sân bay Đà Nẵng đạt tiêu chuẩn quốc tế với hệ thống ILS/DME, DVOR/DME, radar và các công trình liên quan.",
      },
      {
        icon: <Award className="custom-icon" />,
        text: "Phát triển dàn phản xạ DVOR/DME nội địa",
        description:
          "Thành công trong sản xuất dàn phản xạ thay thế nhập ngoại, đáp ứng khí hậu Việt Nam và giảm đáng kể chi phí đầu tư.",
      },
      {
        icon: <Target className="custom-icon" />,
        text: "Cung cấp thiết bị chuyển đổi tin nhắn tự động",
        description:
          "Phần mềm AMSC tự viết, hệ thống đồng hồ GPS chuẩn đã được lắp đặt tại các sân bay lớn.",
      },
      {
        icon: <Award className="custom-icon" />,
        text: "Ứng phó sự cố Y2K thành công",
        description:
          "Đội ngũ kỹ thuật đảm bảo an toàn tuyệt đối trong quản lý bay qua sự cố Y2K năm 2000.",
      },
    ],
    quality: [
      {
        icon: <Target className="custom-icon" />,
        text: "Thiết kế và sản xuất hệ thống đèn hiệu sân bay",
        description:
          "Đèn lề đường, đèn tiếp cận, đèn chớp... được sản xuất nội địa, tiết kiệm chi phí và đáp ứng tiêu chuẩn kỹ thuật quốc tế.",
      },
      {
        icon: <Award className="custom-icon" />,
        text: "Triển khai mạng vệ tinh VSAT",
        description:
          "12 trạm VSAT phục vụ điều hành bay toàn quốc và kết nối quốc tế với Thái Lan, Lào, Campuchia.",
      },
      {
        icon: <Globe className="custom-icon" />,
        text: "Chứng nhận ISO 9001:2015",
        description:
          "Áp dụng hệ thống quản lý chất lượng hiện đại nhằm nâng cao hiệu quả sản xuất và kinh doanh.",
      },
      {
        icon: <Award className="custom-icon" />,
        text: "Các giải thưởng cấp nhà nước và chính phủ",
        description:
          "Nhận huân chương lao động hạng I, II, III và cờ thi đua xuất sắc của Bộ GTVT.",
      },
    ],
  };

  return (
    <>
      <div
        className="custom-content-img"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>
      <div className="custom-bg-box">
        <div className="custom-navbar">
          <button
            className={`custom-navbar-button ${
              activeTab === "overview" ? "active" : ""
            }`}
            onClick={() => setActiveTab("overview")}
          >
            Giới Thiệu Chung
          </button>
          <button
            className={`custom-navbar-button ${
              activeTab === "quality" ? "active" : ""
            }`}
            onClick={() => setActiveTab("quality")}
          >
            Chất Lượng Dịch Vụ
          </button>
        </div>
        <div className="custom-achievements">
          {data[activeTab].map((item, index) => (
            <div key={index} className="custom-achievement-item">
              <div className="custom-achievement-icon">{item.icon}</div>
              <div>
                <h3 className="custom-achievement-title">{item.text}</h3>
                <p className="custom-achievement-description">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CustomContentInfo;
