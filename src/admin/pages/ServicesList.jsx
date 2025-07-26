import React, { useState, useEffect, useMemo, useCallback } from "react";
import "tinymce/tinymce";
import "tinymce/icons/default";
import "tinymce/themes/silver";
import "tinymce/skins/ui/oxide/skin.min.css";
import "tinymce/skins/content/default/content.min.css";
import "tinymce/plugins/advlist";
import "tinymce/plugins/autolink";
import "tinymce/plugins/lists";
import "tinymce/plugins/link";
import "tinymce/plugins/image";
import "tinymce/plugins/code";
import "tinymce/plugins/table";
import "tinymce/plugins/help";
import "tinymce/plugins/wordcount";
import "tinymce/plugins/charmap";
import "tinymce/plugins/preview";
import "tinymce/plugins/anchor";
import "tinymce/plugins/searchreplace";
import "tinymce/plugins/visualblocks";
import "tinymce/plugins/fullscreen";
import "tinymce/plugins/insertdatetime";
import "tinymce/plugins/media";
import "tinymce/plugins/emoticons";
import "tinymce/plugins/codesample";
import "./ServicesList.css";
import "../styles/adminTable.css";
import "../styles/adminCommon.css";
import { fetchServices } from '../../services/serviceService';
import { mockServices } from "../../utils/mockData.js";
import DataTable from "../components/DataTable";
import FormModal from "../components/FormModal";
import ToastMessage from "../components/ToastMessage";
import LoadingSpinner from "../components/LoadingSpinner";
import { Link } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import ReactModal from "react-modal";
import ImageUpload from "../../components/UI/ImageUpload";
import { serviceEditorConfig } from "../../config/tinymceConfig";

// Hàm dịch gọi backend proxy
async function translateProxy(text) {
  if (!text) return '';
  const res = await fetch('/api/translate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text,
      source: 'vi',
      target: 'en'
    })
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  return data.translatedText;
}

