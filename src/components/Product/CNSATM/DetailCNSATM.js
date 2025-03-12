import React, { useState, useEffect } from "react";
import "../../../assets/css/News/Recruitment/Detail.css";

// API giả lập
const articleData = {
  title: "Hệ thống Băng phi diễn điện tử",
  time: "Đã kiểm tra",
  category: "Thiết bị Hàng không",
  content:
    "Hệ thống băng phi diễn điện tử (Electronic Flight Strip) là một sản phẩm trong lĩnh vực CNS do ATTECH sản xuất. Hệ thống cung cấp môi trường số hóa, công cụ hỗ trợ trực quan cho hoạt động chỉ huy điều hành bay của kiểm soát viên không lưu nhằm thay thế hoàn toàn cho việc sử dụng băng phi diễn bằng giấy được các KSVKL sử dụng trước đây. Hệ thống có thể dễ dàng triển khai, kết nối, chia sẻ dữ liệu và tích hợp hoạt động với các hệ thống thông tin khác như AMSS/AMHS/ADS-B…mà không ảnh hưởng đến các hoạt động của các hệ thống đã có.",
  imageUrl: "https://attech.com.vn/wp-content/uploads/2024/07/BPDDT-1.jpg", // Cập nhật với URL hình ảnh thực
  source: "ATTECH",
  features: [
    "Hỗ trợ trực quan cho hoạt động của KSVKL: Giao diện trực quan; Băng phi diễn có thể được tạo bằng tay hoặc tự động; Hệ thống có hiển thị, thao tác với các loại Băng phi diễn khác nhau; Thao tác, ghi chú, chỉnh sửa trực tiếp trên màn hình; Tra cứu dữ liệu tại chỗ theo ngữ cảnh, tra cứu tức thời thông tin liên quan đến từng chuyến bay.",
    "Tự động cập nhật thông tin chuyến bay từ điện văn FTN/AMHS: Xử lý và phân loại 26 loại điện văn như quy định trong tài liệu Icao Doc 4444, tự động cập nhật thông tin chuyến bay từ điện văn lên Băng phi diễn.",
    "Tự động cập nhật dữ liệu thời gian thực từ Hệ thống ADS-B: Dữ liệu ADS-B thời gian thực cập nhật trực tiếp các thông số chuyến bay lên Băn phi diễn của từng chuyến bay.",
    "Tự động tạo điện văn: Tự động tạo điện văn AFTN/AMHS từ thông số của chuyến bay và phát điện văn kết thúc điều hành chuyến bay tới địa chỉ cài đặt sẵn của hệ thống AMSS/AMHS.",
    "Tự động tính toán các giờ dự kiến qua các điểm báo cáo theo đường bay của từng chuyến bay.",
    "Tự động cảnh báo: Tự động cảnh báo tới KSVKL cho từng chuyến bay trong các trường hợp nhận diện điện văn cảnh báo.",
    "Tự động sắp xếp Băng phi diễn: Chương trình có thể tự động sắp các Băng phi diễn theo các tham số: Callsign, mực bay, ETA/ETD, ETO.",
    "Quản lý Băng phi diễn: Tạo, tìm kiếm, xem, sửa, xóa, lưu trữ và in ấn các Băng phi diễn trong hệ thống dễ dàng qua các tính năng của phần mềm.",
    "Giám sát: Hệ thống có chức năng giám sát hoạt động của hệ thống: Tình trạng các kết nối của hệ thống, tình trạng hoạt động của các Client trong hệ thống, tình trạng thu phát dữ liệu trong hệ thống.",
    "Mở rộng: Hệ thống có thể cấu hình, mở rộng đầu cuối dễ dàng, thuận tiện theo yêu cầu của khách hàng.",
  ],
  standards: [
    "ICAO Annex 10, volume II, chương 3, mục 3.4 và 3.5.",
    "ICAO Annex 13, về Tai nạn và điều tra tai nạn nói chung.",
    "EUROCAE ED-111 về Các đặc tính chức năng cho ghi âm mặt đất CNS/ATM.",
  ],
};

const DetailCNSATM = () => {
  const article = articleData;

  return (
    <div className="article-container">
      <h2 className="article-title">{article.title}</h2>
      <p className="article-meta">
        {article.category} • {article.time}
      </p>
      <img src={article.imageUrl} alt="article" className="article-image" />
      <p className="article-content">{article.content}</p>
      <p className="article-source">Nguồn: {article.source}</p>
      <div className="article-features">
        <h3>Đặc tính kỹ thuật:</h3>
        <ul>
          {article.features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </div>
      <div className="article-standards">
        <h3>Tiêu chuẩn áp dụng:</h3>
        <ul>
          {article.standards.map((standard, index) => (
            <li key={index}>{standard}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DetailCNSATM;
