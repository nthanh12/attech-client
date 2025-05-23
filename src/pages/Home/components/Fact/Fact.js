import React, { useState } from "react";
import "./Fact.css";

const Fact = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div className="fact">
      <div className="container">
        <a href="#" className="fact__banner">
          <img 
            src="https://vatm.vn/uploads/z6294715350538_ce0d1905bb27dbc45ce85ea076f82d48.jpg" 
            alt="Đại hội Đảng"
            className={`fact__image ${imageLoaded ? 'loaded' : ''}`}
            loading="lazy"
            onLoad={handleImageLoad}
          />
        </a>
      </div>
    </div>
  );
};

export default Fact;
