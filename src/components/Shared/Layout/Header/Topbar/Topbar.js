import React from "react";
import "./Topbar.css";

const Topbar = () => {
  return (
    <div className="top-bar">
      <div className="container top-bar-content">
        <div className="row align-items-center">
          <div className="col-lg-12 col-md-7 d-none d-lg-block">
            <div className="row">
              <div className="col-4 topbar1">
                <div className="top-bar-item">
                  <div className="top-bar-icon"></div>
                  <div className="top-bar-text">
                    <p className="company-name">
                      CÔNG TY TNHH KỸ THUẬT QUẢN LÝ BAY
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-4 topbar3">
                <div className="top-bar-item">
                  <div className="top-bar-icon">
                    <i className="fa fa-location-arrow"></i>
                  </div>
                  <div className="top-bar-text">
                    <p>Số 5/200 Nguyễn Sơn - Long Biên - Hà Nội</p>
                  </div>
                </div>
              </div>
              <div className="col-4 topbar2">
                <div className="top-bar-item">
                  <div className="top-bar-icon">
                    <i className="fa fa-phone"></i>
                  </div>
                  <div className="top-bar-text">
                    <p>(+84.24) 382.719.14</p>
                  </div>
                </div>
                <div className="top-bar-item">
                  <div className="top-bar-icon">
                    <i className="fa fa-envelope"></i>
                  </div>
                  <div className="top-bar-text">
                    <p>attech@attech.com.vn</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
