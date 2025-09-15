import React, { useState, useEffect, useCallback } from "react";
import PageWrapper from "../components/PageWrapper";
import DataTable from "../components/DataTable";
import FormModal from "../components/FormModal";
import ToastMessage from "../components/ToastMessage";
import LoadingSpinner from "../components/LoadingSpinner";
import BannerManager from "../components/BannerManager";
import HomeContentBanner from "../components/HomeContentBanner";
import { 
  fetchBanners, 
  createBanner, 
  updateBanner, 
  deleteBanner, 
  updateBannerStatus,
  getBannerPositions 
} from "../../services/bannerService";
import "./ConfigBanner.css";

const ConfigBanner = () => {
  console.log('🎌 ConfigBanner component is rendering...');
  const [activeMainTab, setActiveMainTab] = useState('settings'); // 'settings' or 'management'
  const [banners, setBanners] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  
  const emptyBanner = {
    id: null,
    titleVi: "",
    titleEn: "",
    descriptionVi: "",
    descriptionEn: "",
    imageUrl: "",
    linkUrl: "",
    position: "homepage_main",
    order: 1,
    status: "active",
    startDate: "",
    endDate: ""
  };
  
  const [currentBanner, setCurrentBanner] = useState({ ...emptyBanner });
  const [errors, setErrors] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({ key: "order", direction: "asc" });
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    position: ""
  });
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const [activeTab, setActiveTab] = useState('vi');

  const positions = getBannerPositions();

  useEffect(() => {
    // Chỉ fetch data khi ở tab "management"
    if (activeMainTab === 'management') {
      const fetchData = async () => {
        setIsLoading(true);
        try {
          const bannersData = await fetchBanners();
          setBanners(bannersData);
          console.log('✅ Banners loaded successfully', bannersData);
        } catch (error) {
          console.error('Failed to fetch banners:', error);
          setBanners([]);
          setToast({ show: true, message: 'Không thể tải danh sách banner!', type: 'error' });
        } finally {
          setIsLoading(false);
        }
      };
      
      fetchData();
    }
  }, [activeMainTab]);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
    setEditMode(false);
    setErrors({});
    setCurrentBanner({ ...emptyBanner });
    setActiveTab('vi');
  }, []);

  const handleAddNew = () => {
    setEditMode(false);
    setCurrentBanner({ ...emptyBanner });
    setErrors({});
    setActiveTab('vi');
    setShowModal(true);
  };

  const handleEdit = (banner) => {
    setEditMode(true);
    setCurrentBanner({
      id: banner.id,
      titleVi: banner.titleVi || "",
      titleEn: banner.titleEn || "",
      descriptionVi: banner.descriptionVi || "",
      descriptionEn: banner.descriptionEn || "",
      imageUrl: banner.imageUrl || "",
      linkUrl: banner.linkUrl || "",
      position: banner.position || "homepage_main",
      order: banner.order || 1,
      status: banner.status === 1 ? "active" : "inactive",
      startDate: banner.startDate ? banner.startDate.split('T')[0] : "",
      endDate: banner.endDate ? banner.endDate.split('T')[0] : ""
    });
    setErrors({});
    setActiveTab('vi');
    setShowModal(true);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!currentBanner.titleVi.trim()) {
      newErrors.titleVi = 'Tiêu đề tiếng Việt là bắt buộc';
    }
    
    if (!currentBanner.titleEn.trim()) {
      newErrors.titleEn = 'Tiêu đề tiếng Anh là bắt buộc';
    }

    if (!currentBanner.imageUrl.trim()) {
      newErrors.imageUrl = 'Hình ảnh banner là bắt buộc';
    }

    if (!currentBanner.position) {
      newErrors.position = 'Vị trí hiển thị là bắt buộc';
    }

    if (!currentBanner.order || currentBanner.order < 1) {
      newErrors.order = 'Thứ tự hiển thị phải lớn hơn 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setSubmitLoading(true);
    try {
      const bannerData = {
        titleVi: currentBanner.titleVi,
        titleEn: currentBanner.titleEn,
        descriptionVi: currentBanner.descriptionVi,
        descriptionEn: currentBanner.descriptionEn,
        imageUrl: currentBanner.imageUrl,
        linkUrl: currentBanner.linkUrl,
        position: currentBanner.position,
        order: parseInt(currentBanner.order),
        status: currentBanner.status === "active" ? 1 : 0,
        startDate: currentBanner.startDate || null,
        endDate: currentBanner.endDate || null
      };

      if (editMode) {
        await updateBanner(currentBanner.id, bannerData);
        setBanners(prev => prev.map(item => 
          item.id === currentBanner.id ? { ...item, ...bannerData } : item
        ));
        setToast({ show: true, message: 'Cập nhật banner thành công!', type: 'success' });
      } else {
        const newBanner = await createBanner(bannerData);
        setBanners(prev => [newBanner, ...prev]);
        setToast({ show: true, message: 'Thêm banner thành công!', type: 'success' });
      }
      handleCloseModal();
    } catch (error) {
      setToast({ show: true, message: error.message || 'Lỗi khi lưu banner!', type: 'error' });
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDeleteBanner = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa banner này?')) {
      try {
        await deleteBanner(id);
        setBanners(prev => prev.filter(item => item.id !== id));
        setToast({ show: true, message: 'Xóa banner thành công!', type: 'success' });
      } catch (error) {
        setToast({ show: true, message: error.message || 'Lỗi khi xóa banner!', type: 'error' });
      }
    }
  };

  const handleToggleStatus = async (banner) => {
    try {
      const newStatus = banner.status === 1 ? 0 : 1;
      await updateBannerStatus(banner.id, newStatus);
      setBanners(prev => prev.map(item => 
        item.id === banner.id ? { ...item, status: newStatus } : item
      ));
      setToast({ show: true, message: 'Cập nhật trạng thái thành công!', type: 'success' });
    } catch (error) {
      setToast({ show: true, message: error.message || 'Lỗi khi cập nhật trạng thái!', type: 'error' });
    }
  };

  const handleInputChange = (field, value) => {
    setCurrentBanner(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const filteredBanners = banners.filter(item => {
    const matchesSearch = item.titleVi.toLowerCase().includes(filters.search.toLowerCase()) ||
                         item.titleEn.toLowerCase().includes(filters.search.toLowerCase()) ||
                         item.descriptionVi.toLowerCase().includes(filters.search.toLowerCase()) ||
                         item.descriptionEn.toLowerCase().includes(filters.search.toLowerCase());
    const matchesStatus = !filters.status || 
                         (filters.status === "active" && item.status === 1) ||
                         (filters.status === "inactive" && item.status === 0);
    const matchesPosition = !filters.position || item.position === filters.position;
    
    return matchesSearch && matchesStatus && matchesPosition;
  });

  const sortedBanners = [...filteredBanners].sort((a, b) => {
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    
    if (sortConfig.direction === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const paginatedBanners = sortedBanners.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(sortedBanners.length / itemsPerPage);

  const columns = [
    { 
      key: 'imageUrl', 
      label: 'Hình ảnh',
      render: value => value ? (
        <img 
          src={value} 
          alt="Banner" 
          className="banner-thumbnail"
          style={{ width: '60px', height: '40px', objectFit: 'cover', borderRadius: '4px' }}
        />
      ) : <span className="text-muted">Chưa có ảnh</span>
    },
    { key: 'titleVi', label: 'Tiêu đề (VI)', sortable: true },
    { key: 'titleEn', label: 'Tiêu đề (EN)', sortable: true },
    { 
      key: 'position', 
      label: 'Vị trí', 
      sortable: true,
      render: value => {
        const pos = positions.find(p => p.value === value);
        return pos ? pos.label : value;
      }
    },
    { key: 'order', label: 'Thứ tự', sortable: true },
    {
      key: 'status',
      label: 'Trạng thái',
      sortable: true,
      render: (value, item) => (
        <button 
          onClick={() => handleToggleStatus(item)}
          className={`status-badge ${value === 1 || value === 'active' ? 'active' : 'inactive'}`}
        >
          {value === 1 || value === 'active' ? 'Hoạt động' : 'Không hoạt động'}
        </button>
      )
    },
    {
      key: 'actions',
      label: 'Thao tác',
      render: (value, item) => (
        <div className="action-buttons">
          <button className="btn btn-sm btn-primary" onClick={() => handleEdit(item)} title="Chỉnh sửa">
            <i className="bi bi-pencil"></i>
            <span>Sửa</span>
          </button>
          <button className="btn btn-sm btn-danger" onClick={() => handleDeleteBanner(item.id)} title="Xóa">
            <i className="bi bi-trash"></i>
            <span>Xóa</span>
          </button>
        </div>
      )
    }
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
          placeholder="Tìm kiếm banner..."
          value={filters.search}
          onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
          className="form-control"
        />
      </div>
      <div className="filter-group">
        <select
          value={filters.status}
          onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
          className="form-control"
        >
          <option value="">Tất cả trạng thái</option>
          <option value="active">Hoạt động</option>
          <option value="inactive">Không hoạt động</option>
        </select>
      </div>
      <div className="filter-group">
        <select
          value={filters.position}
          onChange={(e) => setFilters(prev => ({ ...prev, position: e.target.value }))}
          className="form-control"
        >
          <option value="">Tất cả vị trí</option>
          {positions.map(pos => (
            <option key={pos.value} value={pos.value}>{pos.label}</option>
          ))}
        </select>
      </div>
    </div>
  );

  const renderBannerForm = () => (
    <div className="banner-form">
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <button type="button" className={`btn btn-tab${activeTab === 'vi' ? ' active' : ''}`} onClick={() => setActiveTab('vi')}>Thông tin & Tiếng Việt</button>
        <button type="button" className={`btn btn-tab${activeTab === 'en' ? ' active' : ''}`} onClick={() => setActiveTab('en')}>Tiếng Anh</button>
      </div>
      
      {activeTab === 'vi' && (
        <>
          <div className="form-row">
            <div className="form-group">
              <label>Tiêu đề (VI) *</label>
                            <input
                type="text"
                value={currentBanner.titleVi}
                onChange={e => handleInputChange('titleVi', e.target.value)}
                className={`form-control ${errors.titleVi ? 'is-invalid' : ''}`}
                placeholder="Nhập tiêu đề tiếng Việt"
              />
              {errors.titleVi && <div className="invalid-feedback">{errors.titleVi}</div>}
            </div>
            <div className="form-group">
              <label>Tiêu đề (EN)</label>
              <input 
                type="text" 
                value={currentBanner.titleEn} 
                onChange={e => handleInputChange('titleEn', e.target.value)} 
                className="form-control" 
                placeholder="Nhập tiêu đề tiếng Anh" 
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Mô tả (VI)</label>
                            <textarea
                value={currentBanner.descriptionVi}
                onChange={e => handleInputChange('descriptionVi', e.target.value)}
                className="form-control"
                placeholder="Nhập mô tả tiếng Việt"
                rows={3}
              />
            </div>
            <div className="form-group">
              <label>Mô tả (EN)</label>
                            <textarea
                value={currentBanner.descriptionEn}
                onChange={e => handleInputChange('descriptionEn', e.target.value)}
                className="form-control"
                placeholder="Nhập mô tả tiếng Anh"
                rows={3}
              />
            </div>
          </div>
        </>
      )}
      
      {activeTab === 'en' && (
        <>
          <div className="form-row">
            <div className="form-group">
              <label>Tiêu đề (EN) *</label>
              <input 
                type="text" 
                value={currentBanner.titleEn} 
                onChange={e => handleInputChange('titleEn', e.target.value)} 
                className={`form-control ${errors.titleEn ? 'is-invalid' : ''}`} 
                placeholder="Nhập tiêu đề tiếng Anh" 
              />
              {errors.titleEn && <div className="invalid-feedback">{errors.titleEn}</div>}
            </div>
            <div className="form-group">
              <label>Tiêu đề (VI)</label>
              <input 
                type="text" 
                value={currentBanner.titleVi} 
                onChange={e => handleInputChange('titleVi', e.target.value)} 
                className="form-control" 
                placeholder="Nhập tiêu đề tiếng Việt" 
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Mô tả (EN)</label>
              <textarea 
                value={currentBanner.descriptionEn} 
                onChange={e => handleInputChange('descriptionEn', e.target.value)} 
                className="form-control" 
                placeholder="Nhập mô tả tiếng Anh"
                rows={3}
              />
            </div>
            <div className="form-group">
              <label>Mô tả (VI)</label>
              <textarea 
                value={currentBanner.descriptionVi} 
                onChange={e => handleInputChange('descriptionVi', e.target.value)} 
                className="form-control" 
                placeholder="Nhập mô tả tiếng Việt"
                rows={3}
              />
            </div>
          </div>
        </>
      )}
      
      <div className="form-row">
        <div className="form-group">
          <label>URL Hình ảnh *</label>
          <input 
            type="url" 
            value={currentBanner.imageUrl} 
            onChange={e => handleInputChange('imageUrl', e.target.value)} 
            className={`form-control ${errors.imageUrl ? 'is-invalid' : ''}`} 
            placeholder="https://example.com/image.jpg" 
          />
          {errors.imageUrl && <div className="invalid-feedback">{errors.imageUrl}</div>}
        </div>
        <div className="form-group">
          <label>URL Liên kết</label>
          <input 
            type="url" 
            value={currentBanner.linkUrl} 
            onChange={e => handleInputChange('linkUrl', e.target.value)} 
            className="form-control" 
            placeholder="https://example.com/page" 
          />
        </div>
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label>Vị trí hiển thị *</label>
          <select 
            value={currentBanner.position} 
            onChange={e => handleInputChange('position', e.target.value)} 
            className={`form-control ${errors.position ? 'is-invalid' : ''}`}
          >
            {positions.map(pos => (
              <option key={pos.value} value={pos.value}>{pos.label}</option>
            ))}
          </select>
          {errors.position && <div className="invalid-feedback">{errors.position}</div>}
        </div>
        <div className="form-group">
          <label>Thứ tự hiển thị *</label>
          <input 
            type="number" 
            value={currentBanner.order} 
            onChange={e => handleInputChange('order', e.target.value)} 
            className={`form-control ${errors.order ? 'is-invalid' : ''}`} 
            min="1"
          />
          {errors.order && <div className="invalid-feedback">{errors.order}</div>}
        </div>
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label>Ngày bắt đầu</label>
          <input 
            type="date" 
            value={currentBanner.startDate} 
            onChange={e => handleInputChange('startDate', e.target.value)} 
            className="form-control" 
          />
        </div>
        <div className="form-group">
          <label>Ngày kết thúc</label>
          <input 
            type="date" 
            value={currentBanner.endDate} 
            onChange={e => handleInputChange('endDate', e.target.value)} 
            className="form-control" 
          />
        </div>
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label>Trạng thái</label>
          <select 
            value={currentBanner.status} 
            onChange={e => handleInputChange('status', e.target.value)} 
            className="form-control"
          >
            <option value="active">Hoạt động</option>
            <option value="inactive">Không hoạt động</option>
          </select>
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const pageActions = (
    <button 
      className="btn btn-primary" 
      onClick={handleAddNew}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.75rem 1rem',
        backgroundColor: '#3b82f6',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        fontSize: '0.875rem',
        fontWeight: '500',
        cursor: 'pointer'
      }}
    >
      <i className="bi bi-plus"></i>
      Thêm banner
    </button>
  );

  const renderTabNavigation = () => (
    <div className="tab-navigation" style={{ marginBottom: '24px' }}>
      <div className="tab-buttons">
        <button
          className={`tab-button ${activeMainTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveMainTab('settings')}
        >
          <i className="bi bi-image"></i>
          Logo & Banner chính
        </button>
        <button
          className={`tab-button ${activeMainTab === 'homepage' ? 'active' : ''}`}
          onClick={() => setActiveMainTab('homepage')}
        >
          <i className="bi bi-house"></i>
          Ảnh trang chủ
        </button>
      </div>
      <div className="tab-description">
        {activeMainTab === 'settings' ? (
          <p>Quản lý logo và banner chính của website</p>
        ) : (
          <p>Quản lý ảnh carousel, dịch vụ và sự kiện trên trang chủ</p>
        )}
      </div>
    </div>
  );

  return (
    <PageWrapper>
      <div className="admin-banner-config">
        
        {renderTabNavigation()}

        {activeMainTab === 'settings' ? (
          <BannerManager />
        ) : (
          <HomeContentBanner />
        )}

        {toast.show && (
          <ToastMessage 
            message={toast.message} 
            type={toast.type} 
            onClose={() => setToast({ ...toast, show: false })} 
          />
        )}
      </div>
    </PageWrapper>
  );
};

export default ConfigBanner;