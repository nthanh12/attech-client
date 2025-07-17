import "../Footer/Footer.css";
import { useLanguage } from "../../../../contexts/LanguageContext";

const Footer = () => {
  const { lang } = useLanguage();
  return (
    <div className="footer wow fadeIn" data-wow-delay="0.3s">
      <div className="container">
        <div className="company-footer text-center mb-4">
          <h2 className="company-name">
            {lang === "vi"
              ? "CÔNG TY TNHH KỸ THUẬT QUẢN LÝ BAY"
              : "AIR TRAFFIC TECHNICAL COMPANY LIMITED"}
          </h2>
          <h3 className="company-name-en">
            {lang === "vi"
              ? "AIR TRAFFIC TECHNICAL COMPANY LIMITED"
              : "CÔNG TY TNHH KỸ THUẬT QUẢN LÝ BAY"}
          </h3>
        </div>
        <div className="row g-4 justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="footer-contact">
              <p className="footer-title">
                {lang === "vi" ? "Thông tin liên hệ" : "Contact Information"}
              </p>
              <div className="contact-info">
                <p>
                  <i className="fa fa-map-marker-alt"></i>
                  <span>
                    {lang === "vi"
                      ? "Số 5/200 đường Nguyễn Sơn, phường Bồ Đề, Thành phố Hà Nội"
                      : "5/200 Nguyen Son Street, Bo De Ward, Hanoi City"}
                  </span>
                </p>
                <p>
                  <i className="fa fa-phone-alt"></i>
                  <span>
                    {lang === "vi" ? "Điện thoại: (84.24) 38271914" : "Phone: (84.24) 38271914"}
                  </span>
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
          <div className="col-md-6 col-lg-4">
            <div className="footer-links">
              <p className="footer-title">
                {lang === "vi" ? "Liên kết nhanh" : "Quick Links"}
              </p>
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
          <div className="col-md-12 col-lg-4">
            <div className="newsletter">
              <p className="footer-title">
                {lang === "vi"
                  ? "Bản đồ chỉ dẫn công ty TNHH Kỹ thuật Quản lý bay"
                  : "ATTECH Company Location Map"}
              </p>
              <div className="map-wrapper">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1565.6549300951995!2d105.88089418363363!3d21.041648374720946!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135a97c7dc6d877%3A0x1a140cbe4ea2cdd!2sCo.%20Management%20Engineering%20Flight!5e0!3m2!1sen!2sus!4v1741315536945!5m2!1sen!2sus"
                  width="100%"
                  height="180"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  title="ATTECH Map"
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
        <div className="copyright mt-4">
          <div className="copyright-text">
            © <a href="#">2025. {lang === "vi" ? "Bản quyền thuộc sở hữu của ATTECH." : "Copyright owned by ATTECH."}</a>
            <span className="mx-2">|</span>
            <a href={lang === "vi" ? "/" : "/en/"}>{lang === "vi" ? "Trang chủ" : "Home"}</a>
            <span className="mx-2">|</span>
            <a href={lang === "vi" ? "/lien-he" : "/en/contact"}>{lang === "vi" ? "Liên hệ" : "Contact"}</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
