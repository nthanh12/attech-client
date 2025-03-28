import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import Logo from "../../../../../assets/img/logo.png";

const Navbar = () => {
  const [isHidden, setHidden] = useState(true); // ✨ Ban đầu ẩn nếu ở trang chủ
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/") {
      setHidden(false); // ✨ Trang khác luôn hiển thị navbar
      return;
    }

    const handleScroll = () => {
      setHidden(window.scrollY < 100); // ✨ Hiện navbar khi cuộn > 100px
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  return (
    <div
      className={`container-fluid sticky-top px-0 ${
        isHidden ? "hidden" : "active shadow-sm"
      }`}
    >
      <nav className="navbar navbar-expand-lg navbar-dark bg-white py-3 px-4">
        <Link to="/" className="logo">
          <img src={Logo} alt="Logo" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
        >
          <span className="fa fa-bars"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <div className="navbar-nav ms-auto pt-2 pt-lg-0">
            <Link to="/" className="nav-item nav-link active">
              Trang chủ
            </Link>
            <div className="nav-item dropdown">
              <Link
                to="/products"
                className="nav-link dropdown-toggle text-dark"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Sản phẩm
              </Link>
              <div className="dropdown-menu m-lg-0">
                <Link to="/product/cns-atm" className="dropdown-item">
                  CNS/ATM
                </Link>
                <Link to="/product/cns-atm" className="dropdown-item">
                  Các sản phẩm khác
                </Link>
              </div>
            </div>
            <div className="nav-item dropdown">
              <Link
                to="/services"
                className="nav-link dropdown-toggle text-dark"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Dịch vụ
              </Link>
              <div className="dropdown-menu m-lg-0">
                <Link to="service/feature" className="dropdown-item">
                  Dịch vụ thông tin dẫn đường giám sát (CNS)
                </Link>
                <Link to="/blog" className="dropdown-item">
                  Dịch vụ Bay kiểm tra hiệu chuẩn
                </Link>
                <Link to="/blog" className="dropdown-item">
                  Dịch vụ Thử nghiệm - Hiệu chuẩn
                </Link>
                <Link to="/blog" className="dropdown-item">
                  Dịch vụ Kỹ thuật (Hàng không)
                </Link>
                <Link to="/blog" className="dropdown-item">
                  Dịch vụ Huấn luyện - Đào tạo
                </Link>
                <Link to="/blog" className="dropdown-item">
                  Dịch vụ Tư vấn đầu tư và xây dựng QLDA
                </Link>
              </div>
            </div>
            <div className="nav-item dropdown">
              <Link
                to="/news"
                className="nav-link dropdown-toggle text-dark"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Tin tức
              </Link>
              <div className="dropdown-menu m-lg-0">
                <Link to="service/feature" className="dropdown-item">
                  Tin hoạt động
                </Link>
                <Link to="/blog" className="dropdown-item">
                  Tin ngành hàng không
                </Link>
                <Link to="/blog" className="dropdown-item">
                  Tuyên truyền pháp luật
                </Link>
              </div>
            </div>
            <div className="nav-item dropdown">
              <Link
                to="/notifications"
                className="nav-link dropdown-toggle text-dark"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Thông báo
              </Link>
              <div className="dropdown-menu m-lg-0">
                <Link to="service/feature" className="dropdown-item">
                  Tuyển dụng
                </Link>
                <Link to="/blog" className="dropdown-item">
                  Thông báo mới nhà cung cấp
                </Link>
                <Link to="/blog" className="dropdown-item">
                  Thông báo khác
                </Link>
              </div>
            </div>
            <div className="nav-item dropdown">
              <Link
                to="/company-info"
                className="nav-link dropdown-toggle text-dark"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Thông tin công ty
              </Link>
              <div className="dropdown-menu m-lg-0">
                <Link to="/feature" className="dropdown-item">
                  Lịch sử ra đời
                </Link>
                <Link to="/blog" className="dropdown-item">
                  Cơ cấu tổ chức
                </Link>
                <Link to="/team" className="dropdown-item">
                  Ban lãnh đạo
                </Link>
                <Link to="/testimonial" className="dropdown-item">
                  Ngành nghề kinh doanh
                </Link>
                <Link to="/404" className="dropdown-item">
                  Hệ thống chứng chỉ ISO
                </Link>
                <Link to="/404" className="dropdown-item">
                  Thông tin tài chính
                </Link>
              </div>
            </div>
            <Link to="/contact" className="nav-item nav-link">
              Liên hệ
            </Link>
          </div>
          <div className="d-flex align-items-center flex-nowrap pt-3 pt-lg-0 ms-lg-2">
            <button
              className="btn btn-primary py-2 px-3"
              data-bs-toggle="modal"
              data-bs-target="#searchModal"
            >
              <i className="fas fa-search"></i>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
