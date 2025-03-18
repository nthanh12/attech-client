import "../../assets/css/About.css";
import { Link } from "react-router-dom";

const scrollToTop = () => {
  window.scrollTo(0, 0);
};

const About = () => {
  return (
    <div className="about-section">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6 about-content">
            <h2 className="about-title">Chào mừng đến với ATTECH</h2>
            <p className="about-description">
              Công ty TNHH Kỹ thuật Quản lý bay được thành lập vào ngày
              22/7/2010, là đơn vị hạch toán độc lập trực thuộc Tổng công ty
              Quản lý bay Việt Nam với 100% vốn điều lệ nhà nước. Công ty chuyên
              cung cấp các dịch vụ kỹ thuật đảm bảo hoạt động bay, bao gồm dẫn
              đường hàng không, kiểm tra hiệu chuẩn thiết bị, tư vấn thiết kế,
              sửa chữa, bảo trì công trình hàng không, cùng các dịch vụ công ích
              và đào tạo nhân lực trong ngành. Với đội ngũ chuyên gia giàu kinh
              nghiệm và công nghệ tiên tiến, công ty cam kết đảm bảo an toàn,
              hiệu quả và liên tục cho hoạt động bay dân dụng tại Việt Nam.
            </p>
            <div className="about-buttons">
              <Link
                to="/about-us"
                className="btn btn-primary"
                onClick={scrollToTop}
              >
                Hiểu thêm về chúng tôi
              </Link>
            </div>
          </div>
          {/* Phần hình ảnh */}
          <div className="col-md-6 about-image">
            <img
              src="https://attech.com.vn/wp-content/uploads/2015/05/anh-slide1.jpg"
              alt="About Us"
              className="img-fluid"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
