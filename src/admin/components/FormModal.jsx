import React, { useEffect } from "react";
import { createPortal } from "react-dom";

const FormModal = ({ 
  show, 
  onClose, 
  onSubmit, 
  title, 
  submitText, 
  cancelText, 
  loading, 
  children 
}) => {
  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && show) {
        onClose();
      }
    };

    if (show) {
      document.addEventListener('keydown', handleEscape);
      // document.body.style.overflow = 'hidden'; // Loại bỏ dòng này
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      // document.body.style.overflow = 'unset'; // Loại bỏ dòng này
    };
  }, [show, onClose]);

  if (!show) return null;
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const modalContent = (
    <div className="modal show">
      <div className="modal-content">
        <div className="modal-header">
          <h5>{title}</h5>
          <button 
            type="button"
            className="modal-close" 
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            {children}
            <div className="form-actions">
              <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={onClose} 
                disabled={loading}
              >
                {cancelText || "Hủy"}
              </button>
              <button 
                type="submit" 
                className="btn btn-primary" 
                disabled={loading}
              >
                {loading ? "Đang xử lý..." : (submitText || "Lưu")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default FormModal; 