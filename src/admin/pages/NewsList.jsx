import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Editor } from '@tinymce/tinymce-react';
import "./NewsList.css";
import { getNews, createNews, updateNews, deleteNews, getNewsCategories, uploadImage } from "../../api";
import DataTable from "../components/DataTable";
import FormModal from "../components/FormModal";
import ToastMessage from "../components/ToastMessage";
import LoadingSpinner from "../components/LoadingSpinner";

const NewsList = () => {
  const [news, setNews] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
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
    let mounted = true;
    const fetchNewsData = async () => {
      setIsLoading(true);
      try {
        const response = await getNews();
        if (Array.isArray(response)) {
          const mappedNews = response.map(item => ({
            id: item.id,
            title: item.title,
            slug: item.slug,
            summary: item.description,
            publishDate: item.timePosted ? item.timePosted.split('T')[0] : new Date().toISOString().split("T")[0],
            status: item.status === 1 ? 'active' : 'inactive',
            category: item.postCategoryName,
            featured: item.featured || false,
            content: item.content || "",
            imageUrl: item.imageUrl || ""
          }));
          if (mounted) setNews(mappedNews);
        } else {
          if (mounted) setNews([]);
        }
      } catch (error) {
        if (mounted) setNews([]);
      } finally {
        if (mounted) setIsLoading(false);
      }
    };
    const fetchCategories = async () => {
      try {
        const items = await getNewsCategories();
        if (mounted) setCategories(items);
      } catch (error) {
        setToast({ show: true, message: "Lỗi khi tải danh mục!", type: "error" });
      }
    };
    fetchNewsData();
    fetchCategories();
    return () => { mounted = false; };
  }, []);

  const handleCloseModal = useCallback(() => {
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
  }, []);

  const handleShowModal = useCallback((newsItem = null) => {
    if (newsItem) {
      setCurrentNews(newsItem);
      setEditMode(true);
    } else {
      setEditMode(false);
    }
    setShowModal(true);
  }, []);

  const handleInputChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setCurrentNews((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }, []);

  const handleEditorChange = useCallback((content) => {
    setCurrentNews((prev) => ({ ...prev, content }));
    setErrors((prev) => ({ ...prev, content: '' }));
  }, []);

  const handleImageUpload = useCallback(async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const response = await uploadImage(file);
      if (response && response.location) {
        setCurrentNews((prev) => ({ ...prev, imageUrl: response.location }));
        setToast({ show: true, message: "Upload hình ảnh thành công!", type: "success" });
      }
    } catch (error) {
      setToast({ show: true, message: "Lỗi khi upload hình ảnh!", type: "error" });
    }
  }, []);

  const generateSlug = useCallback((title) => {
    const slug = title
      .toLowerCase()
      .replace(/[^\w\s]/gi, "")
      .replace(/\s+/g, "-");
    setCurrentNews((prev) => ({ ...prev, slug }));
  }, []);

  const validateForm = useCallback(() => {
    const newErrors = {};
    if (!currentNews.title) newErrors.title = "Tiêu đề là bắt buộc";
    if (!currentNews.slug) newErrors.slug = "Slug là bắt buộc";
    if (!currentNews.category) newErrors.category = "Vui lòng chọn danh mục";
    if (!currentNews.content) newErrors.content = "Nội dung là bắt buộc";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [currentNews]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setSubmitLoading(true);
    try {
      const newsData = {
        id: currentNews.id,
        title: currentNews.title,
        description: currentNews.summary,
        content: currentNews.content,
        postCategoryId: categories.find(cat => cat.name === currentNews.category)?.id || 1,
        timePosted: new Date(currentNews.publishDate).toISOString(),
        slug: currentNews.slug,
        featured: currentNews.featured,
        status: currentNews.status === "active" ? 1 : 0,
        imageUrl: currentNews.imageUrl
      };
      if (editMode) {
        await updateNews(newsData);
        setNews((prev) => prev.map((n) => (n.id === currentNews.id ? { ...currentNews } : n)));
        setToast({ show: true, message: "Cập nhật tin tức thành công!", type: "success" });
      } else {
        const response = await createNews(newsData);
        setNews((prev) => [...prev, { ...currentNews, id: response.id }]);
        setToast({ show: true, message: "Thêm tin tức thành công!", type: "success" });
      }
      handleCloseModal();
      setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
    } catch (error) {
      setToast({ show: true, message: "Lỗi khi lưu tin tức!", type: "error" });
    } finally {
      setSubmitLoading(false);
    }
  }, [editMode, currentNews, validateForm, handleCloseModal, categories]);

  const handleDeleteNews = useCallback(async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa tin tức này?")) {
      try {
        await deleteNews(id);
        setNews((prev) => prev.filter((n) => n.id !== id));
        setToast({ show: true, message: "Xóa tin tức thành công!", type: "success" });
        setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
      } catch (error) {
        setToast({ show: true, message: "Lỗi khi xóa tin tức!", type: "error" });
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

  const getFilteredAndSortedNews = useCallback(() => {
    let filteredNews = [...news];
    if (filters.search) {
      filteredNews = filteredNews.filter((n) =>
        n.title.toLowerCase().includes(filters.search.toLowerCase())
      );
    }
    if (filters.category) {
      filteredNews = filteredNews.filter((n) => n.category === filters.category);
    }
    if (filters.status) {
      filteredNews = filteredNews.filter((n) => n.status === filters.status);
    }
    filteredNews.sort((a, b) => {
      const key = sortConfig.key;
      const direction = sortConfig.direction === "asc" ? 1 : -1;
      if (key === "title" || key === "category" || key === "status") {
        return a[key].localeCompare(b[key]) * direction;
      } else if (key === "publishDate") {
        return (new Date(a[key]) - new Date(b[key])) * direction;
      }
      return (a[key] - b[key]) * direction;
    });
    return filteredNews;
  }, [news, filters, sortConfig]);

  const filteredNews = useMemo(() => getFilteredAndSortedNews(), [getFilteredAndSortedNews]);
  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
  const paginatedNews = useMemo(() => filteredNews.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage), [filteredNews, currentPage, itemsPerPage]);

  const handlePageChange = useCallback((page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  }, [totalPages]);

  // Đặt handleToggleStatus ở đây trước columns
  const handleToggleStatus = useCallback((newsItem) => {
    setNews((prev) => prev.map((n) =>
      n.id === newsItem.id ? { ...n, status: n.status === "active" ? "inactive" : "active" } : n
    ));
    setToast({ show: true, message: `Đã ${newsItem.status === "active" ? "tạm dừng" : "kích hoạt"} tin tức!`, type: "success" });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  }, []);

  // Columns config for DataTable
  const columns = useMemo(() => [
    { key: "id", title: "ID", sortable: true },
    { key: "title", title: "Tiêu đề", sortable: true },
    { key: "category", title: "Danh mục", sortable: true },
    { key: "publishDate", title: "Ngày đăng", sortable: true },
    { key: "status", title: "Trạng thái", sortable: true, render: (val) => <span className={`badge badge-${val === "active" ? "success" : "danger"}`}>{val === "active" ? "Hiển thị" : "Ẩn"}</span> },
    { key: "toggleStatus", title: "Đổi trạng thái", sortable: false, render: (val, row) => (
      <button className="btn btn-toggle-status" onClick={() => handleToggleStatus(row)}>
        {row.status === "active" ? "Tạm dừng" : "Kích hoạt"}
      </button>
    ) },
  ], [handleToggleStatus]);

  // Fields config for FormModal
  const fields = useMemo(() => [
    { name: "title", label: "Tiêu đề", type: "text", required: true, onBlur: () => generateSlug(currentNews.title) },
    { name: "slug", label: "Slug", type: "text", required: true },
    { name: "category", label: "Danh mục", type: "select", required: true, options: [{ value: "", label: "Chọn danh mục" }, ...categories.map(c => ({ value: c.name, label: c.name }))] },
    { name: "summary", label: "Tóm tắt", type: "textarea" },
    { name: "content", label: "Nội dung", type: "custom", required: true, render: () => (
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
            'undo redo | formatselect | bold italic backcolor | \n        alignleft aligncenter alignright alignjustify | \n        bullist numlist outdent indent | removeformat | help | image media table code',
          language: 'vi',
          image_title: true,
          automatic_uploads: true,
          file_picker_types: 'image',
        }}
        onEditorChange={handleEditorChange}
      />
    ) },
    { name: "imageUrl", label: "Hình ảnh", type: "custom", render: () => (
      <>
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
      </>
    ) },
    { name: "publishDate", label: "Ngày đăng", type: "date" },
    { name: "status", label: "Trạng thái", type: "select", options: [
      { value: "active", label: "Hiển thị" },
      { value: "inactive", label: "Ẩn" },
    ] },
    { name: "featured", label: "Nổi bật", type: "checkbox" },
  ], [categories, currentNews, handleEditorChange, handleImageUpload, generateSlug]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="admin-news-list">
      <ToastMessage
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ show: false, message: "", type: "" })}
      />
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
          <DataTable
            columns={columns}
            data={paginatedNews}
            onEdit={handleShowModal}
            onDelete={handleDeleteNews}
            onSort={handleSort}
            sortConfig={sortConfig}
            loading={isLoading}
            emptyText="Không có tin tức nào phù hợp"
          />
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
        values={currentNews}
        errors={errors}
        onChange={handleInputChange}
        loading={submitLoading}
        title={editMode ? "Chỉnh sửa tin tức" : "Thêm tin tức mới"}
        submitText={editMode ? "Cập nhật" : "Thêm mới"}
        cancelText="Hủy"
      />
    </div>
  );
};

export default NewsList; 