import React from "react";

const ToastMessage = ({ show, message, type, onClose }) => {
  if (!show) return null;
  return (
    <div className={`toast toast-${type}`}>
      <span>{message}</span>
      <button onClick={onClose}>✕</button>
    </div>
  );
};

export default ToastMessage; 