const ServicesList = () => {
  const [service, setService] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  // Định nghĩa object emptyService để dùng cho khởi tạo/reset form
  const emptyService = {
    id: null,
    nameVi: "",
    nameEn: "",
    slugVi: "",
    slugEn: "",
    descriptionVi: "",
    descriptionEn: "",
    contentVi: "",
    contentEn: "",
    image: "",
    timePosted: new Date().toISOString(),
    status: 1,
  };
  const [currentService, setCurrentService] = useState({ ...emptyService });
  const [translating, setTranslating] = useState({});
  const [errors, setErrors] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState({ key: "id", direction: "asc" });
  const [filters, setFilters] = useState({
    search: "",
    status: "",
  });
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const [activeTab, setActiveTab] = useState('vi');

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const serviceRes = await fetchServices();
        if (serviceRes && serviceRes.success) {
          setService(serviceRes.data);
        } else {
          setService(mockServices);
          setToast({ show: true, message: 'Đang hiển thị dữ liệu mẫu dịch vụ!', type: 'warning' });
        }
      } catch (error) {
        setService(mockServices);
        setToast({ show: true, message: 'Không kết nối được API, đang dùng dữ liệu mẫu!', type: 'error' });
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
    setEditMode(false);
    setErrors({});
    setCurrentService({ ...emptyService });
  }, []);

  const handleAddNew = () => {
    setEditMode(false);
    setCurrentService({ ...emptyService });
    setErrors({});
    setShowModal(true);
  };

  const handleEdit = (serviceItem) => {
    setEditMode(true);
    setCurrentService({
      id: serviceItem.id,
      nameVi: serviceItem.nameVi || "",
      nameEn: serviceItem.nameEn || "",
      slugVi: serviceItem.slugVi || "",
      slugEn: serviceItem.slugEn || "",
      descriptionVi: serviceItem.descriptionVi || "",
      descriptionEn: serviceItem.descriptionEn || "",
      contentVi: serviceItem.contentVi || "",
      contentEn: serviceItem.contentEn || "",
      image: serviceItem.image || "",
      timePosted: serviceItem.timePosted || new Date().toISOString(),
      status: serviceItem.status,
    });
    setErrors({});
    setShowModal(true);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!currentService.nameVi.trim()) newErrors.nameVi = 'Tên dịch vụ tiếng Việt là bắt buộc';
    if (!currentService.nameEn.trim()) newErrors.nameEn = 'Tên dịch vụ tiếng Anh là bắt buộc';
    if (!currentService.slugVi.trim()) newErrors.slugVi = 'Slug tiếng Việt là bắt buộc';
    if (!currentService.slugEn.trim()) newErrors.slugEn = 'Slug tiếng Anh là bắt buộc';
    if (!currentService.contentVi.trim()) newErrors.contentVi = 'Nội dung tiếng Việt là bắt buộc';
    if (!currentService.contentEn.trim()) newErrors.contentEn = 'Nội dung tiếng Anh là bắt buộc';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    setSubmitLoading(true);
    try {
      if (editMode) {
        setService(prev => prev.map(item =>
          item.id === currentService.id ? {
            ...item,
            ...currentService,
          } : item
        ));
        setToast({ show: true, message: 'Cập nhật dịch vụ thành công!', type: 'success' });
      } else {
        const newService = {
          ...currentService,
          id: Date.now(),
          timePosted: new Date().toISOString(),
        };
        setService(prev => [newService, ...prev]);
        setToast({ show: true, message: 'Thêm dịch vụ thành công!', type: 'success' });
      }
      handleCloseModal();
    } catch (error) {
      setToast({ show: true, message: 'Lỗi khi lưu dịch vụ!', type: 'error' });
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDeleteService = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa dịch vụ này?")) {
      setService((prev) => prev.filter((item) => item.id !== id));
      setToast({
        show: true,
        message: "Xóa dịch vụ thành công!",
        type: "success",
      });
    }
  };

  const handleInputChange = (field, value) => {
    setCurrentService((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleTranslate = async (fromField, toField) => {
    const text = currentService[fromField] || '';
    if (!text) return;
    setTranslating(prev => ({ ...prev, [toField]: true }));
    try {
      const translated = await translateProxy(text);
      setCurrentService(prev => ({ ...prev, [toField]: translated }));
    } catch (err) {
      setCurrentService(prev => ({ ...prev, [toField]: text }));
    } finally {
      setTranslating(prev => ({ ...prev, [toField]: false }));
    }
  };

  const filteredServices = service.filter((item) => {
    const matchesSearch =
      item.nameVi.toLowerCase().includes(filters.search.toLowerCase()) ||
      item.nameEn.toLowerCase().includes(filters.search.toLowerCase()) ||
      item.descriptionVi.toLowerCase().includes(filters.search.toLowerCase()) ||
      item.descriptionEn.toLowerCase().includes(filters.search.toLowerCase());
    const matchesStatus =
      !filters.status ||
      (filters.status === "active" && item.status === 1) ||
      (filters.status === "inactive" && item.status === 0);

    return matchesSearch && matchesStatus;
  });

  const sortedServices = [...filteredServices].sort((a, b) => {
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (sortConfig.direction === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const paginatedServices = sortedServices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(sortedServices.length / itemsPerPage);

  const columns = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'nameVi', label: 'Tên dịch vụ (VI)', sortable: true },
    { key: 'image', label: 'Ảnh', render: (value) => value ? <img src={value} alt="Ảnh" style={{width: 60, height: 40, objectFit: 'cover'}} /> : '' },
    { key: 'timePosted', label: 'Ngày đăng', sortable: true, render: (value) => new Date(value).toLocaleDateString('vi-VN') },
    { key: 'status', label: 'Trạng thái', sortable: true, render: (value) => (<span className={`status-badge ${value === 1 ? 'active' : 'inactive'}`}>{value === 1 ? 'Hoạt động' : 'Không hoạt động'}</span>) },
    { key: 'actions', label: 'Thao tác', render: (value, item) => (
      <div className="action-buttons">
        <button className="btn btn-sm btn-primary" onClick={() => handleEdit(item)} title="Chỉnh sửa"><i className="bi bi-pencil"></i><span>Sửa</span></button>
        <button className="btn btn-sm btn-danger" onClick={() => handleDeleteService(item.id)} title="Xóa"><i className="bi bi-trash"></i><span>Xóa</span></button>
      </div>
    )}
  ];

  const handleSort = useCallback((key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  }, []);

  const renderFilters = () => (
    <div className="filters-section">
      <div className="filter-group">
        <input
          type="text"
          placeholder="Tìm kiếm dịch vụ..."
          value={filters.search}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, search: e.target.value }))
          }
          className="form-control"
        />
      </div>
      <div className="filter-group">
        <select
          value={filters.status}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, status: e.target.value }))
          }
          className="form-control"
        >
          <option value="">Tất cả trạng thái</option>
          <option value="active">Hoạt động</option>
          <option value="inactive">Không hoạt động</option>
        </select>
      </div>
    </div>
  );

  const renderServiceForm = () => (
    <div className="service-form">
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <button type="button" className={`btn btn-tab${activeTab === 'vi' ? ' active' : ''}`} onClick={() => setActiveTab('vi')}>Thông tin & Tiếng Việt</button>
        <button type="button" className={`btn btn-tab${activeTab === 'en' ? ' active' : ''}`} onClick={() => setActiveTab('en')}>Tiếng Anh</button>
      </div>
      {activeTab === 'vi' && (
        <>
          <div className="form-row">
            <div className="form-group">
              <label>Tên dịch vụ (VI) *</label>
              <input type="text" value={currentService.nameVi} onChange={e => handleInputChange('nameVi', e.target.value)} className={`form-control ${errors.nameVi ? 'is-invalid' : ''}`} placeholder="Nhập tên dịch vụ tiếng Việt" />
              {errors.nameVi && <div className="invalid-feedback">{errors.nameVi}</div>}
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Slug (VI) *</label>
              <input type="text" value={currentService.slugVi} onChange={e => handleInputChange('slugVi', e.target.value)} className={`form-control ${errors.slugVi ? 'is-invalid' : ''}`} placeholder="Nhập slug tiếng Việt" />
              {errors.slugVi && <div className="invalid-feedback">{errors.slugVi}</div>}
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Mô tả (VI)</label>
              <textarea value={currentService.descriptionVi} onChange={e => handleInputChange('descriptionVi', e.target.value)} className="form-control" rows="2" placeholder="Nhập mô tả tiếng Việt" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Nội dung (VI) *</label>
              <Editor 
                value={currentService.contentVi} 
                onEditorChange={c => handleInputChange('contentVi', c)} 
                init={serviceEditorConfig}
              />
              {errors.contentVi && <div className="invalid-feedback">{errors.contentVi}</div>}
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Ảnh *</label>
              <ImageUpload
                value={currentService.image}
                onChange={url => handleInputChange('image', url)}
                label="Ảnh *"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Trạng thái</label>
              <select value={currentService.status} onChange={e => handleInputChange('status', parseInt(e.target.value))} className="form-control">
                <option value={1}>Hoạt động</option>
                <option value={0}>Không hoạt động</option>
              </select>
            </div>
            <div className="form-group">
              <label>Ngày đăng</label>
              <input type="date" value={(currentService.timePosted ? currentService.timePosted.split('T')[0] : '')} onChange={e => handleInputChange('timePosted', e.target.value + 'T00:00:00Z')} className="form-control" />
            </div>
          </div>
        </>
      )}
      {activeTab === 'en' && (
        <>
          <div className="form-row">
            <div className="form-group">
              <label>Service Name (EN) *</label>
              <div style={{ display: 'flex', gap: 8 }}>
                <input type="text" value={currentService.nameEn} onChange={e => handleInputChange('nameEn', e.target.value)} className={`form-control ${errors.nameEn ? 'is-invalid' : ''}`} placeholder="Enter service name in English" />
                <button type="button" className="btn btn-sm btn-secondary" onClick={() => handleTranslate('nameVi', 'nameEn')} title="Dịch từ tiếng Việt" disabled={!!translating.nameEn}>{translating.nameEn ? 'Đang dịch...' : 'Dịch'}</button>
              </div>
              {errors.nameEn && <div className="invalid-feedback">{errors.nameEn}</div>}
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Slug (EN) *</label>
              <div style={{ display: 'flex', gap: 8 }}>
                <input type="text" value={currentService.slugEn} onChange={e => handleInputChange('slugEn', e.target.value)} className={`form-control ${errors.slugEn ? 'is-invalid' : ''}`} placeholder="Enter slug in English" />
                <button type="button" className="btn btn-sm btn-secondary" onClick={() => handleTranslate('slugVi', 'slugEn')} title="Dịch từ tiếng Việt" disabled={!!translating.slugEn}>{translating.slugEn ? 'Đang dịch...' : 'Dịch'}</button>
              </div>
              {errors.slugEn && <div className="invalid-feedback">{errors.slugEn}</div>}
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Description (EN)</label>
              <div style={{ display: 'flex', gap: 8 }}>
                <textarea value={currentService.descriptionEn} onChange={e => handleInputChange('descriptionEn', e.target.value)} className="form-control" rows="2" placeholder="Enter description in English" />
                <button type="button" className="btn btn-sm btn-secondary" onClick={() => handleTranslate('descriptionVi', 'descriptionEn')} title="Dịch từ tiếng Việt" disabled={!!translating.descriptionEn}>{translating.descriptionEn ? 'Đang dịch...' : 'Dịch'}</button>
              </div>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Content (EN) *</label>
              <div style={{ display: 'flex', gap: 8 }}>
                <div style={{ flex: 1 }}>
                  <Editor 
                    value={currentService.contentEn} 
                    onEditorChange={c => handleInputChange('contentEn', c)} 
                    init={{...serviceEditorConfig, language: 'en'}}
                  />
                </div>
                <button type="button" className="btn btn-sm btn-secondary" style={{ height: 40, alignSelf: 'flex-start', marginTop: 4 }} onClick={() => handleTranslate('contentVi', 'contentEn')} title="Dịch từ tiếng Việt" disabled={!!translating.contentEn}>{translating.contentEn ? 'Đang dịch...' : 'Dịch'}</button>
              </div>
              {errors.contentEn && <div className="invalid-feedback">{errors.contentEn}</div>}
            </div>
          </div>
        </>
      )}
    </div>
  );

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="admin-services-list">
      {/* Nơi TinyMCE sẽ render toolbar ra ngoài modal */}
      <div id="tiny-toolbar-container" />
      <div className="page-header">
        <h1>Quản lý dịch vụ</h1>
        <button className="btn btn-primary" onClick={handleAddNew}>
          <i className="bi bi-plus"></i>
          Thêm dịch vụ
        </button>
      </div>

      {renderFilters()}

      <div className="admin-table-container">
        <DataTable
          data={paginatedServices}
          columns={columns}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          sortConfig={sortConfig}
          onSort={handleSort}
          itemsPerPage={itemsPerPage}
          totalItems={sortedServices.length}
          tableClassName="admin-table"
        />
      </div>

      <ReactModal
        isOpen={showModal}
        onRequestClose={handleCloseModal}
        contentLabel="Dịch vụ"
        style={{
          overlay: { zIndex: 1000, background: "rgba(0,0,0,0.5)" },
          content: {
            zIndex: 1001,
            maxWidth: "1000px",
            width: "90vw",
            minWidth: "320px",
            margin: "auto",
            borderRadius: 12,
            padding: 0,
            border: "none",
            boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
          },
        }}
        ariaHideApp={false}
      >
        <div
          className="modal-header"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "24px 24px 0 24px",
            borderBottom: "1px solid #eee",
          }}
        >
          <h2 style={{ margin: 0, fontSize: 22, fontWeight: 600 }}>
            {editMode ? "Chỉnh sửa dịch vụ" : "Thêm dịch vụ mới"}
          </h2>
          <button
            className="modal-close"
            onClick={handleCloseModal}
            aria-label="Đóng"
            style={{
              background: "none",
              border: "none",
              fontSize: 24,
              cursor: "pointer",
              color: "#6b7280",
            }}
          >
            ✕
          </button>
        </div>
        <div className="modal-body" style={{ padding: "24px" }}>
          {renderServiceForm()}
        </div>
        <div
          className="modal-footer"
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 12,
            padding: "0 24px 24px 24px",
            borderTop: "1px solid #eee",
          }}
        >
          <button onClick={handleCloseModal} className="btn btn-secondary">
            Hủy
          </button>
          <button
            onClick={handleSubmit}
            className="btn btn-primary"
            disabled={submitLoading}
          >
            {submitLoading ? "Đang xử lý..." : editMode ? "Cập nhật" : "Thêm"}
          </button>
        </div>
      </ReactModal>

      <ToastMessage
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ ...toast, show: false })}
      />
    </div>
  );
};

export default ServicesList;
