import React from 'react';
import { Link } from 'react-router-dom';
import './ViewAllButton.css';

const ViewAllButton = ({ to, className }) => {
  return (
    <Link 
      to={to} 
      className={`view-all-button ${className || ''}`}
    >
      Xem tất cả
      <i className="fa fa-chevron-right"></i>
    </Link>
  );
};

export default ViewAllButton; 