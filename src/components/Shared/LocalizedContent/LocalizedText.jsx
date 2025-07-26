import React from 'react';
import { useI18n } from '../../../hooks/useI18n';

/**
 * Smart component to display localized text from API data
 * Automatically chooses the right field based on current language
 */
const LocalizedText = ({ 
  item, 
  field, 
  fallback = '', 
  component: Component = 'span',
  truncate,
  className,
  style,
  ...props 
}) => {
  const { getLocalizedContent, truncateText } = useI18n();
  
  if (!item) {
    return fallback ? <Component className={className} style={style} {...props}>{fallback}</Component> : null;
  }
  
  let content = getLocalizedContent(item, field);
  
  // Apply truncation if specified
  if (truncate && content) {
    content = truncateText(content, truncate);
  }
  
  // Show fallback if no content
  if (!content && fallback) {
    content = fallback;
  }
  
  if (!content) return null;
  
  return (
    <Component className={className} style={style} {...props}>
      {content}
    </Component>
  );
};

export default LocalizedText;