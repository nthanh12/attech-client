import React from "react";
import { Link } from "react-router-dom";
import NavbarLinks from "../NavbarLinks/NavbarLinks";
import "./NavbarTop.css";

const NavbarTop = () => {
  return (
    <div className="container-fluid fixed-top px-0 navbar-top">
      <nav className="navbar navbar-expand-lg navbar-dark bg-transparent py-3 px-4">
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

export default NavbarTop;
