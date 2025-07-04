import React, { useState } from "react";
import NotificationSection from "../components/NotificationSection/NotificationSection";
import "./NotificationPage.css";

const Notification = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const recruitmentNotifications = [
    {
      id: 1,
      slug: "danh-sach-nhan-su-trung-tuyen-dot-3-nam-2024",
      title: "Danh sách nhân sự trúng tuyển đợt 3 năm 2024",
      image: "https://jobsgo.vn/blog/wp-content/uploads/2021/05/mau-1.jpg",
      date: "2024-03-15",
      category: "Tuyển dụng",
      readTime: "5 phút"
    },
    {
      id: 2,
      slug: "thong-tin-tuyen-dung-dot-3-nam-2024",
      title: "Thông tin tuyển dụng đợt 3 năm 2024",
      image: "https://jobsgo.vn/blog/wp-content/uploads/2021/05/mau-1.jpg",
      date: "2024-03-10",
      category: "Tuyển dụng",
      readTime: "3 phút"
    },
    {
      id: 3,
      slug: "thong-tin-tuyen-dung-vi-tri-nhan-vien-ke-toan",
      title: "Tuyển dụng nhân viên kế toán",
      image: "https://jobsgo.vn/blog/wp-content/uploads/2021/05/mau-1.jpg",
      date: "2024-03-05",
      category: "Tuyển dụng",
      readTime: "4 phút"
    },
    {
      id: 4,
      slug: "thong-tin-tuyen-dung-vi-tri-nhan-vien-kinh-doanh",
      title: "Tuyển dụng nhân viên kinh doanh",
      image: "https://jobsgo.vn/blog/wp-content/uploads/2021/05/mau-1.jpg",
      date: "2024-03-01",
      category: "Tuyển dụng",
      readTime: "3 phút"
    },
  ];

  const otherNotifications = [
    {
      id: 1,
      slug: "thong-bao-lich-nghi-le-30-4",
      title: "Thông báo lịch nghỉ lễ 30/4 và 1/5",
      image: "https://attech.com.vn/wp-content/uploads/2018/12/Ong-NDSon-TCCBTCT.jpg",
      date: "2024-03-14",
      category: "Tin tức",
      readTime: "2 phút"
    },
    {
      id: 2,
      slug: "ket-nap-dang-vien-moi",
      title: "Lễ kết nạp đảng viên mới",
      image: "https://attech.com.vn/wp-content/uploads/2024/04/ket-nap-D-Thanh-Hung-Anh1.jpg",
      date: "2024-03-12",
      category: "Sự kiện",
      readTime: "4 phút"
    },
    {
      id: 3,
      slug: "nghiem-thu-cong-trinh",
      title: "Nghiệm thu công trình cấp điện",
      image: "https://attech.com.vn/wp-content/uploads/2020/05/Nghiem-thu-CT-cap-dien-NB1.jpg",
      date: "2024-03-08",
      category: "Tin tức",
      readTime: "3 phút"
    },
    {
      id: 4,
      slug: "hop-mat-doan-thanh-nien",
      title: "Họp mặt đoàn thanh niên",
      image: "https://jobsgo.vn/blog/wp-content/uploads/2021/05/mau-1.jpg",
      date: "2024-03-05",
      category: "Sự kiện",
      readTime: "2 phút"
    },
  ];

  const filteredRecruitmentNotifications = recruitmentNotifications.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredOtherNotifications = otherNotifications.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="notification">
      <NotificationSection
        title="Tin tuyển dụng"
        notifications={filteredRecruitmentNotifications}
        type="recruitment"
      />
      <NotificationSection
        title="Thông báo khác"
        notifications={filteredOtherNotifications}
        type="other"
      />
    </div>
  );
};

export default Notification;
