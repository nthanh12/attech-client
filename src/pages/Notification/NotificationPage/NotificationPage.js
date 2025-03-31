import SliderNotification from "../components/SliderNotification/SliderNotification";
import MainNotification from "../components/MainNotification/MainNotification";
import "./NotificationPage.css";
import SubNotification from "../components/SubNotification/SubNotification";

const Notification = () => {
  return (
    <div className="notification">
      <SliderNotification />
      <MainNotification />
      <SubNotification />
    </div>
  );
};

export default Notification;
