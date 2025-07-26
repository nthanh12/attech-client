import React from 'react';
import LocalizedText from './LocalizedText';
import { useI18n } from '../../../hooks/useI18n';

/**
 * Component to display localized descriptions
 */
const LocalizedDescription = ({ 
  item, 
  fallback = '',
  truncate,
  showReadMore = false,
  readMoreText,
  className = '',
  style,
  ...props 
}) => {
  const { t } = useI18n();
  
  return (
    <LocalizedText
      item={item}
      field="description"
      component="p"
      fallback={fallback}
      truncate={truncate}
      className={className}
      style={style}
      {...props}
    />
  );
};

export default LocalizedDescription;