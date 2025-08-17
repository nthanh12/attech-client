import React from 'react';
import './SimpleFileUpload.css';

const SimpleFileUpload = ({ 
  files = [], 
  onFilesAdd = null, 
  onFileRemove = null, 
  accept = "*/*", 
  title = "Files",
  maxFiles = 10
}) => {
  const handleFileSelect = (event) => {
    const selectedFiles = Array.from(event.target.files);
    if (selectedFiles.length > 0 && onFilesAdd) {
      onFilesAdd(selectedFiles);
    }
    // Reset input để có thể chọn lại cùng file
    event.target.value = '';
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase();
    switch (extension) {
      case 'pdf':
        return 'bi bi-file-earmark-pdf';
      case 'doc':
      case 'docx':
        return 'bi bi-file-earmark-word';
      case 'xls':
      case 'xlsx':
        return 'bi bi-file-earmark-excel';
      case 'ppt':
      case 'pptx':
        return 'bi bi-file-earmark-ppt';
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
      case 'webp':
        return 'bi bi-file-earmark-image';
      case 'mp4':
      case 'avi':
      case 'mov':
        return 'bi bi-file-earmark-play';
      default:
        return 'bi bi-file-earmark';
    }
  };

  return (
    <div className="simple-file-upload">
      <div className="upload-header">
        <h4>{title} ({files.length})</h4>
        <div className="upload-actions">
          <input
            type="file"
            multiple
            accept={accept}
            onChange={handleFileSelect}
            className="file-input"
            id="simple-file-upload"
            style={{ display: 'none' }}
            disabled={files.length >= maxFiles}
          />
          <label 
            htmlFor="simple-file-upload" 
            className={`btn btn-primary ${files.length >= maxFiles ? 'disabled' : ''}`}
          >
            <i className="bi bi-upload"></i>
            Chọn file
          </label>
        </div>
      </div>

      {files.length === 0 ? (
        <div className="empty-state">
          <i className="bi bi-cloud-upload"></i>
          <p>Chưa có file nào được chọn</p>
          <small>Click "Chọn file" để thêm file</small>
        </div>
      ) : (
        <div className="files-list">
          {files.map((fileData, index) => (
            <div key={fileData.tempId || index} className="file-item">
              <div className="file-preview">
                {fileData.preview ? (
                  <img src={fileData.preview} alt={fileData.fileName} className="file-thumbnail" />
                ) : (
                  <i className={getFileIcon(fileData.fileName)}></i>
                )}
              </div>
              <div className="file-info">
                <div className="file-name" title={fileData.fileName}>
                  {fileData.fileName}
                </div>
                <div className="file-size">
                  {formatFileSize(fileData.fileSize)}
                </div>
              </div>
              <button
                type="button"
                className="file-remove"
                onClick={() => onFileRemove && onFileRemove(fileData, index)}
                title="Xóa file"
              >
                <i className="bi bi-trash"></i>
                Xóa
              </button>
            </div>
          ))}
        </div>
      )}

      {files.length >= maxFiles && (
        <div className="max-files-warning">
          <i className="bi bi-exclamation-triangle"></i>
          Đã đạt giới hạn tối đa {maxFiles} file
        </div>
      )}
    </div>
  );
};

export default SimpleFileUpload;