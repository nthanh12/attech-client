import React, { useState, useEffect, useMemo } from "react";
import { Editor } from '@tinymce/tinymce-react';
import "./AdminProductList.css";
import {
  getProducts,
  getProductCategories,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../../api";

const AdminProductList = () => {
  const [product, setProduct] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({
    id: null,
    name: "",
    category: "",
    content: "",
    summary: "",
    imageUrl: "",
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
    fetchProduct();
    fetchCategories();
  }, []);

  const fetchProduct = async () => {
    setIsLoading(true);
    try {
      const items = await getProducts();
      setProduct(items);
    } catch (error) {
      console.error("Error fetching product:", error);
      setToast({ show: true, message: "Lỗi khi tải sản phẩm!", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const items = await getProductCategories();
      setCategories(items);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setToast({ show: true, message: "Lỗi khi tải danh mục!", type: "error" });
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditMode(false);
    setErrors({});
    setCurrentProduct({
      id: null,
      name: "",
      category: "",
      content: "",
      summary: "",
      imageUrl: "",
      featured: false,
      status: "active",
      publishDate: new Date().toISOString().split("T")[0],
    });
  };

  const handleShowModal = (productItem = null) => {
    if (productItem) {
      setCurrentProduct(productItem);
      setEditMode(true);
    } else {
      setEditMode(false);
    }
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCurrentProduct({
      ...currentProduct,
      [name]: type === "checkbox" ? checked : value,
    });
    setErrors({ ...errors, [name]: "" });
  };

  const handleEditorChange = (content) => {
    setCurrentProduct({ ...currentProduct, content });
    setErrors({ ...errors, content: '' });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!currentProduct.name) newErrors.name = "Tên sản phẩm là bắt buộc";
    if (!currentProduct.category) newErrors.category = "Vui lòng chọn danh mục";
    if (!currentProduct.content) newErrors.content = "Nội dung là bắt buộc";
    if (currentProduct.imageUrl && !isValidUrl(currentProduct.imageUrl)) {
      newErrors.imageUrl = "URL hình ảnh không hợp lệ";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      if (editMode) {
        await updateProduct(currentProduct.id, currentProduct);
        setProduct(
          product.map((n) => (n.id === currentProduct.id ? currentProduct : n))
        );
        setToast({
          show: true,
          message: "Cập nhật sản phẩm thành công!",
          type: "success",
        });
      } else {
        const newProduct = await createProduct(currentProduct);
        setProduct([...product, newProduct]);
        setToast({
          show: true,
          message: "Thêm sản phẩm thành công!",
          type: "success",
        });
      }
      handleCloseModal();
      setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
    } catch (error) {
      console.error("Error saving product:", error);
      setToast({ show: true, message: "Lỗi khi lưu sản phẩm!", type: "error" });
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      try {
        await deleteProduct(id);
        setProduct(product.filter((n) => n.id !== id));
        setToast({
          show: true,
          message: "Xóa sản phẩm thành công!",
          type: "success",
        });
        setTimeout(
          () => setToast({ show: false, message: "", type: "" }),
          3000
        );
      } catch (error) {
        console.error("Error deleting product:", error);
        setToast({
          show: true,
          message: "Lỗi khi xóa sản phẩm!",
          type: "error",
        });
      }
    }
  };

  const getFilteredAndSortedProduct = () => {
    let filteredProduct = [...product];

    if (filters.search) {
      filteredProduct = filteredProduct.filter((n) =>
        n.name.toLowerCase().includes(filters.search.toLowerCase())
      );
    }
    if (filters.category) {
      filteredProduct = filteredProduct.filter(
        (n) => n.category === filters.category
      );
    }
    if (filters.status) {
      filteredProduct = filteredProduct.filter(
        (n) => n.status === filters.status
      );
    }

    filteredProduct.sort((a, b) => {
      const key = sortConfig.key;
      const direction = sortConfig.direction === "asc" ? 1 : -1;
      if (key === "name" || key === "category" || key === "status") {
        return a[key].localeCompare(b[key]) * direction;
      } else if (key === "featured") {
        return (a[key] ? 1 : 0) - (b[key] ? 1 : 0) * direction;
      } else if (key === "publishDate") {
        return (new Date(a[key]) - new Date(b[key])) * direction;
      }
      return (a[key] - b[key]) * direction;
    });

    return filteredProduct;
  };

  const filteredProduct = useMemo(
    () => getFilteredAndSortedProduct(),
    [product, filters, sortConfig]
  );
  const totalPages = Math.ceil(filteredProduct.length / itemsPerPage);
  const paginatedProduct = filteredProduct.slice(
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
    <div className="admin-product-list">
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
          <h3>Quản lý sản phẩm</h3>
          <button className="btn btn-primary" onClick={() => handleShowModal()}>
            Thêm sản phẩm mới
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

          {isLoading ? (
            <div className="loading">Đang tải...</div>
          ) : (
            <div className="table-container">
              <table className="product-table">
                <thead>
                  <tr>
                    <th onClick={() => handleSort("id")} className="sortable">
                      ID{" "}
                      {sortConfig.key === "id" &&
                        (sortConfig.direction === "asc" ? "↑" : "↓")}
                    </th>
                    <th onClick={() => handleSort("name")} className="sortable">
                      Tên sản phẩm{" "}
                      {sortConfig.key === "name" &&
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
                    <th
                      onClick={() => handleSort("featured")}
                      className="sortable"
                    >
                      Nổi bật{" "}
                      {sortConfig.key === "featured" &&
                        (sortConfig.direction === "asc" ? "↑" : "↓")}
                    </th>
                    <th
                      onClick={() => handleSort("status")}
                      className="sortable"
                    >
                      Trạng thái{" "}
                      {sortConfig.key === "status" &&
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
                  {paginatedProduct.map((productItem) => (
                    <tr key={productItem.id}>
                      <td>{productItem.id}</td>
                      <td>{productItem.name}</td>
                      <td>{productItem.category}</td>
                      <td>
                        <span
                          className={`badge badge-${
                            productItem.featured ? "success" : "secondary"
                          }`}
                        >
                          {productItem.featured ? "Nổi bật" : "Bình thường"}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`badge badge-${
                            productItem.status === "active"
                              ? "success"
                              : "danger"
                          }`}
                        >
                          {productItem.status === "active" ? "Hiển thị" : "Ẩn"}
                        </span>
                      </td>
                      <td>{productItem.publishDate}</td>
                      <td>
                        <div className="action-buttons">
                          <button
                            className="btn btn-edit"
                            onClick={() => handleShowModal(productItem)}
                          >
                            Sửa
                          </button>
                          <button
                            className="btn btn-delete"
                            onClick={() => handleDeleteProduct(productItem.id)}
                          >
                            Xóa
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {paginatedProduct.length === 0 && (
                    <tr>
                      <td colSpan="7" className="no-data">
                        Không có sản phẩm nào phù hợp
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          <div className="pagination-container">
            <div className="pagination-info">
              Hiển thị {paginatedProduct.length} / {filteredProduct.length} sản
              phẩm
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
            <h5>{editMode ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}</h5>
            <button className="modal-close" onClick={handleCloseModal}>
              ✕
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-group">
                  <label>Tên sản phẩm</label>
                  <input
                    type="text"
                    className={`form-control ${errors.name ? "error" : ""}`}
                    name="name"
                    value={currentProduct.name}
                    onChange={handleInputChange}
                    required
                  />
                  {errors.name && (
                    <span className="error-text">{errors.name}</span>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label>Danh mục</label>
                <select
                  className={`form-control ${errors.category ? "error" : ""}`}
                  name="category"
                  value={currentProduct.category}
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
                <label>Nội dung</label>
                <Editor
                  apiKey="1odjd377mh1anpljwb097v4n58bfglpgmj7hggmqzbe173fz"
                  value={currentProduct.content}
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
                <label>Tóm tắt</label>
                <textarea
                  className="form-control"
                  rows={2}
                  name="summary"
                  value={currentProduct.summary}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Hình ảnh URL</label>
                <input
                  type="text"
                  className={`form-control ${errors.imageUrl ? "error" : ""}`}
                  name="imageUrl"
                  value={currentProduct.imageUrl}
                  onChange={handleInputChange}
                />
                {errors.imageUrl && (
                  <span className="error-text">{errors.imageUrl}</span>
                )}
              </div>

              <div className="form-group">
                <label>
                  <input
                    type="checkbox"
                    name="featured"
                    checked={currentProduct.featured}
                    onChange={handleInputChange}
                  />
                  Nổi bật
                </label>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label>Ngày đăng</label>
                  <input
                    type="date"
                    className="form-control"
                    name="publishDate"
                    value={currentProduct.publishDate}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Trạng thái</label>
                  <select
                    className="form-control"
                    name="status"
                    value={currentProduct.status}
                    onChange={handleInputChange}
                  >
                    <option value="active">Hiển thị</option>
                    <option value="inactive">Ẩn</option>
                  </select>
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

export default AdminProductList;
