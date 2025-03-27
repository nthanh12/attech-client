import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Logo from "../../../../assets/img/logo.png";
import "../Header/Header.css";

const Header = () => {
  return (
    <div className="header-div header-div-fix">
      <div className="top-bar">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-lg-12 col-md-7 d-none d-lg-block">
              <div className="row">
                <div className="col-4 topbar1">
                  <div className="top-bar-item">
                    <div className="top-bar-icon"></div>
                    <div className="top-bar-text company-name">
                      <p>CÔNG TY TNHH KỸ THUẬT QUẢN LÝ BAY</p>
                    </div>
                  </div>
                </div>
                <div className="col-4 topbar3">
                  <div className="top-bar-item">
                    <div className="top-bar-icon">
                      <i className="fa fa-map-marker-alt"></i>
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

      <div className="nav-bar">
        <div className="container-fluid">
          <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
            <Link to="#" className="navbar-brand">
              MENU
            </Link>
            <button
              type="button"
              className="navbar-toggler"
              data-toggle="collapse"
              data-target="#navbarCollapse"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarCollapse">
              <Link to="/" className="logo">
                <img src={Logo} alt="Logo" />
              </Link>

              <div className="navbar-nav mr-auto">
                <NavLink to="/" className="nav-item nav-link">
                  Trang chủ
                </NavLink>

                <div className="nav-item dropdown">
                  <Link
                    to="/products"
                    className="nav-link dropdown-toggle"
                    data-toggle="dropdown"
                  >
                    Sản phẩm
                  </Link>
                  <div className="dropdown-menu">
                    <Link to="/product/cns-atm" className="dropdown-item">
                      CNS/ATM
                      <div className="dropdown-menu">
                        <Link to="/product/detail" className="dropdown-item">
                          Hệ thống ADS-B
                        </Link>
                        <Link to="/product/support" className="dropdown-item">
                          Hệ thống AMHS
                        </Link>
                        <Link to="/product/support" className="dropdown-item">
                          Hệ thống AMMS
                        </Link>
                      </div>
                    </Link>

                    <Link
                      to="/product/co-khi-che-tao"
                      className="dropdown-item"
                    >
                      Các sản phẩm khác
                      <div className="dropdown-menu">
                        <Link to="/product/detail" className="dropdown-item">
                          Hệ thống đèn hiệu
                        </Link>
                        {/* 8 sản phẩm như web cũ */}
                        <Link to="/product/detail" className="dropdown-item">
                          Shelter
                        </Link>
                        <Link to="/product/support" className="dropdown-item">
                          Bàn consoles
                          {/* <div className="dropdown-menu">
                            <Link
                              to="/product/detail"
                              className="dropdown-item"
                            >
                              ATC Consoles
                            </Link>
                            <Link
                              to="/product/support"
                              className="dropdown-item"
                            >
                              Technical consoles
                            </Link>
                          </div> */}
                        </Link>
                      </div>
                    </Link>
                  </div>
                </div>

                <div className="nav-item dropdown">
                  <Link
                    to="/services"
                    className="nav-link dropdown-toggle"
                    data-toggle="dropdown"
                  >
                    Dịch vụ
                  </Link>
                  <div className="dropdown-menu">
                    <Link to="/service/dvktcns" className="dropdown-item">
                      Dịch vụ thông tin dẫn đường giám sát (CNS)
                      {/* <div className="dropdown-menu">
                        <Link to="/service/dvktcns" className="dropdown-item">
                          Đặc tính kỹ thuật
                        </Link>
                        <Link to="/service/bkthc" className="dropdown-item">
                          Tiêu chuẩn đáp ứng/ Tài liệu áp dụng
                        </Link>
                        <Link to="/logistics" className="dropdown-item">
                          Dịch vụ cung cấp:
                        </Link>
                      </div> */}
                    </Link>
                    <Link to="/service/bkthc" className="dropdown-item">
                      Dịch vụ Bay kiểm tra hiệu chuẩn
                    </Link>
                    <Link to="/service/tnhc" className="dropdown-item">
                      Dịch vụ Thử nghiệm - Hiệu chuẩn
                    </Link>
                    <Link to="/service/bkthc" className="dropdown-item">
                      Dịch vụ Kỹ thuật (Hàng không)
                    </Link>
                    <Link to="/service/hldt" className="dropdown-item">
                      Dịch vụ Huấn luyện - Đào tạo
                    </Link>
                    <Link to="/service/qlda" className="dropdown-item">
                      Dịch vụ tư vấn đầu tư xây dựng và QLDA
                    </Link>
                  </div>
                </div>

                {/* News Dropdown */}
                <div className="nav-item dropdown">
                  <Link
                    to="/news"
                    className="nav-link dropdown-toggle"
                    data-toggle="dropdown"
                  >
                    Tin tức
                  </Link>
                  <div className="dropdown-menu">
                    <Link to="/news/notification/all" className="dropdown-item">
                      Tin hoạt động
                      <div className="dropdown-menu">
                        <Link to="/service/dvktcns" className="dropdown-item">
                          Hoạt động công ty
                        </Link>
                        <Link to="/service/bkthc" className="dropdown-item">
                          Đảng bộ công ty
                        </Link>
                        <Link to="/logistics" className="dropdown-item">
                          Đoàn thanh niên công ty
                        </Link>
                        <Link to="/logistics" className="dropdown-item">
                          Công đoàn công ty
                        </Link>
                      </div>
                    </Link>
                    <Link to="/news/recruitment/all" className="dropdown-item">
                      Tin ngành hàng không
                    </Link>
                    <Link to="/news/activity/all" className="dropdown-item">
                      Tuyên truyền pháp luật
                    </Link>
                  </div>
                </div>
                {/* News Dropdown */}
                <div className="nav-item dropdown">
                  <Link
                    to="/notifications"
                    className="nav-link dropdown-toggle"
                    data-toggle="dropdown"
                  >
                    Thông báo
                  </Link>
                  <div className="dropdown-menu">
                    <Link
                      to="/notification/recruitment/all"
                      className="dropdown-item"
                    >
                      Tuyển dụng
                    </Link>
                    <Link
                      to="/notification/supplier/all"
                      className="dropdown-item"
                    >
                      Thông báo mới nhà cung cấp
                    </Link>
                    <Link to="/news/other/all" className="dropdown-item">
                      Thông báo khác
                    </Link>
                  </div>
                </div>

                {/* Company Info Dropdown */}
                <div className="nav-item dropdown">
                  <Link
                    to="/company-info"
                    className="nav-link dropdown-toggle"
                    data-toggle="dropdown"
                  >
                    Thông tin công ty
                  </Link>
                  <div className="dropdown-menu">
                    <Link
                      to="/company-info/company-history"
                      className="dropdown-item"
                    >
                      Lịch sử ra đời
                    </Link>
                    <Link
                      to="/company-info/structure"
                      className="dropdown-item"
                    >
                      Cơ cấu tổ chức
                    </Link>
                    <Link
                      to="/company-info/leadership"
                      className="dropdown-item"
                    >
                      Ban lãnh đạo
                    </Link>
                    <Link to="/information/business" className="dropdown-item">
                      Ngành nghề kinh doanh
                    </Link>
                    <Link to="/information/iso" className="dropdown-item">
                      Hệ thống chứng chỉ ISO
                    </Link>
                    <Link to="/information/financial" className="dropdown-item">
                      Thông tin tài chính
                    </Link>
                    {/* <Link to="/thong-tin-cong-ty" className="dropdown-item">
                      Thông tin công ty
                    </Link> */}
                  </div>
                </div>

                {/* Contact Link */}
                <Link to="/contact" className="nav-item nav-link">
                  Liên hệ
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Header;
