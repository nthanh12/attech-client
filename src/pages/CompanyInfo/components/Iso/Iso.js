import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Download, Award, Shield, CheckCircle2 } from "lucide-react";
import "./Iso.css";

const Iso = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  const timelineData = [
    {
      year: "2005",
      description:
        "Công ty được tổ chức đánh giá BVQI của Anh cấp giấy chứng nhận đạt tiêu chuẩn Quốc tế ISO 9001:2000.",
      icon: <Award className="timeline-icon" />,
    },
    {
      year: "2008",
      description:
        "Ngày 29/01/2008, Hệ thống quản lý chất lượng của Công ty được tổ chức Quốc tế TUV NORD của CHLB Đức đánh giá tái chứng nhận và cấp Chứng chỉ Hệ thống quản lý chất lượng ISO 9001:2000 lần 2.",
      icon: <Shield className="timeline-icon" />,
    },
    {
      year: "2011",
      description:
        "Ngày 15/01/2011, Công ty hoàn thành chuyển đổi từ tiêu chuẩn TCVN ISO 9001:2000 sang TCVN ISO 9001:2008 và được tổ chức Quốc tế BSi của Vương quốc Anh cấp chứng chỉ ISO 9001:2008.",
      icon: <CheckCircle2 className="timeline-icon" />,
    },
    {
      year: "2017",
      description:
        "Hệ thống quản lý chất lượng của Công ty được duy trì, định kỳ đánh giá giám sát 1 lần/năm và đánh giá tái chứng nhận 3 năm/lần. Lần cấp giấy chứng nhận gần nhất: ngày 15/01/2017.",
      icon: <Award className="timeline-icon" />,
    },
    {
      year: "2018",
      description:
        "Công ty chuyển đổi hệ thống từ ISO 9001:2008 sang ISO 9001:2015, áp dụng có hiệu lực từ ngày 01/01/2018.",
      icon: <Shield className="timeline-icon" />,
    },
  ];

  const commitments = [
    {
      text: "Sáng tạo không ngừng",
      icon: "💡",
    },
    {
      text: "Đầu tư hiệu quả",
      icon: "📈",
    },
    {
      text: "Nhân viên chuyên nghiệp",
      icon: "👥",
    },
    {
      text: "Quản lí tinh thông",
      icon: "⚡",
    },
  ];

  const documents = [
    {
      name: "Hệ thống chứng chỉ ISO 9001:2015",
      size: "705.16 KB",
      link: "#",
      icon: <Award size={24} />,
    },
    {
      name: "Vilas 482 9-2020",
      size: "495.1 KB",
      link: "#",
      icon: <Shield size={24} />,
    },
    {
      name: "ISO 14001:2015",
      size: "187.52 KB",
      link: "#",
      icon: <CheckCircle2 size={24} />,
    },
  ];

  return (
    <div className="quality-management">
      <section className="intro-section">
        <div className="section-title" data-aos="fade-up">
          <h2>Giới Thiệu Hệ Thống Quản Lý Chất Lượng ISO 9001:2015</h2>
        </div>
        <div className="intro-content" data-aos="fade-up" data-aos-delay="100">
          <p>
            Công ty TNHH Kỹ thuật Quản lý bay (Air Traffic Technical Company
            Limited) xây dựng và thực hiện hệ thống quản lý chất lượng để khẳng
            định khả năng luôn cung cấp các sản phẩm đáp ứng yêu cầu của khách
            hàng và các yêu cầu pháp luật có liên quan. Công ty không ngừng thoả
            mãn khách hàng thông qua việc áp dụng hiệu quả hệ thống quản lý chất
            lượng, ngăn ngừa sự không phù hợp và không ngừng cải tiến.
          </p>
        </div>
      </section>

      <section className="timeline-section">
        <div className="section-title" data-aos="fade-up">
          <h2>Lịch Sử Chứng Nhận</h2>
        </div>
        <div className="timeline">
          {timelineData.map((event, index) => (
            <div
              key={index}
              className={`timeline-item ${index % 2 === 0 ? "left" : "right"}`}
              data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
              data-aos-delay={index * 100}
            >
              <div className="timeline-content">
                <div className="timeline-year">{event.year}</div>
                <div className="timeline-icon-wrapper">{event.icon}</div>
                <p>{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="commitment-section">
        <div className="section-title" data-aos="fade-up">
          <h2>Cam Kết Về Hệ Thống Quản Lý Chất Lượng</h2>
        </div>
        <div
          className="commitment-content"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <p>
            Công ty TNHH Kỹ thuật Quản lý bay cam kết xây dựng, lập thành văn
            bản, áp dụng và duy trì hệ thống quản lý chất lượng đồng thời thường
            xuyên nâng cao hiệu lực và hiệu quả của hệ thống theo các yêu cầu
            của tiêu chuẩn <strong>ISO 9001:2015</strong>.
          </p>
          <p>
            Chính sách chất lượng được Lãnh đạo Công ty tuyên bố ngày{" "}
            <strong>01/01/2018</strong>.
          </p>
          <p>
            Hiện đại, chất lượng, an toàn, tiện dụng và hiệu quả như là một
            thuộc tính của sản phẩm và dịch vụ hàng không. Tầm nhìn của chúng
            tôi là trở thành tổ hợp công ty đa sở hữu hoạt động kinh doanh trên
            các lĩnh vực: Cung cấp dịch vụ thông tin, dẫn đường, giám sát hàng
            không; Cung cấp dịch vụ bay kiểm tra hiệu chuẩn hàng không; Sản xuất
            công nghiệp hàng không.
          </p>
          <ul>
            {commitments.map((commitment, index) => (
              <li
                key={index}
                data-aos="zoom-in"
                data-aos-delay={index * 100}
              >
                <span className="commitment-icon">{commitment.icon}</span>
                {commitment.text}
              </li>
            ))}
          </ul>
          <p>
            Để đảm bảo rằng{" "}
            <strong>
              "Sản phẩm và dịch vụ của chúng tôi an toàn, chất lượng và tiện
              dụng theo tiêu chuẩn hàng không"
            </strong>
            .
          </p>
        </div>
      </section>

      <section className="documents-section">
        <div className="section-title" data-aos="fade-up">
          <h2>Tài Liệu Đính Kèm</h2>
        </div>
        <div className="documents-list" data-aos="fade-up" data-aos-delay="100">
          {documents.map((doc, index) => (
            <a
              key={index}
              href={doc.link}
              className="document-item"
              target="_blank"
              rel="noopener noreferrer"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              {doc.icon}
              <span className="doc-name">{doc.name}</span>
              <Download className="download-icon" />
              <span className="file-size">({doc.size})</span>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Iso;
