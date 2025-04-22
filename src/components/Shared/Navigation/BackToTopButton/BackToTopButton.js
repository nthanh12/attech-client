import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./BackToTopButton.css";

const BackToTopButton = ({
  scrollThreshold = 300,
  size = 50,
  backgroundColor = "#0f9fdb",
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > scrollThreshold);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollThreshold]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!isVisible) return null;

  return (
    <div
      className="back-to-top"
      onClick={scrollToTop}
      style={{ width: size, height: size, backgroundColor }}
    >
      <i className="fas fa-arrow-up"></i>
    </div>
  );
};

BackToTopButton.propTypes = {
  scrollThreshold: PropTypes.number,
  size: PropTypes.number,
  backgroundColor: PropTypes.string,
};

export default BackToTopButton;
