import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../../../../../assets/img/logo.png";
import NavbarLinks from "../NavbarLinks/NavbarLinks";

const NavbarScrolled = () => {
  return (
    <div className="container-fluid sticky-top px-0 active shadow-sm navbar-scrolled">
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
        <NavbarLinks />
      </nav>
    </div>
  );
};

export default NavbarScrolled;
