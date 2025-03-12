import React from "react";
import "../../assets/css/Information/Default.css";

const Default = () => {
  const documents = [
    {
      title: "Quyết định số 709/QĐ-CTCT",
      description:
        "Quyết định số 709/QĐ-CTCT ngày 19/12/2024 v/v thay đổi ngành, nghề kinh doanh của Chi nhánh tại TP. Hồ Chí Minh",
      date: "30-12-2024",
      document:
        "709 QĐ-CTCT_Thay đổi ngành, nghề kinh doanh của CN HCM_19.12 (60.86 KB)",
    },
    {
      title: "Quyết định 423/QĐ-HĐTV",
      description:
        "Quyết định phê duyệt Điều lệ tổ chức và hoạt động của Công ty Kỹ thuật TNHH Quản lý bay.",
      date: "20-08-2024",
      document: "423 QĐ-HĐTV (2.63 MB)",
    },
    {
      title:
        "Báo cáo thực trạng quản trị và cơ cấu tổ chức 6 tháng đầu năm 2024",
      description:
        "Báo cáo thực trạng quản trị và cơ cấu tổ chức của doanh nghiệp 6 tháng đầu năm 2024.",
      date: "26-07-2024",
      document:
        "BC thực trạng quản trị và cơ cấu tổ chức 6T đầu năm 2024 (207.69 KB)",
    },
    {
      title: "Báo cáo thực trạng quản trị và cơ cấu tổ chức",
      description:
        "Báo cáo thực trạng quản trị và cơ cấu tổ chức của Doanh nghiệp năm 2023",
      date: "26-08-2024",
      document: "BC thực trạng QT & CCTC 2023 (607.44 KB)",
    },
    {
      title: "Báo cáo kết quả thực hiện các nhiệm vụ công ích",
      description:
        "Báo cáo kết quả thực hiện các nhiệm vụ công ích và trách nhiệm xã hội năm 2023",
      date: "28-06-2024",
      document: "BC nhiệm vụ công ích & TNXH 2023 (50.05 KB)",
    },
  ];

  return (
    <div className="temporary-component">
      <h2>Thông tin công ty</h2>
      <table>
        <thead>
          <tr>
            <th>Tiêu đề</th>
            <th>Tài Liệu</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((doc, index) => (
            <tr key={index}>
              <td>
                <h3>{doc.title}</h3>
                <p>{doc.description}</p>
                <p>
                  <strong>Ngày đăng:</strong> {doc.date}
                </p>
              </td>
              <td>
                <a href="#">{doc.document}</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Default;
