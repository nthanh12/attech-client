import React from "react";
import "./TrendingArea.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import { Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";

const TrendingArea = () => {
  const allData = [
    // Banner (3 mục đầu không có id, không có Link)
    {
      title:
        "ATTECH chào mừng Kỷ niệm ngày Giỗ Tổ Hùng Vương Mùng 10 tháng 3 (Âm lịch)",
      image:
        "https://cdn.popsww.com/blog-kids/sites/3/2023/04/ngay-gio-to-hung-vuong.jpg",
    },
    {
      title:
        "ATTECH hưởng ứng chào mừng 50 năm ngày giải phóng miền Nam, thống nhất đất nước",
      image: "https://phuong3.tayninh.gov.vn/uploads/news/2025_02/14.jpg",
    },
    {
      title: "Chào mừng ngày Quốc tế lao động 01/5",
      image:
        "https://file.vnua.edu.vn/data/0/images/2024/04/29/host/a1.jpg?w=680",
    },
    // Tin tức (có id và slug)
    {
      id: 1,
      slug: "hoan-thanh-canh-thu-tai-tram-cns-con-son",
      title:
        "Hoàn thành canh thu, đảm bảo kỹ thuật các tần số VHF tại trạm CNS Côn Sơn",
      image:
        "https://attech.com.vn/wp-content/uploads/2025/03/canh-thu-Con-Son-28-3-1.jpg",
      date: "31/03/2025",
    },
    {
      id: 2,
      slug: "le-ky-ket-hop-dong-goi-thau-tb05",
      title:
        "Lễ ký kết Hợp đồng cho Gói thầu TB05 “Cung cấp và lắp đặt hệ thống DVOR/DME”...",
      image:
        "https://attech.com.vn/wp-content/uploads/2025/03/hop-dong-tb05-4-3-1.jpg",
      date: "30/04/2024",
    },
    {
      id: 3,
      slug: "attech-va-nesic-hoan-thanh-nghiem-thu",
      title:
        "ATTECH và NESIC hoàn thành nghiệm thu tại Nhà máy 05 phòng đặt thiết bị (Shelter) thép",
      image:
        "https://attech.com.vn/wp-content/uploads/2025/02/nesic-nghiem-thu-18-02-2.jpg",
      date: "20/03/2025",
    },
    {
      id: 4,
      slug: "hoan-thanh-cong-tac-bay-kiem-tra-dot-2-2024-2025",
      title:
        "Hoàn thành công tác bay kiểm tra, hiệu chuẩn các thiết bị dẫn đường, giám sát hàng không đợt 2 mùa bay 2024/2025",
      image: "https://attech.com.vn/wp-content/uploads/2025/02/BHC-5-2.jpg",
      date: "30/03/2025",
    },
    {
      id: 5,
      slug: "hoi-nghi-nguoi-lao-dong-2025",
      title:
        "Ban Quản lý dự án Đầu tư và xây dựng chuyên ngành tổ chức Hội nghị người lao động năm 2025",
      image:
        "https://attech.com.vn/wp-content/uploads/2025/01/hnnld-ban-22-1-2.jpg",
      date: "26/03/2025",
    },
    {
      id: 6,
      slug: "hoi-nghi-tong-ket-2024-va-ke-hoach-2025",
      title:
        "Công ty TNHH Kỹ thuật Quản lý bay tổ chức Hội nghị tổng kết công tác năm 2024 và triển khai kế hoạch năm 2025",
      image:
        "https://attech.com.vn/wp-content/uploads/2025/01/hntk-nam-2024-21-1-1.jpg",
      date: "22/03/2025",
    },
    {
      id: 7,
      slug: "giai-pickleball-xuong-dvkt-lan-1",
      title: "Giải Pickleball Xưởng DVKT mở rộng lần 1",
      image:
        "https://attech.com.vn/wp-content/uploads/2025/01/pickleball-l1-21-1-1.jpg",
      date: "21/03/2025",
    },
    {
      id: 8,
      slug: "dien-tap-ung-pho-tan-cong-gia-mao",
      title:
        "Diễn tập ứng phó tấn công giả mạo trên hệ thống thư điện tử tên miền @attech.com.vn của Công ty",
      image:
        "https://attech.com.vn/wp-content/uploads/2025/01/dien-tap-attt-28-12-1.jpg",
      date: "16/12/2024",
    },
    {
      id: 9,
      slug: "he-thong-amhs-mo-rong-hoan-thanh-conformance-test",
      title:
        "Hệ thống AMHS mở rộng (AMHS Extended) do ATTECH nghiên cứu, phát triển hoàn thành giai đoạn Conformance Test",
      image: "https://attech.com.vn/wp-content/uploads/2025/01/amhs-6-1-2.jpg",
      date: "16/12/2024",
    },
    {
      id: 10,
      slug: "nhan-giay-khen-cuc-thue-ha-noi-2023",
      title:
        "Công ty TNHH Kỹ thuật Quản lý bay nhận giấy khen của Cục thuế Hà Nội tuyên dương người nộp thuế tiêu biểu thủ đô năm 2023",
      image: "https://attech.com.vn/wp-content/uploads/2024/12/NTT-19-12-2.jpg",
      date: "16/12/2024",
    },
  ];

  return (
    <div className="trending-area fix">
      <div className="container">
        <div className="trending-main">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-tittle mb-20">
                <h3>Tin hoạt động công ty</h3>
                <Link className="get-all" to="/news/activities">
                  Xem tất cả
                  <i class="fa fa-solid fa-chevron-down"></i>
                </Link>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-8">
              <Swiper
                className="trending-top mb-30"
                spaceBetween={50}
                modules={[Autoplay]}
                autoplay={{ delay: 3500, disableOnInteraction: false }}
                loop={true}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
              >
                {allData.slice(0, 3).map((item, index) => (
                  <SwiperSlide key={index}>
                    <div className="trend-top-img">
                      <img
                        src={item.image}
                        alt={item.title}
                        title={item.title}
                      />
                      <div className="trend-top-cap">
                        <h2>{item.title}</h2> {/* Không có Link */}
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              {/* Tin tức trending-bottom (3 mục tiếp theo) */}
              <div className="trending-bottom">
                <div className="row">
                  {allData.slice(3, 6).map((item) => (
                    <div className="col-lg-4" key={item.id}>
                      <div className="single-bottom mb-35">
                        <div className="trend-bottom-img mb-30">
                          <img
                            src={item.image}
                            alt={item.title}
                            title={item.title}
                          />
                        </div>
                        <div className="trend-bottom-cap">
                          <span className="color1">{item.date}</span>
                          <h4>
                            <Link
                              to={`/news/${item.id}/${item.slug}`}
                              title={item.title}
                            >
                              {item.title}
                            </Link>
                          </h4>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              {/* Swiper dọc cho tin tức còn lại */}
              <Swiper
                direction="vertical"
                spaceBetween={10}
                slidesPerView={6}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                loop
                modules={[Autoplay]}
                className="trand-right-swiper"
              >
                {allData.slice(6).map((item) => (
                  <SwiperSlide key={item.id}>
                    <div className="trand-right-single d-flex">
                      <div className="trand-right-img">
                        <img
                          src={item.image}
                          alt={item.title}
                          title={item.title}
                        />
                      </div>
                      <div className="trand-right-cap">
                        <span className="color3">{item.date}</span>
                        <h4>
                          <Link
                            to={`/news/${item.id}/${item.slug}`}
                            title={item.title}
                          >
                            {item.title}
                          </Link>
                        </h4>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendingArea;
