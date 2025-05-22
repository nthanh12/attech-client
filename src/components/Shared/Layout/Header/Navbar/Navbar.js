import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import NavbarTop from "./NavbarTop/NavbarTop";
import NavbarScrolled from "./NavbarScrolled/NavbarScrolled";
import "../Navbar/Navbar.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const Navbar = () => {
  const [isScrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/") {
      setScrolled(true);
      setIsVisible(true);
      return;
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const shouldBeScrolled = currentScrollY > 20;

      if (currentScrollY === 0) {
        setScrolled(false);
        setIsVisible(true);
        return;
      }

      if (shouldBeScrolled !== isScrolled) {
        setIsVisible(false);
        setTimeout(() => {
          setScrolled(shouldBeScrolled);
          setIsVisible(true);
        }, 300);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname, isScrolled]);

  return (
    <div className={`navbar-container ${isVisible ? 'visible' : 'hidden'} ${isScrolled ? 'scrolled' : ''}`}>
      {isScrolled ? <NavbarScrolled /> : <NavbarTop />}
    </div>
  );
};

export default Navbar;
