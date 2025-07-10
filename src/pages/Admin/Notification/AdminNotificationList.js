import React, { useState, useEffect } from "react";
import { Editor } from '@tinymce/tinymce-react';
import "./AdminNotificationList.css";

const AdminNotificationList = () => {
  const [notification, setNotification] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentNotification, setCurrentNotification] = useState({
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
    fetchNotification();
    fetchCategories();
  }, []);

  const fetchNotification = async () => {
    try {
      setNotification([
        ...Array(15)
          .keys()
          .map((i) => ({
            id: i + 1,
            title: `Tin tức thứ ${i + 1}`,
            category: ["Công ty", "Sự kiện", "Công nghệ", "Thị trường"][
              Math.floor(Math.random() * 4)
            ],
            slug: `tin-tuc-${i + 1}`,
            content: `<p>Nội dung thông báo ${i + 1}</p>`,
            summary: `Tóm tắt thông báo ${i + 1}`,
            status: Math.random() > 0.3 ? "active" : "inactive",
            featured: Math.random() > 0.7,
            publishDate: `2025-04-${String(i + 1).padStart(2, "0")}`,
          })),
      ]);
    } catch (error) {
      console.error("Error fetching notification:", error);
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
    setCurrentNotification({
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

  const handleShowModal = (notificationItem = null) => {
    if (notificationItem) {
      setCurrentNotification(notificationItem);
      setEditMode(true);
    } else {
      setEditMode(false);
    }
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCurrentNotification({
      ...currentNotification,
      [name]: type === "checkbox" ? checked : value,
    });
    setErrors({ ...errors, [name]: "" });
  };

  const handleEditorChange = (content) => {
    setCurrentNotification({ ...currentNotification, content });
    setErrors({ ...errors, content: '' });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!currentNotification.title) newErrors.title = "Tiêu đề là bắt buộc";
    if (!currentNotification.slug) newErrors.slug = "Slug là bắt buộc";
    if (!currentNotification.category)
      newErrors.category = "Vui lòng chọn danh mục";
    if (!currentNotification.content)
      newErrors.content = "Nội dung là bắt buộc";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      if (editMode) {
        setNotification(
          notification.map((n) =>
            n.id === currentNotification.id ? currentNotification : n
          )
        );
        setToast({
          show: true,
          message: "Cập nhật thông báo thành công!",
          type: "success",
        });
      } else {
        const newNotification = {
          ...currentNotification,
          id: Math.max(...notification.map((n) => n.id), 0) + 1,
        };
        setNotification([...notification, newNotification]);
        setToast({
          show: true,
          message: "Thêm thông báo thành công!",
          type: "success",
        });
      }
      handleCloseModal();
      setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
    } catch (error) {
      console.error("Error saving notification:", error);
      setToast({
        show: true,
        message: "Lỗi khi lưu thông báo!",
        type: "error",
      });
    }
  };

  const handleDeleteNotification = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa thông báo này?")) {
      try {
        setNotification(notification.filter((n) => n.id !== id));
        setToast({
          show: true,
          message: "Xóa thông báo thành công!",
          type: "success",
        });
        setTimeout(
          () => setToast({ show: false, message: "", type: "" }),
          3000
        );
      } catch (error) {
        console.error("Error deleting notification:", error);
        setToast({
          show: true,
          message: "Lỗi khi xóa thông báo!",
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
    setCurrentNotification({ ...currentNotification, slug });
  };

  const getFilteredAndSortedNotification = () => {
    let filteredNotification = [...notification];

    if (filters.search) {
      filteredNotification = filteredNotification.filter((n) =>
        n.title.toLowerCase().includes(filters.search.toLowerCase())
      );
    }
    if (filters.category) {
      filteredNotification = filteredNotification.filter(
        (n) => n.category === filters.category
      );
    }
    if (filters.status) {
      filteredNotification = filteredNotification.filter(
        (n) => n.status === filters.status
      );
    }

    filteredNotification.sort((a, b) => {
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

    return filteredNotification;
  };

  const filteredNotification = getFilteredAndSortedNotification();
  const totalPages = Math.ceil(filteredNotification.length / itemsPerPage);
  const paginatedNotification = filteredNotification.slice(
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
    <div className="admin-notification-list">
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
          <h3>Quản lý thông báo</h3>
          <button className="btn btn-primary" onClick={() => handleShowModal()}>
            Thêm thông báo mới
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
            <table className="notification-table">
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
                {paginatedNotification.map((notificationItem) => (
                  <tr key={notificationItem.id}>
                    <td>{notificationItem.id}</td>
                    <td>{notificationItem.title}</td>
                    <td>{notificationItem.category}</td>
                    <td>{notificationItem.slug}</td>
                    <td>
                      <span
                        className={`badge badge-${
                          notificationItem.status === "active"
                            ? "success"
                            : "danger"
                        }`}
                      >
                        {notificationItem.status === "active"
                          ? "Hiển thị"
                          : "Ẩn"}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`badge badge-${
                          notificationItem.featured ? "primary" : "secondary"
                        }`}
                      >
                        {notificationItem.featured ? "Có" : "Không"}
                      </span>
                    </td>
                    <td>{notificationItem.publishDate}</td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="btn btn-edit"
                          onClick={() => handleShowModal(notificationItem)}
                        >
                          Sửa
                        </button>
                        <button
                          className="btn btn-delete"
                          onClick={() =>
                            handleDeleteNotification(notificationItem.id)
                          }
                        >
                          Xóa
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {paginatedNotification.length === 0 && (
                  <tr>
                    <td colSpan="8" className="no-data">
                      Không có thông báo nào phù hợp
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="pagination-container">
            <div className="pagination-info">
              Hiển thị {paginatedNotification.length} /{" "}
              {filteredNotification.length} thông báo
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
            <h5>{editMode ? "Chỉnh sửa thông báo" : "Thêm thông báo mới"}</h5>
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
                    value={currentNotification.title}
                    onChange={handleInputChange}
                    onBlur={() => generateSlug(currentNotification.title)}
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
                    value={currentNotification.slug}
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
                  value={currentNotification.category}
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
                  value={currentNotification.summary}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Nội dung</label>
                <Editor
                  apiKey="1odjd377mh1anpljwb097v4n58bfglpgmj7hggmqzbe173fz"
                  value={currentNotification.content}
                  init={{
                    height: 300,
                    menubar: true,
                    plugins: [
                      'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview', 'anchor',
                      'searchreplace', 'visualblocks', 'code', 'fullscreen',
                      'insertdatetime', 'media', 'table', 'help', 'wordcount'
                    ],
                    toolbar:
                      'undo redo | formatselect | bold italic backcolor | \\n        alignleft aligncenter alignright alignjustify | \\n        bullist numlist outdent indent | removeformat | help | image media table code',
                    language: 'vi',
                    image_title: true,
                    automatic_uploads: true,
                    file_picker_types: 'image',
                  }}
                  onEditorChange={handleEditorChange}
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
                  value={currentNotification.imageUrl}
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
                    value={currentNotification.publishDate}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Trạng thái</label>
                  <select
                    className="form-control"
                    name="status"
                    value={currentNotification.status}
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
                      checked={currentNotification.featured}
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

export default AdminNotificationList;
