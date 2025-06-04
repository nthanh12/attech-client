import "../Footer/Footer.css";

const Footer = () => {
  return (
    <div className="footer wow fadeIn" data-wow-delay="0.3s">
      <div className="container">
        <div className="company-footer">
          <h2>CÔNG TY TNHH KỸ THUẬT QUẢN LÝ BAY</h2>
          <h3>AIR TRAFFIC TECHNICAL COMPANY LIMITED</h3>
        </div>
        <div className="row">
          <div className="col-md-6 col-lg-3">
            <div className="footer-contact">
              <p className="footer-title">Thông tin liên hệ</p>
              <p>
                <i className="fa fa-map-marker-alt"></i>Số 5/200 đường Nguyễn
                Sơn, phường Bồ Đề, quận Long Biên, Thành phố Hà Nội
              </p>
              <p>
                <i className="fa fa-phone-alt"></i>Điện thoại: (84.24) 38271914
              </p>
              <p>
                <i className="fa fa-fax"></i>Fax: (84.24) 38730398
              </p>
              <p>
                <i className="fa fa-envelope"></i>attech@attech.com.vn
              </p>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="footer-link">
              <p className="footer-title">Dịch vụ</p>
              <a href="">DVKT Chuyên ngành CNS</a>
              <a href="">Bay kiểm tra hiệu chuẩn</a>
              <a href="">Dịch vụ huấn luyện đào tạo</a>
              <a href="">Kỹ thuật Hàng không</a>
              <a href="">Huấn luyện đào tạo</a>
            </div>
          </div>
          <div className="col-md-6 col-lg-2">
            <div className="footer-link">
              <p className="footer-title">Trang tiện ích</p>
              <a href="">Về chúng tôi</a>
              <a href="">Hướng dẫn sử dụng</a>
              <a href="">Câu hỏi thường gặp</a>
            </div>
          </div>
          <div className="col-md-6 col-lg-4">
            <div className="newsletter">
              <p className="footer-title">Bản đồ chỉ dẫn</p>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1565.6549300951995!2d105.88089418363363!3d21.041648374720946!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135a97c7dc6d877%3A0x1a140cbe4ea2cdd!2sCo.%20Management%20Engineering%20Flight!5e0!3m2!1sen!2sus!4v1741315536945!5m2!1sen!2sus"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
        <div className="footer-social">
          <a href="#">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#">
            <i className="fab fa-linkedin-in"></i>
          </a>
          <a href="#">
            <i className="fab fa-youtube"></i>
          </a>
        </div>
        <div className="container copyright">
          <div className="row">
            <div className="col-md-8">
              <p className="copyright-text">
                © <a href="#">2025. Bản quyền thuộc sở hữu của ATTECH.</a>
              </p>
            </div>
            <div className="col-md-2">
              <a href="/">Trang chủ</a>
            </div>
            <div className="col-md-2">
              <a href="/">Liên hệ</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
