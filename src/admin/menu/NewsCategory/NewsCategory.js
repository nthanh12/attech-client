import React, { useState, useEffect, useCallback, useMemo } from "react";
import "./NewsCategory.css";
import {
  getNewsCategories,
  createNewsCategory,
  updateNewsCategory,
  deleteNewsCategory,
  updateNewsCategoryStatus,
} from "../../../api";
import DataTable from "../../components/DataTable";
import FormModal from "../../components/FormModal";
import ToastMessage from "../../components/ToastMessage";
import LoadingSpinner from "../../components/LoadingSpinner";

const NewsCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
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
  const [filters, setFilters] = useState({ search: "" });
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  useEffect(() => {
    fetchCategories();
    // eslint-disable-next-line
  }, []);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    try {
      const items = await getNewsCategories();
      setCategories(items.map(item => ({ ...item, status: item.status ?? 0 })));
    } catch (error) {
      setToast({ show: true, message: "Lỗi khi tải danh mục!", type: "error" });
    } finally {
      setLoading(false);
    }
  }, []);

  const handleToggleStatus = useCallback(async (category) => {
    if (
      window.confirm(
        `Bạn có chắc chắn muốn đổi trạng thái danh mục: ${category.name}`
      )
    ) {
      const newStatus = Number(category.status) === 1 ? 0 : 1;
      try {
        await updateNewsCategoryStatus({ id: category.id, status: newStatus });
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
      } catch (error) {
        setToast({
          show: true,
          message: "Lỗi khi cập nhật trạng thái!",
          type: "error",
        });
      }
    }
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
    setEditMode(false);
    setErrors({});
    setCurrentCategory({ id: null, name: "", description: "", status: "1" });
  }, []);

  const handleShowModal = useCallback((category = null) => {
    if (category) {
      setCurrentCategory(category);
      setEditMode(true);
    } else {
      setCurrentCategory({ id: null, name: "", description: "", status: "1" });
      setEditMode(false);
    }
    setShowModal(true);
  }, []);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setCurrentCategory((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  }, [errors]);

  const validateForm = useCallback(() => {
    const newErrors = {};
    if (!currentCategory.name || currentCategory.name.trim() === "") {
      newErrors.name = "Tên danh mục là bắt buộc";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [currentCategory]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!validateForm()) return;
      try {
        if (editMode) {
          await updateNewsCategory(currentCategory);
          setCategories((prev) =>
            prev.map((c) =>
              c.id === currentCategory.id ? currentCategory : c
            )
          );
          setToast({
            show: true,
            message: "Cập nhật danh mục thành công!",
            type: "success",
          });
        } else {
          const newCategory = await createNewsCategory(currentCategory);
          setCategories((prev) => [...prev, newCategory]);
          setToast({
            show: true,
            message: "Thêm danh mục thành công!",
            type: "success",
          });
        }
        handleCloseModal();
      } catch (error) {
        const errorMessage =
          error.response && error.response.data && error.response.data.message
            ? error.response.data.message
            : "Lỗi khi lưu danh mục!";
        setToast({ show: true, message: errorMessage, type: "error" });
      }
    },
    [editMode, currentCategory, validateForm, handleCloseModal]
  );

  const handleDeleteCategory = useCallback(async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa danh mục này?")) {
      try {
        await deleteNewsCategory(id);
        setCategories((prev) => prev.filter((c) => c.id !== id));
        setToast({
          show: true,
          message: "Xóa danh mục thành công!",
          type: "success",
        });
      } catch (error) {
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
  }, []);

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  const handleSort = useCallback((key) => {
    setSortConfig((prev) => ({
      key,
      direction:
        prev.key === key && prev.direction === "asc"
          ? "desc"
          : "asc",
    }));
  }, []);

  const handleFilterChange = useCallback((e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    setCurrentPage(1);
  }, []);

  const columns = useMemo(
    () => [
      { key: "id", title: "ID", sortable: true },
      { key: "name", title: "Tên danh mục", sortable: true },
      { key: "description", title: "Mô tả", sortable: true },
      { key: "status", title: "Trạng thái", sortable: true, render: (value) => (value !== undefined && value !== null ? (Number(value) === 1 ? "Hoạt động" : "Ngừng hoạt động") : "Không xác định") },
    ],
    []
  );

  const filteredCategories = useMemo(() => {
    let filtered = [...categories];
    if (filters.search) {
      filtered = filtered.filter((c) =>
        c.name && c.name.toLowerCase().includes(filters.search.toLowerCase())
      );
    }
    filtered.sort((a, b) => {
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
    return filtered;
  }, [categories, filters, sortConfig]);

  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
  const paginatedCategories = useMemo(
    () =>
      filteredCategories.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      ),
    [filteredCategories, currentPage, itemsPerPage]
  );

  // Form fields for FormModal
  const formFields = [
    {
      name: "name",
      label: "Tên danh mục",
      type: "text",
      required: true,
      error: errors.name,
    },
    {
      name: "description",
      label: "Mô tả",
      type: "textarea",
    },
    {
      name: "status",
      label: "Trạng thái",
      type: "select",
      options: [
        { value: "1", label: "Hoạt động" },
        { value: "0", label: "Ngừng hoạt động" },
      ],
    },
  ];

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="news-category">
      <ToastMessage
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ show: false, message: "", type: "" })}
      />
      <div className="card">
        <div className="card-header">
          <h3>Quản lý danh mục sản phẩm</h3>
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
              name="search"
              value={filters.search}
              onChange={handleFilterChange}
            />
          </div>
          <DataTable
            columns={columns}
            data={paginatedCategories}
            loading={loading}
            sortConfig={sortConfig}
            onSort={handleSort}
            onEdit={handleShowModal}
            onDelete={handleDeleteCategory}
            noDataText="Không có danh mục nào phù hợp"
          />
          <div className="pagination-container">
            <div className="pagination-info">
              Hiển thị {paginatedCategories.length} / {filteredCategories.length} danh mục
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
        title={editMode ? "Chỉnh sửa danh mục" : "Thêm danh mục mới"}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        fields={formFields}
        values={currentCategory}
        errors={errors}
        onChange={handleInputChange}
        loading={loading}
        submitText={editMode ? "Cập nhật" : "Thêm mới"}
        cancelText="Hủy"
      />
    </div>
  );
};

export default NewsCategory;
