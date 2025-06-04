import React from "react";
import "./WeeklyNews.css";
import weeklyNews2 from "../../../../assets/imgs/news/weeklyNews2.jpg";
import weeklyNews1 from "../../../../assets/imgs/news/weeklyNews1.jpg";
import weeklyNews3 from "../../../../assets/imgs/news/weeklyNews3.jpg";
import { Link } from "react-router-dom";
import ViewAllButton from "../../../../components/ViewAllButton/ViewAllButton";

const categoryMap = {
  activity: "Hoạt động công ty",
  party: "Đảng bộ công ty",
  young: "Đoàn thanh niên công ty",
  union: "Công đoàn công ty",
};

const newsData = [
  {
    id: 1,
    image: "https://attech.com.vn/wp-content/uploads/2025/02/dh-chi-bo-xdvkt-27-2-3.jpg",
    category: "party",
    title: "Đảng bộ bộ phận xưởng DVKT chỉ đạo tổ chức thành công đại hội tại các chi bộ trực thuộc nhiệm kỳ 2025-2027",
    time: "20/03/2025",
  },
  {
    id: 2,
    image: "https://attech.com.vn/wp-content/uploads/2025/02/dh-chi-bo-XN-27-2-3.jpg",
    category: "party",
    title: "Đại hội chi bộ Xí nghiệp chế tạo thiết bị hàng không nhiệm kỳ 2025-2027",
    time: "20/03/2025",
  },
  {
    id: 3,
    image: "https://attech.com.vn/wp-content/uploads/2025/03/elearning-28-3-1.jpg",
    category: "young",
    title: "Thanh niên ATTECH đẩy nhanh tiến độ thực hiện Công trình thanh niên \"Quay video bài giảng trực tuyến\" chào mừng tháng Thanh niên 2025",
    time: "20/03/2025",
  },
  {
    id: 4,
    image: "https://attech.com.vn/wp-content/uploads/2019/08/H%E1%BB%99i-ngh%E1%BB%8B-BCH-C%C4%90TCT-2019.jpg",
    category: "union",
    title: "Công đoàn Công ty TNHH Kỹ thuật Quản lý bay vinh dự nhận Bằng khen của Tổng Liên đoàn Lao động Việt Nam",
    time: "20/03/2025",
  },
  // {
  //   id: 5,
  //   image: weeklyNews2,
  //   category: "Activity",
  //   title: "Welcome To The Best Model Winner Contest",
  //   time: "20/03/2025",
  // },
  {
    id: 6,
    image: "https://attech.com.vn/wp-content/uploads/2025/02/dh-chi-bo-CN-26-2.jpg",
    category: "party",
    title: "Đại hội Chi bộ Chi nhánh tại Tp. HCM nhiệm kỳ 2025 – 2027",
    time: "20/03/2025",
  },
  {
    id: 7,
    image: "https://attech.com.vn/wp-content/uploads/2025/03/doi-thoai-dtn-2025-2.jpg",
    category: "young",
    title: "Đoàn Thanh niên Công ty TNHH Kỹ thuật Quản lý bay tổ chức \"Lễ kỷ niệm 94 năm Ngày thành lập Đoàn TNCS Hồ Chí Minh\" và \"Đối thoại giữa Đảng ủy – Ban Lãnh đạo Công ty với Đoàn Thanh niên năm 2025",
    time: "20/03/2025",
  },
  {
    id: 8,
    image: "https://vatm.vn/upload_images/images/7.2023/U27A3672.jpg",
    category: "union",
    title: "Công đoàn Tổng công ty Quản lý bay Việt Nam nhiệm kỳ 2023-2028 \"Đổi mới-Dân chủ-Đoàn kết-Phát triển\"",
    time: "20/03/2025",
  },
  {
    id: 9,
    image: "https://attech.com.vn/wp-content/uploads/2025/01/thu-6-13-1-1.jpg",
    category: "young",
    title: "Đoàn thanh niên công ty TNHH kỹ thuật Quản lý bay ra quân dọn dẹp, vệ sinh nơi làm việc: Hướng tới môi trường làm việc xanh-sạch-đẹp",
    time: "20/03/2025",
  },
  {
    id: 10,
    image: "https://attech.com.vn/wp-content/uploads/2025/02/dh-chi-bo-tccb-21-02-3.jpg",
    category: "party",
    title: "Đại hội Chi bộ Phòng Tổ chức cán bộ – Lao động nhiệm kỳ 2025-2027",
    time: "20/03/2025",
  },
  {
    id: 11,
    image: "https://attech.com.vn/wp-content/uploads/2024/12/t%E1%BB%95ng-k%E1%BA%BFt-%C4%91o%C3%A0n-28-12-1.jpg",
    category: "young",
    title: "Đoàn Thanh niên Công ty TNHH Kỹ thuật Quản lý bay tổ chức \"Hội nghị tổng kết công tác Đoàn và phong trào thanh niên năm 2024; phương hướng, nhiệm vụ năm 2025\" và \"Lễ trưởng thành Đoàn năm 2024\"",
    time: "20/03/2025",
  },
  {
    id: 12,
    image: "https://vatm.vn/uploads/%E1%BA%A2nh%202_BL%C4%90%20%E1%BB%A7ng%20h%E1%BB%99%20gian%20h%C3%A0ng%20h%E1%BB%99i%20ch%E1%BB%A3.jpg",
    category: "union",
    title: "Nữ công ATTECH hưởng ứng chuỗi hoạt động chào mừng Ngày Quốc tế Phụ nữ 8/3",
    time: "20/03/2025",
  },
  {
    id: 13,
    image: "https://vatm.vn/Anh_2._Pho_bien_quy_dinh_phuc_loi%5B1%5D-1.JPG",
    category: "union",
    title: "Công ty TNHH Kỹ thuật Quản lý bay tuyên truyền, phổ biến Quy định các chế độ phúc lợi cho người lao động",
    time: "20/03/2025",
  },
];

const groupedNews = newsData.reduce((acc, news) => {
  if (!acc[news.category]) {
    acc[news.category] = [];
  }
  acc[news.category].push(news);
  return acc;
}, {});

const WeeklyNews = () => {
  return (
    <div className="weekly-news-area">
      <div className="container">
        {Object.entries(groupedNews).map(([category, articles]) => (
          <div key={category} className="weekly-wrapper">
            <div className="section-tittle">
              <h3 className="title-category">{categoryMap[category]}</h3>
              <ViewAllButton to={`/news/${category}`} />
            </div>
            <div className="weekly-news-active">
              {articles.map((news) => (
                <div key={news.id} className="weekly-single">
                  <div className="weekly-img">
                    <img src={news.image} alt={news.title} title={news.title} />
                  </div>
                  <div className="weekly-caption">
                    <span className="time-news">{news.time}</span>
                    <h4>
                      <Link to={`/news/${news.category}/${news.id}`} title={news.title}>
                        {news.title}
                      </Link>
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyNews;
