import React, { useState } from "react";
import "../../assets/css/NotificationList.css";

const NotificationList = ({ notifications }) => {
  // const [notificationItems, setNotificationItems] = useState(notifications);

  // const handleRemoveNotification = (index) => {
  //   const newNotifications = [...notificationItems];
  //   newNotifications.splice(index, 1);
  //   setNotificationItems(newNotifications);
  // };

  return (
    <>
      <div className="container">
        <div class="row">
          <div class="col-12 col-sm-6 p-0">
            <p className="notification-category">
              Thông báo <span>Xem thêm</span>
            </p>
            <div className="notification-item">
              <img
                className="notification-img"
                src="https://www.shutterstock.com/image-illustration/red-number-one-1-on-260nw-2427623325.jpg"
                alt="notification"
              />
              <div>
                <p className="notification-title">
                  Công đoàn Công ty Quản lý bay miền Trung chăm lo đời sống NLĐ
                  và tổ chức chương trình XHTT Tết Ất Tỵ 2025
                </p>
                <p className="notification-content">
                  Sáng ngày 28/02/2025, Công ty TNHH Kỹ thuật Quản lý bay và
                  Công đoàn cơ sở tổ chức Hội nghị tuyên dương điển hình tiên
                  tiến giai đoạn 2020-2024 và phát động phong trào thi đua giai
                  đoạn 2025-2030.
                </p>
              </div>
            </div>
            <div className="notification-item">
              <img
                className="notification-img"
                src="https://png.pngtree.com/png-clipart/20200309/ourmid/pngtree-gold-number-2-png-image_2158838.jpg"
                alt="notification"
              />
              <div>
                <p className="notification-title">
                  Công đoàn Công ty Quản lý bay miền Trung chăm lo đời sống NLĐ
                  và tổ chức chương trình XHTT Tết Ất Tỵ 2025
                </p>
                <p className="notification-content">
                  Sáng ngày 28/02/2025, Công ty TNHH Kỹ thuật Quản lý bay và
                  Công đoàn cơ sở tổ chức Hội nghị tuyên dương điển hình tiên
                  tiến giai đoạn 2020-2024 và phát động phong trào thi đua giai
                  đoạn 2025-2030.
                </p>
              </div>
            </div>
            <div className="notification-item">
              <img
                className="notification-img"
                src="https://png.pngtree.com/png-clipart/20200309/ourmid/pngtree-gold-number-2-png-image_2158838.jpg"
                alt="notification"
              />
              <div>
                <p className="notification-title">
                  Công đoàn Công ty Quản lý bay miền Trung chăm lo đời sống NLĐ
                  và tổ chức chương trình XHTT Tết Ất Tỵ 2025
                </p>
                <p className="notification-content">
                  Sáng ngày 28/02/2025, Công ty TNHH Kỹ thuật Quản lý bay và
                  Công đoàn cơ sở tổ chức Hội nghị tuyên dương điển hình tiên
                  tiến giai đoạn 2020-2024 và phát động phong trào thi đua giai
                  đoạn 2025-2030.
                </p>
              </div>
            </div>
          </div>
          <div class="col-12 col-sm-6 p-0">
            <p className="notification-category">
              Tin tức hoạt động <span>Xem thêm</span>
            </p>
            <div className="notification-item">
              <img
                className="notification-img"
                src="https://media.istockphoto.com/id/1062468714/vi/anh/s%E1%BB%91-3-ba-bi%E1%BB%83n-b%C3%A1o-3d-m%C3%A0u-%C4%91%E1%BB%8F-b%E1%BB%8B-c%C3%B4-l%E1%BA%ADp.jpg?s=170667a&w=0&k=20&c=IR4yoLgGkA_B6kLvYWb1cSEagf7VAkRPa50xB73xO-o="
                alt="notification"
              />
              <div>
                <p className="notification-title">
                  Công đoàn Công ty Quản lý bay miền Trung chăm lo đời sống NLĐ
                  và tổ chức chương trình XHTT Tết Ất Tỵ 2025
                </p>
                <p className="notification-content">
                  Sáng ngày 28/02/2025, Công ty TNHH Kỹ thuật Quản lý bay và
                  Công đoàn cơ sở tổ chức Hội nghị tuyên dương điển hình tiên
                  tiến giai đoạn 2020-2024 và phát động phong trào thi đua giai
                  đoạn 2025-2030.
                </p>
              </div>
            </div>
            <div className="notification-item">
              <img
                className="notification-img"
                src="https://png.pngtree.com/png-clipart/20200309/ourmid/pngtree-gold-number-2-png-image_2158838.jpg"
                alt="notification"
              />
              <div>
                <p className="notification-title">
                  Công đoàn Công ty Quản lý bay miền Trung chăm lo đời sống NLĐ
                  và tổ chức chương trình XHTT Tết Ất Tỵ 2025
                </p>
                <p className="notification-content">
                  Sáng ngày 28/02/2025, Công ty TNHH Kỹ thuật Quản lý bay và
                  Công đoàn cơ sở tổ chức Hội nghị tuyên dương điển hình tiên
                  tiến giai đoạn 2020-2024 và phát động phong trào thi đua giai
                  đoạn 2025-2030.
                </p>
              </div>
            </div>
            <div className="notification-item">
              <img
                className="notification-img"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPa-as_5v4NETU7QJDf4X-6Ok_NfG1PqxstQ&s"
                alt="notification"
              />
              <div>
                <p className="notification-title">
                  Công đoàn Công ty Quản lý bay miền Trung chăm lo đời sống NLĐ
                  và tổ chức chương trình XHTT Tết Ất Tỵ 2025
                </p>
                <p className="notification-content">
                  Sáng ngày 28/02/2025, Công ty TNHH Kỹ thuật Quản lý bay và
                  Công đoàn cơ sở tổ chức Hội nghị tuyên dương điển hình tiên
                  tiến giai đoạn 2020-2024 và phát động phong trào thi đua giai
                  đoạn 2025-2030.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotificationList;
