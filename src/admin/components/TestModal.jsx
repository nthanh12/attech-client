import React from "react";

const TestModal = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="modal show" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)'
    }}>
      <div style={{
        background: 'white',
        padding: '20px',
        borderRadius: '8px',
        maxWidth: '500px',
        width: '90%'
      }}>
        <h3>Test Modal</h3>
        <p>This is a test modal to check if modals are working.</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default TestModal; 