import SliderNotification from "../components/SliderNotification/SliderNotification";
import MainNotification from "../components/MainNotification/MainNotification";
import "./NotificationPage.css";
import SubNotification from "../components/SubNotification/SubNotification";

const Notification = () => {
  const projectData = [
    {
      title:
        "Tổ chức khóa “Đào tạo ban đầu để cấp chứng chỉ chuyên môn Thông tin, Giám sát hàng không” cho đội ngũ nhân viên bảo đảm hoạt động bay của Công ty TNHH Kỹ thuật Quản lý bay",
      image:
        "https://attech.com.vn/wp-content/uploads/2025/01/thong-tin-10-1-2.jpg",
      description:
        "Công ty TNHH Kỹ thuật Quản lý bay tổ chức khóa “Đào tạo ban đầu để cấp chứng chỉ chuyên môn Thông tin, Giám sát hàng không” cho 30 lượt học viên là nhân viên CNS mới tuyển dụng năm 2024 theo Chương trình đào tạo mới được Cục Hàng không phê duyệt tại Quyết định số 2936/QĐ-CHK ngày 26/11/2024. ",
    },
    {
      title:
        "Khai giảng khóa “Huấn luyện về phòng cháy chữa cháy và cứu nạn cứu hộ”",
      image:
        "https://attech.com.vn/wp-content/uploads/2024/12/hl-pccc-12-10-1.jpg",
      description:
        "Ngày 9/12/2024, Trung tâm huấn luyện CNS – Công ty TNHH Kỹ thuật Quản lý bay đã phối hợp với Đội Cảnh sát phòng cháy chữa cháy quận Long Biên tổ chức khóa “Huấn luyện về phòng cháy chữa cháy và cứu nạn cứu hộ”. ",
      link: "singlepost.html",
    },
    {
      title:
        "Công ty TNHH Kỹ thuật Quản lý bay tổ chức Lễ kỷ niệm 42 năm Ngày Nhà giáo Việt Nam 20/11/2024",
      image:
        "https://attech.com.vn/wp-content/uploads/2024/11/TTHL-21-11-5.jpg",
      description:
        "Ngày 20/11/2024, Trung tâm huấn luyện CNS – Công ty TNHH Kỹ thuật Quản lý bay tổ chức Lễ kỷ niệm 42 năm ngày Nhà giáo Việt Nam 20/11. Buổi lễ tôn vinh và ghi nhận những đóng góp vô cùng quan trọng của những người làm công tác giáo dục, đào tạo – những người thầy, người cô đã và đang cống hiến hết mình vì sự nghiệp phát triển nguồn nhân lực chất lượng cao cho Công ty.",
      link: "singlepost.html",
    },
    {
      title:
        "Khai giảng khóa huấn luyện “Nhân viên mới” và “Đào tạo ban đầu để cấp chứng chỉ chuyên môn nhân viên CNS”t",
      image: "https://attech.com.vn/wp-content/uploads/2024/11/nvm-13-11-2.jpg",
      description:
        "Ngày 11/11/2024, Trung tâm huấn luyện CNS – Công ty TNHH Kỹ thuật Quản lý bay đã tổ chức khóa huấn luyện “Nhân viên mới” và “Đào tạo ban đầu để cấp chứng chỉ chuyên môn nhân viên CNS”. Tham dự lễ khai giảng có bà Nguyễn Tố Loan – Phó Trưởng Trung tâm Huấn luyện CNS. ",
      link: "singlepost.html",
    },
  ];

  return (
    <div className="notification">
      <SliderNotification />
      <MainNotification />
      <SubNotification projects={projectData} />
    </div>
  );
};

export default Notification;
