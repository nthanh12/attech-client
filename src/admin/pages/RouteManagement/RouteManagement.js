import React, { useState, useEffect, useCallback, useMemo } from 'react';
import DataTable from '../../components/DataTable';
import FormModal from '../../components/FormModal';
import ToastMessage from '../../components/ToastMessage';
import LoadingSpinner from '../../components/LoadingSpinner';
import { mockRoutes } from '../../../utils/mockData.js';
import './RouteManagement.css';

const RouteManagement = () => {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentRoute, setCurrentRoute] = useState({
    id: null,
    path: '',
    component: '',
    layout: '',
    protected: false,
    parent_id: null,
    order_index: 1,
    is_active: true,
    label: '',
    icon: ''
  });
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({ key: "id", direction: "asc" });
  const [filters, setFilters] = useState({
    search: "",
    component: "",
    layout: "",
    is_active: "",
  });

  // Available components and layouts
  const availableComponents = [
    'Home', 'NewsPage', 'NewsListPage', 'NewsDetailPage',
    'ProductPage', 'ProductList', 'ProductDetail',
    'ServicePage', 'ServiceList', 'ServiceDetail',
    'NotificationPage', 'NotificationListPage', 'NotificationDetailPage',
    'ContactPage', 'CompanyInfoPage', 'Financial', 'History', 'Structure', 
    'Leadership', 'Business', 'Iso', 'Gallery', 'GalleryDetail', 'UserLogin', 'NotFoundPage'
  ];

  const availableLayouts = [
    'MainLayout', 'AdminLayout', null
  ];

  // Định nghĩa object emptyRoute để dùng cho khởi tạo/reset form
  const emptyRoute = {
    id: null,
    path: '',
    component: '',
    layout: '',
    protected: false,
    parent_id: null,
    order_index: 1,
    is_active: true,
    label: '',
    icon: ''
  };

  useEffect(() => {
    fetchRoutes();
  }, []);

  const fetchRoutes = useCallback(async () => {
    setLoading(true);
    try {
      // Sử dụng mock data thay vì API call
      setRoutes(mockRoutes);
    } catch (error) {
      console.error('Error fetching routes:', error);
      setToast({ show: true, message: 'Lỗi khi tải routes!', type: 'error' });
    } finally {
      setLoading(false);
    }
  }, []);

  const handleShowModal = useCallback((route = null) => {
    if (route) {
      setCurrentRoute(route);
      setEditMode(true);
    } else {
      setCurrentRoute({ ...emptyRoute });
      setEditMode(false);
    }
    setShowModal(true);
    setErrors({});
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
    setEditMode(false);
    setErrors({});
  }, []);

  const handleInputChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setCurrentRoute((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }, []);

  const validateForm = useCallback(() => {
    const newErrors = {};
    
    if (!currentRoute.path) {
      newErrors.path = 'Path là bắt buộc';
    }
    
    if (!currentRoute.component) {
      newErrors.component = 'Component là bắt buộc';
    }
    
    if (!currentRoute.label) {
      newErrors.label = 'Label là bắt buộc';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [currentRoute]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitLoading(true);
    try {
      if (editMode) {
        // Update route
        setRoutes(prev => prev.map(r => r.id === currentRoute.id ? currentRoute : r));
        setToast({ show: true, message: 'Cập nhật route thành công!', type: 'success' });
      } else {
        // Create new route
        const newRoute = { ...currentRoute, id: Date.now() };
        setRoutes(prev => [...prev, newRoute]);
        setToast({ show: true, message: 'Thêm route thành công!', type: 'success' });
      }
      handleCloseModal();
      setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
    } catch (error) {
      setToast({ show: true, message: 'Lỗi khi lưu route!', type: 'error' });
    } finally {
      setSubmitLoading(false);
    }
  }, [editMode, currentRoute, validateForm, handleCloseModal]);

  const handleDeleteRoute = useCallback(async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa route này?')) {
      try {
        setRoutes(prev => prev.filter(r => r.id !== id));
        setToast({ show: true, message: 'Xóa route thành công!', type: 'success' });
        setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
      } catch (error) {
        setToast({ show: true, message: 'Lỗi khi xóa route!', type: 'error' });
      }
    }
  }, []);

  const handleSort = useCallback((key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  }, []);

  const handleFilterChange = useCallback((e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    setCurrentPage(1);
  }, []);

  const getFilteredAndSortedRoutes = useCallback(() => {
    let filteredRoutes = [...routes];
    
    if (filters.search) {
      filteredRoutes = filteredRoutes.filter((r) =>
        r.path.toLowerCase().includes(filters.search.toLowerCase()) ||
        r.label.toLowerCase().includes(filters.search.toLowerCase()) ||
        r.component.toLowerCase().includes(filters.search.toLowerCase())
      );
    }
    
    if (filters.component) {
      filteredRoutes = filteredRoutes.filter((r) => r.component === filters.component);
    }
    
    if (filters.layout) {
      filteredRoutes = filteredRoutes.filter((r) => r.layout === filters.layout);
    }
    
    if (filters.is_active !== "") {
      const isActive = filters.is_active === "true";
      filteredRoutes = filteredRoutes.filter((r) => r.is_active === isActive);
    }

    filteredRoutes.sort((a, b) => {
      const key = sortConfig.key;
      const direction = sortConfig.direction === "asc" ? 1 : -1;
      
      if (key === "path" || key === "component" || key === "layout" || key === "label") {
        return (a[key] || "").localeCompare(b[key] || "") * direction;
      } else if (key === "protected" || key === "is_active") {
        return ((a[key] ? 1 : 0) - (b[key] ? 1 : 0)) * direction;
      } else if (key === "order_index") {
        return (a[key] - b[key]) * direction;
      }
      return (a[key] - b[key]) * direction;
    });
    
    return filteredRoutes;
  }, [routes, filters, sortConfig]);

  const filteredRoutes = useMemo(() => getFilteredAndSortedRoutes(), [getFilteredAndSortedRoutes]);
  const totalPages = Math.ceil(filteredRoutes.length / itemsPerPage);
  const paginatedRoutes = useMemo(() => 
    filteredRoutes.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage), 
    [filteredRoutes, currentPage, itemsPerPage]
  );

  const handlePageChange = useCallback((page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  }, [totalPages]);

  const handleToggleStatus = useCallback((routeItem) => {
    setRoutes((prev) => prev.map((r) =>
      r.id === routeItem.id ? { ...r, is_active: !r.is_active } : r
    ));
    setToast({ show: true, message: `Đã ${routeItem.is_active ? "ẩn" : "kích hoạt"} route!`, type: "success" });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  }, []);

  // Columns config for DataTable
  const columns = useMemo(() => [
    { key: "id", label: "ID", sortable: true },
    { key: "path", label: "Path", sortable: true },
    { key: "component", label: "Component", sortable: true },
    { key: "layout", label: "Layout", sortable: true },
    { key: "label", label: "Label", sortable: true },
    { key: "protected", label: "Protected", sortable: true, render: (val) => <span className={`badge badge-${val ? "warning" : "secondary"}`}>{val ? "Có" : "Không"}</span> },
    { key: "order_index", label: "Thứ tự", sortable: true },
    { key: "is_active", label: "Trạng thái", sortable: true, render: (val) => <span className={`badge badge-${val ? "success" : "danger"}`}>{val ? "Hoạt động" : "Ẩn"}</span> },
    { key: "toggleStatus", label: "Đổi trạng thái", sortable: false, render: (val, row) => (
      <button className="btn btn-toggle-status" onClick={() => handleToggleStatus(row)}>
        {row.is_active ? "Ẩn" : "Kích hoạt"}
      </button>
    ) },
  ], [handleToggleStatus]);

  // Fields config for FormModal
  // const fields = useMemo(() => [...], []); // REMOVE THIS

  // Render form for modal (like other admin pages)
  const renderRouteForm = () => (
    <div className="form-grid">
      <div className="form-group">
        <label>Path *</label>
        <input
          type="text"
          name="path"
          className="form-control"
          value={currentRoute.path}
          onChange={handleInputChange}
        />
        {errors.path && <span className="error-text">{errors.path}</span>}
      </div>
      <div className="form-group">
        <label>Component *</label>
        <select
          name="component"
          className="form-control"
          value={currentRoute.component}
          onChange={handleInputChange}
        >
          <option value="">Chọn component</option>
          {availableComponents.map(comp => (
            <option key={comp} value={comp}>{comp}</option>
          ))}
        </select>
        {errors.component && <span className="error-text">{errors.component}</span>}
      </div>
      <div className="form-group">
        <label>Layout</label>
        <select
          name="layout"
          className="form-control"
          value={currentRoute.layout}
          onChange={handleInputChange}
        >
          <option value="">Chọn layout</option>
          {availableLayouts.filter(layout => layout).map(layout => (
            <option key={layout} value={layout}>{layout}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Label *</label>
        <input
          type="text"
          name="label"
          className="form-control"
          value={currentRoute.label}
          onChange={handleInputChange}
        />
        {errors.label && <span className="error-text">{errors.label}</span>}
      </div>
      <div className="form-group">
        <label>Icon</label>
        <input
          type="text"
          name="icon"
          className="form-control"
          value={currentRoute.icon}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label>Thứ tự</label>
        <input
          type="number"
          name="order_index"
          className="form-control"
          value={currentRoute.order_index}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-checkbox">
        <input
          type="checkbox"
          name="protected"
          id="protected"
          checked={currentRoute.protected}
          onChange={handleInputChange}
        />
        <label htmlFor="protected" className="checkbox-label">Protected Route</label>
      </div>
      <div className="form-checkbox">
        <input
          type="checkbox"
          name="is_active"
          id="is_active"
          checked={currentRoute.is_active}
          onChange={handleInputChange}
        />
        <label htmlFor="is_active" className="checkbox-label">Hoạt động</label>
      </div>
    </div>
  );

  console.log('RouteManagement render - loading:', loading, 'routes:', routes.length, 'filteredRoutes:', filteredRoutes.length);
  
  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="admin-route-management">
      <div className="page-header">
        <h1>Quản lý Routes</h1>
        <button className="btn btn-primary" onClick={() => handleShowModal()}>
          Thêm Route mới
        </button>
      </div>

      <div className="filters-section">
        <div className="filter-group">
          <input
            type="text"
            className="form-control"
            placeholder="Tìm kiếm path, component, label..."
            name="search"
            value={filters.search}
            onChange={handleFilterChange}
          />
        </div>
        <div className="filter-group">
          <select
            className="form-control"
            name="component"
            value={filters.component}
            onChange={handleFilterChange}
          >
            <option value="">Tất cả components</option>
            {availableComponents.map(comp => (
              <option key={comp} value={comp}>{comp}</option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <select
            className="form-control"
            name="layout"
            value={filters.layout}
            onChange={handleFilterChange}
          >
            <option value="">Tất cả layouts</option>
            {availableLayouts.filter(layout => layout).map(layout => (
              <option key={layout} value={layout}>{layout}</option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <select
            className="form-control"
            name="is_active"
            value={filters.is_active}
            onChange={handleFilterChange}
          >
            <option value="">Tất cả trạng thái</option>
            <option value="true">Hoạt động</option>
            <option value="false">Ẩn</option>
          </select>
        </div>
      </div>

      <div className="admin-table-container">
        <DataTable
          columns={columns}
          data={paginatedRoutes}
          onEdit={handleShowModal}
          onDelete={handleDeleteRoute}
          onSort={handleSort}
          sortConfig={sortConfig}
          loading={loading}
          emptyText="Không có route nào phù hợp"
          tableClassName="route-table"
        />
      </div>

      <div className="pagination-container">
        <div className="pagination-info">
          Hiển thị {paginatedRoutes.length} / {filteredRoutes.length} routes
        </div>
        <div className="pagination">
          <button
            className={`page-btn ${currentPage === 1 ? "disabled" : ""}`}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Trước
          </button>
          {[...Array(totalPages).keys()].map((page) => (
            <button
              key={page + 1}
              className={`page-btn ${currentPage === page + 1 ? "active" : ""}`}
              onClick={() => handlePageChange(page + 1)}
            >
              {page + 1}
            </button>
          ))}
          <button
            className={`page-btn ${currentPage === totalPages ? "disabled" : ""}`}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Sau
          </button>
        </div>
      </div>

      <FormModal
        show={showModal}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        loading={submitLoading}
        title={editMode ? "Chỉnh sửa Route" : "Thêm Route mới"}
        submitText={editMode ? "Cập nhật" : "Thêm mới"}
        cancelText="Hủy"
      >
        {renderRouteForm()}
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

export default RouteManagement; 