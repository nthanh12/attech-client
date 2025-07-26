import React, { useState, useEffect } from 'react';
import { isAuthenticated, getCurrentUser, logout } from '../../services/authService';
import AuthModal from './AuthModal';
import './AuthStatus.css';

const AuthStatus = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    checkAuthStatus();
    
    // Check auth status periodically
    const interval = setInterval(checkAuthStatus, 30000); // Every 30 seconds
    
    return () => clearInterval(interval);
  }, []);

  const checkAuthStatus = () => {
    const authenticated = isAuthenticated();
    const currentUser = getCurrentUser();
    
    setIsAuth(authenticated);
    setUser(currentUser);
  };

  const handleLogin = () => {
    setShowModal(true);
  };

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
    checkAuthStatus();
    
    // Show logout notification
    setTimeout(() => {
      alert('You have been logged out successfully! 👋');
    }, 100);
  };

  const handleModalClose = () => {
    setShowModal(false);
    checkAuthStatus(); // Refresh auth status when modal closes
  };

  if (!isAuth) {
    return (
      <>
        <div className="auth-status">
          <button 
            className="login-button"
            onClick={handleLogin}
          >
            <span className="login-icon">🔐</span>
            Sign In
          </button>
        </div>
        
        <AuthModal 
          isOpen={showModal}
          onClose={handleModalClose}
          defaultMode="login"
        />
      </>
    );
  }

  return (
    <>
      <div className="auth-status authenticated">
        <div className="user-menu">
          <button 
            className="user-button"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <div className="user-avatar">
              {user?.username?.charAt(0)?.toUpperCase() || '?'}
            </div>
            <div className="user-info">
              <span className="user-name">
                {user?.username || 'Unknown'}
              </span>
              <span className="user-status">🟢 Online</span>
            </div>
            <span className={`dropdown-arrow ${showDropdown ? 'open' : ''}`}>
              ▼
            </span>
          </button>
          
          {showDropdown && (
            <div className="user-dropdown">
              <div className="dropdown-header">
                <div className="dropdown-avatar">
                  {user?.username?.charAt(0)?.toUpperCase() || '?'}
                </div>
                <div className="dropdown-info">
                  <div className="dropdown-name">@{user?.username}</div>
                  {user?.roles && user.roles.length > 0 && (
                    <div className="dropdown-roles">
                      {user.roles.map((role, index) => (
                        <span key={index} className="dropdown-role">
                          {role}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="dropdown-divider"></div>
              
              <div className="dropdown-menu">
                <button 
                  className="dropdown-item"
                  onClick={() => {
                    setShowDropdown(false);
                    setShowModal(true);
                  }}
                >
                  <span className="item-icon">👤</span>
                  Profile
                </button>
                
                <button 
                  className="dropdown-item"
                  onClick={() => {
                    setShowDropdown(false);
                    // Add settings functionality here
                  }}
                >
                  <span className="item-icon">⚙️</span>
                  Settings
                </button>
                
                <div className="dropdown-divider"></div>
                
                <button 
                  className="dropdown-item logout"
                  onClick={handleLogout}
                >
                  <span className="item-icon">🚪</span>
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <AuthModal 
        isOpen={showModal}
        onClose={handleModalClose}
        defaultMode="login"
      />
    </>
  );
};

export default AuthStatus;