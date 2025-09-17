import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "./LoginPage.css";

const LoginPage = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/trang-noi-bo";

  const handleInputChange = (field, value) => {
    setCredentials((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!credentials.username.trim()) {
      newErrors.username = "Vui lòng nhập tên đăng nhập hoặc email";
    }

    if (!credentials.password.trim()) {
      newErrors.password = "Vui lòng nhập mật khẩu";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      const result = await login(credentials);

      if (result.success) {
        // Redirect to user internal page
        navigate(from, { replace: true });
      } else {
        setErrors({ general: result.error });
      }
    } catch (error) {
      setErrors({ general: "Đã xảy ra lỗi. Vui lòng thử lại." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h1>Đăng nhập</h1>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            {errors.general && (
              <div className="alert alert-danger">
                <i className="bi bi-exclamation-triangle"></i>
                {errors.general}
              </div>
            )}

            <div className="form-group">
              <label>Tên đăng nhập</label>
              <div className="input-group">
                <input
                  type="text"
                  value={credentials.username}
                  onChange={(e) =>
                    handleInputChange("username", e.target.value)
                  }
                  className={`form-control ${
                    errors.username ? "is-invalid" : ""
                  }`}
                  placeholder="Nhập tên đăng nhập"
                  disabled={loading}
                />
              </div>
              {errors.username && (
                <div className="invalid-feedback">{errors.username}</div>
              )}
            </div>

            <div className="form-group">
              <label>Mật khẩu</label>
              <div className="input-group">
                <input
                  type="password"
                  value={credentials.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  className={`form-control ${
                    errors.password ? "is-invalid" : ""
                  }`}
                  placeholder="Nhập mật khẩu"
                  disabled={loading}
                />
              </div>
              {errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-login"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                  ></span>
                  <span>Đang đăng nhập...</span>
                </>
              ) : (
                <>
                  <i className="bi bi-box-arrow-in-right"></i>
                  <span>Đăng nhập</span>
                </>
              )}
            </button>
          </form>

          <div className="login-footer">
            <button
              type="button"
              className="btn btn-link"
              onClick={() => navigate("/")}
            >
              <i className="bi bi-arrow-left"></i>
              Quay về trang chủ
            </button>

            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={() => navigate("/admin-login")}
            >
              <i className="bi bi-shield-check"></i>
              Đăng nhập quản trị
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
