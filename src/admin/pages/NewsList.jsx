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
import "./NewsList.css";
import "../styles/adminTable.css";
import "../styles/adminCommon.css";
import {
  getNews,
  getNewsCategories,
  createNews,
  updateNews,
  deleteNews,
} from "../../api";
import { mockNews, mockNewsCategories } from "../../utils/mockData.js";
import DataTable from "../components/DataTable";
import FormModal from "../components/FormModal";
import ToastMessage from "../components/ToastMessage";
import LoadingSpinner from "../components/LoadingSpinner";
import { Link } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import ReactModal from "react-modal";
import ImageUpload from "../../components/UI/ImageUpload";
import { fetchNewsWithFallback, fetchNewsCategoriesWithFallback } from "../../services/newsService";

const NewsList = () => {
  const [news, setNews] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  // Định nghĩa object emptyNews để dùng cho khởi tạo/reset form
  const emptyNews = {
    id: null,
    titleVi: "",
    titleEn: "",
    category: "",
    content: "",
    summaryVi: "",
    summaryEn: "",
    imageUrl: "",
    slug: "",
    featured: false,
    status: "active",
    publishDate: new Date().toISOString().split("T")[0],
  };
  const [currentNews, setCurrentNews] = useState({ ...emptyNews });
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
  const [translating, setTranslating] = useState({});
  const [activeTab, setActiveTab] = useState("vi");

  // Hàm dịch sử dụng backend proxy, fallback copy text
  const translateProxy = async (text) => {
    if (!text) return "";
    const res = await fetch("/api/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text,
        source: "vi",
        target: "en",
      }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data.translatedText;
  };

  const handleTranslate = async (fromField, toField) => {
    const text = currentNews[fromField] || "";
    if (!text) return;
    setTranslating((prev) => ({ ...prev, [toField]: true }));
    try {
      const translated = await translateProxy(text);
      setCurrentNews((prev) => ({ ...prev, [toField]: translated }));
    } catch (err) {
      setCurrentNews((prev) => ({ ...prev, [toField]: text }));
    } finally {
      setTranslating((prev) => ({ ...prev, [toField]: false }));
    }
  };

  useEffect(() => {
    fetchNewsWithFallback().then(setNews);
    fetchNewsCategoriesWithFallback().then(setCategories);
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
    setEditMode(false);
    setErrors({});
    setCurrentNews({ ...emptyNews });
  }, []);

  const handleAddNew = () => {
    setEditMode(false);
    setCurrentNews({ ...emptyNews });
    setErrors({});
    setShowModal(true);
  };

  const handleEdit = (newsItem) => {
    setEditMode(true);
    setCurrentNews({
      id: newsItem.id,
      titleVi: newsItem.titleVi || "",
      titleEn: newsItem.titleEn || "",
      category: newsItem.postCategoryId || "",
      contentVi: newsItem.contentVi || "",
      contentEn: newsItem.contentEn || "",
      summaryVi: newsItem.descriptionVi || "",
      summaryEn: newsItem.descriptionEn || "",
      imageUrl: newsItem.image || "",
      slug: newsItem.slugVi || "",
      featured: newsItem.featured || false,
      status: newsItem.status === 1 ? "active" : "inactive",
      publishDate: newsItem.timePosted
        ? newsItem.timePosted.split("T")[0]
        : new Date().toISOString().split("T")[0],
    });
    setErrors({});
    setShowModal(true);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!currentNews.titleVi.trim()) {
      newErrors.titleVi = "Tiêu đề tiếng Việt là bắt buộc";
    }
    if (!currentNews.titleEn.trim()) {
      newErrors.titleEn = "Title tiếng Anh là bắt buộc";
    }

    if (!currentNews.category) {
      newErrors.category = "Danh mục là bắt buộc";
    }

    if (!currentNews.contentVi.trim()) {
      newErrors.contentVi = "Nội dung tiếng Việt là bắt buộc";
    }
    if (!currentNews.contentEn.trim()) {
      newErrors.contentEn = "Nội dung tiếng Anh là bắt buộc";
    }
    if (!currentNews.summaryVi.trim()) {
      newErrors.summaryVi = "Tóm tắt tiếng Việt là bắt buộc";
    }
    if (!currentNews.summaryEn.trim()) {
      newErrors.summaryEn = "Summary tiếng Anh là bắt buộc";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setSubmitLoading(true);
    try {
      if (editMode) {
        // Update news
        setNews((prev) =>
          prev.map((item) =>
            item.id === currentNews.id
              ? {
                  ...item,
                  titleVi: currentNews.titleVi,
                  titleEn: currentNews.titleEn,
                  contentVi: currentNews.contentVi,
                  contentEn: currentNews.contentEn,
                  descriptionVi: currentNews.summaryVi,
                  descriptionEn: currentNews.summaryEn,
                  slugVi: currentNews.slug,
                  slugEn: currentNews.slug,
                  postCategoryId: currentNews.category,
                  status: currentNews.status === "active" ? 1 : 0,
                  image: currentNews.imageUrl,
                  featured: currentNews.featured,
                }
              : item
          )
        );
        setToast({
          show: true,
          message: "Cập nhật tin tức thành công!",
          type: "success",
        });
      } else {
        // Create new news
        const newNews = {
          id: Date.now(),
          titleVi: currentNews.titleVi,
          titleEn: currentNews.titleEn,
          contentVi: currentNews.contentVi,
          contentEn: currentNews.contentEn,
          descriptionVi: currentNews.summaryVi,
          descriptionEn: currentNews.summaryEn,
          slugVi: currentNews.slug,
          slugEn: currentNews.slug,
          postCategoryId: currentNews.category,
          status: currentNews.status === "active" ? 1 : 0,
          image: currentNews.imageUrl,
          featured: currentNews.featured,
          timePosted: new Date().toISOString(),
        };
        setNews((prev) => [newNews, ...prev]);
        setToast({
          show: true,
          message: "Thêm tin tức thành công!",
          type: "success",
        });
      }
      handleCloseModal();
    } catch (error) {
      setToast({ show: true, message: "Lỗi khi lưu tin tức!", type: "error" });
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDeleteNews = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa tin tức này?")) {
      setNews((prev) => prev.filter((item) => item.id !== id));
      setToast({
        show: true,
        message: "Xóa tin tức thành công!",
        type: "success",
      });
    }
  };

  const handleInputChange = (field, value) => {
    setCurrentNews((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const filteredNews = news.filter((item) => {
    const matchesSearch =
      item.titleVi.toLowerCase().includes(filters.search.toLowerCase()) ||
      item.titleEn.toLowerCase().includes(filters.search.toLowerCase()) ||
      item.descriptionVi.toLowerCase().includes(filters.search.toLowerCase()) ||
      item.descriptionEn.toLowerCase().includes(filters.search.toLowerCase());
    const matchesCategory =
      !filters.category || item.postCategoryId === parseInt(filters.category);
    const matchesStatus =
      !filters.status ||
      (filters.status === "active" && item.status === 1) ||
      (filters.status === "inactive" && item.status === 0);

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const sortedNews = [...filteredNews].sort((a, b) => {
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (sortConfig.direction === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const paginatedNews = sortedNews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(sortedNews.length / itemsPerPage);

  const columns = [
    { key: 'id', label: 'ID', sortable: true },
    { key: "titleVi", label: "Tiêu đề (VI)", sortable: true },
    {
      key: "postCategoryNameVi",
      label: "Danh mục",
      sortable: true,
    },
    { key: "image", label: "Ảnh", render: (value) => value ? <img src={value} alt="Ảnh" style={{width: 60, height: 40, objectFit: 'cover'}} /> : '' },
    {
      key: "timePosted",
      label: "Ngày đăng",
      sortable: true,
      render: (value) => new Date(value).toLocaleDateString("vi-VN"),
    },
    {
      key: "status",
      label: "Trạng thái",
      sortable: true,
      render: (value) => (
        <span className={`status-badge ${value === 1 ? "active" : "inactive"}`}>
          {value === 1 ? "Hoạt động" : "Không hoạt động"}
        </span>
      ),
    },
    {
      key: "actions",
      label: "Thao tác",
      render: (value, item) => (
        <div className="action-buttons">
          <button
            className="btn btn-sm btn-primary"
            onClick={() => handleEdit(item)}
            title="Chỉnh sửa"
          >
            <i className="bi bi-pencil"></i>
            <span>Sửa</span>
          </button>
          <button
            className="btn btn-sm btn-danger"
            onClick={() => handleDeleteNews(item.id)}
            title="Xóa"
          >
            <i className="bi bi-trash"></i>
            <span>Xóa</span>
          </button>
        </div>
      ),
    },
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
          placeholder="Tìm kiếm tin tức..."
          value={filters.search}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, search: e.target.value }))
          }
          className="form-control"
        />
      </div>
      <div className="filter-group">
        <select
          value={filters.category}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, category: e.target.value }))
          }
          className="form-control"
        >
          <option value="">Tất cả danh mục</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.nameVi}
            </option>
          ))}
        </select>
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

  const renderNewsForm = () => (
    <div className="news-form">
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <button
          type="button"
          className={`btn btn-tab${activeTab === "vi" ? " active" : ""}`}
          onClick={() => setActiveTab("vi")}
        >
          Thông tin & Tiếng Việt
        </button>
        <button
          type="button"
          className={`btn btn-tab${activeTab === "en" ? " active" : ""}`}
          onClick={() => setActiveTab("en")}
        >
          Tiếng Anh
        </button>
      </div>
      {activeTab === "vi" && (
        <>
          <div className="form-row">
            <div className="form-group">
              <label>Tiêu đề (VI) *</label>
              <input
                type="text"
                value={currentNews.titleVi}
                onChange={(e) => handleInputChange("titleVi", e.target.value)}
                className={`form-control ${errors.titleVi ? "is-invalid" : ""}`}
                placeholder="Nhập tiêu đề tiếng Việt"
              />
              {errors.titleVi && (
                <div className="invalid-feedback">{errors.titleVi}</div>
              )}
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Slug</label>
              <input
                type="text"
                value={currentNews.slug}
                onChange={(e) => handleInputChange("slug", e.target.value)}
                className="form-control"
                placeholder="Nhập slug (tự động tạo nếu để trống)"
              />
            </div>
            <div className="form-group">
              <ImageUpload
                value={currentNews.imageUrl}
                onChange={(url) => handleInputChange("imageUrl", url)}
                label="Ảnh *"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Tóm tắt (VI) *</label>
              <textarea
                value={currentNews.summaryVi}
                onChange={(e) => handleInputChange("summaryVi", e.target.value)}
                className={`form-control ${
                  errors.summaryVi ? "is-invalid" : ""
                }`}
                rows="3"
                placeholder="Nhập tóm tắt tiếng Việt"
              />
              {errors.summaryVi && (
                <div className="invalid-feedback">{errors.summaryVi}</div>
              )}
            </div>
          </div>
          <div className="form-group">
            <label>Nội dung (VI) *</label>
            <Editor
              value={currentNews.contentVi}
              onEditorChange={(c) => handleInputChange("contentVi", c)}
              init={{
                menubar: true,
                plugins: [
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "help",
                  "wordcount",
                  "emoticons",
                  "codesample",
                ],
                toolbar:
                  "undo redo | blocks | bold italic underline strikethrough forecolor backcolor | " +
                  "alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | " +
                  "link image media table codesample charmap emoticons | removeformat | help",
                height: 300,
                branding: false,
                promotion: false,
                appendTo: document.body,
              }}
            />
            {errors.contentVi && (
              <div className="invalid-feedback">{errors.contentVi}</div>
            )}
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Trạng thái</label>
              <select
                value={currentNews.status}
                onChange={(e) => handleInputChange("status", e.target.value)}
                className="form-control"
              >
                <option value="active">Hoạt động</option>
                <option value="inactive">Không hoạt động</option>
              </select>
            </div>
            <div className="form-group">
              <label>Nổi bật</label>
              <select
                value={currentNews.featured}
                onChange={(e) =>
                  handleInputChange("featured", e.target.value === "true")
                }
                className="form-control"
              >
                <option value={false}>Không</option>
                <option value={true}>Có</option>
              </select>
            </div>
          </div>
        </>
      )}
      {activeTab === "en" && (
        <>
          <div className="form-row">
            <div className="form-group">
              <label>Title (EN) *</label>
              <div style={{ display: "flex", gap: 8 }}>
                <input
                  type="text"
                  value={currentNews.titleEn}
                  onChange={(e) => handleInputChange("titleEn", e.target.value)}
                  className={`form-control ${
                    errors.titleEn ? "is-invalid" : ""
                  }`}
                  placeholder="Enter title in English"
                />
                <button
                  type="button"
                  className="btn btn-sm btn-secondary"
                  onClick={() => handleTranslate("titleVi", "titleEn")}
                  title="Dịch từ tiếng Việt"
                  disabled={!!translating.titleEn}
                >
                  {translating.titleEn ? "Đang dịch..." : "Dịch"}
                </button>
              </div>
              {errors.titleEn && (
                <div className="invalid-feedback">{errors.titleEn}</div>
              )}
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Summary (EN) *</label>
              <div style={{ display: "flex", gap: 8 }}>
                <textarea
                  value={currentNews.summaryEn}
                  onChange={(e) =>
                    handleInputChange("summaryEn", e.target.value)
                  }
                  className={`form-control ${
                    errors.summaryEn ? "is-invalid" : ""
                  }`}
                  rows="3"
                  placeholder="Enter summary in English"
                />
                <button
                  type="button"
                  className="btn btn-sm btn-secondary"
                  onClick={() => handleTranslate("summaryVi", "summaryEn")}
                  title="Dịch từ tiếng Việt"
                  disabled={!!translating.summaryEn}
                >
                  {translating.summaryEn ? "Đang dịch..." : "Dịch"}
                </button>
              </div>
              {errors.summaryEn && (
                <div className="invalid-feedback">{errors.summaryEn}</div>
              )}
            </div>
          </div>
          <div className="form-group">
            <label>Content (EN) *</label>
            <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
              <div style={{ flex: 1 }}>
                <Editor
                  value={currentNews.contentEn}
                  onEditorChange={(c) => handleInputChange("contentEn", c)}
                  init={{
                    menubar: true,
                    plugins: [
                      "advlist",
                      "autolink",
                      "lists",
                      "link",
                      "image",
                      "charmap",
                      "preview",
                      "anchor",
                      "searchreplace",
                      "visualblocks",
                      "code",
                      "fullscreen",
                      "insertdatetime",
                      "media",
                      "table",
                      "help",
                      "wordcount",
                      "emoticons",
                      "codesample",
                    ],
                    toolbar:
                      "undo redo | blocks | bold italic underline strikethrough forecolor backcolor | " +
                      "alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | " +
                      "link image media table codesample charmap emoticons | removeformat | help",
                    height: 300,
                    branding: false,
                    promotion: false,
                    appendTo: document.body,
                  }}
                />
              </div>
              <button
                type="button"
                className="btn btn-sm btn-secondary"
                style={{ height: 36, marginTop: 4 }}
                onClick={() => handleTranslate("contentVi", "contentEn")}
                title="Dịch từ tiếng Việt"
                disabled={!!translating.contentEn || !currentNews.contentVi}
              >
                {translating.contentEn ? "Đang dịch..." : "Dịch"}
              </button>
            </div>
            {errors.contentEn && (
              <div className="invalid-feedback">{errors.contentEn}</div>
            )}
          </div>
        </>
      )}
    </div>
  );

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="admin-news-list">
      {/* Nơi TinyMCE sẽ render toolbar ra ngoài modal */}
      <div id="tiny-toolbar-container" />
      <div className="page-header">
        <h1>Quản lý tin tức</h1>
        <button className="btn btn-primary" onClick={handleAddNew}>
          <i className="bi bi-plus"></i>
          Thêm tin tức
        </button>
      </div>

      {renderFilters()}

      <div className="admin-table-container">
        <DataTable
          data={paginatedNews}
          columns={columns}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          sortConfig={sortConfig}
          onSort={handleSort}
          itemsPerPage={itemsPerPage}
          totalItems={sortedNews.length}
          tableClassName="admin-table"
        />
      </div>

      <ReactModal
        isOpen={showModal}
        onRequestClose={handleCloseModal}
        contentLabel="Tin tức"
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
            {editMode ? "Chỉnh sửa tin tức" : "Thêm tin tức mới"}
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
          {renderNewsForm()}
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

export default NewsList;
