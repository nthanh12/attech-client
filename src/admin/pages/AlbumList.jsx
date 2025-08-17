import React, { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useFormWithConfirm } from "../../hooks/useFormWithConfirm";
import ImageWithAuth from "../../components/UI/ImageWithAuth";
import DataTable from "../components/DataTable";
import FormModal from "../components/FormModal";
import ToastMessage from "../components/ToastMessage";
import "./AlbumList.css";

import albumService from "../../services/albumService";
import { uploadAlbumImages, getAttachmentUrl } from "../../services/newsService";

const AlbumList = () => {
  const { t } = useTranslation();
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const [uploadStates, setUploadStates] = useState({
    images: { uploading: false, uploadedItems: [] }
  });

  const {
    currentData,
    setFormData,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
  } = useFormWithConfirm({
    titleVi: "",
    titleEn: "",
    status: 1,
    attachmentIds: []
  });

  // Load albums
  const loadAlbums = useCallback(async () => {
    try {
      setLoading(true);
      const response = await albumService.fetchAlbums();
      console.log('Albums response:', response);
      
      if (response.success) {
        const albumsData = Array.isArray(response.data) ? response.data : [];
        setAlbums(albumsData);
      } else {
        setAlbums([]);
        showToast("Lỗi tải danh sách album", "error");
      }
    } catch (error) {
      console.error("Error loading albums:", error);
      setAlbums([]);
      showToast("Lỗi kết nối server", "error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAlbums();
  }, [loadAlbums]);

  // Toast helper
  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  // Handle image upload
  const handleImageUpload = async (files) => {
    try {
      setUploadStates(prev => ({
        ...prev,
        images: { uploading: true, uploadedItems: [] }
      }));

      const response = await uploadAlbumImages(Array.from(files));
      console.log('Upload response:', response);
      
      if (response.successUploads && response.successUploads.length > 0) {
        const uploadedItems = response.successUploads.map(item => ({
          id: item.id,
          previewUrl: getAttachmentUrl(item.id),
          fileName: item.originalFileName || item.fileName,
          fileSize: item.fileSize
        }));

        setUploadStates(prev => ({
          ...prev,
          images: { uploading: false, uploadedItems }
        }));

        // Update attachmentIds in form
        const attachmentIds = response.successUploads.map(item => item.id);
        handleInputChange("attachmentIds", attachmentIds);
        
        showToast(`Đã upload ${response.successUploads.length} ảnh thành công`, "success");
        
        // Show failed uploads if any
        if (response.failedCount > 0) {
          showToast(`Một số file upload thất bại: ${response.failedUploads.map(f => f.fileName).join(", ")}`, "error");
        }
      } else {
        throw new Error("No files uploaded successfully");
      }
    } catch (error) {
      console.error("Error uploading images:", error);
      showToast("Lỗi upload ảnh", "error");
      setUploadStates(prev => ({
        ...prev,
        images: { uploading: false, uploadedItems: [] }
      }));
    }
  };

  // Handle create/update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      const albumData = {
        titleVi: currentData?.titleVi || "",
        titleEn: currentData?.titleEn || "",
        status: parseInt(currentData?.status || 1),
        attachmentIds: currentData?.attachmentIds || []
      };

      let response;
      if (editingItem) {
        response = await albumService.updateAlbum(editingItem.id, albumData);
      } else {
        response = await albumService.createAlbum(albumData);
      }

      if (response.success) {
        showToast(
          editingItem ? "Cập nhật album thành công" : "Tạo album thành công",
          "success"
        );
        setShowModal(false);
        resetForm();
        setEditingItem(null);
        setUploadStates({ images: { uploading: false, uploadedItems: [] } });
        loadAlbums();
      } else {
        throw new Error(response.message || "Operation failed");
      }
    } catch (error) {
      console.error("Error saving album:", error);
      showToast("Lỗi lưu album", "error");
    }
  };

  // Handle edit
  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      titleVi: item.titleVi || "",
      titleEn: item.titleEn || "",
      status: item.status || 1,
      attachmentIds: []
    });
    setShowModal(true);
  };

  // Handle delete
  const handleDelete = async (item) => {
    if (!window.confirm(`Bạn có chắc chắn muốn xóa album "${item.titleVi}"?`)) {
      return;
    }

    try {
      const response = await albumService.deleteAlbum(item.id);
      if (response.success) {
        showToast("Xóa album thành công", "success");
        loadAlbums();
      } else {
        throw new Error(response.message || "Delete failed");
      }
    } catch (error) {
      console.error("Error deleting album:", error);
      showToast("Lỗi xóa album", "error");
    }
  };

  // Table columns
  const columns = [
    {
      key: "titleVi",
      label: "Tiêu đề",
      sortable: true,
      render: (value, item) => (
        <div>
          <div style={{ fontWeight: "bold", color: "#2c3e50" }}>
            {value || "Chưa có tiêu đề"}
          </div>
          {item.titleEn && (
            <div style={{ fontSize: "12px", color: "#7f8c8d", fontStyle: "italic" }}>
              {item.titleEn}
            </div>
          )}
        </div>
      ),
    },
    {
      key: "imageCount",
      label: "Số ảnh",
      width: "100px",
      render: (value, item) => (
        <span style={{ 
          backgroundColor: "#e8f4f8", 
          padding: "4px 8px", 
          borderRadius: "12px",
          fontSize: "12px",
          fontWeight: "bold"
        }}>
          {item.attachments?.length || 0} ảnh
        </span>
      ),
    },
    {
      key: "status",
      label: "Trạng thái",
      width: "120px",
      render: (value) => (
        <span
          className={`status-badge ${value === 1 ? "active" : "inactive"}`}
        >
          {value === 1 ? "Hiển thị" : "Ẩn"}
        </span>
      ),
    },
    {
      key: "createdAt",
      label: "Ngày tạo",
      width: "150px",
      sortable: true,
      render: (value) =>
        value ? new Date(value).toLocaleDateString("vi-VN") : "N/A",
    },
  ];

  return (
    <div className="album-list-container">
      <div className="page-header">
        <div className="page-title">
          <h2>📸 Quản lý Album</h2>
          <p>Quản lý thư viện ảnh theo album</p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => {
            setEditingItem(null);
            resetForm();
            setUploadStates({ images: { uploading: false, uploadedItems: [] } });
            setShowModal(true);
          }}
        >
          + Tạo Album Mới
        </button>
      </div>

      <DataTable
        data={Array.isArray(albums) ? albums : []}
        columns={columns}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
        emptyMessage="Chưa có album nào"
      />

      <FormModal
        show={showModal}
        onClose={() => setShowModal(false)}
        title={editingItem ? "Chỉnh sửa Album" : "Tạo Album Mới"}
        size="large"
      >
        <div className="album-form">
          <div className="form-row">
            <div className="form-group">
              <label>Tiêu đề tiếng Việt *</label>
              <input
                type="text"
                name="titleVi"
                value={currentData?.titleVi || ""}
                onChange={(e) => handleInputChange("titleVi", e.target.value)}
                className={`form-control ${errors.titleVi ? "is-invalid" : ""}`}
                placeholder="Nhập tiêu đề tiếng Việt"
                required
              />
              {errors.titleVi && <div className="invalid-feedback">{errors.titleVi}</div>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Tiêu đề tiếng Anh</label>
              <input
                type="text"
                name="titleEn"
                value={currentData?.titleEn || ""}
                onChange={(e) => handleInputChange("titleEn", e.target.value)}
                className="form-control"
                placeholder="Nhập tiêu đề tiếng Anh"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Trạng thái *</label>
              <select
                name="status"
                value={currentData?.status || 1}
                onChange={(e) => handleInputChange("status", parseInt(e.target.value))}
                className="form-control"
              >
                <option value={1}>Hiển thị</option>
                <option value={0}>Ẩn</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Upload ảnh *</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => {
                  const files = Array.from(e.target.files);
                  if (files.length > 0) {
                    handleImageUpload(files);
                  }
                }}
                className="form-control"
                disabled={uploadStates.images.uploading}
              />
              <small className="form-text text-muted">
                Chọn nhiều ảnh để tạo album. Hỗ trợ JPG, PNG, GIF.
              </small>
            </div>
          </div>

          {uploadStates.images.uploading && (
            <div className="upload-progress">
              <small className="text-info">Đang upload ảnh...</small>
            </div>
          )}

          {uploadStates.images.uploadedItems.length > 0 && (
            <div className="uploaded-images">
              <h6 style={{ color: "#28a745", fontWeight: "bold" }}>
                Ảnh đã upload: ({uploadStates.images.uploadedItems.length} ảnh)
              </h6>
              <div className="images-grid">
                {uploadStates.images.uploadedItems.map((img, index) => (
                  <div key={index} className="image-preview-card">
                    <ImageWithAuth
                      src={img.previewUrl}
                      alt={img.fileName}
                      style={{
                        width: "100%",
                        height: "100px",
                        objectFit: "cover",
                        borderRadius: "4px"
                      }}
                    />
                    <div className="image-info">
                      <small>{img.fileName}</small>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="modal-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setShowModal(false)}
            >
              Hủy
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={uploadStates.images.uploading}
            >
              {editingItem ? "Cập nhật" : "Tạo Album"}
            </button>
          </div>
        </div>
      </FormModal>

      <ToastMessage
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ show: false, message: "", type: "" })}
      />
    </div>
  );
};

export default AlbumList;