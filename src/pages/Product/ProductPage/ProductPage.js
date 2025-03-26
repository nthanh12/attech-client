import React, { useState } from "react";
import "../ProductPage/ProductPage.css";
import { Route, Routes } from "react-router-dom";
import SidebarProduct from "../components/SiderbarProduct/SidebarProduct";
import ProductList from "../components/ProductList/ProductList";
import ProductDetail from "../ProductDetail/ProductDetail";

const Product = () => {
  const [openSidebar, setOpenSidebar] = useState(false);

  const products = [
    {
      id: 1,
      title: "Hệ thống xử lý dữ liệu ADS-B",
      fullTitle: "Hệ Thống Xử Lý Dữ Liệu ADS-B",
      description:
        "Giải pháp thay thế radar thông thường, tăng cường khả năng giám sát hoạt động bay an toàn hơn và hiệu quả hơn.",
      image: "https://attech.com.vn/wp-content/uploads/2015/06/ADS-B1.jpg",
      details: [
        "Hợp nhất dữ liệu chuẩn ASTERIX CAT 21 từ hệ thống máy thu",
        "Chuyển đổi dữ liệu ASTERIX CAT 21 sang dạng yêu cầu",
        "Lọc dữ liệu theo SIC/SAC, độ cao, vùng địa lý, chất lượng bản tin",
        "Theo dõi và ghi nhật ký tình trạng hoạt động của các trạm mặt đất",
        "Liên kết chia sẻ số liệu với các trung tâm xử lý khác",
      ],
      process: [
        "Nhận, giải mã thông tin ADS-B ASTERIX CAT 21",
        "Hiển thị dữ liệu giám sát và chức năng bám mục tiêu thời gian thực",
        "Cảnh báo va chạm và bay vào khu vực cấm",
        "Lưu dấu vết máy bay và ghi lịch trình hoạt động vào cơ sở dữ liệu",
        "Hiển thị vector vận tốc và thực hiện các phép đo đạc",
      ],
      benefits: [
        "Tăng cường độ chính xác giám sát",
        "Đảm bảo sử dụng không phận hiệu quả hơn",
        "Cảnh báo an toàn với độ tin cậy cao",
      ],
    },
    {
      id: 2,
      title: "Hệ thống luân chuyển điện văn không lưu AMHS",
      fullTitle: "Hệ Thống Luân Chuyển Điện Văn Không Lưu AMHS",
      description:
        "Hệ thống AMHS tương thích tiêu chuẩn ICAO, ITU với giải pháp truyền điện văn toàn diện trên nền mạng ATN.",
      image: "https://attech.com.vn/wp-content/uploads/2015/06/AMHS.jpg",
      details: [
        "Phát triển dựa trên các tiêu chuẩn X.400, X.500 của ITU",
        "Tương thích với ICAO AMHS SARPs và tiêu chuẩn khu vực",
        "Cung cấp dịch vụ AMHS cơ bản và mở rộng",
        "Quản lý hàng chờ và lưu trữ điện văn, nhật ký hoạt động",
        "Hỗ trợ giao thức ITU-T X400, P7, P3, và P1",
      ],
      process: [
        "Triển khai tại một điểm hoặc nhiều điểm với cấu hình sao lưu",
        "Sử dụng giao thức quản lý SNMP để giám sát hệ thống",
        "Chuyển đổi định dạng và địa chỉ (AFTN tới/từ AMHS)",
        "Lưu trữ và truy vết điện văn theo tham số",
        "Phân tích hiệu quả để khắc phục lỗi và hỗ trợ giám sát từ xa",
      ],
      benefits: [
        "Tạo môi trường chuyển tiếp tới ATN cho các hệ thống tự động",
        "Hỗ trợ danh sách phân phối và định tuyến linh hoạt",
        "Đáp ứng các tiêu chuẩn hàng không quốc tế với độ tin cậy cao",
      ],
    },
    {
      id: 3,
      title: "Hệ thống chuyển tiếp điện văn tự động AMSS",
      fullTitle: "Hệ Thống Chuyển Tiếp Điện Văn Tự Động AMSS",
      description:
        "Hệ thống AMSS giúp chuyển tiếp và phân phối điện văn phục vụ trao đổi thông tin điều hành hàng không quốc gia và quốc tế.",
      image: "https://attech.com.vn/wp-content/uploads/2015/06/AMSS.jpg",
      details: [
        "Lắp đặt tại các Trung tâm truyền tin AFTN",
        "Hoạt động ổn định, chính xác và thuận tiện bảo trì",
        "Hai server chuyên dụng với chế độ Hot Stand-by",
        "Hệ thống mở với kiến trúc modul hóa và dự phòng nóng",
        "Giao diện đơn giản, trực quan và nhất quán",
      ],
      process: [
        "Cung cấp cơ chế Hot Stand-by cho mạng LAN",
        "Quản lý và giám sát với giao diện thân thiện",
        "Cấu hình linh hoạt và đảm bảo độ tin cậy cao",
        "Đáp ứng điều kiện lắp đặt về điện, nhiệt độ và độ ẩm",
        "Dễ dàng mở rộng hệ thống khi cần thiết",
      ],
      benefits: [
        "Đảm bảo luồng thông tin liên tục trong quản lý bay",
        "Dễ bảo trì, mở rộng và nâng cao hiệu quả vận hành",
        "Phù hợp tiêu chuẩn yêu cầu kỹ thuật quốc tế",
      ],
    },
  ];

  return (
    <div className="page-product">
      {/* Sidebar cố định */}
      <SidebarProduct
        openSidebar={openSidebar}
        setOpenSidebar={setOpenSidebar}
      />

      <div
        className={openSidebar ? "product-content resize" : "product-content"}
      >
        <Routes>
          <Route path="/" element={<ProductList products={products} />} />
          <Route
            path=":productId"
            element={<ProductDetail products={products} />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default Product;
