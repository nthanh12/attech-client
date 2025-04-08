import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import NavbarTop from "./NavbarTop/NavbarTop";
import NavbarScrolled from "./NavbarScrolled/NavbarScrolled";
import "../Navbar/Navbar.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const Navbar = () => {
  const [isScrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/") {
      setScrolled(true);
      return;
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  return isScrolled ? <NavbarScrolled /> : <NavbarTop />;
};

export default Navbar;
