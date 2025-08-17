import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const ProtectedRoute = ({
  children,
  requiredPermissions = [],
  fallbackPath = "/dang-nhap",
  showMessage = true,
  hideContentOnNoPermission = false, // New prop to hide content instead of showing error
}) => {
  const { isAuthenticated, hasPermission, hasAnyPermission, loading, user } =
    useAuth();

  // Show loading spinner while checking auth
  if (loading) {
    return (
      <div
        className="attech-admin-loading-container"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#f8f9fa",
        }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Đang tải...</span>
        </div>
      </div>
    );
  }

  // Check if user is authenticated
  const authStatus = isAuthenticated();

  if (!authStatus) {
    return <Navigate to={fallbackPath} replace />;
  }

  // Check permissions if required
  if (requiredPermissions.length > 0) {
    const hasRequiredPermission = Array.isArray(requiredPermissions[0])
      ? hasAnyPermission(requiredPermissions.flat())
      : requiredPermissions.every((permission) => hasPermission(permission));

    if (!hasRequiredPermission) {
      // If hideContentOnNoPermission is true, just return null (hide content)
      if (hideContentOnNoPermission) {
        return null;
      }

      if (showMessage) {
        return (
          <div
            className="attech-admin-access-denied"
            style={{ margin: "40px" }}
          >
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-md-6 text-center">
                  <div className="alert alert-warning">
                    <i
                      className="bi bi-shield-exclamation"
                      style={{ fontSize: "48px" }}
                    ></i>
                    <h4 className="mt-3">Không có quyền truy cập</h4>
                    <p>
                      Bạn không có quyền truy cập trang này. Vui lòng liên hệ
                      quản trị viên.
                    </p>
                    <p>
                      <small>
                        Người dùng: {user?.name} (
                        {user?.permissions?.length || 0} quyền)
                      </small>
                    </p>
                    <button
                      className="btn btn-primary"
                      onClick={() => window.history.back()}
                    >
                      <i className="bi bi-arrow-left"></i> Quay lại
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }
      return <Navigate to="/access-denied" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
