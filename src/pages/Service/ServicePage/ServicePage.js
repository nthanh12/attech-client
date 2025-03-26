import React, { useState } from "react";
import SidebarService from "../components/SidebarService/SidebarService";
import ServiceList from "../components/ServiceList/ServiceList";
import "../ServicePage/ServicePage.css";
import ServiceDetail from "../ServiceDetail/ServiceDetail";
import { Route, Routes } from "react-router-dom";

const Service = () => {
  const [openSidebar, setOpenSidebar] = useState(false);

  const services = [
    {
      id: 1,
      title: "Dịch vụ thông tin dẫn đường giám sát (CNS)",
      fullTitle:
        "Dịch Vụ Kỹ Thuật Chuyên Ngành Thông Tin, Dẫn Đường, Giám Sát (CNS)",
      description:
        "Cung cấp các giải pháp kỹ thuật tiên tiến trong lĩnh vực thông tin, dẫn đường và giám sát hàng không.",
      image:
        "https://attech.com.vn/wp-content/uploads/2015/05/dichvuKTCNS2.png",
      details: [
        "Cung cấp dịch vụ kỹ thuật cho thiết bị thông tin, dẫn đường và giám sát",
        "Đảm bảo độ chính xác và an toàn cao nhất",
        "Hỗ trợ kỹ thuật 24/7",
      ],
      process: [
        "Khảo sát và đánh giá hệ thống",
        "Phân tích chi tiết nhu cầu kỹ thuật",
        "Triển khai giải pháp chuyên nghiệp",
        "Hỗ trợ và bảo trì liên tục",
      ],
      benefits: [
        "Nâng cao hiệu suất hệ thống",
        "Giảm thiểu rủi ro kỹ thuật",
        "Đáp ứng tiêu chuẩn quốc tế",
      ],
    },
    {
      id: 2,
      title: "Dịch vụ Bay kiểm tra hiệu chuẩn",
      fullTitle: "Dịch Vụ Bay Kiểm Tra Hiệu Chuẩn",
      description:
        "Cung cấp dịch vụ bay kiểm tra, đảm bảo tiêu chuẩn an toàn và chính xác cho các hệ thống hàng không.",
      image: "https://attech.com.vn/wp-content/uploads/2015/05/dichvuBHC.png",
      details: [
        "Bay kiểm tra hệ thống dẫn đường, giám sát hàng không",
        "Đảm bảo các thiết bị đạt tiêu chuẩn kỹ thuật",
        "Hỗ trợ kiểm định theo yêu cầu của cơ quan chức năng",
      ],
      process: [
        "Khảo sát và lập kế hoạch kiểm tra",
        "Thực hiện bay kiểm tra thực tế",
        "Đánh giá và báo cáo kết quả",
        "Đề xuất giải pháp khắc phục (nếu cần)",
      ],
      benefits: [
        "Đảm bảo độ chính xác của hệ thống dẫn đường",
        "Tuân thủ tiêu chuẩn hàng không quốc tế",
        "Nâng cao an toàn bay",
      ],
    },
    {
      id: 3,
      title: "Dịch vụ Thử nghiệm - Hiệu chuẩn",
      fullTitle: "Dịch Vụ Thử Nghiệm - Hiệu Chuẩn Thiết Bị",
      description:
        "Cung cấp dịch vụ thử nghiệm và hiệu chuẩn thiết bị hàng không, đảm bảo tiêu chuẩn chất lượng.",
      image:
        "https://attech.com.vn/wp-content/uploads/2015/02/anh-thu-nghiem-hieu-chuan-2019.jpg",
      details: [
        "Thử nghiệm, hiệu chuẩn thiết bị hàng không",
        "Đảm bảo thiết bị hoạt động chính xác",
        "Cung cấp chứng nhận hiệu chuẩn",
      ],
      process: [
        "Tiếp nhận và kiểm tra thiết bị",
        "Thực hiện quy trình hiệu chuẩn",
        "Đánh giá kết quả và cấp chứng nhận",
        "Hỗ trợ tư vấn kỹ thuật sau hiệu chuẩn",
      ],
      benefits: [
        "Đảm bảo thiết bị đạt tiêu chuẩn",
        "Nâng cao độ tin cậy của hệ thống",
        "Tiết kiệm chi phí sửa chữa",
      ],
    },
    {
      id: 4,
      title: "Dịch vụ Kỹ thuật (Hàng không)",
      fullTitle: "Dịch Vụ Kỹ Thuật Trong Lĩnh Vực Hàng Không",
      description:
        "Cung cấp dịch vụ bảo dưỡng, sửa chữa và lắp đặt thiết bị hàng không.",
      image:
        "https://media.thanhtra.com.vn/public/uploads/2024/12/13/675c55d0557adf10a0f3e5cd.jpg?w=1319",
      details: [
        "Bảo trì và sửa chữa thiết bị hàng không",
        "Tích hợp hệ thống công nghệ tiên tiến",
        "Hỗ trợ kỹ thuật và tư vấn chuyên sâu",
      ],
      process: [
        "Khảo sát tình trạng thiết bị",
        "Thực hiện bảo dưỡng theo tiêu chuẩn",
        "Kiểm tra và thử nghiệm sau bảo trì",
        "Bàn giao thiết bị đảm bảo chất lượng",
      ],
      benefits: [
        "Tăng tuổi thọ thiết bị",
        "Giảm thiểu sự cố kỹ thuật",
        "Tối ưu chi phí bảo trì",
      ],
    },
    {
      id: 5,
      title: "Dịch vụ Huấn luyện - Đào tạo",
      fullTitle: "Dịch Vụ Huấn Luyện Và Đào Tạo Nhân Sự",
      description:
        "Chương trình đào tạo chuyên sâu cho nhân sự trong lĩnh vực hàng không.",
      image:
        "https://attech.com.vn/wp-content/uploads/2015/02/DV-HLDT-small.jpg",
      details: [
        "Đào tạo nhân sự kỹ thuật hàng không",
        "Cập nhật công nghệ và quy trình mới",
        "Cung cấp chứng chỉ đào tạo chuyên môn",
      ],
      process: [
        "Khảo sát nhu cầu đào tạo",
        "Thiết kế chương trình đào tạo phù hợp",
        "Giảng dạy và thực hành chuyên sâu",
        "Đánh giá và cấp chứng chỉ hoàn thành",
      ],
      benefits: [
        "Nâng cao kỹ năng chuyên môn",
        "Đáp ứng yêu cầu ngành hàng không",
        "Phát triển đội ngũ nhân sự chất lượng cao",
      ],
    },
    {
      id: 6,
      title: "Dịch vụ tư vấn đầu tư xây dựng và QLDA",
      fullTitle: "Dịch Vụ Tư Vấn Đầu Tư Xây Dựng Và Quản Lý Dự Án",
      description:
        "Cung cấp giải pháp tư vấn đầu tư, xây dựng và quản lý dự án hàng không.",
      image: "https://attech.com.vn/wp-content/uploads/2015/02/TVTK-anhs.jpg",
      details: [
        "Tư vấn lập dự án đầu tư hàng không",
        "Thiết kế và giám sát thi công",
        "Quản lý dự án theo tiêu chuẩn quốc tế",
      ],
      process: [
        "Khảo sát và nghiên cứu khả thi",
        "Lập kế hoạch và thiết kế dự án",
        "Triển khai và giám sát thi công",
        "Nghiệm thu và bàn giao dự án",
      ],
      benefits: [
        "Tối ưu chi phí và hiệu quả đầu tư",
        "Đảm bảo tiến độ và chất lượng dự án",
        "Tuân thủ tiêu chuẩn kỹ thuật và an toàn",
      ],
    },
  ];

  return (
    <div className="page-service">
      {/* Sidebar cố định */}
      <SidebarService
        openSidebar={openSidebar}
        setOpenSidebar={setOpenSidebar}
      />

      <div
        className={openSidebar ? "service-content resize" : "service-content"}
      >
        <Routes>
          <Route path="/" element={<ServiceList services={services} />} />
          <Route
            path=":serviceId"
            element={<ServiceDetail services={services} />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default Service;
