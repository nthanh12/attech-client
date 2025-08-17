import React from 'react';
import './UploadProgress.css';

const UploadProgress = ({ 
  files = [], 
  onCancel,
  onRetry,
  className = '' 
}) => {
  if (files.length === 0) return null;

  const totalFiles = files.length;
  const completedFiles = files.filter(f => f.status === 'completed').length;
  const failedFiles = files.filter(f => f.status === 'failed').length;
  const overallProgress = (completedFiles / totalFiles) * 100;

  return (
    <div className={`upload-progress-container ${className}`}>
      <div className="upload-progress-header">
        <div className="upload-progress-title">
          <i className="bi bi-cloud-upload"></i>
          <span>Uploading {totalFiles} file{totalFiles > 1 ? 's' : ''}</span>
        </div>
        <div className="upload-progress-stats">
          <span className="completed">{completedFiles} completed</span>
          {failedFiles > 0 && (
            <span className="failed">{failedFiles} failed</span>
          )}
        </div>
      </div>

      <div className="upload-progress-overall">
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${overallProgress}%` }}
          />
        </div>
        <span className="progress-text">
          {Math.round(overallProgress)}%
        </span>
      </div>

      <div className="upload-files-list">
        {files.map((file, index) => (
          <UploadFileItem
            key={index}
            file={file}
            onCancel={onCancel}
            onRetry={onRetry}
          />
        ))}
      </div>
    </div>
  );
};

const UploadFileItem = ({ file, onCancel, onRetry }) => {
  const getStatusIcon = () => {
    switch (file.status) {
      case 'uploading':
        return <i className="bi bi-arrow-clockwise spinning"></i>;
      case 'completed':
        return <i className="bi bi-check-circle text-success"></i>;
      case 'failed':
        return <i className="bi bi-x-circle text-danger"></i>;
      case 'paused':
        return <i className="bi bi-pause-circle text-warning"></i>;
      default:
        return <i className="bi bi-file-earmark"></i>;
    }
  };

  const getStatusColor = () => {
    switch (file.status) {
      case 'completed':
        return 'success';
      case 'failed':
        return 'danger';
      case 'uploading':
        return 'primary';
      case 'paused':
        return 'warning';
      default:
        return 'secondary';
    }
  };

  return (
    <div className={`upload-file-item ${file.status}`}>
      <div className="file-info">
        <div className="file-icon">
          {getStatusIcon()}
        </div>
        <div className="file-details">
          <div className="file-name">{file.name}</div>
          <div className="file-meta">
            <span className="file-size">{formatFileSize(file.size)}</span>
            {file.speed && (
              <span className="upload-speed">{file.speed}/s</span>
            )}
            {file.timeRemaining && (
              <span className="time-remaining">{file.timeRemaining} left</span>
            )}
          </div>
        </div>
      </div>

      <div className="file-progress">
        <div className="progress-bar small">
          <div 
            className={`progress-fill ${getStatusColor()}`}
            style={{ width: `${file.progress || 0}%` }}
          />
        </div>
        <span className="progress-percentage">
          {file.progress || 0}%
        </span>
      </div>

      <div className="file-actions">
        {file.status === 'uploading' && (
          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={() => onCancel && onCancel(file.id)}
            title="Cancel upload"
          >
            <i className="bi bi-x"></i>
          </button>
        )}
        {file.status === 'failed' && (
          <button
            className="btn btn-sm btn-outline-primary"
            onClick={() => onRetry && onRetry(file.id)}
            title="Retry upload"
          >
            <i className="bi bi-arrow-clockwise"></i>
          </button>
        )}
        {file.status === 'completed' && file.error && (
          <span className="error-message" title={file.error}>
            <i className="bi bi-exclamation-triangle"></i>
          </span>
        )}
      </div>
    </div>
  );
};

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export default UploadProgress;