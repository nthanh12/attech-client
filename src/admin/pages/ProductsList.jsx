import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  fetchProduct,
  fetchProductCategories,
  deleteProduct,
  getProductById,
} from "../../services/productService";
import { getApiUrl } from "../../config/apiConfig";
import ProductCreationForm from "../components/ProductCreationForm";
import DataTable from "../components/DataTable";
import FormModal from "../components/FormModal";
import ToastMessage from "../components/ToastMessage";
import PageWrapper from "../components/PageWrapper";
import "./ProductsList.css";
import "../styles/adminTable.css";
import "../styles/adminCommon.css";

const ProductList = () => {
  const { t } = useTranslation();

  // Data state
  const [product, setProduct] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // UI state
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "info",
  });

  // Pagination & filters
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState({
    key: "id",
    direction: "desc",
  });
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    status: "",
    dateFrom: "",
    dateTo: "",
  });

  // Load data on mount
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [productData, categoriesData] = await Promise.all([
        fetchProduct(),
        fetchProductCategories(),
      ]);

      setProduct(productData?.items || []);
      setCategories(categoriesData || []);
    } catch (error) {
      console.error("Load data failed:", error);
      setToast({
        show: true,
        message: "Tải dữ liệu thất bại: " + error.message,
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handlers
  const handleAdd = () => {
    setEditMode(false);
    setEditingProduct(null);
    setShowModal(true);
  };

  const handleEdit = async (productItem) => {
    setEditMode(true);
    setEditingProduct(productItem); // Set basic data first

    try {
      // Fetch full DetailProductDto with attachments
      const fullProductData = await getProductById(productItem.id);
      setEditingProduct(fullProductData);
      setShowModal(true); // Only show modal after data is loaded
    } catch (error) {
      console.error("Error loading product detail:", error);
      setToast({
        show: true,
        message: "Lỗi tải chi tiết sản phẩm: " + error.message,
        type: "error",
      });
      // Fallback to basic data and show modal
      setEditingProduct(productItem);
      setShowModal(true);
    }
  };

  const handleDelete = async (productItem) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      try {
        const response = await deleteProduct(productItem.id);
        if (response && response.status === 1) {
          // Reload data from server to ensure consistency
          await loadData();
          setToast({
            show: true,
            message: "Xóa sản phẩm thành công!",
            type: "success",
          });
        } else {
          throw new Error("Delete failed");
        }
      } catch (error) {
        setToast({
          show: true,
          message: `Xóa sản phẩm thất bại: ${error.message}`,
          type: "error",
        });
      }
    }
  };

  const handleFormSuccess = async (savedProduct) => {
    try {
      // Reload data from server to ensure consistency
      await loadData();

      if (editMode) {
        setToast({
          show: true,
          message: "Cập nhật sản phẩm thành công!",
          type: "success",
        });
      } else {
        setToast({
          show: true,
          message: "Thêm sản phẩm thành công!",
          type: "success",
        });
      }
    } catch (error) {
      console.error("Error reloading data:", error);
      // Fallback to old behavior if loadData fails
      if (editMode) {
        setProduct((prev) =>
          prev.map((item) =>
            item.id === savedProduct.id ? { ...item, ...savedProduct } : item
          )
        );
        setToast({
          show: true,
          message: "Cập nhật sản phẩm thành công!",
          type: "success",
        });
      } else {
        setProduct((prev) => [savedProduct, ...prev]);
        setToast({
          show: true,
          message: "Thêm sản phẩm thành công!",
          type: "success",
        });
      }
    }

    setShowModal(false);
    setEditingProduct(null);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingProduct(null);
  };

  // Filtering and sorting logic
  const filteredProduct = product.filter((item) => {
    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      const matchesTitle =
        item.titleVi?.toLowerCase().includes(searchTerm) ||
        item.titleEn?.toLowerCase().includes(searchTerm);
      if (!matchesTitle) return false;
    }

    // Category filter
    if (filters.category) {
      if (item.productCategoryId !== parseInt(filters.category)) return false;
    }

    // Status filter
    if (filters.status) {
      const itemStatus = parseInt(item.status);
      if (filters.status === "active" && itemStatus !== 1) return false;
      if (filters.status === "inactive" && itemStatus !== 0) return false;
    }

    // Date filter
    if (filters.dateFrom || filters.dateTo) {
      const itemDate = new Date(item.timePosted);
      const fromDate = filters.dateFrom ? new Date(filters.dateFrom) : null;
      const toDate = filters.dateTo ? new Date(filters.dateTo) : null;

      if (fromDate && toDate) {
        if (itemDate < fromDate || itemDate > toDate) return false;
      } else if (fromDate) {
        if (itemDate < fromDate) return false;
      } else if (toDate) {
        if (itemDate > toDate) return false;
      }
    }

    return true;
  });

  const sortedProduct = filteredProduct.sort((a, b) => {
    let aValue = a[sortConfig.key];
    let bValue = b[sortConfig.key];

    if (sortConfig.key === "timePosted") {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    }

    if (sortConfig.direction === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const paginatedProduct = sortedProduct.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Table columns
  const columns = [
    { key: "id", label: "ID", sortable: true, width: "80px" },
    {
      key: "featuredImage",
      label: "Ảnh",
      width: "100px",
      render: (item) => {
        // ProductDto có field ImageUrl trực tiếp
        const rawImageUrl = item.ImageUrl || item.imageUrl;

        // Nếu là relative path, thêm base URL
        const imageUrl = rawImageUrl
          ? rawImageUrl.startsWith("http")
            ? rawImageUrl
            : getApiUrl(rawImageUrl)
          : null;

        return (
          <div className="product-thumbnail-container">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={item.titleVi || "Product"}
                className="product-thumbnail"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextElementSibling.style.display = "flex";
                }}
              />
            ) : null}
            <div
              className="no-image-placeholder"
              style={{ display: imageUrl ? "none" : "flex" }}
            >
              <i className="fas fa-image"></i>
            </div>
          </div>
        );
      },
    },
    { key: "titleVi", label: "Tiêu đề", sortable: true, width: "250px" },
    {
      key: "category",
      label: "Danh mục",
      width: "150px",
      render: (item) => {
        const category = categories.find(
          (cat) => cat.id === item.productCategoryId
        );
        return category?.titleVi || "N/A";
      },
    },
    {
      key: "status",
      label: "Trạng thái",
      width: "120px",
      render: (item) => (
        <span
          className={`badge ${
            item.status === 1 ? "badge-success" : "badge-secondary"
          }`}
        >
          {item.status === 1 ? "Hoạt động" : "Không hoạt động"}
        </span>
      ),
    },
    {
      key: "timePosted",
      label: "Ngày đăng",
      sortable: true,
      width: "140px",
      render: (item) => new Date(item.timePosted).toLocaleDateString("vi-VN"),
    },
  ];

  const actions = [
    {
      label: "Sửa",
      onClick: handleEdit,
      className: "btn btn-sm btn-primary",
    },
    {
      label: "Xóa",
      onClick: handleDelete,
      className: "btn btn-sm btn-danger",
    },
  ];

  // Page Actions for the sticky action bar
  const pageActions = (
    <div style={{ display: "flex", gap: "0.5rem" }}>
      <button
        className="btn btn-outline-secondary"
        onClick={loadData}
        disabled={isLoading}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          padding: "0.75rem 1rem",
          backgroundColor: "#f8f9fa",
          color: "#6c757d",
          border: "1px solid #dee2e6",
          borderRadius: "6px",
          fontSize: "0.875rem",
          fontWeight: "500",
          cursor: "pointer",
        }}
        title="Làm mới danh sách sản phẩm"
      >
        <i className="fas fa-refresh"></i>
        Làm mới
      </button>
      <button
        className="btn btn-primary"
        onClick={handleAdd}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          padding: "0.75rem 1rem",
          backgroundColor: "#3b82f6",
          color: "white",
          border: "none",
          borderRadius: "6px",
          fontSize: "0.875rem",
          fontWeight: "500",
          cursor: "pointer",
        }}
      >
        <i className="fas fa-plus"></i>
        Thêm sản phẩm
      </button>
    </div>
  );

  if (isLoading) {
    return (
      <PageWrapper actions={pageActions}>
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper actions={pageActions}>
      <div className="admin-product-list">
        {/* Filters Section */}
        <div className="filters-section">
          <div className="filter-group">
            <input
              type="text"
              className="form-control"
              placeholder="Tìm kiếm theo tiêu đề..."
              value={filters.search}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, search: e.target.value }))
              }
            />
          </div>
          <div className="filter-group">
            <select
              className="form-control"
              value={filters.category}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, category: e.target.value }))
              }
            >
              <option key="all" value="">
                Tất cả danh mục
              </option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.titleVi}
                </option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <select
              className="form-control"
              value={filters.status}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, status: e.target.value }))
              }
            >
              <option key="all-status" value="">
                Tất cả trạng thái
              </option>
              <option key="active" value="active">
                Hoạt động
              </option>
              <option key="inactive" value="inactive">
                Không hoạt động
              </option>
            </select>
          </div>
          <div className="filter-group">
            <input
              type="date"
              className="form-control"
              placeholder="Từ ngày"
              value={filters.dateFrom}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, dateFrom: e.target.value }))
              }
            />
          </div>
          <div className="filter-group">
            <input
              type="date"
              className="form-control"
              placeholder="Đến ngày"
              value={filters.dateTo}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, dateTo: e.target.value }))
              }
            />
          </div>
          <div className="filter-group">
            <button
              className="btn btn-secondary"
              onClick={() =>
                setFilters({
                  search: "",
                  category: "",
                  status: "",
                  dateFrom: "",
                  dateTo: "",
                })
              }
            >
              <i className="fas fa-times"></i>
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Data Table */}
        <DataTable
          data={paginatedProduct}
          columns={columns}
          actions={actions}
          sortConfig={sortConfig}
          onSort={(key) => {
            setSortConfig((prev) => ({
              key,
              direction:
                prev.key === key && prev.direction === "desc" ? "asc" : "desc",
            }));
          }}
          currentPage={currentPage}
          totalPages={Math.ceil(filteredProduct.length / itemsPerPage)}
          onPageChange={setCurrentPage}
          totalItems={filteredProduct.length}
          itemsPerPage={itemsPerPage}
        />

        {/* Modal with ProductCreationForm */}
        <FormModal
          show={showModal}
          onClose={handleCloseModal}
          title={editMode ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}
          size="xl"
          showActions={false}
        >
          <ProductCreationForm
            categories={categories}
            editingProduct={editingProduct}
            onSuccess={handleFormSuccess}
            onCancel={handleCloseModal}
          />
        </FormModal>

        <ToastMessage
          show={toast.show}
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, show: false })}
        />
      </div>
    </PageWrapper>
  );
};

export default ProductList;
