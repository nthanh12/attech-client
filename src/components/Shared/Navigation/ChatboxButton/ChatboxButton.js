import React from "react";
import PropTypes from "prop-types";
import "./ChatboxButton.css";
import chatIcon from "../../../../assets/img/chat-icon.png";

const ChatboxButton = ({
  onClick,
  iconSrc = chatIcon,
  size = 50,
  backgroundColor = "#3898C5",
}) => {
  return (
    <div
      className="chatbox-button"
      onClick={onClick}
      style={{ width: size, height: size, backgroundColor }}
    >
      <img src={iconSrc} alt="Chatbox" />
    </div>
  );
};

ChatboxButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  iconSrc: PropTypes.string,
  size: PropTypes.number,
  backgroundColor: PropTypes.string,
};

export default ChatboxButton;
