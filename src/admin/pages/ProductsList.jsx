import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Editor } from '@tinymce/tinymce-react';
import "./ProductsList.css";
import {
  getProducts,
  getProductCategories,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../api";
import DataTable from "../components/DataTable";
import FormModal from "../components/FormModal";
import ToastMessage from "../components/ToastMessage";
import LoadingSpinner from "../components/LoadingSpinner";

const ProductsList = () => {
  const [product, setProduct] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
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
    let mounted = true;
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        const items = await getProducts();
        if (mounted) setProduct(items);
      } catch (error) {
        setToast({ show: true, message: "Lỗi khi tải sản phẩm!", type: "error" });
      } finally {
        if (mounted) setIsLoading(false);
      }
    };
    const fetchCategories = async () => {
      try {
        const items = await getProductCategories();
        if (mounted) setCategories(items);
      } catch (error) {
        setToast({ show: true, message: "Lỗi khi tải danh mục!", type: "error" });
      }
    };
    fetchProduct();
    fetchCategories();
    return () => { mounted = false; };
  }, []);

  const handleCloseModal = useCallback(() => {
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
  }, []);

  const handleShowModal = useCallback((productItem = null) => {
    if (productItem) {
      setCurrentProduct(productItem);
      setEditMode(true);
    } else {
      setEditMode(false);
    }
    setShowModal(true);
  }, []);

  const handleInputChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setCurrentProduct((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }, []);

  const handleEditorChange = useCallback((content) => {
    setCurrentProduct((prev) => ({ ...prev, content }));
    setErrors((prev) => ({ ...prev, content: '' }));
  }, []);

  const validateForm = useCallback(() => {
    const newErrors = {};
    if (!currentProduct.name) newErrors.name = "Tên sản phẩm là bắt buộc";
    if (!currentProduct.category) newErrors.category = "Vui lòng chọn danh mục";
    if (!currentProduct.content) newErrors.content = "Nội dung là bắt buộc";
    if (currentProduct.imageUrl && !isValidUrl(currentProduct.imageUrl)) {
      newErrors.imageUrl = "URL hình ảnh không hợp lệ";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [currentProduct]);

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setSubmitLoading(true);
    try {
      if (editMode) {
        await updateProduct(currentProduct.id, currentProduct);
        setProduct((prev) => prev.map((n) => (n.id === currentProduct.id ? currentProduct : n)));
        setToast({ show: true, message: "Cập nhật sản phẩm thành công!", type: "success" });
      } else {
        const newProduct = await createProduct(currentProduct);
        setProduct((prev) => [...prev, newProduct]);
        setToast({ show: true, message: "Thêm sản phẩm thành công!", type: "success" });
      }
      handleCloseModal();
      setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
    } catch (error) {
      setToast({ show: true, message: "Lỗi khi lưu sản phẩm!", type: "error" });
    } finally {
      setSubmitLoading(false);
    }
  }, [editMode, currentProduct, validateForm, handleCloseModal]);

  const handleDeleteProduct = useCallback(async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      try {
        await deleteProduct(id);
        setProduct((prev) => prev.filter((n) => n.id !== id));
        setToast({ show: true, message: "Xóa sản phẩm thành công!", type: "success" });
        setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
      } catch (error) {
        setToast({ show: true, message: "Lỗi khi xóa sản phẩm!", type: "error" });
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

  const getFilteredAndSortedProduct = useCallback(() => {
    let filteredProduct = [...product];
    if (filters.search) {
      filteredProduct = filteredProduct.filter((n) =>
        n.name.toLowerCase().includes(filters.search.toLowerCase())
      );
    }
    if (filters.category) {
      filteredProduct = filteredProduct.filter((n) => n.category === filters.category);
    }
    if (filters.status) {
      filteredProduct = filteredProduct.filter((n) => n.status === filters.status);
    }
    filteredProduct.sort((a, b) => {
      const key = sortConfig.key;
      const direction = sortConfig.direction === "asc" ? 1 : -1;
      if (key === "name" || key === "category" || key === "status") {
        return a[key].localeCompare(b[key]) * direction;
      } else if (key === "featured") {
        return ((a[key] ? 1 : 0) - (b[key] ? 1 : 0)) * direction;
      } else if (key === "publishDate") {
        return (new Date(a[key]) - new Date(b[key])) * direction;
      }
      return (a[key] - b[key]) * direction;
    });
    return filteredProduct;
  }, [product, filters, sortConfig]);

  const filteredProduct = useMemo(() => getFilteredAndSortedProduct(), [getFilteredAndSortedProduct]);
  const totalPages = Math.ceil(filteredProduct.length / itemsPerPage);
  const paginatedProduct = useMemo(() => filteredProduct.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage), [filteredProduct, currentPage, itemsPerPage]);

  const handlePageChange = useCallback((page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  }, [totalPages]);

  // Columns config for DataTable
  const columns = useMemo(() => [
    { key: "id", title: "ID", sortable: true },
    { key: "name", title: "Tên sản phẩm", sortable: true },
    { key: "category", title: "Danh mục", sortable: true },
    { key: "featured", title: "Nổi bật", sortable: true, render: (val) => <span className={`badge badge-${val ? "success" : "secondary"}`}>{val ? "Nổi bật" : "Bình thường"}</span> },
    { key: "status", title: "Trạng thái", sortable: true, render: (val) => <span className={`badge badge-${val === "active" ? "success" : "danger"}`}>{val === "active" ? "Hiển thị" : "Ẩn"}</span> },
    { key: "publishDate", title: "Ngày đăng", sortable: true },
  ], []);

  // Fields config for FormModal
  const fields = useMemo(() => [
    { name: "name", label: "Tên sản phẩm", type: "text", required: true },
    { name: "category", label: "Danh mục", type: "select", required: true, options: [{ value: "", label: "Chọn danh mục" }, ...categories.map(c => ({ value: c.name, label: c.name }))] },
    { name: "content", label: "Nội dung", type: "custom", required: true, render: () => (
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
            'undo redo | formatselect | bold italic backcolor | \n        alignleft aligncenter alignright alignjustify | \n        bullist numlist outdent indent | removeformat | help | image media table code',
          language: 'vi',
          image_title: true,
          automatic_uploads: true,
          file_picker_types: 'image',
        }}
        onEditorChange={handleEditorChange}
      />
    ) },
    { name: "summary", label: "Tóm tắt", type: "textarea" },
    { name: "imageUrl", label: "Hình ảnh URL", type: "text" },
    { name: "featured", label: "Nổi bật", type: "checkbox" },
    { name: "publishDate", label: "Ngày đăng", type: "date" },
    { name: "status", label: "Trạng thái", type: "select", options: [
      { value: "active", label: "Hiển thị" },
      { value: "inactive", label: "Ẩn" },
    ] },
  ], [categories, currentProduct.content, handleEditorChange]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="admin-product-list">
      <ToastMessage
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ show: false, message: "", type: "" })}
      />
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
          <DataTable
            columns={columns}
            data={paginatedProduct}
            onEdit={handleShowModal}
            onDelete={handleDeleteProduct}
            onSort={handleSort}
            sortConfig={sortConfig}
            loading={isLoading}
            emptyText="Không có sản phẩm nào phù hợp"
          />
          <div className="pagination-container">
            <div className="pagination-info">
              Hiển thị {paginatedProduct.length} / {filteredProduct.length} sản phẩm
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
        values={currentProduct}
        errors={errors}
        onChange={handleInputChange}
        loading={submitLoading}
        title={editMode ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}
        submitText={editMode ? "Cập nhật" : "Thêm mới"}
        cancelText="Hủy"
      />
    </div>
  );
};

export default ProductsList;
