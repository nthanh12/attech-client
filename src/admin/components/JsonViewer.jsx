import React, { useState } from 'react';
import './JsonViewer.css';

const JsonViewer = ({ data, title, maxHeight = '400px' }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatJson = (obj, indent = 0) => {
    const spaces = '  '.repeat(indent);
    
    if (typeof obj === 'string') {
      return `"${obj}"`;
    }
    
    if (typeof obj !== 'object' || obj === null) {
      return String(obj);
    }
    
    const entries = Object.entries(obj);
    if (entries.length === 0) {
      return '{}';
    }
    
    const formattedEntries = entries.map(([key, value]) => {
      const formattedValue = formatJson(value, indent + 1);
      return `${spaces}  "${key}": ${formattedValue}`;
    });
    
    return `{\n${formattedEntries.join(',\n')}\n${spaces}}`;
  };

  const jsonString = formatJson(data);
  const displayString = isExpanded ? jsonString : jsonString.substring(0, 500) + '...';

  return (
    <div className="json-viewer">
      <div className="json-viewer-header">
        <h6>{title}</h6>
        <div className="json-viewer-actions">
          <button 
            className="btn btn-sm btn-outline-primary"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Thu gọn' : 'Xem đầy đủ'}
          </button>
          <button 
            className="btn btn-sm btn-outline-secondary"
            onClick={() => navigator.clipboard.writeText(jsonString)}
          >
            Copy
          </button>
        </div>
      </div>
      <pre 
        className="json-viewer-content"
        style={{ maxHeight: isExpanded ? 'none' : maxHeight }}
      >
        {displayString}
      </pre>
    </div>
  );
};

export default JsonViewer;