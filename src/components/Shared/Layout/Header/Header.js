import React from "react";
import Spinner from "./Spinner/Spinner";
import Navbar from "./Navbar/Navbar";
import SearchModal from "./SearchModal/SearchModal";
import "./Header.css";

const Header = () => {
  return (
    <div>
      <Spinner />
      {/* <Topbar /> */}
      <Navbar />
      <SearchModal />
    </div>
  );
};

export default Header;
