import React, { useState, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "./AdminServiceList.css";

const AdminServiceList = () => {
  const [service, setService] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
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
    fetchService();
    fetchCategories();
  }, []);

  const fetchService = async () => {
    try {
      setService([
        ...Array(15)
          .keys()
          .map((i) => ({
            id: i + 1,
            title: `Tin tức thứ ${i + 1}`,
            category: ["Công ty", "Sự kiện", "Công nghệ", "Thị trường"][
              Math.floor(Math.random() * 4)
            ],
            slug: `tin-tuc-${i + 1}`,
            content: `<p>Nội dung dịch vụ ${i + 1}</p>`,
            summary: `Tóm tắt dịch vụ ${i + 1}`,
            status: Math.random() > 0.3 ? "active" : "inactive",
            featured: Math.random() > 0.7,
            publishDate: `2025-04-${String(i + 1).padStart(2, "0")}`,
          })),
      ]);
    } catch (error) {
      console.error("Error fetching service:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      setCategories([
        { id: 1, name: "Công ty" },
        { id: 2, name: "Sự kiện" },
        { id: 3, name: "Công nghệ" },
        { id: 4, name: "Thị trường" },
      ]);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleCloseModal = () => {
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
  };

  const handleShowModal = (serviceItem = null) => {
    if (serviceItem) {
      setCurrentService(serviceItem);
      setEditMode(true);
    } else {
      setEditMode(false);
    }
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCurrentService({
      ...currentService,
      [name]: type === "checkbox" ? checked : value,
    });
    setErrors({ ...errors, [name]: "" });
  };

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setCurrentService({ ...currentService, content: data });
    setErrors({ ...errors, content: "" });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!currentService.title) newErrors.title = "Tiêu đề là bắt buộc";
    if (!currentService.slug) newErrors.slug = "Slug là bắt buộc";
    if (!currentService.category) newErrors.category = "Vui lòng chọn danh mục";
    if (!currentService.content) newErrors.content = "Nội dung là bắt buộc";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      if (editMode) {
        setService(
          service.map((n) => (n.id === currentService.id ? currentService : n))
        );
        setToast({
          show: true,
          message: "Cập nhật dịch vụ thành công!",
          type: "success",
        });
      } else {
        const newService = {
          ...currentService,
          id: Math.max(...service.map((n) => n.id), 0) + 1,
        };
        setService([...service, newService]);
        setToast({
          show: true,
          message: "Thêm dịch vụ thành công!",
          type: "success",
        });
      }
      handleCloseModal();
      setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
    } catch (error) {
      console.error("Error saving service:", error);
      setToast({ show: true, message: "Lỗi khi lưu dịch vụ!", type: "error" });
    }
  };

  const handleDeleteService = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa dịch vụ này?")) {
      try {
        setService(service.filter((n) => n.id !== id));
        setToast({
          show: true,
          message: "Xóa dịch vụ thành công!",
          type: "success",
        });
        setTimeout(
          () => setToast({ show: false, message: "", type: "" }),
          3000
        );
      } catch (error) {
        console.error("Error deleting service:", error);
        setToast({
          show: true,
          message: "Lỗi khi xóa dịch vụ!",
          type: "error",
        });
      }
    }
  };

  const generateSlug = (title) => {
    const slug = title
      .toLowerCase()
      .replace(/[^\w\s]/gi, "")
      .replace(/\s+/g, "-");
    setCurrentService({ ...currentService, slug });
  };

  const getFilteredAndSortedService = () => {
    let filteredService = [...service];

    if (filters.search) {
      filteredService = filteredService.filter((n) =>
        n.title.toLowerCase().includes(filters.search.toLowerCase())
      );
    }
    if (filters.category) {
      filteredService = filteredService.filter(
        (n) => n.category === filters.category
      );
    }
    if (filters.status) {
      filteredService = filteredService.filter(
        (n) => n.status === filters.status
      );
    }

    filteredService.sort((a, b) => {
      const key = sortConfig.key;
      const direction = sortConfig.direction === "asc" ? 1 : -1;
      if (key === "title" || key === "category" || key === "status") {
        return a[key].localeCompare(b[key]) * direction;
      } else if (key === "featured") {
        return (a[key] ? 1 : 0) - (b[key] ? 1 : 0) * direction;
      } else if (key === "publishDate") {
        return (new Date(a[key]) - new Date(b[key])) * direction;
      }
      return (a[key] - b[key]) * direction;
    });

    return filteredService;
  };

  const filteredService = getFilteredAndSortedService();
  const totalPages = Math.ceil(filteredService.length / itemsPerPage);
  const paginatedService = filteredService.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction:
        sortConfig.key === key && sortConfig.direction === "asc"
          ? "desc"
          : "asc",
    });
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
    setCurrentPage(1);
  };

  return (
    <div className="admin-service-list">
      {toast.show && (
        <div className={`toast toast-${toast.type}`}>
          <span>{toast.message}</span>
          <button
            onClick={() => setToast({ show: false, message: "", type: "" })}
          >
            ✕
          </button>
        </div>
      )}

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
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
            >
              <option value="">Tất cả danh mục</option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
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

          <div className="table-container">
            <table className="service-table">
              <thead>
                <tr>
                  <th onClick={() => handleSort("id")} className="sortable">
                    ID{" "}
                    {sortConfig.key === "id" &&
                      (sortConfig.direction === "asc" ? "↑" : "↓")}
                  </th>
                  <th onClick={() => handleSort("title")} className="sortable">
                    Tiêu đề{" "}
                    {sortConfig.key === "title" &&
                      (sortConfig.direction === "asc" ? "↑" : "↓")}
                  </th>
                  <th
                    onClick={() => handleSort("category")}
                    className="sortable"
                  >
                    Danh mục{" "}
                    {sortConfig.key === "category" &&
                      (sortConfig.direction === "asc" ? "↑" : "↓")}
                  </th>
                  <th onClick={() => handleSort("slug")} className="sortable">
                    Slug{" "}
                    {sortConfig.key === "slug" &&
                      (sortConfig.direction === "asc" ? "↑" : "↓")}
                  </th>
                  <th onClick={() => handleSort("status")} className="sortable">
                    Trạng thái{" "}
                    {sortConfig.key === "status" &&
                      (sortConfig.direction === "asc" ? "↑" : "↓")}
                  </th>
                  <th
                    onClick={() => handleSort("featured")}
                    className="sortable"
                  >
                    Nổi bật{" "}
                    {sortConfig.key === "featured" &&
                      (sortConfig.direction === "asc" ? "↑" : "↓")}
                  </th>
                  <th
                    onClick={() => handleSort("publishDate")}
                    className="sortable"
                  >
                    Ngày đăng{" "}
                    {sortConfig.key === "publishDate" &&
                      (sortConfig.direction === "asc" ? "↑" : "↓")}
                  </th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {paginatedService.map((serviceItem) => (
                  <tr key={serviceItem.id}>
                    <td>{serviceItem.id}</td>
                    <td>{serviceItem.title}</td>
                    <td>{serviceItem.category}</td>
                    <td>{serviceItem.slug}</td>
                    <td>
                      <span
                        className={`badge badge-${
                          serviceItem.status === "active" ? "success" : "danger"
                        }`}
                      >
                        {serviceItem.status === "active" ? "Hiển thị" : "Ẩn"}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`badge badge-${
                          serviceItem.featured ? "primary" : "secondary"
                        }`}
                      >
                        {serviceItem.featured ? "Có" : "Không"}
                      </span>
                    </td>
                    <td>{serviceItem.publishDate}</td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="btn btn-edit"
                          onClick={() => handleShowModal(serviceItem)}
                        >
                          Sửa
                        </button>
                        <button
                          className="btn btn-delete"
                          onClick={() => handleDeleteService(serviceItem.id)}
                        >
                          Xóa
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {paginatedService.length === 0 && (
                  <tr>
                    <td colSpan="8" className="no-data">
                      Không có dịch vụ nào phù hợp
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="pagination-container">
            <div className="pagination-info">
              Hiển thị {paginatedService.length} / {filteredService.length} tin
              tức
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
                  className={`page-btn ${
                    currentPage === page + 1 ? "active" : ""
                  }`}
                  onClick={() => handlePageChange(page + 1)}
                >
                  {page + 1}
                </button>
              ))}
              <button
                className={`page-btn ${
                  currentPage === totalPages ? "disabled" : ""
                }`}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Sau
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={`modal ${showModal ? "show" : ""}`}>
        <div className="modal-overlay" onClick={handleCloseModal}></div>
        <div className="modal-content">
          <div className="modal-header">
            <h5>{editMode ? "Chỉnh sửa dịch vụ" : "Thêm dịch vụ mới"}</h5>
            <button className="modal-close" onClick={handleCloseModal}>
              ✕
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-group">
                  <label>Tiêu đề</label>
                  <input
                    type="text"
                    className={`form-control ${errors.title ? "error" : ""}`}
                    name="title"
                    value={currentService.title}
                    onChange={handleInputChange}
                    onBlur={() => generateSlug(currentService.title)}
                    required
                  />
                  {errors.title && (
                    <span className="error-text">{errors.title}</span>
                  )}
                </div>
                <div className="form-group">
                  <label>Slug</label>
                  <input
                    type="text"
                    className={`form-control ${errors.slug ? "error" : ""}`}
                    name="slug"
                    value={currentService.slug}
                    onChange={handleInputChange}
                    required
                  />
                  {errors.slug && (
                    <span className="error-text">{errors.slug}</span>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label>Danh mục</label>
                <select
                  className={`form-control ${errors.category ? "error" : ""}`}
                  name="category"
                  value={currentService.category}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Chọn danh mục</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <span className="error-text">{errors.category}</span>
                )}
              </div>

              <div className="form-group">
                <label>Tóm tắt</label>
                <textarea
                  className="form-control"
                  rows={2}
                  name="summary"
                  value={currentService.summary}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Nội dung</label>
                <CKEditor
                  editor={ClassicEditor}
                  data={currentService.content}
                  onChange={handleEditorChange}
                  config={{
                    toolbar: [
                      "heading",
                      "|",
                      "bold",
                      "italic",
                      "link",
                      "bulletedList",
                      "numberedList",
                      "|",
                      "outdent",
                      "indent",
                      "|",
                      "imageUpload",
                      "blockQuote",
                      "insertTable",
                      "mediaEmbed",
                      "undo",
                      "redo",
                    ],
                  }}
                />
                {errors.content && (
                  <span className="error-text">{errors.content}</span>
                )}
              </div>

              <div className="form-group">
                <label>Hình ảnh URL</label>
                <input
                  type="text"
                  className="form-control"
                  name="imageUrl"
                  value={currentService.imageUrl}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label>Ngày đăng</label>
                  <input
                    type="date"
                    className="form-control"
                    name="publishDate"
                    value={currentService.publishDate}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Trạng thái</label>
                  <select
                    className="form-control"
                    name="status"
                    value={currentService.status}
                    onChange={handleInputChange}
                  >
                    <option value="active">Hiển thị</option>
                    <option value="inactive">Ẩn</option>
                  </select>
                </div>
                <div className="form-group form-checkbox">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="featured"
                      checked={currentService.featured}
                      onChange={handleInputChange}
                    />
                    Tin tức nổi bật
                  </label>
                </div>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCloseModal}
                >
                  Hủy
                </button>
                <button type="submit" className="btn btn-primary">
                  {editMode ? "Cập nhật" : "Thêm mới"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminServiceList;
