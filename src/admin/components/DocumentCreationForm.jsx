import React, { useState, useEffect } from "react";
import { documentService } from "../../services/documentService";
import ToastMessage from "./ToastMessage";
import "./NewsCreationForm.css"; // Reuse existing styles

const DocumentCreationForm = ({
  editingDocument = null,
  onSuccess,
  onCancel,
}) => {
  const isEditMode = !!editingDocument;

  // Form data
  const [formData, setFormData] = useState({
    title: editingDocument?.title || "",
    description: editingDocument?.description || "",
    category: editingDocument?.category || "",
    tags: editingDocument?.tags || "",
    status: editingDocument?.status ?? 1,
    originalFileName: editingDocument?.originalFileName || "",
    fileUrl: editingDocument?.fileUrl || "",
    fileType: editingDocument?.fileType || "",
    fileSize: editingDocument?.fileSize || 0,
  });

  // Upload state
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  // UI state
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "info",
  });

  // Document categories
  const documentCategories = [
    { value: "general", label: "Tổng quát" },
    { value: "technical", label: "Kỹ thuật" },
    { value: "marketing", label: "Marketing" },
    { value: "legal", label: "Pháp lý" },
    { value: "financial", label: "Tài chính" },
    { value: "hr", label: "Nhân sự" },
    { value: "training", label: "Đào tạo" },
  ];

  // Allowed file types for documents
  const allowedFileTypes = [
    '.pdf', '.doc', '.docx', '.xls', '.xlsx', 
    '.ppt', '.pptx', '.txt', '.rtf'
  ];

  const maxFileSize = 50 * 1024 * 1024; // 50MB

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  // Handle file selection
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
    if (!allowedFileTypes.includes(fileExtension)) {
      setToast({
        show: true,
        message: `Loại file không được hỗ trợ. Chỉ chấp nhận: ${allowedFileTypes.join(', ')}`,
        type: "error"
      });
      e.target.value = '';
      return;
    }

    // Validate file size
    if (file.size > maxFileSize) {
      setToast({
        show: true,
        message: `File quá lớn. Kích thước tối đa: ${formatFileSize(maxFileSize)}`,
        type: "error"
      });
      e.target.value = '';
      return;
    }

    setSelectedFile(file);
    setFormData(prev => ({
      ...prev,
      originalFileName: file.name,
      fileType: fileExtension.substring(1), // Remove dot
      fileSize: file.size
    }));

    // Clear file-related errors
    setErrors(prev => ({
      ...prev,
      file: ""
    }));
  };

  // Format file size
  const formatFileSize = (bytes) => {
    if (!bytes) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Tiêu đề là bắt buộc";
    }

    if (!isEditMode && !selectedFile) {
      newErrors.file = "Vui lòng chọn file tài liệu";
    }

    if (!formData.category) {
      newErrors.category = "Vui lòng chọn danh mục";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    
    try {
      let documentData = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        tags: formData.tags,
        status: parseInt(formData.status),
      };

      if (isEditMode) {
        // Update existing document
        if (selectedFile) {
          // Upload new file if selected
          const uploadResponse = await documentService.uploadDocument(selectedFile, {
            onUploadProgress: (progressEvent) => {
              const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
              setUploadProgress(progress);
            }
          });
          
          documentData.fileUrl = uploadResponse.fileUrl;
          documentData.originalFileName = uploadResponse.originalFileName;
          documentData.fileType = uploadResponse.fileType;
          documentData.fileSize = uploadResponse.fileSize;
        }

        const response = await documentService.updateDocument(editingDocument.id, documentData);
        
        if (response.success) {
          onSuccess && onSuccess(response.data);
        } else {
          throw new Error(response.message || "Cập nhật tài liệu thất bại");
        }
      } else {
        // Create new document
        setUploading(true);
        
        const uploadResponse = await documentService.uploadDocument(selectedFile, {
          onUploadProgress: (progressEvent) => {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(progress);
          }
        });

        documentData = {
          ...documentData,
          fileUrl: uploadResponse.fileUrl,
          originalFileName: uploadResponse.originalFileName,
          fileType: uploadResponse.fileType,
          fileSize: uploadResponse.fileSize,
        };

        const response = await documentService.createDocument(documentData);
        
        if (response.success) {
          onSuccess && onSuccess(response.data);
        } else {
          throw new Error(response.message || "Tạo tài liệu thất bại");
        }
      }

    } catch (error) {
      console.error("Error saving document:", error);
      setToast({
        show: true,
        message: error.message || "Có lỗi xảy ra khi lưu tài liệu",
        type: "error"
      });
    } finally {
      setLoading(false);
      setUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="document-creation-form">
      <form onSubmit={handleSubmit}>
        {/* Document Info Section */}
        <div className="form-section">
          <h4 className="section-title">Thông tin tài liệu</h4>
          
          <div className="form-group">
            <label htmlFor="title">
              Tiêu đề <span className="required">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className={`form-control ${errors.title ? 'is-invalid' : ''}`}
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Nhập tiêu đề tài liệu"
            />
            {errors.title && <div className="invalid-feedback">{errors.title}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="description">Mô tả</label>
            <textarea
              id="description"
              name="description"
              className="form-control"
              rows="3"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Mô tả về tài liệu..."
            />
          </div>

          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="category">
                Danh mục <span className="required">*</span>
              </label>
              <select
                id="category"
                name="category"
                className={`form-control ${errors.category ? 'is-invalid' : ''}`}
                value={formData.category}
                onChange={handleInputChange}
              >
                <option value="">Chọn danh mục</option>
                {documentCategories.map(cat => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
              {errors.category && <div className="invalid-feedback">{errors.category}</div>}
            </div>

            <div className="form-group col-md-6">
              <label htmlFor="status">Trạng thái</label>
              <select
                id="status"
                name="status"
                className="form-control"
                value={formData.status}
                onChange={handleInputChange}
              >
                <option value={1}>Hoạt động</option>
                <option value={0}>Không hoạt động</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="tags">Tags</label>
            <input
              type="text"
              id="tags"
              name="tags"
              className="form-control"
              value={formData.tags}
              onChange={handleInputChange}
              placeholder="Nhập các tag, phân cách bằng dấu phẩy"
            />
            <small className="form-text text-muted">
              Ví dụ: hợp đồng, pháp lý, mẫu
            </small>
          </div>
        </div>

        {/* File Upload Section */}
        <div className="form-section">
          <h4 className="section-title">
            {isEditMode ? "Thay đổi file (tùy chọn)" : "Upload file"}
          </h4>
          
          {isEditMode && formData.originalFileName && (
            <div className="current-file-info mb-3">
              <strong>File hiện tại:</strong> {formData.originalFileName}
              <span className="text-muted ml-2">
                ({formatFileSize(formData.fileSize)})
              </span>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="file">
              {isEditMode ? "Chọn file mới" : "Chọn file"} 
              {!isEditMode && <span className="required">*</span>}
            </label>
            <input
              type="file"
              id="file"
              className={`form-control-file ${errors.file ? 'is-invalid' : ''}`}
              onChange={handleFileSelect}
              accept={allowedFileTypes.join(',')}
            />
            {errors.file && <div className="invalid-feedback d-block">{errors.file}</div>}
            
            <small className="form-text text-muted">
              Loại file được hỗ trợ: PDF, Word, Excel, PowerPoint, Text
              <br />
              Kích thước tối đa: {formatFileSize(maxFileSize)}
            </small>
          </div>

          {selectedFile && (
            <div className="selected-file-info">
              <div className="file-info">
                <i className="fas fa-file"></i>
                <span className="file-name">{selectedFile.name}</span>
                <span className="file-size">({formatFileSize(selectedFile.size)})</span>
              </div>
            </div>
          )}

          {uploading && (
            <div className="upload-progress">
              <div className="progress">
                <div 
                  className="progress-bar" 
                  role="progressbar" 
                  style={{width: `${uploadProgress}%`}}
                >
                  {uploadProgress}%
                </div>
              </div>
              <small className="text-muted">Đang upload file...</small>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="form-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCancel}
            disabled={loading || uploading}
          >
            Hủy
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading || uploading}
          >
            {loading || uploading ? (
              <>
                <i className="fas fa-spinner fa-spin"></i>
                {uploading ? " Đang upload..." : " Đang lưu..."}
              </>
            ) : (
              <>
                <i className="fas fa-save"></i>
                {isEditMode ? " Cập nhật" : " Lưu"}
              </>
            )}
          </button>
        </div>
      </form>

      <ToastMessage
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({...toast, show: false})}
      />
    </div>
  );
};

export default DocumentCreationForm;