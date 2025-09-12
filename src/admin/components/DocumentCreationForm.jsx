import React, { useState, useEffect } from "react";
import documentService from "../../services/documentService";
import api from "../../api";
import { handleFeaturedImageUpload } from "../../services/attachmentService";
import { getApiUrl } from "../../config/apiConfig";
import ToastMessage from "./ToastMessage";
import "./NewsCreationForm.css"; // Reuse existing styles

const DocumentCreationForm = ({
  editingDocument = null,
  onSuccess,
  onCancel,
}) => {
  const isEditMode = !!editingDocument;

  // Form data (like Album + 2 description fields + timePosted)
  const [formData, setFormData] = useState({
    titleVi: editingDocument?.titleVi || "",
    titleEn: editingDocument?.titleEn || "",
    descriptionVi: editingDocument?.descriptionVi || "",
    descriptionEn: editingDocument?.descriptionEn || "",
    status: editingDocument?.status ?? 1,
    attachmentIds: editingDocument?.attachmentIds || [],
    featuredImageId: editingDocument?.featuredImageId || null,
    newsCategoryId: editingDocument?.newsCategoryId || 1,
    timePosted: editingDocument?.timePosted
      ? editingDocument.timePosted.split("T")[0]
      : new Date().toISOString().split("T")[0]
  });

  // Upload state (like Album)
  const [featuredImagePreview, setFeaturedImagePreview] = useState(null);
  const [featuredImageId, setFeaturedImageId] = useState(null);
  const [documentFiles, setDocumentFiles] = useState([]);
  const [uploadingFiles, setUploadingFiles] = useState(false);

  // UI state
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "info",
  });

  // Allowed file types for documents
  const allowedFileTypes = [
    '.pdf', '.doc', '.docx', '.xls', '.xlsx', 
    '.ppt', '.pptx', '.txt', '.rtf'
  ];

  const maxFileSize = 50 * 1024 * 1024; // 50MB

  // Load existing attachments if editing (like Album)
  useEffect(() => {
    const loadExistingAttachments = async () => {
      if (isEditMode && editingDocument) {
        console.log('🔄 Loading existing attachments for edit:', editingDocument);
        
        try {
          // Load featured image from imageUrl
          const imageUrl = editingDocument.imageUrl;
          if (imageUrl) {
            const fullImageUrl = imageUrl.startsWith("http")
              ? imageUrl
              : getApiUrl(imageUrl);
            setFeaturedImagePreview(fullImageUrl);
            console.log('🖼️ Set featured image preview:', fullImageUrl);
          }

          // Set featured image ID from BE response
          if (editingDocument.featuredImageId !== null && editingDocument.featuredImageId !== undefined) {
            setFeaturedImageId(editingDocument.featuredImageId);
            console.log('🆔 Set featured image ID:', editingDocument.featuredImageId);
          }

          // Load document files from API response
          const documentFilesData = editingDocument.documents || [];
          console.log('📎 Found document files:', documentFilesData);
          
          if (documentFilesData.length > 0) {
            const baseUrl = api.defaults.baseURL;
            const transformedFiles = documentFilesData.map((file, index) => ({
              id: file.id,
              name: file.originalFileName || file.fileName || `file-${index + 1}`,
              size: file.fileSize || 0,
              type: "application/octet-stream",
              uploading: false,
              attachmentId: file.id,
            }));
            
            console.log('📄 Transformed files for edit:', transformedFiles);
            setDocumentFiles(transformedFiles);
            
            // Update attachmentIds
            const attachmentIds = documentFilesData.map(file => file.id);
            console.log('🔢 Setting attachment IDs:', attachmentIds);
            handleInputChange("attachmentIds", attachmentIds);
          }
        } catch (error) {
          console.error('❌ Error loading existing attachments:', error);
        }
      }
    };

    loadExistingAttachments();
  }, [isEditMode, editingDocument]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user types
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const showToast = (message, type = "info") => {
    setToast({ show: true, message, type });
  };

  const hideToast = () => {
    setToast({ ...toast, show: false });
  };

  // Featured image upload handler (like Album)
  const handleFeaturedImageChange = (file) => {
    if (file) {
      handleFeaturedImageUpload(
        file,
        setFeaturedImagePreview,
        setFeaturedImageId
      );
    } else {
      setFeaturedImagePreview(null);
      setFeaturedImageId(null);
    }
  };

  // Format file size
  const formatFileSize = (bytes) => {
    if (!bytes) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  // Handle document upload (like Album image upload)
  const handleDocumentUpload = async (files) => {
    if (!files || files.length === 0) return;

    setUploadingFiles(true);
    try {
      const fileArray = Array.from(files);

      // Validate file types and sizes
      for (const file of fileArray) {
        const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
        if (!allowedFileTypes.includes(fileExtension)) {
          showToast(`File không được hỗ trợ: ${file.name}. Chỉ chấp nhận: ${allowedFileTypes.join(', ')}`, "error");
          setUploadingFiles(false);
          return;
        }
        if (file.size > maxFileSize) {
          showToast(`File quá lớn: ${file.name}. Kích thước tối đa: ${formatFileSize(maxFileSize)}`, "error");
          setUploadingFiles(false);
          return;
        }
      }

      // Create file info objects
      const fileInfos = fileArray.map((file, index) => ({
        id: Date.now() + Math.random() + index,
        name: file.name,
        size: file.size,
        type: file.type,
        uploading: true,
        attachmentId: null,
        file: file,
      }));

      // Thêm tất cả vào document files ngay với preview
      setDocumentFiles((prev) => [...prev, ...fileInfos]);

      // Upload song song tất cả files
      const uploadPromises = fileInfos.map(async (fileInfo) => {
        try {
          const formData = new FormData();
          formData.append("file", fileInfo.file);

          const response = await api.post("/api/attachments", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

          if (response.data?.status === 1 && response.data?.data?.id) {
            const attachmentData = response.data.data;

            // Update file này với data thật
            setDocumentFiles((prev) =>
              prev.map((file) =>
                file.id === fileInfo.id
                  ? {
                      ...file,
                      uploading: false,
                      attachmentId: attachmentData.id,
                    }
                  : file
              )
            );

            console.log(
              `✅ Document file uploaded: ${fileInfo.name} -> ID: ${attachmentData.id}`
            );
            return {
              success: true,
              fileInfo,
              attachmentId: attachmentData.id,
            };
          } else {
            throw new Error("Upload failed - invalid response");
          }
        } catch (uploadError) {
          console.error(
            `❌ Document file upload failed: ${fileInfo.name}`,
            uploadError
          );

          // Remove failed file from list
          setDocumentFiles((prev) =>
            prev.filter((file) => file.id !== fileInfo.id)
          );

          return { success: false, fileInfo, error: uploadError };
        }
      });

      // Đợi tất cả upload xong
      const results = await Promise.all(uploadPromises);
      const successCount = results.filter((r) => r.success).length;
      const failCount = results.filter((r) => !r.success).length;

      // Update attachmentIds với files đã upload thành công
      const successfulAttachmentIds = results
        .filter((r) => r.success)
        .map((r) => r.attachmentId);
      
      if (successfulAttachmentIds.length > 0) {
        const allAttachmentIds = [
          ...formData.attachmentIds,
          ...successfulAttachmentIds
        ];
        handleInputChange("attachmentIds", allAttachmentIds);
      }

      if (successCount > 0) {
        showToast(`Upload thành công ${successCount}/${fileArray.length} file`, "success");
      }

      if (failCount > 0) {
        showToast(`${failCount} file upload thất bại`, "error");
      }
    } catch (error) {
      console.error("Document file upload error:", error);
      showToast("Lỗi khi thêm file tài liệu", "error");
    } finally {
      setUploadingFiles(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    console.log('🔍 Validating form with data:', {
      titleVi: formData.titleVi,
      documentFilesCount: documentFiles.length,
      successfulFilesCount: documentFiles.filter(file => file.attachmentId && !file.uploading).length
    });
    
    if (!formData.titleVi.trim()) {
      newErrors.titleVi = "Tiêu đề tiếng Việt là bắt buộc";
    }
    
    const successfulFiles = documentFiles.filter(file => file.attachmentId && !file.uploading);
    if (successfulFiles.length === 0) {
      newErrors.attachmentIds = "Cần upload ít nhất 1 file tài liệu";
    }
    
    console.log('🔍 Validation errors:', newErrors);
    
    setErrors(newErrors);
    const isValid = Object.keys(newErrors).length === 0;
    console.log('🔍 Form validation result:', isValid);
    
    return isValid;
  };

  const handleSave = async () => {
    console.log('🚀 Save button clicked, starting validation...');
    
    if (!validateForm()) {
      console.log('❌ Form validation failed, stopping submission');
      setToast({
        show: true,
        message: "Vui lòng kiểm tra lại thông tin",
        type: "error",
      });
      return;
    }
    
    console.log('✅ Form validation passed, proceeding with submission...');

    try {
      setLoading(true);
      
      // Get successful attachment IDs from files
      const successfulFiles = documentFiles.filter(file => file.attachmentId && !file.uploading);
      const attachmentIds = successfulFiles.map(file => file.attachmentId);
      
      console.log('🔍 Document form submission data:', {
        titleVi: formData.titleVi,
        titleEn: formData.titleEn,
        descriptionVi: formData.descriptionVi,
        descriptionEn: formData.descriptionEn,
        attachmentIds: attachmentIds,
        featuredImageId: featuredImageId,
        newsCategoryId: formData.newsCategoryId,
        isEditMode: isEditMode
      });
      
      const documentData = {
        titleVi: formData.titleVi,
        titleEn: formData.titleEn,
        descriptionVi: formData.descriptionVi,
        descriptionEn: formData.descriptionEn,
        attachmentIds: attachmentIds,
        featuredImageId: featuredImageId,
        newsCategoryId: formData.newsCategoryId,
        timePosted: new Date(formData.timePosted).toISOString()
      };

      console.log('📤 Sending document data to API:', documentData);

      let response;
      if (isEditMode) {
        response = await documentService.updateDocument(editingDocument.id, documentData);
      } else {
        response = await documentService.createDocument(documentData);
      }
      
      console.log('📥 API response:', response);

      if (response.success) {
        showToast(
          isEditMode ? "Cập nhật tài liệu thành công" : "Tạo tài liệu thành công",
          "success"
        );
        
        // Call success callback immediately if truly successful  
        if (response.data && (response.data.id || response.data.data?.id)) {
          console.log('✅ Document created successfully, calling onSuccess callback');
          setTimeout(() => {
            onSuccess();
          }, 1500);
        } else {
          console.log('⚠️ API returned success but no data, not calling onSuccess');
          throw new Error('API returned success but no document data');
        }
      } else {
        throw new Error(response.message || "Operation failed");
      }
    } catch (error) {
      console.error("Error saving document:", error);
      showToast("Lỗi lưu tài liệu: " + error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const removeDocumentFile = (fileId) => {
    setDocumentFiles((prev) => prev.filter((file) => file.id !== fileId));
  };

  return (
    <div className="news-creation-form">
        {/* Title Section */}
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">
              Tiêu đề tiếng Việt <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className={`form-control ${errors.titleVi ? 'is-invalid' : ''}`}
              value={formData.titleVi}
              onChange={(e) => handleInputChange("titleVi", e.target.value)}
              placeholder="Nhập tiêu đề tài liệu..."
            />
            {errors.titleVi && (
              <div className="invalid-feedback">{errors.titleVi}</div>
            )}
          </div>
          
          <div className="form-group">
            <label className="form-label">Tiêu đề tiếng Anh</label>
            <input
              type="text"
              className="form-control"
              value={formData.titleEn}
              onChange={(e) => handleInputChange("titleEn", e.target.value)}
              placeholder="Enter document title..."
            />
          </div>
        </div>

        {/* Description Section */}
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Mô tả tiếng Việt</label>
            <textarea
              className="form-control"
              rows="3"
              value={formData.descriptionVi}
              onChange={(e) => handleInputChange("descriptionVi", e.target.value)}
              placeholder="Mô tả tài liệu bằng tiếng Việt..."
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Mô tả tiếng Anh</label>
            <textarea
              className="form-control"
              rows="3"
              value={formData.descriptionEn}
              onChange={(e) => handleInputChange("descriptionEn", e.target.value)}
              placeholder="Describe document in English..."
            />
          </div>
        </div>

        {/* Status & Time Posted */}
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Trạng thái</label>
            <select
              className="form-control"
              value={formData.status}
              onChange={(e) => handleInputChange("status", parseInt(e.target.value))}
            >
              <option value={1}>Hoạt động</option>
              <option value={0}>Không hoạt động</option>
            </select>
          </div>
          
          <div className="form-group">
            <label className="form-label">Ngày đăng</label>
            <input
              type="date"
              className="form-control"
              value={formData.timePosted}
              onChange={(e) =>
                handleInputChange("timePosted", e.target.value)
              }
            />
          </div>
        </div>

        {/* Featured Image Section */}
        <div className="form-section">
          <h4>Ảnh đại diện tài liệu</h4>
          <div className="form-group">
            <label className="form-label">Tải lên ảnh đại diện</label>
            <div className="file-upload-area">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFeaturedImageChange(e.target.files[0])}
                style={{ marginBottom: "10px" }}
              />
              {featuredImagePreview && (
                <div className="image-preview" style={{ marginTop: "15px" }}>
                  <img
                    src={featuredImagePreview}
                    alt="Ảnh đại diện tài liệu"
                    style={{
                      maxWidth: "200px",
                      maxHeight: "150px",
                      objectFit: "cover",
                      borderRadius: "6px",
                      border: "1px solid #dee2e6",
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Document Files Section */}
        <div className="form-section">
          <h4>Tài liệu</h4>
          <div className="form-group">
            <label className="form-label">
              Tải lên file tài liệu <span className="text-danger">*</span>
            </label>
            <input
              type="file"
              multiple
              accept={allowedFileTypes.join(',')}
              onChange={(e) => {
                const files = Array.from(e.target.files);
                if (files.length > 0) {
                  handleDocumentUpload(files);
                }
              }}
              className={`form-control ${errors.attachmentIds ? 'is-invalid' : ''}`}
              disabled={uploadingFiles}
            />
            <small className="form-text text-muted">
              Chọn nhiều file tài liệu. Hỗ trợ PDF, Word, Excel, PowerPoint, Text.
            </small>
            {errors.attachmentIds && (
              <div className="invalid-feedback">{errors.attachmentIds}</div>
            )}
          </div>
        </div>

        {/* Upload Progress */}
        {uploadingFiles && (
          <div className="upload-progress uploading">
            <div className="spinner-border spinner-border-sm me-2"></div>
            Đang upload file...
          </div>
        )}

        {/* Document Files Preview */}
        {documentFiles.length > 0 && (
          <div className="uploaded-files-section">
            <h6>Tài liệu: ({documentFiles.filter(file => !file.uploading).length}/{documentFiles.length} file)</h6>
            <div className="files-grid">
              {documentFiles.map((file) => (
                <div key={file.id} className="file-item">
                  <div className="file-info">
                    <i className="fas fa-file-alt"></i>
                    <div className="file-details">
                      <div className="file-name">
                        {file.name.length > 25 ? file.name.substring(0, 25) + '...' : file.name}
                      </div>
                      <div className="file-size">{formatFileSize(file.size)}</div>
                      {file.uploading && (
                        <div className="file-status uploading">
                          <div className="spinner-border spinner-border-sm"></div>
                        </div>
                      )}
                    </div>
                    <button
                      type="button"
                      className="remove-file-btn"
                      onClick={() => removeDocumentFile(file.id)}
                      title="Xóa file"
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Form Actions */}
        <div className="form-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCancel}
            disabled={loading}
          >
            Hủy
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSave}
            disabled={loading || uploadingFiles}
          >
            {loading && <span className="spinner-border spinner-border-sm me-2"></span>}
            {isEditMode ? "Cập nhật Tài liệu" : "Tạo Tài liệu"}
          </button>
        </div>

      <ToastMessage
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={hideToast}
      />
    </div>
  );
};

export default DocumentCreationForm;