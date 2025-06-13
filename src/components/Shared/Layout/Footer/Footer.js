import "../Footer/Footer.css";

const Footer = () => {
  return (
    <div className="footer wow fadeIn" data-wow-delay="0.3s">
      <div className="container">
        <div className="company-footer text-center mb-4">
          <h2 className="company-name">CÔNG TY TNHH KỸ THUẬT QUẢN LÝ BAY</h2>
          <h3 className="company-name-en">
            AIR TRAFFIC TECHNICAL COMPANY LIMITED
          </h3>
        </div>
        <div className="row g-4">
          <div className="col-md-6 col-lg-3">
            <div className="footer-contact">
              <p className="footer-title">Thông tin liên hệ</p>
              <div className="contact-info">
                <p>
                  <i className="fa fa-map-marker-alt"></i>
                  <span>
                    Số 5/200 đường Nguyễn Sơn, phường Bồ Đề, quận Long Biên,
                    Thành phố Hà Nội
                  </span>
                </p>
                <p>
                  <i className="fa fa-phone-alt"></i>
                  <span>Điện thoại: (84.24) 38271914</span>
                </p>
                <p>
                  <i className="fa fa-fax"></i>
                  <span>Fax: (84.24) 38730398</span>
                </p>
                <p>
                  <i className="fa fa-envelope"></i>
                  <span>attech@attech.com.vn</span>
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="footer-links">
              <p className="footer-title">Liên kết nhanh</p>
              <div className="links-list">
                <p>
                  <a
                    href="https://moc.gov.vn/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://moc.gov.vn/
                  </a>
                </p>
                <p>
                  <a
                    href="https://caa.gov.vn/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://caa.gov.vn/
                  </a>
                </p>
                <p>
                  <a
                    href="https://vatm.vn/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://vatm.vn/
                  </a>
                </p>
                <p>
                  <a
                    href="https://baoxaydung.vn/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://baoxaydung.vn/
                  </a>
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-2">
            {/* <div className="footer-links">
              <p className="footer-title">Liên kết</p>
              <div className="links-list">
                <p><a href="/">Trang chủ</a></p>
                <p><a href="/lien-he">Liên hệ</a></p>
              </div>
            </div> */}
          </div>
          <div className="col-md-6 col-lg-4">
            <div className="newsletter">
              <p className="footer-title">
                Bản đồ chỉ dẫn công ty TNHH Kỹ thuật Quản lý bay
              </p>
              <div className="map-wrapper">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1565.6549300951995!2d105.88089418363363!3d21.041648374720946!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135a97c7dc6d877%3A0x1a140cbe4ea2cdd!2sCo.%20Management%20Engineering%20Flight!5e0!3m2!1sen!2sus!4v1741315536945!5m2!1sen!2sus"
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-social mt-4">
          <a href="#" title="Facebook" className="social-icon">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#" title="Twitter" className="social-icon">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" title="LinkedIn" className="social-icon">
            <i className="fab fa-linkedin-in"></i>
          </a>
          <a href="#" title="YouTube" className="social-icon">
            <i className="fab fa-youtube"></i>
          </a>
        </div>
        <div className="container copyright mt-4">
          <div className="row align-items-center">
            <div className="col-md-8">
              <p className="copyright-text mb-0">
                © <a href="#">2025. Bản quyền thuộc sở hữu của ATTECH.</a>
              </p>
            </div>
            <div className="col-md-4 text-md-end">
              <div className="footer-bottom-links">
                <a href="/">Trang chủ</a>
                <span className="mx-2">|</span>
                <a href="/lien-he">Liên hệ</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
