import React from "react";
import "../../../assets/css/News/Recruitment/Detail.css";

// API giả lập
const articleData = {
  title: "Dịch vụ kỹ thuật CNS",
  time: "Đã kiểm tra",
  category: "Dịch vụ Hàng không",
  content:
    "Đội Bay kiểm tra hiệu chuẩn được thành lập theo Quyết định số 115/QĐ-KTQLB ngày 19 tháng 08 năm 2010 với nhiệm vụ Tổ chức cung cấp dịch vụ bay kiểm tra hiệu chuẩn các thiết bị dẫn đường giám sát hàng không và bay đánh giá phương thức bay. Năm 2010 Cục Hàng không Việt Nam đã cấp giấy phép công nhận ATTECH là nhà cung cấp dịch vụ bay kiểm tra hiệu chuẩn và bay đánh giá phương thức bay duy nhất tại Việt Nam tuân thủ và đáp ứng đầy đủ các tiêu chuẩn khuyến cáo của tổ chức hàng không dân dụng quốc tế ICAO, quy định pháp luật hiện hành của Nhà nước.",
  imageUrl: "https://attech.com.vn/wp-content/uploads/2015/02/DV-BHC1.jpg", // Cập nhật với URL hình ảnh thực
  source: "ATTECH",
  features: [
    "Dịch vụ bay kiểm tra hiệu chuẩn, bay đánh giá phương thức bay của ATTECH sử dụng tàu bay hai động cơ cỡ nhỏ đã được cải tiến, lắp đặt anten và thiết bị bay hiệu chuẩn công nghệ tiên tiến trên thế giới.",
    "Hệ thống thiết bị bay hiệu chuẩn, bay đánh giá phương thức bay lắp trên máy bay là hệ thống thiết bị bay hiệu chuẩn hoàn toàn tự động sử dụng công nghệ tiên tiến nhất trên thế giới hiện nay.",
    "Hệ thống tham chiếu vị trí DGPS dưới mặt đất có độ chính xác cao (sai số dưới 10cm) cho phép thực hiện bay hiệu chuẩn các thiết bị yêu cầu độ chính xác cao như ILS/DME, PAPI.",
    "Bằng việc sử dụng công nghệ bay hiệu chuẩn hoàn toàn tự động mới, thiết bị bay hiệu chuẩn có khả năng: Bay hiệu chuẩn hệ thống ILS đến Cat III, Thu thập và xử lý dữ liệu trong thời gian thực, lưu trữ dữ liệu bay hiệu chuẩn liên tục trong quá trình thực hiện nhiệm vụ, Thu thập và xử lý dữ liệu song song đồng thời khi thực hiện bay hiệu chuẩn thiết bị VOR và ILS, Các thông số kết quả đo và đồ thị được hiển thị trong thời gian thực, In kết quả ngay lập tức trong quá trình bay hiệu chuẩn.",
  ],
  team: [
    "Phi công bay hiệu chuẩn (inspector pilot) và thanh tra bay hiệu chuẩn (flight inspector) của ATTECH là những người có hơn 10 năm kinh nghiệm, am hiểu sâu về thiết bị dẫn đường, phương thức bay, được đào tạo bài bản tại các trung tâm huấn luyện hàng đầu Châu Âu trong lĩnh vực bay kiểm tra hiệu chuẩn, bay đánh giá phương thức bay và được Cục Hàng không Việt Nam công nhận năng lực và cấp giấy phép.",
  ],
  services: [
    "Với hệ thống thiết bị và nguồn lực đội bay hiện có, ATTECH có khả năng thực hiện bay kiểm tra, hiệu chuẩn các hệ thống dẫn đường giám sát: ILS/DME Cat I, II, III, VOR/DME, NDB, RADAR (PSR, SSR), MARKER Beacon, PAPI, Hệ thống đèn hiệu sân bay.",
    "Bay kiểm tra hiệu chuẩn, đánh giá phương thức dẫn đường theo tính năng PBN: RNAV/RNP: RNAV/RNP SID, RNAV/RNP STAR, RNP APCH (LNAV), RNP APCH (LNAV/VNAV).",
    "Các hình thức bay hiệu chuẩn: Bay hiệu chuẩn cơ bản (Commissionning), Bay hiệu chuẩn định kỳ (Routine), Bay hiệu chuẩn đặc biệt (Special).",
  ],
  standards: [
    "Luật Hàng không dân dụng Việt Nam.",
    "Thông tư 19/2017/TT-BGTVT quy định về quản lý và bảo đảm hoạt động bay.",
    "Tài liệu hướng dẫn cung cấp dịch vụ bay kiểm tra hiệu chuẩn.",
    "Tài liệu ICAO: Annex 10, Doc 8071, Doc 9906.",
  ],
};

const DetailDVKTCNS = () => {
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
      <div className="article-team">
        <h3>Đội bay:</h3>
        <ul>
          {article.team.map((member, index) => (
            <li key={index}>{member}</li>
          ))}
        </ul>
      </div>
      <div className="article-services">
        <h3>Dịch vụ cung cấp:</h3>
        <ul>
          {article.services.map((service, index) => (
            <li key={index}>{service}</li>
          ))}
        </ul>
      </div>
      <div className="article-standards">
        <h3>Tiêu chuẩn đáp ứng/ Tài liệu áp dụng:</h3>
        <ul>
          {article.standards.map((standard, index) => (
            <li key={index}>{standard}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DetailDVKTCNS;
