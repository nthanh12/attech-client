import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const ProtectedRoute = ({
  children,
  requiredRoleId = null, // roleId required (1-3)
  fallbackPath = "/dang-nhap",
  showMessage = true,
  hideContentOnNoPermission = false,
}) => {
  const { isAuthenticated, hasPermission, loading, user, ROLES } =
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

  // Check roleId permission if required
  if (requiredRoleId !== null) {
    const hasRequiredPermission = hasPermission(requiredRoleId);

    if (!hasRequiredPermission) {
      if (hideContentOnNoPermission) {
        return null;
      }

      if (showMessage) {
        const getRoleName = (roleId) => {
          switch (roleId) {
            case ROLES.SUPERADMIN: return 'Super Admin';
            case ROLES.ADMIN: return 'Admin';
            case ROLES.EDITOR: return 'Editor';
            default: return 'Unknown';
          }
        };

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
                        Người dùng: {user?.name} - Role: {getRoleName(user?.roleId)} ({user?.roleId})<br/>
                        Yêu cầu: {getRoleName(requiredRoleId)} ({requiredRoleId}) trở lên
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