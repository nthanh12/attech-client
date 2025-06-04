import React from "react";
import "./Financial.css";

const financialReports = [
  {
    title: "Báo cáo tài chính",
    description: "Báo cáo tài chính đã được kiểm toán năm 2024",
    date: "11-04-2025",
    file: {
      name: "BC TAI CHINH NAM 2024",
      url: "#",
      size: "1.11 MB"
    }
  },
  {
    title: "Báo cáo tài chính 6 tháng đầu năm 2024",
    description: "Báo cáo tài chính của doanh nghiệp 6 tháng đầu năm 2024.",
    date: "26-07-2024",
    file: {
      name: "BC tai chinh 6 thang dau nam 2024",
      url: "#",
      size: "1.18 MB"
    }
  },
  {
    title: "Báo cáo tài chính",
    description: "Báo cáo tài chính đã được kiểm toán năm 2023",
    date: "29-03-2024",
    file: {
      name: "BC tai chinh da duoc kiem toan nam 2023",
      url: "#",
      size: "1.21 MB"
    }
  },
  {
    title: "Báo cáo Tài chính 6 tháng đầu năm",
    description: "Báo cáo tài chính đã được kiểm toán 6 tháng đầu năm 2023 của Công ty TNHH Kỹ thuật QLB",
    date: "27-07-2023",
    file: {
      name: "BC tai chinh 6T dau nam 2023",
      url: "#",
      size: "1.32 MB"
    }
  }
];

const Financial = () => (
  <div className="financial-info">
    <table className="financial-table">
      <thead>
        <tr>
          <th>Tiêu đề</th>
          <th>Tài Liệu</th>
        </tr>
      </thead>
      <tbody>
        {financialReports.map((item, idx) => (
          <tr key={idx}>
            <td>
              <div className="report-title">{item.title}</div>
              <div className="report-desc">{item.description}</div>
              <div className="report-date">Ngày đăng: {item.date}</div>
            </td>
            <td>
              <a className="report-file" href={item.file.url} target="_blank" rel="noopener noreferrer">
                <i className="fa fa-file-pdf-o" style={{color: "#d32f2f", marginRight: 8}}></i>
                {item.file.name}
                <div className="file-size">({item.file.size})</div>
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default Financial;
