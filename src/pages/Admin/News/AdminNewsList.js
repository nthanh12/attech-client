import React, { useState, useEffect } from "react";
import { Editor } from '@tinymce/tinymce-react';
import "./AdminNewsList.css";
import { getNews, createNews, updateNewsStatus, getNewsCategories, uploadImage } from "../../../api";
import axios from "axios";

const AdminNewsList = () => {
  const [news, setNews] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentNews, setCurrentNews] = useState({
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
    fetchNews();
    fetchCategories();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await getNews();
      if (Array.isArray(response)) {
        const mappedNews = response.map(item => ({
          id: item.id,
          title: item.title,
          slug: item.slug,
          summary: item.description,
          publishDate: item.timePosted.split('T')[0],
          status: item.status === 1 ? 'active' : 'inactive',
          category: item.postCategoryName,
          featured: false
        }));
        setNews(mappedNews);
      } else {
        console.error("Invalid response format:", response);
        setNews([]);
      }
    } catch (error) {
      console.error("Error fetching news:", error);
      setNews([]);
    }
  };

  const fetchCategories = async () => {
    try {
      const items = await getNewsCategories();
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
    setCurrentNews({
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

  const handleShowModal = (newsItem = null) => {
    if (newsItem) {
      setCurrentNews(newsItem);
      setEditMode(true);
    } else {
      setEditMode(false);
    }
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCurrentNews({
      ...currentNews,
      [name]: type === "checkbox" ? checked : value,
    });
    setErrors({ ...errors, [name]: "" });
  };

  const handleEditorChange = (content) => {
    setCurrentNews({ ...currentNews, content });
    setErrors({ ...errors, content: '' });
  };

  const uploadAdapter = (loader) => {
    return {
      upload: async () => {
        try {
          const file = await loader.file;
          const response = await uploadImage(file);
          return {
            default: response.location
          };
        } catch (error) {
          console.error('Upload failed:', error);
          throw error;
        }
      }
    };
  };

  const validateForm = () => {
    const newErrors = {};
    if (!currentNews.title) newErrors.title = "Tiêu đề là bắt buộc";
    if (!currentNews.category) newErrors.category = "Vui lòng chọn danh mục";
    if (!currentNews.content) newErrors.content = "Nội dung là bắt buộc";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      if (editMode) {
        setNews(news.map((n) => (n.id === currentNews.id ? currentNews : n)));
        setToast({
          show: true,
          message: "Cập nhật tin tức thành công!",
          type: "success",
        });
      } else {
        const newsData = {
          title: currentNews.title,
          description: currentNews.summary,
          content: currentNews.content,
          postCategoryId: categories.find(cat => cat.name === currentNews.category)?.id || 1,
          timePosted: new Date(currentNews.publishDate).toISOString()
        };

        const response = await createNews(newsData);
        if (response) {
          setToast({
            show: true,
            message: "Thêm tin tức thành công!",
            type: "success",
          });
          fetchNews(); // Refresh danh sách tin tức
        }
      }
      handleCloseModal();
      setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
    } catch (error) {
      console.error("Error saving news:", error);
      setToast({ show: true, message: "Lỗi khi lưu tin tức!", type: "error" });
    }
  };

  const handleDeleteNews = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa tin tức này?")) {
      try {
        setNews(news.filter((n) => n.id !== id));
        setToast({
          show: true,
          message: "Xóa tin tức thành công!",
          type: "success",
        });
        setTimeout(
          () => setToast({ show: false, message: "", type: "" }),
          3000
        );
      } catch (error) {
        console.error("Error deleting news:", error);
        setToast({
          show: true,
          message: "Lỗi khi xóa tin tức!",
          type: "error",
        });
      }
    }
  };

  const handleToggleStatus = async (newsItem) => {
    if (
      window.confirm(
        "Bạn có chắc chắn muốn đổi trạng thái tin tức: " + newsItem.title
      )
    ) {
      const newStatus = newsItem.status === 'active' ? 'inactive' : 'active';
      try {
        await updateNewsStatus({ 
          id: newsItem.id, 
          status: newStatus === 'active' ? 1 : 0 
        });
        setToast({
          show: true,
          message: "Cập nhật trạng thái thành công!",
          type: "success",
        });
        fetchNews(); // Refresh danh sách tin tức
        setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
      } catch (error) {
        console.error("Error updating news status:", error);
        setToast({
          show: true,
          message: "Lỗi khi cập nhật trạng thái!",
          type: "error",
        });
      }
    }
  };

  const getFilteredAndSortedNews = () => {
    let filteredNews = [...news];

    if (filters.search) {
      filteredNews = filteredNews.filter((n) =>
        n.title.toLowerCase().includes(filters.search.toLowerCase())
      );
    }
    if (filters.category) {
      filteredNews = filteredNews.filter(
        (n) => n.category === filters.category
      );
    }
    if (filters.status) {
      filteredNews = filteredNews.filter((n) => n.status === filters.status);
    }

    filteredNews.sort((a, b) => {
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

    return filteredNews;
  };

  const filteredNews = getFilteredAndSortedNews();
  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
  const paginatedNews = filteredNews.slice(
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

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const response = await uploadImage(file);
      if (response && response.location) {
        setCurrentNews({
          ...currentNews,
          imageUrl: response.location
        });
        setToast({
          show: true,
          message: "Upload hình ảnh thành công!",
          type: "success"
        });
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      setToast({
        show: true,
        message: "Lỗi khi upload hình ảnh!",
        type: "error"
      });
    }
  };

  return (
    <div className="admin-news-list">
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
          <h3>Quản lý tin tức</h3>
          <button className="btn btn-primary" onClick={() => handleShowModal()}>
            Thêm tin tức mới
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
            <table className="news-table">
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
                  <th onClick={() => handleSort("category")} className="sortable">
                    Danh mục{" "}
                    {sortConfig.key === "category" &&
                      (sortConfig.direction === "asc" ? "↑" : "↓")}
                  </th>
                  <th onClick={() => handleSort("publishDate")} className="sortable">
                    Ngày đăng{" "}
                    {sortConfig.key === "publishDate" &&
                      (sortConfig.direction === "asc" ? "↑" : "↓")}
                  </th>
                  <th onClick={() => handleSort("status")} className="sortable">
                    Trạng thái{" "}
                    {sortConfig.key === "status" &&
                      (sortConfig.direction === "asc" ? "↑" : "↓")}
                  </th>
                  <th>Đổi trạng thái</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {paginatedNews.map((newsItem) => (
                  <tr key={newsItem.id}>
                    <td>{newsItem.id}</td>
                    <td>{newsItem.title}</td>
                    <td>{newsItem.category}</td>
                    <td>{newsItem.publishDate}</td>
                    <td>
                      <span
                        className={`badge badge-${
                          newsItem.status === "active" ? "success" : "danger"
                        }`}
                      >
                        {newsItem.status === "active" ? "Hiển thị" : "Ẩn"}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="btn btn-toggle-status"
                          onClick={() => handleToggleStatus(newsItem)}
                        >
                          {newsItem.status === "active" ? "Tạm dừng" : "Kích hoạt"}
                        </button>
                      </div>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="btn btn-edit"
                          onClick={() => handleShowModal(newsItem)}
                        >
                          Sửa
                        </button>
                        <button
                          className="btn btn-delete"
                          onClick={() => handleDeleteNews(newsItem.id)}
                        >
                          Xóa
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {paginatedNews.length === 0 && (
                  <tr>
                    <td colSpan="8" className="no-data">
                      Không có tin tức nào phù hợp
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="pagination-container">
            <div className="pagination-info">
              Hiển thị {paginatedNews.length} / {filteredNews.length} tin tức
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
            <h5>{editMode ? "Chỉnh sửa tin tức" : "Thêm tin tức mới"}</h5>
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
                    value={currentNews.title}
                    onChange={handleInputChange}
                    required
                  />
                  {errors.title && (
                    <span className="error-text">{errors.title}</span>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label>Danh mục</label>
                <select
                  className={`form-control ${errors.category ? "error" : ""}`}
                  name="category"
                  value={currentNews.category}
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
                  value={currentNews.summary}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Nội dung</label>
                <Editor
                  apiKey="1odjd377mh1anpljwb097v4n58bfglpgmj7hggmqzbe173fz"
                  value={currentNews.content}
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
                <label>Hình ảnh</label>
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                {currentNews.imageUrl && (
                  <div className="image-preview">
                    <img src={currentNews.imageUrl} alt="Preview" style={{ maxWidth: '200px', marginTop: '10px' }} />
                  </div>
                )}
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label>Ngày đăng</label>
                  <input
                    type="date"
                    className="form-control"
                    name="publishDate"
                    value={currentNews.publishDate}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Trạng thái</label>
                  <select
                    className="form-control"
                    name="status"
                    value={currentNews.status}
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
                      checked={currentNews.featured}
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

export default AdminNewsList;
