import React from "react";
import Navbar from "./Navbar/Navbar";
import SearchModal from "./SearchModal/SearchModal";
import "./Header.css";

const Header = () => {
  return (
    <div>
      {/* <Topbar /> */}
      <Navbar />
      <SearchModal />
    </div>
  );
};

export default Header;
