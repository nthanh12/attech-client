import React from "react";
import { useTranslation } from 'react-i18next';
import "../Leadership/Leadership.css";

const getLeadershipData = (t) => ({
  chairman: [
    {
      name: "Lê Tiến Thịnh",
      position: t('frontend.companyInfo.leadership.positions.chairman'),
      image: "/assets/images/leadership/thinhlt.webp",
    },
  ],
  director: [
    {
      name: "Nguyễn Hoàng Giang",
      position: t('frontend.companyInfo.leadership.positions.director'),
      image: "/assets/images/leadership/giangnh.webp",
    },
  ],
  viceDirectors: [
    {
      name: "Đinh Nhật Minh",
      position: t('frontend.companyInfo.leadership.positions.viceDirector'),
      image: "/assets/images/leadership/minhdn.webp",
    },
    {
      name: "Nguyễn Như Thành",
      position: t('frontend.companyInfo.leadership.positions.viceDirector'),
      image: "/assets/images/leadership/thanhnn.webp",
    },
    {
      name: "Phan Quốc Hưng",
      position: t('frontend.companyInfo.leadership.positions.viceDirector'),
      image: "/assets/images/leadership/hungpq.webp",
    },
  ],
});

export default function Leadership() {
  const { t } = useTranslation();
  const leadershipData = getLeadershipData(t);
  
  return (
    <div className="leadership-background">
      <h2 className="leadership-title">
        {t('frontend.companyInfo.leadership.title')}
      </h2>
      <div className="leader-container">
        <div className="leader-section">
          <div className="leader-section-title"></div>
          <div className="leader-row leader-row-chairman">
            {leadershipData.chairman.map((member, idx) => (
              <div className="leader-profile leader-profile-chairman" key={idx}>
                <div className="leader-img-wrap leader-img-wrap-chairman">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="leader-img"
                  />
                </div>
                <div className="leader-name leader-name-chairman">
                  {member.name}
                </div>
                <div className="leader-title leader-title-chairman">
                  {member.position}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="leader-section">
          <div className="leader-section-title"></div>
          <div className="leader-row leader-row-director">
            {leadershipData.director.map((member, idx) => (
              <div className="leader-profile leader-profile-director" key={idx}>
                <div className="leader-img-wrap leader-img-wrap-director">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="leader-img"
                  />
                </div>
                <div className="leader-name leader-name-director">
                  {member.name}
                </div>
                <div className="leader-title leader-title-director">
                  {member.position}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="leader-section">
          <div className="leader-section-title"></div>
          <div className="leader-row leader-row-vice">
            {leadershipData.viceDirectors.map((member, idx) => (
              <div className="leader-profile leader-profile-vice" key={idx}>
                <div className="leader-img-wrap leader-img-wrap-vice">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="leader-img"
                  />
                </div>
                <div className="leader-name leader-name-vice">
                  {member.name}
                </div>
                <div className="leader-title leader-title-vice">
                  {member.position}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
