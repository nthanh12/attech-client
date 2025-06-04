import NotificationSection from "../components/NotificationSection/NotificationSection";
import "./NotificationPage.css";

const Notification = () => {
  const recruitmentNotifications = [
    {
      id: 1,
      slug: "danh-sach-nhan-su-trung-tuyen-dot-3-nam-2024",
      title: "Danh sách nhân sự trúng tuyển đợt 3 năm 2024",
      image: "https://jobsgo.vn/blog/wp-content/uploads/2021/05/mau-1.jpg",
    },
    {
      id: 2,
      slug: "thong-tin-tuyen-dung-dot-3-nam-2024",
      title: "Thông tin tuyển dụng đợt 3 năm 2024",
      image: "https://jobsgo.vn/blog/wp-content/uploads/2021/05/mau-1.jpg",
    },
    {
      id: 3,
      slug: "thong-tin-tuyen-dung-vi-tri-nhan-vien-ke-toan",
      title: "Thông tin tuyển dụng vị trí nhân viên kế toán",
      image: "https://jobsgo.vn/blog/wp-content/uploads/2021/05/mau-1.jpg",
    },
    {
      id: 4,
      slug: "danh-sach-nhan-su-trung-tuyen-dot-3-nam-2024",
      title: "Thông tin tuyển dụng vị trí nhân viên kế toán",
      image: "https://jobsgo.vn/blog/wp-content/uploads/2021/05/mau-1.jpg",
    },
  ];

  const otherNotifications = [
    {
      id: 1,
      slug: "sub-thong-bao-1",
      title: "Thông báo phụ 1",
      image: "https://attech.com.vn/wp-content/uploads/2018/12/Ong-NDSon-TCCBTCT.jpg",
    },
    {
      id: 2,
      slug: "sub-thong-bao-2",
      title: "Thông báo phụ 2",
      image: "https://attech.com.vn/wp-content/uploads/2024/04/ket-nap-D-Thanh-Hung-Anh1.jpg",
    },
    {
      id: 3,
      slug: "sub-thong-bao-3",
      title: "Thông báo phụ 3",
      image: "https://attech.com.vn/wp-content/uploads/2020/05/Nghiem-thu-CT-cap-dien-NB1.jpg",
    },
    {
      id: 4,
      slug: "sub-thong-bao-4",
      title: "Thông báo phụ 4",
      image: "https://jobsgo.vn/blog/wp-content/uploads/2021/05/mau-1.jpg",
    },
  ];

  return (
    <div className="notification">
      <NotificationSection
        title="Tin tuyển dụng"
        notifications={recruitmentNotifications}
        viewAllLink="/notification/recruitment"
      />
      <NotificationSection
        title="Thông báo khác"
        notifications={otherNotifications}
        viewAllLink="/notification/other"
      />
    </div>
  );
};

export default Notification;
