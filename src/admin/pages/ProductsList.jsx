import React, { useState, useEffect, useCallback } from "react";
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
import AdminFilter from "../components/AdminFilter";
import AdminPageActions from "../components/AdminPageActions";
import AdminTable from "../components/AdminTable";
import "../styles/adminTable.css";
import "../styles/adminCommon.css";
import "../styles/adminButtons.css";

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
  const [isSearching, setIsSearching] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "info",
  });

  // Server-side pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [searchDebounce, setSearchDebounce] = useState("");
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

  // Debounce search - đợi user gõ xong
  useEffect(() => {
    if (filters.search !== searchDebounce) {
      setIsSearching(true);
    }
    
    const timer = setTimeout(() => {
      setSearchDebounce(filters.search);
      setIsSearching(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [filters.search]);

  // Load data on mount
  useEffect(() => {
    loadData();
  }, []);

  // Load data when pagination/filters/sorting change (without showing loading for search)
  useEffect(() => {
    if (searchDebounce !== filters.search) {
      // Search is still being debounced, don't show loading
      loadData(false);
    } else {
      // Other filters or pagination changed, show loading
      loadData(true);
    }
  }, [currentPage, itemsPerPage, searchDebounce, filters.category, filters.status, filters.dateFrom, filters.dateTo, sortConfig]);

  const loadData = async (showLoadingIndicator = true) => {
    if (showLoadingIndicator) {
      setIsLoading(true);
    }
    try {
      const [productData, categoriesData] = await Promise.all([
        fetchProduct(currentPage, itemsPerPage, searchDebounce, filters, sortConfig),
        fetchProductCategories(),
      ]);

      setProduct(productData?.items || []);
      setTotalItems(productData?.totalItems || 0);
      setTotalPages(productData?.totalPages || 0);
      setCategories(categoriesData || []);
    } catch (error) {
      console.error("Load data failed:", error);
      setToast({
        show: true,
        message: "Tải dữ liệu thất bại: " + error.message,
        type: "error",
      });
    } finally {
      if (showLoadingIndicator) {
        setIsLoading(false);
      }
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

  // Filter configuration for AdminFilter component
  const filterConfig = [
    {
      key: "search",
      type: "search",
      label: "Tìm kiếm",
      placeholder: "Tìm kiếm theo tên sản phẩm, mô tả hoặc thương hiệu...",
      icon: "fas fa-search"
    },
    {
      key: "category",
      type: "select",
      label: "Danh mục",
      icon: "fas fa-tags",
      options: categories.map(cat => ({
        value: cat.id,
        label: cat.titleVi
      }))
    },
    {
      key: "status",
      type: "select",
      label: "Trạng thái",
      icon: "fas fa-flag",
      options: [
        { value: "active", label: "Hoạt động" },
        { value: "inactive", label: "Không hoạt động" }
      ]
    },
    {
      type: "daterange",
      fromKey: "dateFrom",
      toKey: "dateTo",
      icon: "fas fa-calendar"
    }
  ];

  // Handle filter changes
  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  // Use server-side data directly (no client-side filtering/sorting)
  const paginatedProduct = product;

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
      className: "admin-btn admin-btn-xs admin-btn-primary",
    },
    {
      label: "Xóa",
      onClick: handleDelete,
      className: "admin-btn admin-btn-xs admin-btn-danger",
    },
  ];

  // Page Actions using AdminPageActions
  const pageActions = (
    <AdminPageActions
      loading={isLoading}
      actions={[
        AdminPageActions.createRefreshAction(loadData, isLoading),
        AdminPageActions.createAddAction(handleAdd, "Thêm sản phẩm")
      ]}
    />
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
      <div className="admin-contact-list">
        {/* Filters Section - Using AdminFilter Component */}
        <AdminFilter
          filters={filters}
          onFiltersChange={handleFiltersChange}
          onPageChange={setCurrentPage}
          filterConfig={filterConfig}
          isSearching={isSearching}
        />

        {/* Table Container */}
        <AdminTable
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
          totalPages={totalPages}
          onPageChange={(page) => {
            setCurrentPage(page);
          }}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={(newSize) => {
            setItemsPerPage(newSize);
            setCurrentPage(1);
          }}
          loading={isLoading}
          emptyText="Chưa có sản phẩm nào"
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
