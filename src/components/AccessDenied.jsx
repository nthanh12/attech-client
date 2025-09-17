import React from "react";
import { getRoleColor, getRoleText, getRoleIcon } from "../utils/roleUtils";

/**
 * Access Denied Component
 * Shows when user doesn't have UserLevel to access a feature
 */
const AccessDenied = ({
  message,
  showReturnButton = true,
  user = null,
  title = "Access Denied",
}) => {
  const handleReturn = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      // Simple default redirect based on UserLevel
      const defaultRoute =
        user && user.userLevel <= 2 ? "/admin/dashboard" : "/admin/news";
      window.location.href = defaultRoute;
    }
  };

  return (
    <div
      className="access-denied-container"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "400px",
        textAlign: "center",
        padding: "2rem",
        backgroundColor: "#f8f9fa",
        borderRadius: "8px",
        margin: "2rem 0",
      }}
    >
      {/* Icon */}
      <div style={{ marginBottom: "1.5rem" }}>
        <i
          className="fas fa-shield-alt"
          style={{
            fontSize: "4rem",
            color: "#dc3545",
            opacity: 0.7,
          }}
        ></i>
      </div>

      {/* Title */}
      <h3
        style={{
          color: "#dc3545",
          marginBottom: "1rem",
          fontWeight: "600",
        }}
      >
        🚫 {title}
      </h3>

      {/* Message */}
      <p
        style={{
          color: "#6c757d",
          marginBottom: "1.5rem",
          fontSize: "1.1rem",
          maxWidth: "500px",
          lineHeight: "1.5",
        }}
      >
        {message || "Bạn không có quyền truy cập tính năng này"}
      </p>

      {/* Help Text */}
      <div
        style={{
          marginBottom: "1.5rem",
          fontSize: "0.9rem",
          color: "#6c757d",
        }}
      >
        <p>Nếu bạn nghĩ đây là lỗi, vui lòng liên hệ quản trị viên</p>
      </div>

      {/* Return Button */}
      {showReturnButton && (
        <button
          className="btn btn-primary"
          onClick={handleReturn}
          style={{
            padding: "0.75rem 1.5rem",
            fontSize: "1rem",
            borderRadius: "6px",
            border: "none",
            backgroundColor: "#007bff",
            color: "white",
            cursor: "pointer",
            transition: "background-color 0.2s",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
        >
          <i
            className="fas fa-arrow-left"
            style={{ marginRight: "0.5rem" }}
          ></i>
          Quay lại
        </button>
      )}
    </div>
  );
};

export default AccessDenied;
