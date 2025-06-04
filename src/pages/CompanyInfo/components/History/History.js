import React, { useEffect, useState, useRef } from "react";
import "./History.css";
import AOS from "aos";
import "aos/dist/aos.css";
import Map3D from './Map3D';

const History = () => {
  const [selectedStation, setSelectedStation] = useState(null);
  const mapSectionRef = useRef(null);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  const timelineData = [
    {
      year: "1986",
      title: "Thành lập Xí nghiệp Điện tử Hàng không",
      description:
        "Xí nghiệp Điện tử Hàng không ra đời với mục tiêu xây dựng một đơn vị làm kỹ thuật điện tử chung cho toàn ngành Hàng không dân dụng Việt Nam.",
    },
    {
      year: "1989",
      title: "Thành lập Trung tâm Thông tin Hàng không",
      description:
        "Ngày 29/01/1989, Trung tâm Thông tin Hàng không được thành lập trên cơ sở sát nhập Xí nghiệp Điện tử Hàng không và Đội khai thác thông tin C29, trực thuộc Công ty Quản lý bay.",
    },
    {
      year: "1998",
      title: "Đổi tên thành Trung tâm Dịch vụ Kỹ thuật Quản lý bay",
      description:
        "Ngày 05/6/1998, Trung tâm Thông tin Hàng không đổi tên thành Trung tâm Dịch vụ Kỹ thuật Quản lý bay, hạch toán phụ thuộc vào Trung tâm Quản lý bay dân dụng Việt Nam.",
    },
    {
      year: "2008-2009",
      title:
        "Chuyển đổi và thành lập Trung tâm Dịch vụ Kỹ thuật Bảo đảm hoạt động bay",
      description:
        "Năm 2008, Trung tâm Quản lý bay dân dụng VN chuyển thành Tổng công ty Bảo đảm hoạt động bay. Ngày 23/3/2009, Trung tâm Dịch vụ Kỹ thuật Bảo đảm hoạt động bay được thành lập trên cơ sở tổ chức lại Trung tâm Dịch vụ Kỹ thuật Quản lý bay.",
    },
    {
      year: "2010",
      title: "Thành lập Công ty TNHH Kỹ thuật Quản lý bay",
      description:
        "Ngày 22/7/2010, Công ty TNHH Kỹ thuật Quản lý bay được thành lập trên cơ sở tổ chức lại Trung tâm Dịch vụ Kỹ thuật Bảo đảm hoạt động bay, do Tổng công ty Quản lý bay Việt Nam sở hữu 100% vốn điều lệ.",
    },
  ];

  const companyInfo = {
    name: {
      vietnamese: "Công ty TNHH Kỹ thuật Quản lý bay",
      international: "Air Traffic Technical Company Limited",
      short: "ATTECH CO.,LTD",
    },
    headquarters: {
      address:
        "Số 5/200 Đường Nguyễn Sơn, phường Bồ Đề, Quận Long Biên, Thành phố Hà Nội",
      phone: "024.38721514",
      fax: "024.38730398",
      email: "attech@attech.com.vn",
      website: "attech.com.vn",
    },
    capital: "279.084.000.000 đồng",
    branches: [
      {
        name: "Xí nghiệp chế tạo thiết bị Hàng không",
        address: "Tổ 15, Phường Phúc Đồng, Quận Long Biên, Thành phố Hà Nội",
        phone: "024.38759625",
        fax: "024.38759625",
      },
      {
        name: "Chi nhánh tại thành phố Hồ Chí Minh",
        address: "58 Trường Sơn – Quận Tân Bình – Thành phố Hồ Chí Minh",
        phone: "(84.28) 8456081",
        fax: "(84.28) 8456081",
      },
      {
        name: "Ban Quản lý dự án đầu tư và xây dựng chuyên ngành",
        address:
          "Số 5/200 Đường Nguyễn Sơn, phường Bồ Đề, Quận Long Biên, Thành phố Hà Nội",
        phone: "024.38723747",
        fax: "024.38759625",
        email: "attech-pmu@attech.com.vn",
      },
    ],
    stations: [
      "Đài DVOR/DME/ADS-B Điện Biên",
      "Đài DVOR/DME/ADS-B Cát Bi",
      "Đài DVOR/DME Đầu Tây Nội Bài",
      "Đài DVOR/DME/ADS-B Nội Bài",
      "Đài DVOR/DME và NDB Nam Hà",
      "Đài DVOR/DME/ADS-B Thọ Xuân",
      "Đài DVOR/DME/ADS-B Vinh",
      "Đài DVOR/DME Pleiku",
      "Đài DVOR/DME/ADS-B Đồng Hới",
      "Đài DVOR/DME Phú Bài",
      "Đài DVOR/DME/ADS-B Đà Nẵng",
      "Đài DVOR/DME Chu Lai",
      "Đài DVOR/DME/ADS-B Cam Ranh",
      "Đài DVOR/DME Tuy Hòa",
      "Đài DVOR/DME/ADS-B Đồng Hới",
      "Đài DVOR/DME Phù Cát",
      "Đài DVOR/DME Buôn Ma Thuột",
      "Đài DVOR/DME Liên Khương",
      "Đài CVOR/DME Phan Thiết",
      "Đài NDB Long Khánh",
      "Trạm ADS-B Mộc Châu",
      "Đài DVOR/DME Cần Thơ",
      "Đài DVOR/DME Phú Quốc",
      "Đài DVOR/DME Vân Đồn",
      "Trạm CNS Trường Sa",
      "Trạm CNS Côn Sơn",
      "Trạm CNS Cà Mau",
      "Đài DVOR/DME Tân Sơn Nhất",
    ],
  };

  const handleStationClick = (stationName) => {
    setSelectedStation(stationName);
    
    // Scroll to exact position of map component
    if (mapSectionRef.current) {
      const element = mapSectionRef.current;
      const headerOffset = 80; // Adjust this value based on your header height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="history-timeline">
      <section className="timeline-section">
        <div className="section-title" data-aos="fade-up">
          <h2>Lịch sử ra đời & Quá trình phát triển</h2>
        </div>
        <div className="timeline">
          {timelineData.map((event, index) => (
            <div
              key={index}
              className={`timeline-item ${index % 2 === 0 ? "left" : "right"}`}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="timeline-content">
                <div className="timeline-year">{event.year}</div>
                <h3>{event.title}</h3>
                <p>{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="company-info-section">
        <div className="section-title" data-aos="fade-up">
          <h2>Thông Tin Công Ty</h2>
        </div>
        <div className="company-info-grid">
          <div className="info-card" data-aos="fade-up">
            <h3>Tên Doanh Nghiệp</h3>
            <p>
              <strong>Tiếng Việt:</strong> {companyInfo.name.vietnamese}
            </p>
            <p>
              <strong>Quốc tế:</strong> {companyInfo.name.international}
            </p>
            <p>
              <strong>Viết tắt:</strong> {companyInfo.name.short}
            </p>
          </div>
          <div className="info-card" data-aos="fade-up" data-aos-delay="100">
            <h3>Trụ Sở Chính</h3>
            <p>
              <strong>Địa chỉ:</strong> {companyInfo.headquarters.address}
            </p>
            <p>
              <strong>Điện thoại:</strong> {companyInfo.headquarters.phone}
            </p>
            <p>
              <strong>Fax:</strong> {companyInfo.headquarters.fax}
            </p>
            <p>
              <strong>Email:</strong> {companyInfo.headquarters.email}
            </p>
            <p>
              <strong>Website:</strong>{" "}
              <a
                href={`https://${companyInfo.headquarters.website}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {companyInfo.headquarters.website}
              </a>
            </p>
          </div>
          <div className="info-card" data-aos="fade-up" data-aos-delay="200">
            <h3>Vốn Điều Lệ</h3>
            <p>{companyInfo.capital}</p>
          </div>
        </div>
        <div className="branches-section" data-aos="fade-up">
          <h3>Các Cơ Sở Khác</h3>
          <div className="branches-grid">
            {companyInfo.branches.map((branch, index) => (
              <div key={index} className="branch-card">
                <h4>{branch.name}</h4>
                <p>
                  <strong>Địa chỉ:</strong> {branch.address}
                </p>
                <p>
                  <strong>Điện thoại:</strong> {branch.phone}
                </p>
                <p>
                  <strong>Fax:</strong> {branch.fax}
                </p>
                {branch.email && (
                  <p>
                    <strong>Email:</strong> {branch.email}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
        <section className="stations-section" ref={mapSectionRef}>
          <div className="section-title" data-aos="fade-up">
            <h2>Các Đài/Trạm CNS Trên Toàn Quốc</h2>
          </div>
          <Map3D stations={companyInfo.stations} selectedStation={selectedStation} />
          <div className="stations-list">
            {companyInfo.stations.map((station, index) => (
              <span
                key={index}
                className={`station-item ${selectedStation === station ? 'active' : ''}`}
                onClick={() => handleStationClick(station)}
              >
                {station}
              </span>
            ))}
          </div>
        </section>
      </section>
    </div>
  );
};

export default History;
