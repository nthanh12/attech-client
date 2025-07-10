import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

export default function UserLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [remember, setRemember] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok && data.accessToken) {
        localStorage.setItem('user_token', data.accessToken);
        navigate('/');
      } else {
        setError(data.message || 'Đăng nhập thất bại');
      }
    } catch (err) {
      setError('Lỗi kết nối máy chủ');
    }
    setLoading(false);
  };

  return (
    <div className="form-area-login">
      <div className="wrapper">
        <h2>Đăng nhập người dùng</h2>
        <form onSubmit={handleSubmit} autoComplete="on">
          <div className="box">
            <input
              type="text"
              placeholder="Tài khoản"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
              autoFocus
              autoComplete="username"
              id="user-username"
            />
            <i className="fa fa-user"></i>
          </div>
          <div className="box">
            <input
              type="password"
              placeholder="Mật khẩu"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              id="user-password"
            />
            <i className="fa fa-lock"></i>
          </div>
          <div className="options">
            <label>
              <input
                type="checkbox"
                checked={remember}
                onChange={e => setRemember(e.target.checked)}
              /> Lưu mật khẩu
            </label>
            <a className="forgot-pass" href="#">Quên mật khẩu?</a>
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </button>
        </form>
        <p className={`error${error ? ' show' : ''}`}>{error || '\u00A0'}</p>
        <p>
          Chưa có tài khoản?{' '}
          <a className="register-btn" href="#">Đăng ký</a>
        </p>
      </div>
    </div>
  );
} 