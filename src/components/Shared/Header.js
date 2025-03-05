import { Link, NavLink } from "react-router-dom";
import "../../assets/css/Header.css";
import Logo from "../../assets/img/logo.png";

const Header = () => {
  return (
    <div className="header-div header-div-fix">
      <div className="top-bar">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-lg-12 col-md-7 d-none d-lg-block">
              <div className="row">
                <div className="col-6 topbar1">
                  <div className="top-bar-item">
                    <div className="top-bar-icon">
                      <i className="fa-solid fa-location-dot"></i>
                    </div>
                    <div className="top-bar-text">
                      <p>Số 5/200 Nguyễn Sơn - Long Biên - Hà Nội</p>
                    </div>
                  </div>
                </div>
                <div className="col-6 topbar2">
                  <div className="top-bar-item">
                    <div className="top-bar-icon">
                      <i className="flaticon-call"></i>
                    </div>
                    <div className="top-bar-text">
                      <p>(+84.24) 382.719.14</p>
                    </div>
                  </div>
                  <div className="top-bar-item">
                    <div className="top-bar-icon">
                      <i className="flaticon-send-mail"></i>
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
                    to="#"
                    className="nav-link dropdown-toggle"
                    data-toggle="dropdown"
                  >
                    Sản phẩm
                  </Link>
                  <div className="dropdown-menu">
                    <Link to="/cns-atm" className="dropdown-item">
                      CNS/ATM
                    </Link>
                    <Link to="/he-thong-den-hieu" className="dropdown-item">
                      Hệ thống đèn hiệu
                    </Link>
                    <Link to="/co-khi-che-tao" className="dropdown-item">
                      Cơ khí chế tạo
                    </Link>
                  </div>
                </div>

                <div className="nav-item dropdown">
                  <Link
                    to="#"
                    className="nav-link dropdown-toggle"
                    data-toggle="dropdown"
                  >
                    Dịch vụ
                  </Link>
                  <div className="dropdown-menu">
                    <Link to="/dvkt-cns" className="dropdown-item">
                      DVKT Chuyên ngành CNS
                    </Link>
                    <Link to="/bay-kiem-tra" className="dropdown-item">
                      Bay kiểm tra hiệu chuẩn
                    </Link>
                    <Link to="/logistics" className="dropdown-item">
                      Logistics
                    </Link>
                    <Link to="/thu-nghiem-hieu-chuan" className="dropdown-item">
                      Thử nghiệm hiệu chuẩn
                    </Link>
                    <Link to="/tu-van-dau-tu" className="dropdown-item">
                      Dịch vụ tư vấn đầu tư xây dựng và QLDA
                    </Link>
                    <Link to="/ky-thuat-dan-dung" className="dropdown-item">
                      Đảm bảo kỹ thuật dân dụng
                    </Link>
                    <Link to="/dao-tao" className="dropdown-item">
                      Dịch vụ huấn luyện đào tạo
                    </Link>
                  </div>
                </div>

                <div className="nav-item dropdown">
                  <Link
                    to="#"
                    className="nav-link dropdown-toggle"
                    data-toggle="dropdown"
                  >
                    Tin tức & sự kiện
                  </Link>
                  <div className="dropdown-menu">
                    <Link to="/thong-bao" className="dropdown-item">
                      Thông báo
                    </Link>
                    <Link to="/tuyen-dung" className="dropdown-item">
                      Tuyển dụng
                    </Link>
                    <Link to="/tin-tuc-hoat-dong" className="dropdown-item">
                      Tin tức hoạt động
                    </Link>
                    <Link to="/hoat-dong-huan-luyen" className="dropdown-item">
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

                <div className="nav-item dropdown">
                  <Link
                    to="#"
                    className="nav-link dropdown-toggle"
                    data-toggle="dropdown"
                  >
                    Thông tin công ty
                  </Link>
                  <div className="dropdown-menu">
                    <Link to="/lich-su" className="dropdown-item">
                      Lịch sử ra đời
                    </Link>
                    <Link to="/co-cau-to-chuc" className="dropdown-item">
                      Cơ cấu tổ chức
                    </Link>
                    <Link to="/ban-lanh-dao" className="dropdown-item">
                      Ban lãnh đạo
                    </Link>
                    <Link to="/nganh-nghe" className="dropdown-item">
                      Ngành nghề kinh doanh
                    </Link>
                    <Link to="/nang-luc" className="dropdown-item">
                      Năng lực, kinh nghiệm
                    </Link>
                    <Link to="/iso" className="dropdown-item">
                      Hệ thống chứng chỉ ISO
                    </Link>
                    <Link to="/tai-chinh" className="dropdown-item">
                      Thông tin tài chính
                    </Link>
                    <Link to="/thong-tin-cong-ty" className="dropdown-item">
                      Thông tin công ty
                    </Link>
                  </div>
                </div>

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
