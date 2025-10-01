import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { Download, Award, Shield, CheckCircle2 } from "lucide-react";
import "./Iso.css";
import SEO from "../../../../components/SEO/SEO";
import { useI18n } from "../../../../hooks/useI18n";

const Iso = () => {
  const { t } = useTranslation();
  const { currentLanguage } = useI18n();
  const location = useLocation();

  const seoContent = {
    vi: {
      title: "Hệ thống chứng chỉ ISO | ATTECH",
      description:
        "Tìm hiểu về hệ thống quản lý chất lượng ISO 9001:2015, ISO 14001:2015 và các chứng chỉ chất lượng của ATTECH.",
      keywords:
        "ISO ATTECH, ISO 9001, ISO 14001, chứng chỉ chất lượng, quality management",
    },
    en: {
      title: "ISO Certification System | ATTECH",
      description:
        "Learn about ATTECH's quality management system ISO 9001:2015, ISO 14001:2015 and quality certifications.",
      keywords:
        "ATTECH ISO, ISO 9001, ISO 14001, quality certification, quality management system",
    },
  };

  const currentSEO = seoContent[currentLanguage] || seoContent.vi;

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
      description: t("frontend.companyInfo.iso.timeline.2005"),
      icon: <Award className="timeline-icon" />,
    },
    {
      year: "2008",
      description: t("frontend.companyInfo.iso.timeline.2008"),
      icon: <Shield className="timeline-icon" />,
    },
    {
      year: "2011",
      description: t("frontend.companyInfo.iso.timeline.2011"),
      icon: <CheckCircle2 className="timeline-icon" />,
    },
    {
      year: "2018",
      description: t("frontend.companyInfo.iso.timeline.2018"),
      icon: <Shield className="timeline-icon" />,
    },
    {
      year: "Hiện tại",
      description: t("frontend.companyInfo.iso.timeline.2020"),
      icon: <Award className="timeline-icon" />,
    },
  ];

  const documents = [
    {
      name: "Hệ thống chứng chỉ ISO 9001:2015",
      size: "705.16 KB",
      link: "https://attech.com.vn/wp-content/uploads/2015/03/He-thong-chung-chi-ISO-9001-20151.pdf",
      icon: <Award size={24} />,
    },
    {
      name: "Vilas 482 9-2020",
      size: "495.1 KB",
      link: "https://attech.com.vn/wp-content/uploads/2015/03/Vilas-482-9-2020.pdf",
      icon: <Shield size={24} />,
    },
    {
      name: "ISO 14001:2015",
      size: "187.52 KB",
      link: "https://attech.com.vn/wp-content/uploads/2015/03/ISO-14001-2015.pdf",
      icon: <CheckCircle2 size={24} />,
    },
  ];

  return (
    <>
      <SEO
        title={currentSEO.title}
        description={currentSEO.description}
        keywords={currentSEO.keywords}
        url={location.pathname}
        lang={currentLanguage}
      />
      <div className="quality-management">
        <section className="intro-section">
          <div className="section-title" data-aos="fade-up">
            <h2>{t("frontend.companyInfo.iso.introTitle")}</h2>
          </div>
          <div
            className="intro-content"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <p>{t("frontend.companyInfo.iso.introDescription")}</p>
          </div>
        </section>

        <section className="timeline-section">
          <div className="section-title" data-aos="fade-up">
            <h2>{t("frontend.companyInfo.iso.historyTitle")}</h2>
          </div>
          <div className="timeline">
            {timelineData.map((event, index) => (
              <div
                key={index}
                className={`timeline-item ${
                  index % 2 === 0 ? "left" : "right"
                }`}
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
            <h2>{t("frontend.companyInfo.iso.commitmentTitle")}</h2>
          </div>
          <div
            className="commitment-content"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <p>{t("frontend.companyInfo.iso.commitmentParagraph1")}</p>
            <p>{t("frontend.companyInfo.iso.commitmentParagraph2")}</p>
            <p>{t("frontend.companyInfo.iso.commitmentParagraph3")}</p>

            <p>{t("frontend.companyInfo.iso.commitmentParagraph4")}</p>
          </div>
        </section>

        <section className="documents-section">
          <div className="section-title" data-aos="fade-up">
            <h2>{t("frontend.companyInfo.iso.documentsTitle")}</h2>
          </div>
          <div
            className="documents-list"
            data-aos="fade-up"
            data-aos-delay="100"
          >
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
    </>
  );
};

export default Iso;
