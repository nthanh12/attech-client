import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "../../assets/css/Header.css";
import Logo from "../../assets/img/logo.png";

const Header = () => {
  const [isDropdownOpen, setDropdownOpen] = useState({
    products: false,
    services: false,
    news: false,
    companyInfo: false,
  });

  const toggleDropdown = (menu) => {
    setDropdownOpen((prevState) => ({
      ...prevState,
      [menu]: !prevState[menu],
    }));
  };

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

                {/* Products Dropdown */}
                <div
                  className="nav-item dropdown"
                  onMouseEnter={() => toggleDropdown("products")}
                  onMouseLeave={() => toggleDropdown("products")}
                >
                  <Link
                    to="/product"
                    className="nav-link dropdown-toggle"
                    data-toggle="dropdown"
                  >
                    Sản phẩm
                  </Link>
                  <div
                    className={`dropdown-menu ${
                      isDropdownOpen.products ? "show" : ""
                    }`}
                  >
                    <Link to="/product/cns-atm" className="dropdown-item">
                      CNS/ATM
                    </Link>
                    <Link
                      to="/product/he-thong-den-hieu"
                      className="dropdown-item"
                    >
                      Hệ thống đèn hiệu
                    </Link>
                    <Link
                      to="/product/co-khi-che-tao"
                      className="dropdown-item"
                    >
                      Cơ khí chế tạo
                    </Link>
                  </div>
                </div>

                {/* Services Dropdown */}
                <div
                  className="nav-item dropdown"
                  onMouseEnter={() => toggleDropdown("services")}
                  onMouseLeave={() => toggleDropdown("services")}
                >
                  <Link
                    to="/service"
                    className="nav-link dropdown-toggle"
                    data-toggle="dropdown"
                  >
                    Dịch vụ
                  </Link>
                  <div
                    className={`dropdown-menu ${
                      isDropdownOpen.services ? "show" : ""
                    }`}
                  >
                    <Link to="/service/dvktcns" className="dropdown-item">
                      DVKT Chuyên ngành CNS
                    </Link>
                    <Link to="/service/bkthc" className="dropdown-item">
                      Bay kiểm tra hiệu chuẩn
                    </Link>
                    <Link to="/logistics" className="dropdown-item">
                      Logistics
                    </Link>
                    <Link to="/service/tnhc" className="dropdown-item">
                      Thử nghiệm hiệu chuẩn
                    </Link>
                    <Link to="/service/qlda" className="dropdown-item">
                      Dịch vụ tư vấn đầu tư xây dựng và QLDA
                    </Link>
                    <Link to="/service/ktdd" className="dropdown-item">
                      Đảm bảo kỹ thuật dân dụng
                    </Link>
                    <Link to="/service/hldt" className="dropdown-item">
                      Dịch vụ huấn luyện đào tạo
                    </Link>
                  </div>
                </div>

                {/* News Dropdown */}
                <div
                  className="nav-item dropdown"
                  onMouseEnter={() => toggleDropdown("news")}
                  onMouseLeave={() => toggleDropdown("news")}
                >
                  <Link
                    to="/news"
                    className="nav-link dropdown-toggle"
                    data-toggle="dropdown"
                  >
                    Tin tức & sự kiện
                  </Link>
                  <div
                    className={`dropdown-menu ${
                      isDropdownOpen.news ? "show" : ""
                    }`}
                  >
                    <Link to="/news/notification/all" className="dropdown-item">
                      Thông báo
                    </Link>
                    <Link to="/news/recruitment/all" className="dropdown-item">
                      Tuyển dụng
                    </Link>
                    <Link to="/news/activity/all" className="dropdown-item">
                      Tin tức hoạt động
                    </Link>
                    <Link to="/news/train/all" className="dropdown-item">
                      Tin hoạt động huấn luyện
                    </Link>
                    <Link to="/hang-khong-the-gioi" className="dropdown-item">
                      Tin hàng không thế giới
                    </Link>
                    <Link to="/hang-khong-trong-nuoc" className="dropdown-item">
                      Tin hàng không trong nước
                    </Link>
                  </div>
                </div>

                {/* Company Info Dropdown */}
                <div
                  className="nav-item dropdown"
                  onMouseEnter={() => toggleDropdown("companyInfo")}
                  onMouseLeave={() => toggleDropdown("companyInfo")}
                >
                  <Link
                    to="/information"
                    className="nav-link dropdown-toggle"
                    data-toggle="dropdown"
                  >
                    Thông tin công ty
                  </Link>
                  <div
                    className={`dropdown-menu ${
                      isDropdownOpen.companyInfo ? "show" : ""
                    }`}
                  >
                    <Link
                      to="/information/company-history"
                      className="dropdown-item"
                    >
                      Lịch sử ra đời
                    </Link>
                    <Link to="/information/structure" className="dropdown-item">
                      Cơ cấu tổ chức
                    </Link>
                    <Link
                      to="/information/leadership"
                      className="dropdown-item"
                    >
                      Ban lãnh đạo
                    </Link>
                    <Link to="/information/business" className="dropdown-item">
                      Ngành nghề kinh doanh
                    </Link>
                    <Link
                      to="/information/experience"
                      className="dropdown-item"
                    >
                      Năng lực, kinh nghiệm
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
