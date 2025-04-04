import React from "react";
import "../Feature/Feature.css";
import { Link } from "react-router-dom";

const Feature = () => {
  return (
    <>
      <div className="feature wow fadeInUp" data-wow-delay="0.1s">
        <div className="wrap-feature">
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col-lg-4 col-md-12">
                <div className="feature-item">
                  <div className="feature-icon">
                    <i className="fas fa-satellite"></i>
                  </div>
                  <div className="feature-text">
                    <h3>CNS/ATM</h3>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-12">
                <Link to="/service/bkthc">
                  <div className="feature-item">
                    <div className="feature-icon">
                      <i className="fas fa-plane"></i>
                    </div>
                    <div className="feature-text">
                      <h3>Bay hiệu chuẩn</h3>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="col-lg-4 col-md-12">
                <div className="feature-item">
                  <div className="feature-icon">
                    <i className="fas fa-globe"></i>
                  </div>
                  <div className="feature-text">
                    <h3>Công nghiệp hàng không</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Feature;
