import React from "react";
import { Link } from "react-router-dom";
import "./NotificationList.css";

const NotificationList = () => {
  return (
    <div className="notification-container">
      <div className="container">
        <div className="notification-wrapper">
          <div className="notification-column">
            <div className="notification-header">
              <h3>Thông báo</h3>
              <Link to="/news/notification/all" className="view-more">
                Xem thêm
              </Link>
            </div>

            <div className="notification-list">
              <Link
                to="/news/notification/detail/5"
                className="notification-link"
              >
                <div className="notification-card">
                  <div className="notification-image">
                    <img
                      src="https://www.shutterstock.com/image-illustration/red-number-one-1-on-260nw-2427623325.jpg"
                      alt="notification"
                    />
                  </div>
                  <div className="notification-content">
                    <div className="notification-date">28/02/2025</div>
                    <h4>
                      Công đoàn Công ty Quản lý bay miền Trung chăm lo đời sống
                      NLĐ và tổ chức chương trình XHTT Tết Ất Tỵ 2025
                    </h4>
                  </div>
                </div>
              </Link>

              <Link
                to="/news/notification/detail/5"
                className="notification-link"
              >
                <div className="notification-card">
                  <div className="notification-image">
                    <img
                      src="https://png.pngtree.com/png-clipart/20200309/ourmid/pngtree-gold-number-2-png-image_2158838.jpg"
                      alt="notification"
                    />
                  </div>
                  <div className="notification-content">
                    <div className="notification-date">15/02/2025</div>
                    <h4>
                      Công đoàn Công ty Quản lý bay miền Trung chăm lo đời sống
                      NLĐ và tổ chức chương trình XHTT
                    </h4>
                  </div>
                </div>
              </Link>

              <Link
                to="/news/notification/detail/5"
                className="notification-link"
              >
                <div className="notification-card">
                  <div className="notification-image">
                    <img
                      src="https://png.pngtree.com/png-clipart/20200309/ourmid/pngtree-gold-number-2-png-image_2158838.jpg"
                      alt="notification"
                    />
                  </div>
                  <div className="notification-content">
                    <div className="notification-date">10/02/2025</div>
                    <h4>
                      Hội nghị tuyên dương điển hình tiên tiến giai đoạn
                      2020-2024 và phát động phong trào thi đua
                    </h4>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          <div className="notification-column">
            <div className="notification-header">
              <h3>Tin tức hoạt động</h3>
              <Link to="/news/activity/all" className="view-more">
                Xem thêm
              </Link>
            </div>

            <div className="notification-list">
              <Link to="/news/activity/detail/5" className="notification-link">
                <div className="notification-card">
                  <div className="notification-image">
                    <img
                      src="https://media.istockphoto.com/id/1062468714/vi/anh/s%E1%BB%91-3-ba-bi%E1%BB%83n-b%C3%A1o-3d-m%C3%A0u-%C4%91%E1%BB%8F-b%E1%BB%8B-c%C3%B4-l%E1%BA%ADp.jpg?s=170667a&w=0&k=20&c=IR4yoLgGkA_B6kLvYWb1cSEagf7VAkRPa50xB73xO-o="
                      alt="notification"
                    />
                  </div>
                  <div className="notification-content">
                    <div className="notification-date">28/02/2025</div>
                    <h4>
                      Công đoàn Công ty Quản lý bay miền Trung chăm lo đời sống
                      NLĐ và tổ chức chương trình XHTT Tết Ất Tỵ 2025
                    </h4>
                  </div>
                </div>
              </Link>

              <Link to="/news/activity/detail/5" className="notification-link">
                <div className="notification-card">
                  <div className="notification-image">
                    <img
                      src="https://png.pngtree.com/png-clipart/20200309/ourmid/pngtree-gold-number-2-png-image_2158838.jpg"
                      alt="notification"
                    />
                  </div>
                  <div className="notification-content">
                    <div className="notification-date">20/02/2025</div>
                    <h4>
                      Công đoàn Công ty Quản lý bay miền Trung chăm lo đời sống
                      NLĐ và tổ chức chương trình XHTT
                    </h4>
                  </div>
                </div>
              </Link>

              <Link to="/news/activity/detail/5" className="notification-link">
                <div className="notification-card">
                  <div className="notification-image">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPa-as_5v4NETU7QJDf4X-6Ok_NfG1PqxstQ&s"
                      alt="notification"
                    />
                  </div>
                  <div className="notification-content">
                    <div className="notification-date">05/02/2025</div>
                    <h4>
                      Hội nghị tuyên dương điển hình tiên tiến giai đoạn
                      2020-2024 và phát động phong trào thi đua
                    </h4>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationList;
