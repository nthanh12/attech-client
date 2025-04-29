import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";
import background_img from "../../../assets/img/logo-ATTECH-company.svg";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Kiểm tra email và password (có thể thay đổi sau khi kết nối với API thực tế)
    if (username === "admin" && password === "password") {
      // Lưu token vào localStorage
      localStorage.setItem("authToken", "fake-token");
      // Điều hướng đến trang admin
      navigate("/admin");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="form-area-login">
      <div className="wrapper">
        <h2>Đăng nhập quản trị</h2>
        <form onSubmit={handleLogin}>
          <div className="box">
            <input
              type="text"
              placeholder="Tài khoản"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <i className="fa fa-user"></i>
          </div>
          <div className="box">
            <input
              type="password"
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <i className="fa fa-lock"></i>
          </div>
          <div className="options">
            <label>
              <input type="checkbox" /> Lưu mật khẩu
            </label>
            <a className="forgot-pass" href="#">
              Quên mật khẩu?
            </a>
          </div>
          <button type="submit">Đăng nhập</button>
        </form>
        {error && <p className="error">{error}</p>}
        <p>
          Chưa có tài khoản?{" "}
          <a className="register-btn" href="#">
            Đăng ký
          </a>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
