import React, { useState } from "react";
import ReactPlayer from "react-player";
import "../Media/Media.css";

const Media = () => {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="media-box">
      <div className="media-wrap">
        <ReactPlayer
          url="https://www.youtube.com/watch?v=szACf6q5SoM"
          width="60%"
          height="60vh"
          controls={true}
          playing={playing}
          //   light={logoBanner}
          //   onClickPreview={() => setPlaying(true)}
          //   playIcon={<CustomPlayButton onClick={() => setPlaying(true)} />}
        />
      </div>
    </div>
  );
};

export default Media;
