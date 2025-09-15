import React, { useState } from "react";
import "./Fact.css";
import { useBannerSettings } from "../../../../hooks/useBannerSettings";

const Fact = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { getFactImage } = useBannerSettings();

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  // Get fact image with fallback
  const factImageUrl = getFactImage();

  return (
    <div className="fact">
      <div className="fact__container">
        <a href="#" className="fact__banner">
          <img 
            src={factImageUrl} 
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
