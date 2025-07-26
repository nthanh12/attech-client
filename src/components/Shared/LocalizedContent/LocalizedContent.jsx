import React from 'react';
import { useI18n } from '../../../hooks/useI18n';

/**
 * Component to display localized HTML content (for rich text content from TinyMCE)
 */
const LocalizedContent = ({ 
  item, 
  field = 'content',
  fallback = '',
  className = '',
  style,
  maxLength,
  showReadMore = false,
  ...props 
}) => {
  const { getLocalizedContent, truncateText, t } = useI18n();
  
  if (!item) {
    return fallback ? <div className={className} style={style} {...props}>{fallback}</div> : null;
  }
  
  let content = getLocalizedContent(item, field);
  
  // Apply truncation if specified (for rich text, we might want to strip HTML first)
  if (maxLength && content) {
    // Strip HTML tags for truncation
    const textContent = content.replace(/<[^>]*>/g, '');
    if (textContent.length > maxLength) {
      const truncated = truncateText(textContent, maxLength);
      content = truncated;
    }
  }
  
  // Show fallback if no content
  if (!content && fallback) {
    content = fallback;
  }
  
  if (!content) return null;
  
  // If content contains HTML tags, render as HTML
  if (content.includes('<')) {
    return (
      <div 
        className={className} 
        style={style} 
        {...props}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  }
  
  // Otherwise render as plain text
  return (
    <div className={className} style={style} {...props}>
      {content}
    </div>
  );
};

export default LocalizedContent;