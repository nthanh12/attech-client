import React from 'react';
import './SkeletonLoader.css';

export const SkeletonBox = ({ width = '100%', height = '20px', className = '' }) => (
  <div 
    className={`skeleton-box ${className}`}
    style={{ width, height }}
  />
);

export const SkeletonText = ({ lines = 1, className = '' }) => (
  <div className={`skeleton-text ${className}`}>
    {Array.from({ length: lines }, (_, i) => (
      <div 
        key={i} 
        className="skeleton-line"
        style={{ 
          width: i === lines - 1 ? '60%' : '100%' 
        }}
      />
    ))}
  </div>
);

export const SkeletonCard = ({ className = '' }) => (
  <div className={`skeleton-card ${className}`}>
    <SkeletonBox height="200px" className="skeleton-image" />
    <div className="skeleton-content">
      <SkeletonText lines={2} />
      <div className="skeleton-meta">
        <SkeletonBox width="60px" height="16px" />
        <SkeletonBox width="80px" height="16px" />
      </div>
    </div>
  </div>
);

export const SkeletonTable = ({ rows = 5, columns = 6, className = '' }) => (
  <div className={`skeleton-table ${className}`}>
    <div className="skeleton-table-header">
      {Array.from({ length: columns }, (_, i) => (
        <SkeletonBox key={i} height="40px" />
      ))}
    </div>
    <div className="skeleton-table-body">
      {Array.from({ length: rows }, (_, rowIndex) => (
        <div key={rowIndex} className="skeleton-table-row">
          {Array.from({ length: columns }, (_, colIndex) => (
            <SkeletonBox key={colIndex} height="60px" />
          ))}
        </div>
      ))}
    </div>
  </div>
);

export const SkeletonMediaGrid = ({ count = 12, className = '' }) => (
  <div className={`skeleton-media-grid ${className}`}>
    {Array.from({ length: count }, (_, i) => (
      <SkeletonCard key={i} />
    ))}
  </div>
);

const SkeletonLoader = ({ type = 'box', ...props }) => {
  switch (type) {
    case 'text':
      return <SkeletonText {...props} />;
    case 'card':
      return <SkeletonCard {...props} />;
    case 'table':
      return <SkeletonTable {...props} />;
    case 'media-grid':
      return <SkeletonMediaGrid {...props} />;
    default:
      return <SkeletonBox {...props} />;
  }
};

export default SkeletonLoader;