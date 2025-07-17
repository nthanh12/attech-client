import React from "react";
import "./Financial.css";

const financialReports = [
  {
    title: "Báo cáo tài chính",
    description: "Báo cáo tài chính đã được kiểm toán năm 2024",
    date: "11-04-2025",
    file: {
      name: "BC TAI CHINH NAM 2024",
      url: "https://attech.com.vn/wp-content/uploads/2025/04/BC-TAI-CHINH-NAM-2024.pdf",
      size: "1.11 MB"
    }
  },
  {
    title: "Báo cáo tài chính 6 tháng đầu năm 2024",
    description: "Báo cáo tài chính của doanh nghiệp 6 tháng đầu năm 2024.",
    date: "26-07-2024",
    file: {
      name: "BC tai chinh 6 thang dau nam 2024",
      url: "https://attech.com.vn/wp-content/uploads/2024/07/BC-tai-chinh-6-thang-dau-nam-2024.pdf",
      size: "1.18 MB"
    }
  },
  {
    title: "Báo cáo tài chính",
    description: "Báo cáo tài chính đã được kiểm toán năm 2023",
    date: "29-03-2024",
    file: {
      name: "BC tai chinh da duoc kiem toan nam 2023",
      url: "https://attech.com.vn/wp-content/uploads/2024/03/BC-tai-chinh-da-duoc-kiem-toan-nam-2023.pdf",
      size: "1.21 MB"
    }
  },
  {
    title: "Báo cáo Tài chính 6 tháng đầu năm",
    description: "Báo cáo tài chính đã được kiểm toán 6 tháng đầu năm 2023 của Công ty TNHH Kỹ thuật QLB",
    date: "27-07-2023",
    file: {
      name: "BC tai chinh 6T dau nam 2023",
      url: "https://attech.com.vn/wp-content/uploads/2023/07/BC-tai-chinh-6T-dau-nam-2023.pdf",
      size: "1.32 MB"
    }
  },
  {
    title: "Báo cáo Tài chính",
    description: "Báo cáo tài chính đã được kiểm toán năm 2022",
    date: "31-03-2023",
    file: {
      name: "Bao cao tai chinh 2022",
      url: "https://attech.com.vn/wp-content/uploads/2023/03/Bao-cao-tai-chinh-2022.pdf",
      size: "594.55 KB"
    }
  },
  {
    title: "Báo cáo Tài chính 6 tháng đầu năm",
    description: "Báo cáo Tài chính đã được kiểm toán 6 tháng đầu năm 2022 của Công ty TNHH Kỹ thuật QLB",
    date: "27-07-2023",
    file: {
      name: "Bao cao tai chinh 6T dau nam 2022",
      url: "https://attech.com.vn/wp-content/uploads/2022/07/Bao-cao-tai-chinh-6T-dau-nam-2022.pdf",
      size: "546.04 KB"
    }
  }
];

const FinancialReportRow = ({ item }) => (
  <tr>
    <td>
      <div className="report-title">{item.title}</div>
      <div className="report-desc">{item.description}</div>
    </td>
    <td>
      <span className="report-date">{item.date}</span>
    </td>
    <td>
      {item.file.url && item.file.url !== "#" ? (
        <a className="report-file" href={item.file.url} target="_blank" rel="noopener noreferrer">
          <i className="fa fa-file-pdf-o" style={{color: "#d32f2f", marginRight: 8, fontSize: 20}}></i>
          <span>{item.file.name}</span>
          <span className="file-size">({item.file.size})</span>
          <button style={{marginLeft: 10, padding: '2px 10px', border: 'none', background: '#1976d2', color: '#fff', borderRadius: 4, cursor: 'pointer', fontSize: 13}}>Tải về</button>
        </a>
      ) : (
        <span style={{color: '#888'}}>Chưa có file</span>
      )}
    </td>
  </tr>
);

const Financial = () => (
  <div className="financial-page">
    <div className="financial-header">
      <i className="fa fa-bar-chart" style={{fontSize: 32, color: '#1976d2', marginRight: 18}} />
      <div>
        <h1>Báo cáo tài chính</h1>
        <p className="financial-desc">
          Trang thông tin tổng hợp các báo cáo tài chính của Công ty TNHH Kỹ thuật Quản lý bay.
        </p>
      </div>
    </div>
    <div className="financial-info">
      <table className="financial-table">
        <thead>
          <tr>
            <th>Tiêu đề</th>
            <th>Ngày đăng</th>
            <th>Tài Liệu</th>
          </tr>
        </thead>
        <tbody>
          {financialReports.length === 0 ? (
            <tr>
              <td colSpan={3} style={{textAlign: 'center', color: '#888', padding: 32}}>
                Chưa có báo cáo tài chính nào.
              </td>
            </tr>
          ) : (
            financialReports.map((item, idx) => (
              <FinancialReportRow item={item} key={idx} />
            ))
          )}
        </tbody>
      </table>
    </div>
  </div>
);

export default Financial;
