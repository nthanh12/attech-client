import React, { useEffect } from "react";
import "./NotificationSection.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import ViewAllButton from "../../../../components/ViewAllButton/ViewAllButton";

const NotificationSection = ({ title, notifications, viewAllLink }) => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return (
    <div className="notification-section">
      <section>
        <div className="row">
          <div className="col-lg-12">
            <div className="section-tittle mb-20 section-tittle-flex">
              <h3 data-aos="fade-up">{title}</h3>
              <ViewAllButton to={viewAllLink} />
            </div>
          </div>
        </div>
        <div className="notification-grid">
          {notifications.map((item) => (
            <article key={item.id} data-aos="fade-up">
              <Link
                to={`/notifications/${item.id}/${item.slug}`}
                className="notification-link"
              >
                <div className="image-wrapper">
                  <img src={item.image} alt={item.title} />
                </div>
                <div className="content-wrapper">
                  <h2 title={item.title}>{item.title}</h2>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default NotificationSection; 