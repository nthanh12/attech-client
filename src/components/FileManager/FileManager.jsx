import React, { useState, useEffect, useRef } from 'react';
import './FileManager.css';

const FileManager = () => {
  const [files, setFiles] = useState([]);
  const [currentFolder, setCurrentFolder] = useState('root');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [uploadProgress, setUploadProgress] = useState({});
  const [loading, setLoading] = useState(false);
  const [showUploader, setShowUploader] = useState(false);
  const fileInputRef = useRef(null);
  const dragCounterRef = useRef(0);

  // Mock file data
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setFiles([
        {
          id: 1,
          name: 'project-banner.jpg',
          type: 'image',
          size: 2048576,
          modified: new Date('2024-01-15'),
          url: '/images/banner.jpg',
          folder: 'root'
        },
        {
          id: 2,
          name: 'documents',
          type: 'folder',
          size: 0,
          modified: new Date('2024-01-20'),
          folder: 'root',
          children: 5
        },
        {
          id: 3,
          name: 'presentation.pdf',
          type: 'pdf',
          size: 5242880,
          modified: new Date('2024-01-18'),
          url: '/docs/presentation.pdf',
          folder: 'root'
        },
        {
          id: 4,
          name: 'video-tutorial.mp4',
          type: 'video',
          size: 52428800,
          modified: new Date('2024-01-12'),
          url: '/videos/tutorial.mp4',
          folder: 'root'
        },
        {
          id: 5,
          name: 'logo-collection.zip',
          type: 'archive',
          size: 1048576,
          modified: new Date('2024-01-10'),
          url: '/archives/logos.zip',
          folder: 'root'
        },
        {
          id: 6,
          name: 'spreadsheet.xlsx',
          type: 'spreadsheet',
          size: 524288,
          modified: new Date('2024-01-22'),
          url: '/docs/data.xlsx',
          folder: 'root'
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  // File type icons
  const getFileIcon = (type) => {
    const icons = {
      image: '🖼️',
      pdf: '📄',
      video: '🎥',
      audio: '🎵',
      archive: '📦',
      document: '📝',
      spreadsheet: '📊',
      folder: '📁',
      code: '💻'
    };
    return icons[type] || '📄';
  };

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Filter and sort files
  const filteredFiles = files
    .filter(file => 
      file.folder === currentFolder &&
      file.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      let aVal = a[sortBy];
      let bVal = b[sortBy];
      
      if (sortBy === 'size') {
        aVal = a.type === 'folder' ? 0 : a.size;
        bVal = b.type === 'folder' ? 0 : b.size;
      }
      
      if (sortBy === 'modified') {
        aVal = new Date(a.modified);
        bVal = new Date(b.modified);
      }
      
      if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }
      
      if (sortOrder === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

  // Handle file selection
  const handleFileSelect = (fileId, event) => {
    if (event.ctrlKey || event.metaKey) {
      setSelectedFiles(prev => 
        prev.includes(fileId) 
          ? prev.filter(id => id !== fileId)
          : [...prev, fileId]
      );
    } else {
      setSelectedFiles([fileId]);
    }
  };

  // Handle file upload
  const handleFileUpload = async (uploadFiles) => {
    const fileArray = Array.from(uploadFiles);
    
    for (const file of fileArray) {
      const fileId = Date.now() + Math.random();
      setUploadProgress(prev => ({ ...prev, [fileId]: 0 }));
      
      // Simulate upload progress
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise(resolve => setTimeout(resolve, 100));
        setUploadProgress(prev => ({ ...prev, [fileId]: progress }));
      }
      
      // Add file to list
      const newFile = {
        id: fileId,
        name: file.name,
        type: getFileType(file.name),
        size: file.size,
        modified: new Date(),
        url: URL.createObjectURL(file),
        folder: currentFolder
      };
      
      setFiles(prev => [...prev, newFile]);
      setUploadProgress(prev => {
        const { [fileId]: removed, ...rest } = prev;
        return rest;
      });
    }
  };

  // Get file type from extension
  const getFileType = (filename) => {
    const ext = filename.split('.').pop().toLowerCase();
    const types = {
      jpg: 'image', jpeg: 'image', png: 'image', gif: 'image', webp: 'image',
      pdf: 'pdf',
      mp4: 'video', avi: 'video', mov: 'video', wmv: 'video',
      mp3: 'audio', wav: 'audio', flac: 'audio',
      zip: 'archive', rar: 'archive', '7z': 'archive',
      doc: 'document', docx: 'document', txt: 'document',
      xls: 'spreadsheet', xlsx: 'spreadsheet',
      js: 'code', html: 'code', css: 'code', py: 'code'
    };
    return types[ext] || 'document';
  };

  // Drag and drop handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounterRef.current++;
    setShowUploader(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounterRef.current--;
    if (dragCounterRef.current === 0) {
      setShowUploader(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowUploader(false);
    dragCounterRef.current = 0;
    
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      handleFileUpload(droppedFiles);
    }
  };

  // Delete selected files
  const handleDeleteFiles = () => {
    if (window.confirm(`Delete ${selectedFiles.length} selected file(s)?`)) {
      setFiles(prev => prev.filter(file => !selectedFiles.includes(file.id)));
      setSelectedFiles([]);
    }
  };

  // Create new folder
  const handleCreateFolder = () => {
    const folderName = prompt('Enter folder name:');
    if (folderName) {
      const newFolder = {
        id: Date.now(),
        name: folderName,
        type: 'folder',
        size: 0,
        modified: new Date(),
        folder: currentFolder,
        children: 0
      };
      setFiles(prev => [...prev, newFolder]);
    }
  };

  if (loading) {
    return (
      <div className="file-manager">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading files...</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="file-manager"
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* File Manager Header */}
      <div className="file-manager-header">
        <div className="header-left">
          <h2>📁 File Manager</h2>
          <div className="breadcrumb">
            <span className="breadcrumb-item" onClick={() => setCurrentFolder('root')}>
              🏠 Home
            </span>
            {currentFolder !== 'root' && (
              <>
                <span className="breadcrumb-separator">/</span>
                <span className="breadcrumb-item current">{currentFolder}</span>
              </>
            )}
          </div>
        </div>
        
        <div className="header-actions">
          <div className="search-box">
            <i className="bi bi-search"></i>
            <input
              type="text"
              placeholder="Search files..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="view-controls">
            <button
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              title="Grid View"
            >
              <i className="bi bi-grid-3x3"></i>
            </button>
            <button
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
              title="List View"
            >
              <i className="bi bi-list"></i>
            </button>
          </div>
          
          <div className="sort-controls">
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="name">Name</option>
              <option value="size">Size</option>
              <option value="modified">Modified</option>
              <option value="type">Type</option>
            </select>
            <button
              className="sort-order-btn"
              onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
              title={`Sort ${sortOrder === 'asc' ? 'Descending' : 'Ascending'}`}
            >
              <i className={`bi ${sortOrder === 'asc' ? 'bi-sort-alpha-down' : 'bi-sort-alpha-up'}`}></i>
            </button>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="file-toolbar">
        <div className="toolbar-left">
          <button 
            className="toolbar-btn primary"
            onClick={() => fileInputRef.current?.click()}
          >
            <i className="bi bi-cloud-upload"></i>
            Upload Files
          </button>
          <button 
            className="toolbar-btn secondary"
            onClick={handleCreateFolder}
          >
            <i className="bi bi-folder-plus"></i>
            New Folder
          </button>
        </div>
        
        <div className="toolbar-right">
          {selectedFiles.length > 0 && (
            <>
              <span className="selection-info">
                {selectedFiles.length} selected
              </span>
              <button 
                className="toolbar-btn danger"
                onClick={handleDeleteFiles}
              >
                <i className="bi bi-trash"></i>
                Delete
              </button>
            </>
          )}
        </div>
      </div>

      {/* File Grid/List */}
      <div className={`file-container ${viewMode}`}>
        {filteredFiles.map(file => (
          <div
            key={file.id}
            className={`file-item ${selectedFiles.includes(file.id) ? 'selected' : ''}`}
            onClick={(e) => handleFileSelect(file.id, e)}
            onDoubleClick={() => {
              if (file.type === 'folder') {
                setCurrentFolder(file.name);
              } else if (file.url) {
                window.open(file.url, '_blank');
              }
            }}
          >
            <div className="file-icon">
              {getFileIcon(file.type)}
            </div>
            <div className="file-info">
              <div className="file-name" title={file.name}>
                {file.name}
              </div>
              <div className="file-meta">
                <span className="file-size">
                  {file.type === 'folder' ? `${file.children || 0} items` : formatFileSize(file.size)}
                </span>
                <span className="file-date">
                  {file.modified.toLocaleDateString()}
                </span>
              </div>
            </div>
            
            {viewMode === 'list' && (
              <div className="file-actions">
                <button
                  className="action-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (file.url) window.open(file.url, '_blank');
                  }}
                  title="Open"
                >
                  <i className="bi bi-eye"></i>
                </button>
                <button
                  className="action-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Download logic here
                  }}
                  title="Download"
                >
                  <i className="bi bi-download"></i>
                </button>
              </div>
            )}
          </div>
        ))}
        
        {filteredFiles.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">📂</div>
            <h3>No files found</h3>
            <p>
              {searchTerm 
                ? `No files match "${searchTerm}"`
                : 'This folder is empty. Upload some files to get started.'
              }
            </p>
          </div>
        )}
      </div>

      {/* Upload Progress */}
      {Object.keys(uploadProgress).length > 0 && (
        <div className="upload-progress">
          <h4>Uploading Files</h4>
          {Object.entries(uploadProgress).map(([fileId, progress]) => (
            <div key={fileId} className="progress-item">
              <div className="progress-info">
                <span>Uploading...</span>
                <span>{progress}%</span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Drag & Drop Overlay */}
      {showUploader && (
        <div className="upload-overlay">
          <div className="upload-message">
            <i className="bi bi-cloud-upload upload-icon"></i>
            <h3>Drop files here to upload</h3>
            <p>Support for multiple files</p>
          </div>
        </div>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        onChange={(e) => handleFileUpload(e.target.files)}
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default FileManager;