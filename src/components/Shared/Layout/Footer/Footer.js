import { useTranslation } from 'react-i18next';
import "../Footer/Footer.css";
import { useI18n } from "../../../../hooks/useI18n";
import LocalizedLink from "../../LocalizedLink/LocalizedLink";

const Footer = () => {
  const { t: useTranslationT } = useTranslation();
  const { t, currentLanguage } = useI18n();
  
  return (
    <div className="footer wow fadeIn" data-wow-delay="0.3s">
      <div className="container">
        <div className="company-footer text-center mb-4">
          <h2 className="company-name">
            {useTranslationT('frontend.company.name')}
          </h2>
          <h3 className="company-name-en">
            {useTranslationT('frontend.company.nameSecondary')}
          </h3>
        </div>
        <div className="row g-4 justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="footer-contact">
              <p className="footer-title">
                {useTranslationT('footer.contactTitle')}
              </p>
              <div className="contact-info">
                <p>
                  <i className="fa fa-map-marker-alt"></i>
                  <span>{useTranslationT('footer.address')}</span>
                </p>
                <p>
                  <i className="fa fa-phone-alt"></i>
                  <span>
                    {useTranslationT('footer.phoneLabel')}: {useTranslationT('footer.phone')}
                  </span>
                </p>
                <p>
                  <i className="fa fa-fax"></i>
                  <span>{useTranslationT('footer.faxLabel')}: {useTranslationT('footer.fax')}</span>
                </p>
                <p>
                  <i className="fa fa-envelope"></i>
                  <span>{useTranslationT('footer.email')}</span>
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-4">
            <div className="footer-links">
              <p className="footer-title">
                {useTranslationT('footer.quickLinks')}
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
                {useTranslationT('footer.mapTitle')}
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
          <a href="https://www.facebook.com/attech.vn" title="Facebook" className="social-icon" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook-f" aria-hidden="true"></i>
            <span className="sr-only">Facebook</span>
          </a>
          <a href="https://twitter.com/attech_vn" title="Twitter" className="social-icon" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter" aria-hidden="true"></i>
            <span className="sr-only">Twitter</span>
          </a>
          <a href="https://www.linkedin.com/company/attech-vietnam" title="LinkedIn" className="social-icon" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin-in" aria-hidden="true"></i>
            <span className="sr-only">LinkedIn</span>
          </a>
          <a href="https://www.youtube.com/channel/attech-vn" title="YouTube" className="social-icon" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-youtube" aria-hidden="true"></i>
            <span className="sr-only">YouTube</span>
          </a>
        </div>
        <div className="copyright mt-4">
          <div className="copyright-text">
            © <a href="#">2025. {useTranslationT('footer.copyright')}</a>
            <span className="mx-2">|</span>
            <LocalizedLink routeKey="HOME">{useTranslationT('navigation.home')}</LocalizedLink>
            <span className="mx-2">|</span>
            <LocalizedLink routeKey="CONTACT">{useTranslationT('navigation.contact')}</LocalizedLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
