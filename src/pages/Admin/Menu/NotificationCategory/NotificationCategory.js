import React, { useState, useEffect } from "react";
import "./NotificationCategory.css";
import {
  getNotificationCategories,
  createNotificationCategory,
  updateNotificationCategory,
  deleteNotificationCategory,
  updateNotificationCategoryStatus,
} from "../../../../api";

const NotificationCategory = () => {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentCategory, setCurrentCategory] = useState({
    id: null,
    name: "",
    description: "",
    status: "1",
  });
  const [errors, setErrors] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState({ key: "id", direction: "asc" });
  const [searchFilter, setSearchFilter] = useState("");
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const items = await getNotificationCategories();
      setCategories(items);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setToast({ show: true, message: "Lỗi khi tải danh mục!", type: "error" });
    }
  };

  const handleToggleStatus = async (category) => {
    if (
      window.confirm(
        "Bạn có chắc chắn muốn đổi trạng thái danh mục: " + category.name
      )
    ) {
      const newStatus = Number(category.status) === 1 ? 0 : 1;
      try {
        await updateNotificationCategoryStatus({
          id: category.id,
          status: newStatus,
        });
        setCategories((prev) =>
          prev.map((c) =>
            c.id === category.id ? { ...c, status: newStatus } : c
          )
        );
        setToast({
          show: true,
          message: `Cập nhật trạng thái thành công!`,
          type: "success",
        });
        setTimeout(
          () => setToast({ show: false, message: "", type: "" }),
          3000
        );
      } catch (error) {
        console.error("Error updating status:", error);
        setToast({
          show: true,
          message: "Lỗi khi cập nhật trạng thái!",
          type: "error",
        });
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditMode(false);
    setErrors({});
    setCurrentCategory({ id: null, name: "", description: "", status: "1" });
  };

  const handleShowModal = (category = null) => {
    if (category) {
      setCurrentCategory(category);
      setEditMode(true);
    } else {
      setCurrentCategory({ id: null, name: "", description: "", status: "1" });
      setEditMode(false);
    }
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentCategory({ ...currentCategory, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!currentCategory.name || currentCategory.name.trim() === "") {
      newErrors.name = "Tên danh mục là bắt buộc";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (editMode) {
        await updateNotificationCategory(currentCategory);
        setCategories(
          categories.map((c) =>
            c.id === currentCategory.id ? currentCategory : c
          )
        );
        setToast({
          show: true,
          message: "Cập nhật danh mục thành công!",
          type: "success",
        });
      } else {
        const newCategory = await createNotificationCategory(currentCategory);
        setCategories([...categories, newCategory]);
        setToast({
          show: true,
          message: "Thêm danh mục thành công!",
          type: "success",
        });
      }
      handleCloseModal();
      setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
    } catch (error) {
      console.error("Error saving category:", error);
      const errorMessage =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : "Lỗi khi lưu danh mục!";
      setToast({ show: true, message: errorMessage, type: "error" });
    }
  };

  const handleDeleteCategory = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa danh mục này?")) {
      try {
        await deleteNotificationCategory(id);
        setCategories(categories.filter((c) => c.id !== id));
        setToast({
          show: true,
          message: "Xóa danh mục thành công!",
          type: "success",
        });
        setTimeout(
          () => setToast({ show: false, message: "", type: "" }),
          3000
        );
      } catch (error) {
        console.error("Error deleting category:", error);
        const errorMessage =
          error.response && error.response.data && error.response.data.message
            ? error.response.data.message
            : "Lỗi khi xóa danh mục!";
        setToast({
          show: true,
          message: errorMessage,
          type: "error",
        });
      }
    }
  };

  const getFilteredAndSortedCategories = () => {
    let filteredCategories = [...categories];

    if (searchFilter) {
      filteredCategories = filteredCategories.filter(
        (c) =>
          c.name && c.name.toLowerCase().includes(searchFilter.toLowerCase())
      );
    }

    filteredCategories.sort((a, b) => {
      const key = sortConfig.key;
      const direction = sortConfig.direction === "asc" ? 1 : -1;

      const valA = a[key];
      const valB = b[key];

      if (valA === null || valA === undefined) return 1 * direction;
      if (valB === null || valB === undefined) return -1 * direction;

      if (key === "name" || key === "description") {
        return String(valA).localeCompare(String(valB)) * direction;
      }
      return (Number(valA) - Number(valB)) * direction;
    });

    return filteredCategories;
  };

  const filteredCategories = getFilteredAndSortedCategories();
  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
  const paginatedCategories = filteredCategories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if ((page >= 1 && page <= totalPages) || (totalPages === 0 && page === 1)) {
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

  const handleSearchChange = (e) => {
    setSearchFilter(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="product-category">
      {toast.show && (
        <div className={`toast toast-${toast.type}`}>
          <span>{toast.message}</span>
          <button
            className="toast-close-btn"
            onClick={() => setToast({ show: false, message: "", type: "" })}
          >
            ×
          </button>
        </div>
      )}

      <div className="card">
        <div className="card-header">
          <h3>Quản lý danh mục thông báo</h3>
          <button className="btn btn-primary" onClick={() => handleShowModal()}>
            Thêm danh mục mới
          </button>
        </div>
        <div className="card-body">
          <div className="filter-group">
            <input
              type="text"
              className="form-control"
              placeholder="Tìm kiếm danh mục..."
              value={searchFilter}
              onChange={handleSearchChange}
            />
          </div>

          <div className="table-container">
            <table className="category-table">
              <thead>
                <tr>
                  <th onClick={() => handleSort("id")} className="sortable">
                    ID{" "}
                    {sortConfig.key === "id" &&
                      (sortConfig.direction === "asc" ? "↑" : "↓")}
                  </th>
                  <th onClick={() => handleSort("name")} className="sortable">
                    Tên danh mục thông báo{" "}
                    {sortConfig.key === "name" &&
                      (sortConfig.direction === "asc" ? "↑" : "↓")}
                  </th>
                  <th
                    onClick={() => handleSort("description")}
                    className="sortable"
                  >
                    Mô tả
                    {sortConfig.key === "description" &&
                      (sortConfig.direction === "asc" ? "↑" : "↓")}
                  </th>
                  <th onClick={() => handleSort("status")} className="sortable">
                    Trạng thái
                    {sortConfig.key === "status" &&
                      (sortConfig.direction === "asc" ? "↑" : "↓")}
                  </th>
                  <th>Đổi trạng thái</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {paginatedCategories.length > 0 ? (
                  paginatedCategories.map((category) => (
                    <tr key={category.id}>
                      <td>{category.id}</td>
                      <td>{category.name}</td>
                      <td>{category.description}</td>
                      <td>
                        {category.status === 1
                          ? "Hoạt động"
                          : "Ngừng hoạt động"}
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button
                            className="btn btn-toggle-status"
                            onClick={() => handleToggleStatus(category)}
                          >
                            {category.status === 1 ? "Tạm dừng" : "Kích hoạt"}
                          </button>
                        </div>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button
                            className="btn btn-edit"
                            onClick={() => handleShowModal(category)}
                          >
                            Sửa
                          </button>
                          <button
                            className="btn btn-delete"
                            onClick={() => handleDeleteCategory(category.id)}
                          >
                            Xóa
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="no-data">
                      Không có danh mục nào phù hợp
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {totalPages > 0 && (
            <div className="pagination-container">
              <div className="pagination-info">
                Hiển thị {paginatedCategories.length} trên tổng số{" "}
                {filteredCategories.length} danh mục
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
                    currentPage === totalPages || totalPages === 0
                      ? "disabled"
                      : ""
                  }`}
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages || totalPages === 0}
                >
                  Sau
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="modal show">
          <div className="modal-overlay" onClick={handleCloseModal}></div>
          <div className="modal-content">
            <div className="modal-header">
              <h5>{editMode ? "Chỉnh sửa danh mục" : "Thêm danh mục mới"}</h5>
              <button className="modal-close" onClick={handleCloseModal}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="categoryName">Tên danh mục</label>
                  <input
                    type="text"
                    id="categoryName"
                    className={`form-control ${errors.name ? "error" : ""}`}
                    name="name"
                    value={currentCategory.name}
                    onChange={handleInputChange}
                  />
                  {errors.name && (
                    <span className="error-text">{errors.name}</span>
                  )}
                </div>
                <div className="form-group">
                  <label>Mô tả</label>
                  <textarea
                    name="description"
                    value={currentCategory.description}
                    onChange={handleInputChange}
                    className="form-control"
                  />
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
      )}
    </div>
  );
};

export default NotificationCategory;
