// Feature.jsx
import React from "react";
import "../Feature/Feature.css";
import { Link } from "react-router-dom";

const Feature = () => {
  return (
    <section className="feature-section">
      <div className="feature-container">
        <div className="feature-grid">
          <Link to="/service/bkthc" className="feature-link">
            <div className="feature-item">
              <div className="feature-icon">
                <i className="fas fa-satellite"></i>
              </div>
              <div className="feature-text">
                <h3>CNS/ATM</h3>
              </div>
            </div>
          </Link>
          <Link to="/service/bkthc" className="feature-link">
            <div className="feature-item">
              <div className="feature-icon">
                <i className="fas fa-plane"></i>
              </div>
              <div className="feature-text">
                <h3>Bay hiệu chuẩn</h3>
              </div>
            </div>
          </Link>

          <Link to="/service/bkthc" className="feature-link">
            <div className="feature-item">
              <div className="feature-icon">
                <i className="fas fa-globe"></i>
              </div>
              <div className="feature-text">
                <h3>Công nghiệp hàng không</h3>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Feature;
