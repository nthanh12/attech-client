import React from 'react';
import { Link } from 'react-router-dom';
import './ViewAllButton.css';
import { useI18n } from '../../hooks/useI18n';

const ViewAllButton = ({ to, className }) => {
  const { t } = useI18n();
  return (
    <Link 
      to={to} 
      className={`view-all-button ${className || ''}`}
    >
      {t('common.viewAll')}
      <i className="fa fa-chevron-right"></i>
    </Link>
  );
};

export default ViewAllButton; 