import './ServicesList.css';
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Editor } from '@tinymce/tinymce-react';
import DataTable from "../components/DataTable";
import FormModal from "../components/FormModal";
import ToastMessage from "../components/ToastMessage";
import LoadingSpinner from "../components/LoadingSpinner";
import {
  getServices,
  createService,
  updateService,
  deleteService,
} from "../../api";

const AdminServiceList = () => {
  const [service, setService] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [currentService, setCurrentService] = useState({
    id: null,
    title: "",
    category: "",
    content: "",
    summary: "",
    imageUrl: "",
    slug: "",
    featured: false,
    status: "active",
    publishDate: new Date().toISOString().split("T")[0],
  });
  const [errors, setErrors] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState({ key: "id", direction: "asc" });
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    status: "",
  });
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  useEffect(() => {
    let mounted = true;
    const fetchService = async () => {
      setIsLoading(true);
      try {
        const items = await getServices();
        if (mounted) setService(items);
      } catch (error) {
        setToast({ show: true, message: "Lỗi khi tải dịch vụ!", type: "error" });
      } finally {
        if (mounted) setIsLoading(false);
      }
    };
    fetchService();
    return () => { mounted = false; };
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
    setEditMode(false);
    setErrors({});
    setCurrentService({
      id: null,
      title: "",
      category: "",
      content: "",
      summary: "",
      imageUrl: "",
      slug: "",
      featured: false,
      status: "active",
      publishDate: new Date().toISOString().split("T")[0],
    });
  }, []);

  const handleShowModal = useCallback((serviceItem = null) => {
    if (serviceItem) {
      setCurrentService(serviceItem);
      setEditMode(true);
    } else {
      setEditMode(false);
    }
    setShowModal(true);
  }, []);

  const handleInputChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setCurrentService((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }, []);

  const handleEditorChange = useCallback((content) => {
    setCurrentService((prev) => ({ ...prev, content }));
    setErrors((prev) => ({ ...prev, content: '' }));
  }, []);

  const generateSlug = useCallback((title) => {
    const slug = title
      .toLowerCase()
      .replace(/[^\w\s]/gi, "")
      .replace(/\s+/g, "-");
    setCurrentService((prev) => ({ ...prev, slug }));
  }, []);

  const validateForm = useCallback(() => {
    const newErrors = {};
    if (!currentService.title) newErrors.title = "Tiêu đề là bắt buộc";
    if (!currentService.slug) newErrors.slug = "Slug là bắt buộc";
    if (!currentService.category) newErrors.category = "Vui lòng chọn danh mục";
    if (!currentService.content) newErrors.content = "Nội dung là bắt buộc";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [currentService]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setSubmitLoading(true);
    try {
      if (editMode) {
        await updateService(currentService);
        setService((prev) => prev.map((n) => (n.id === currentService.id ? currentService : n)));
        setToast({ show: true, message: "Cập nhật dịch vụ thành công!", type: "success" });
      } else {
        const newService = await createService(currentService);
        setService((prev) => [...prev, newService]);
        setToast({ show: true, message: "Thêm dịch vụ thành công!", type: "success" });
      }
      handleCloseModal();
      setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
    } catch (error) {
      setToast({ show: true, message: "Lỗi khi lưu dịch vụ!", type: "error" });
    } finally {
      setSubmitLoading(false);
    }
  }, [editMode, currentService, validateForm, handleCloseModal]);

  const handleDeleteService = useCallback(async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa dịch vụ này?")) {
      try {
        await deleteService(id);
        setService((prev) => prev.filter((n) => n.id !== id));
        setToast({ show: true, message: "Xóa dịch vụ thành công!", type: "success" });
        setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
      } catch (error) {
        setToast({ show: true, message: "Lỗi khi xóa dịch vụ!", type: "error" });
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

  const getFilteredAndSortedService = useCallback(() => {
    let filteredService = [...service];
    if (filters.search) {
      filteredService = filteredService.filter((n) =>
        n.title.toLowerCase().includes(filters.search.toLowerCase())
      );
    }
    if (filters.category) {
      filteredService = filteredService.filter((n) => n.category === filters.category);
    }
    if (filters.status) {
      filteredService = filteredService.filter((n) => n.status === filters.status);
    }
    filteredService.sort((a, b) => {
      const key = sortConfig.key;
      const direction = sortConfig.direction === "asc" ? 1 : -1;
      if (key === "title" || key === "category" || key === "status") {
        return a[key].localeCompare(b[key]) * direction;
      } else if (key === "featured") {
        return ((a[key] ? 1 : 0) - (b[key] ? 1 : 0)) * direction;
      } else if (key === "publishDate") {
        return (new Date(a[key]) - new Date(b[key])) * direction;
      }
      return (a[key] - b[key]) * direction;
    });
    return filteredService;
  }, [service, filters, sortConfig]);

  const filteredService = useMemo(() => getFilteredAndSortedService(), [getFilteredAndSortedService]);
  const totalPages = Math.ceil(filteredService.length / itemsPerPage);
  const paginatedService = useMemo(() => filteredService.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage), [filteredService, currentPage, itemsPerPage]);

  const handlePageChange = useCallback((page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  }, [totalPages]);

  // Columns config for DataTable
  const columns = useMemo(() => [
    { key: "id", title: "ID", sortable: true },
    { key: "title", title: "Tiêu đề", sortable: true },
    { key: "category", title: "Danh mục", sortable: true },
    { key: "slug", title: "Slug", sortable: true },
    { key: "status", title: "Trạng thái", sortable: true, render: (val) => <span className={`badge badge-${val === "active" ? "success" : "danger"}`}>{val === "active" ? "Hiển thị" : "Ẩn"}</span> },
    { key: "featured", title: "Nổi bật", sortable: true, render: (val) => <span className={`badge badge-${val ? "primary" : "secondary"}`}>{val ? "Có" : "Không"}</span> },
    { key: "publishDate", title: "Ngày đăng", sortable: true },
  ], []);

  // Fields config for FormModal
  const fields = useMemo(() => [
    { name: "title", label: "Tiêu đề", type: "text", required: true, onBlur: () => generateSlug(currentService.title) },
    { name: "slug", label: "Slug", type: "text", required: true },
    { name: "summary", label: "Tóm tắt", type: "textarea" },
    { name: "content", label: "Nội dung", type: "custom", required: true, render: () => (
      <Editor
        apiKey="1odjd377mh1anpljwb097v4n58bfglpgmj7hggmqzbe173fz"
        value={currentService.content}
        init={{
          height: 300,
          menubar: true,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview', 'anchor',
            'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'help', 'wordcount'
          ],
          toolbar:
            'undo redo | formatselect | bold italic backcolor | \n        alignleft aligncenter alignright alignjustify | \n        bullist numlist outdent indent | removeformat | help | image media table code',
          language: 'vi',
          image_title: true,
          automatic_uploads: true,
          file_picker_types: 'image',
        }}
        onEditorChange={handleEditorChange}
      />
    ) },
    { name: "imageUrl", label: "Hình ảnh URL", type: "text" },
    { name: "publishDate", label: "Ngày đăng", type: "date" },
    { name: "status", label: "Trạng thái", type: "select", options: [
      { value: "active", label: "Hiển thị" },
      { value: "inactive", label: "Ẩn" },
    ] },
    { name: "featured", label: "Tin tức nổi bật", type: "checkbox" },
  ], [currentService.content, handleEditorChange, currentService.title, generateSlug]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="admin-service-list">
      <ToastMessage
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ show: false, message: "", type: "" })}
      />
      <div className="card">
        <div className="card-header">
          <h3>Quản lý dịch vụ</h3>
          <button className="btn btn-primary" onClick={() => handleShowModal()}>
            Thêm dịch vụ mới
          </button>
        </div>
        <div className="card-body">
          <div className="filter-group">
            <input
              type="text"
              className="form-control"
              placeholder="Tìm kiếm tiêu đề..."
              name="search"
              value={filters.search}
              onChange={handleFilterChange}
            />
            <select
              className="form-control"
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
            >
              <option value="">Tất cả trạng thái</option>
              <option value="active">Hiển thị</option>
              <option value="inactive">Ẩn</option>
            </select>
          </div>
          <DataTable
            columns={columns}
            data={paginatedService}
            onEdit={handleShowModal}
            onDelete={handleDeleteService}
            onSort={handleSort}
            sortConfig={sortConfig}
            loading={isLoading}
            emptyText="Không có dịch vụ nào phù hợp"
          />
          <div className="pagination-container">
            <div className="pagination-info">
              Hiển thị {paginatedService.length} / {filteredService.length} dịch vụ
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
        </div>
      </div>
      <FormModal
        isOpen={showModal}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        fields={fields}
        values={currentService}
        errors={errors}
        onChange={handleInputChange}
        loading={submitLoading}
        title={editMode ? "Chỉnh sửa dịch vụ" : "Thêm dịch vụ mới"}
        submitText={editMode ? "Cập nhật" : "Thêm mới"}
        cancelText="Hủy"
      />
    </div>
  );
};

export default AdminServiceList;
