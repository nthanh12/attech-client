import React from "react";
import { Link } from "react-router-dom";
import NavbarLinks from "../NavbarLinks/NavbarLinks";
import "./NavbarTop.css";
import logo_company from "../../../../../../assets/img/logo-ATTECH-company.svg";

const NavbarTop = () => {
  return (
    <div className="container-fluid fixed-top px-0 navbar-top">
      <nav className="navbar navbar-expand-lg navbar-dark px-4">
        <div className="logo-navbar-top">
          <div className="logo-company">
            <Link to="/" className="logo" aria-label="Home">
              <img
                src={logo_company}
                alt="Air Traffic Technical Company Logo"
              />
            </Link>
          </div>
          <div className="company-name">
            <h4 className="company-name-vi">
              Công ty TNHH Kỹ thuật Quản lý bay
            </h4>
            <h4 className="company-name-en">Air Traffic Technical Company</h4>
          </div>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="fa fa-bars"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <NavbarLinks />
        </div>
      </nav>
    </div>
  );
};

export default NavbarTop;
