import React from 'react';
import LocalizedText from './LocalizedText';

/**
 * Component to display localized titles
 */
const LocalizedTitle = ({ 
  item, 
  level = 1, 
  fallback = 'Untitled',
  truncate,
  className = '',
  style,
  ...props 
}) => {
  const HeadingComponent = `h${level}`;
  
  return (
    <LocalizedText
      item={item}
      field="title"
      component={HeadingComponent}
      fallback={fallback}
      truncate={truncate}
      className={className}
      style={style}
      {...props}
    />
  );
};

export default LocalizedTitle;