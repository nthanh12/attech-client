import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { useI18n } from '../../hooks/useI18n';
import { useLocalizedRouting } from '../../hooks/useLocalizedRouting';

export default function UserLogin() {
  const { t, currentLanguage } = useI18n();
  const { goHome } = useLocalizedRouting();
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
        goHome();
      } else {
        setError(data.message || t('errors.loginFailed'));
      }
    } catch (err) {
      setError(t('errors.serverConnectionError'));
    }
    setLoading(false);
  };

  return (
    <div className="form-area-login">
      <div className="wrapper">
        <h2>{t('auth.userLogin')}</h2>
        <form onSubmit={handleSubmit} autoComplete="on">
          <div className="box">
            <input
              type="text"
              placeholder={t('auth.username')}
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
              placeholder={t('auth.password')}
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
              /> {t('auth.rememberMe')}
            </label>
            <a className="forgot-pass" href="#">{t('auth.forgotPassword')}</a>
          </div>
          <button type="submit" disabled={loading}>
            {loading ? t('auth.loggingIn') : t('auth.login')}
          </button>
        </form>
        <p className={`error${error ? ' show' : ''}`}>{error || '\u00A0'}</p>
        <p>
          {t('auth.noAccount')}{' '}
          <a className="register-btn" href="#">{t('auth.register')}</a>
        </p>
      </div>
    </div>
  );
} 