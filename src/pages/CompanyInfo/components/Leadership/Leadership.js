import React, { useState } from "react";
import "../Leadership/Leadership.css";
import bld from "../../../../assets/img/avt/chan-dung.png";

const leadershipData = {
  chairman: [
    {
      name: "Lê Tiến Thịnh",
      position: "Chủ tịch công ty",
      image: "https://attech.com.vn/wp-content/uploads/2015/09/CT-Le-Tien-Thinh.jpg",
      description: "Là người có rất năm kinh nghiệm trong lĩnh vực điều hành doanh nghiệp. Dưới sự lãnh đạo của ông, công ty đã đạt được nhiều thành tựu quan trọng và phát triển vững mạnh.",
      education: "Thạc sĩ Quản trị Kinh doanh",
      experience: [
        "20+ năm kinh nghiệm quản lý",
        "Từng đảm nhiệm nhiều vị trí quản lý cấp cao",
        "Dẫn dắt nhiều dự án công nghệ lớn"
      ]
    }
  ],
  director: [
    {
      name: "Nguyễn Hoàng Giang",
      position: "Giám đốc công ty",
      image: "https://attech.com.vn/wp-content/uploads/2015/09/GD-Hoang-Giang.jpg",
    }
  ],
  viceDirectors: [
    {
      name: "Phan Quốc Hưng",
      position: "Phó giám đốc công ty",
      image: "https://attech.com.vn/wp-content/uploads/2015/09/PGD-PhanQuocHung.jpg",
    },
    {
      name: "Nguyễn Như Thành",
      position: "Phó giám đốc công ty",
      image: "https://attech.com.vn/wp-content/uploads/2015/09/A-Thanh-PGD-final.jpg",
    },
    {
      name: "Đinh Nhật Minh",
      position: "Phó giám đốc công ty",
      image: "https://attech.com.vn/wp-content/uploads/2015/09/PGD-Dinh-Nhat-Minh.jpg"
    }
  ]
};

const LeaderDialog = ({ leader, onClose }) => {
  if (!leader) return null;

  return (
    <div className="leader-dialog-overlay" onClick={onClose}>
      <div className="leader-dialog" onClick={e => e.stopPropagation()}>
        <button className="dialog-close" onClick={onClose}>&times;</button>
        <div className="dialog-content">
          <div className="dialog-header">
            <div className="dialog-image-container">
              <img src={leader.image} alt={leader.name} className="dialog-image" />
            </div>
            <div className="dialog-title">
              <h2>{leader.name}</h2>
              <p className="dialog-position">{leader.position}</p>
            </div>
          </div>
          <div className="dialog-body">
            <div className="dialog-section">
              <h3>Giới thiệu</h3>
              <p>{leader.description}</p>
            </div>
            <div className="dialog-section">
              <h3>Học vấn</h3>
              <p>{leader.education}</p>
            </div>
            <div className="dialog-section">
              <h3>Kinh nghiệm</h3>
              <ul>
                {leader.experience?.map((exp, index) => (
                  <li key={index}>{exp}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Leadership = () => {
  const [selectedLeader, setSelectedLeader] = useState(null);

  const handleLeaderClick = (leader) => {
    setSelectedLeader(leader);
  };

  const renderLeaderProfile = (member, idx) => (
    <div className="leader-profile" key={idx}>
      <div 
        className="leader-img-wrap"
        onClick={() => handleLeaderClick(member)}
      >
        <svg
          className="leader-svg-bg"
          width="100%"
          height="100%"
          viewBox="0 0 300 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id={`curve-gradient-${idx}`} x1="100%" y1="0%" x2="0%" y2="80%">
              <stop offset="0%" stopColor="#1a237e" stopOpacity="0.08"/>
              <stop offset="40%" stopColor="#1a237e" stopOpacity="0.03"/>
              <stop offset="80%" stopColor="#ffffff" stopOpacity="0.02"/>
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0"/>
            </linearGradient>
            <linearGradient id={`curve-gradient-hover-${idx}`} x1="100%" y1="0%" x2="0%" y2="80%">
              <stop offset="0%" stopColor="#1a237e" stopOpacity="0.15"/>
              <stop offset="40%" stopColor="#1a237e" stopOpacity="0.08"/>
              <stop offset="80%" stopColor="#ffffff" stopOpacity="0.04"/>
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0"/>
            </linearGradient>
          </defs>
          
          <path
            className="svg-path main-curve"
            d="M180 0 C 240 0, 300 60, 300 120 V300 H0 V0 H180 Z"
            fill={`url(#curve-gradient-${idx})`}
          />
          
          <path
            className="svg-path curve-1"
            d="M200 0 C 260 0, 320 60, 320 120 V300 H0 V0 H200 Z"
            fill={`url(#curve-gradient-${idx})`}
            opacity="0.7"
            style={{ mixBlendMode: 'multiply' }}
          />
          
          <path
            className="svg-path curve-2"
            d="M220 0 C 280 0, 340 60, 340 120 V300 H0 V0 H220 Z"
            fill={`url(#curve-gradient-${idx})`}
            opacity="0.4"
            style={{ mixBlendMode: 'multiply' }}
          />
        </svg>
        <img src={member.image} alt={member.name} className="leader-img" />
      </div>
      <h3 
        className="leader-name"
        onClick={() => handleLeaderClick(member)}
      >
        {member.name}
      </h3>
      <p className="leader-title">{member.position}</p>
    </div>
  );

  return (
    <div className="leader-container">
      <div className="leadership-intro">
        <h1>Ban Lãnh Đạo</h1>
      </div>

      <div className="leader-grid">
        {/* Chairman Row */}
        <div className="leader-row chairman-row">
          {leadershipData.chairman.map((member, idx) => renderLeaderProfile(member, idx))}
        </div>

        {/* Director Row */}
        <div className="leader-row director-row">
          {leadershipData.director.map((member, idx) => renderLeaderProfile(member, idx + 1))}
        </div>

        {/* Vice Directors Row */}
        <div className="leader-row vice-directors-row">
          {leadershipData.viceDirectors.map((member, idx) => renderLeaderProfile(member, idx + 2))}
        </div>
        
        {selectedLeader && (
          <LeaderDialog 
            leader={selectedLeader} 
            onClose={() => setSelectedLeader(null)} 
          />
        )}
      </div>
    </div>
  );
};

export default Leadership;
