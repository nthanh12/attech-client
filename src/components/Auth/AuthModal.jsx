import React, { useState, useEffect } from 'react';
import ReactModal from 'react-modal';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { isAuthenticated, getCurrentUser, logout } from '../../services/authService';
import './AuthModal.css';

const AuthModal = ({ isOpen, onClose, defaultMode = 'login' }) => {
  const [mode, setMode] = useState(defaultMode);
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    const authenticated = isAuthenticated();
    const currentUser = getCurrentUser();
    
    setIsAuth(authenticated);
    setUser(currentUser);
  };

  const handleLoginSuccess = (result) => {checkAuthStatus();
    onClose();
    
    // Show success notification
    setTimeout(() => {
      alert(`Welcome back, ${result.token ? 'User' : 'Guest'}! 🎉`);
    }, 100);
  };

  const handleRegisterSuccess = (result) => {setMode('login');
    // Don't close modal, let user login
  };

  const handleLogout = () => {
    logout();
    checkAuthStatus();
    alert('You have been logged out successfully! 👋');
  };

  const modalStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      zIndex: 10000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    content: {
      position: 'relative',
      top: 'auto',
      left: 'auto',
      right: 'auto',
      bottom: 'auto',
      border: 'none',
      background: 'transparent',
      overflow: 'visible',
      borderRadius: 0,
      outline: 'none',
      padding: 0,
      margin: 0,
      maxWidth: '100vw',
      maxHeight: '100vh'
    }
  };

  if (isAuth && user) {
    return (
      <ReactModal
        isOpen={isOpen}
        onRequestClose={onClose}
        style={modalStyles}
        ariaHideApp={false}
        shouldCloseOnOverlayClick={true}
      >
        <div className="auth-modal-content">
          <div className="user-profile-card">
            <div className="profile-header">
              <div className="profile-avatar">
                {user.username.charAt(0).toUpperCase()}
              </div>
              <div className="profile-info">
                <h3>Welcome back!</h3>
                <p className="username">@{user.username}</p>
                {user.roles && user.roles.length > 0 && (
                  <div className="user-roles">
                    {user.roles.map((role, index) => (
                      <span key={index} className="role-badge">
                        {role}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="profile-stats">
              <div className="stat-item">
                <span className="stat-label">Token Status</span>
                <span className="stat-value">✅ Valid</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Session</span>
                <span className="stat-value">🟢 Active</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Expires</span>
                <span className="stat-value">
                  {user.exp ? new Date(user.exp * 1000).toLocaleString() : 'N/A'}
                </span>
              </div>
            </div>

            <div className="profile-actions">
              <button 
                className="profile-button primary"
                onClick={onClose}
              >
                Continue Working
              </button>
              <button 
                className="profile-button secondary"
                onClick={handleLogout}
              >
                🚪 Logout
              </button>
            </div>

            <button 
              className="modal-close-button"
              onClick={onClose}
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </div>
      </ReactModal>
    );
  }

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={modalStyles}
      ariaHideApp={false}
      shouldCloseOnOverlayClick={true}
    >
      <div className="auth-modal-content">
        <div className="auth-modal-header">
          <div className="mode-switcher">
            <button 
              className={`mode-button ${mode === 'login' ? 'active' : ''}`}
              onClick={() => setMode('login')}
            >
              Sign In
            </button>
            <button 
              className={`mode-button ${mode === 'register' ? 'active' : ''}`}
              onClick={() => setMode('register')}
            >
              Sign Up
            </button>
          </div>
          
          <button 
            className="modal-close-button"
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {mode === 'login' ? (
          <LoginForm 
            onLoginSuccess={handleLoginSuccess}
            onSwitchToRegister={() => setMode('register')}
          />
        ) : (
          <RegisterForm 
            onRegisterSuccess={handleRegisterSuccess}
            onSwitchToLogin={() => setMode('login')}
          />
        )}
      </div>
    </ReactModal>
  );
};

export default AuthModal;