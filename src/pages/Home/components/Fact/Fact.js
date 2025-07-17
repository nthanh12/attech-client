import React, { useState } from "react";
import "./Fact.css";

const Fact = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div className="fact">
      <div className="fact__container">
        <a href="#" className="fact__banner">
          <img 
            src="/assets/images/event/thong_tin_1.webp" 
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
