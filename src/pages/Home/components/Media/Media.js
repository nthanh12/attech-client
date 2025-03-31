import React, { useState } from "react";
import ReactPlayer from "react-player";
import "../Media/Media.css";

const Media = () => {
  const [currentVideo, setCurrentVideo] = useState(
    "https://www.youtube.com/watch?v=szACf6q5SoM"
  );

  const videos = [
    {
      title: "ATTECH là chúng tôi",
      url: "https://www.youtube.com/watch?v=szACf6q5SoM",
    },
    {
      title: "ATTECH 25 năm",
      url: "https://youtu.be/bROog4Jqyzo?si=ycmfRSRInGPxnayh",
    },
    {
      title: "ATTECH nhìn lại 2024",
      url: "https://youtu.be/6ecUlYtx3T8?si=mzK-GoYzag_q4aY8",
    },
    // Thêm video khác ở đây
  ];

  return (
    <div className="media-container">
      {/* <h1 className="media-title">Video Player</h1> */}
      <div className="video-list">
        {videos.map((video, index) => (
          <div
            key={index}
            className="video-item"
            onClick={() => setCurrentVideo(video.url)}
          >
            <p className="video-title">{video.title}</p>
          </div>
        ))}
      </div>
      <div className="video-player">
        <ReactPlayer url={currentVideo} width="100%" height="500px" controls />
      </div>
    </div>
  );
};

export default Media;
