import React from 'react';
import './LoadingOverlay.css';

const LoadingOverlay = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="loading-overlay">
      <div className="modern-spinner">
        <div className="spinner-ring"></div>
        <div className="spinner-dots">
          <div className="dot dot-1"></div>
          <div className="dot dot-2"></div>
          <div className="dot dot-3"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingOverlay;