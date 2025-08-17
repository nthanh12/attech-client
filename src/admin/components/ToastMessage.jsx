import React, { useEffect, useState } from "react";

const ToastMessage = ({ show, message, type, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      setIsFading(false);
      
      const timer = setTimeout(() => {
        setIsFading(true);
        setTimeout(() => {
          setIsVisible(false);
          onClose();
        }, 300); // Thời gian fade out
      }, 4000); // Hiển thị 4 giây
      
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
      setIsFading(false);
    }
  }, [show, onClose]);

  if (!isVisible) return null;

  // Bootstrap-style colors và icons
  const getToastConfig = (type) => {
    switch (type) {
      case 'success':
        return {
          bgColor: '#d1edff',
          borderColor: '#bee5eb',
          textColor: '#0c5460',
          icon: '✓',
          title: 'Thành công'
        };
      case 'error':
        return {
          bgColor: '#f8d7da',
          borderColor: '#f5c6cb',
          textColor: '#721c24',
          icon: '✕',
          title: 'Lỗi'
        };
      case 'warning':
        return {
          bgColor: '#fff3cd',
          borderColor: '#ffeaa7',
          textColor: '#856404',
          icon: '⚠',
          title: 'Cảnh báo'
        };
      case 'info':
        return {
          bgColor: '#d1ecf1',
          borderColor: '#bee5eb',
          textColor: '#0c5460',
          icon: 'ℹ',
          title: 'Thông tin'
        };
      default:
        return {
          bgColor: '#e2e3e5',
          borderColor: '#d6d8db',
          textColor: '#383d41',
          icon: 'ℹ',
          title: 'Thông báo'
        };
    }
  };

  const config = getToastConfig(type);

  return (
    <div
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 999999,
        minWidth: '350px',
        maxWidth: '450px',
        backgroundColor: config.bgColor,
        border: `1px solid ${config.borderColor}`,
        borderRadius: '8px',
        boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.15)',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        fontSize: '14px',
        lineHeight: '1.5',
        opacity: isFading ? 0 : 1,
        transform: isFading ? 'translateX(100%)' : 'translateX(0)',
        transition: 'all 0.3s ease-in-out',
        overflow: 'hidden'
      }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        padding: '12px 16px',
        gap: '12px'
      }}>
        {/* Icon */}
        <div style={{
          flexShrink: 0,
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          backgroundColor: config.textColor,
          color: config.bgColor,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '12px',
          fontWeight: 'bold',
          marginTop: '2px'
        }}>
          {config.icon}
        </div>

        {/* Content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontWeight: '600',
            color: config.textColor,
            marginBottom: '2px',
            fontSize: '13px'
          }}>
            {config.title}
          </div>
          <div style={{
            color: config.textColor,
            fontSize: '14px',
            lineHeight: '1.4'
          }}>
            {message}
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={() => {
            setIsFading(true);
            setTimeout(() => {
              setIsVisible(false);
              onClose();
            }, 300);
          }}
          style={{
            background: 'none',
            border: 'none',
            color: config.textColor,
            fontSize: '18px',
            cursor: 'pointer',
            padding: '0',
            width: '20px',
            height: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            transition: 'background-color 0.2s ease',
            flexShrink: 0,
            marginTop: '2px'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = `${config.textColor}20`;
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'transparent';
          }}
        >
          ×
        </button>
      </div>

      {/* Progress bar */}
      <div style={{
        height: '3px',
        backgroundColor: `${config.textColor}30`,
        width: '100%'
      }}>
        <div style={{
          height: '100%',
          backgroundColor: config.textColor,
          width: '100%',
          animation: 'toastProgress 4s linear'
        }} />
      </div>

      <style>{`
        @keyframes toastProgress {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
};

export default ToastMessage; 