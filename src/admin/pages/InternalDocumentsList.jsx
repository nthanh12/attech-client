import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "../../contexts/AuthContext";
import PageWrapper from "../components/PageWrapper";
import FormModal from "../components/FormModal";
import ToastMessage from "../components/ToastMessage";
import AccessDenied from "../../components/AccessDenied";
import AdminTable from "../components/AdminTable";
import AdminFilter from "../components/AdminFilter";
import AdminPageActions from "../components/AdminPageActions";
import "../styles/adminTable.css";
import "../styles/adminCommon.css";
import "../styles/adminButtons.css";

import internalDocumentsAdminService from "../../services/internalDocumentsAdminService";
import InternalDocumentCreationForm from "../components/InternalDocumentCreationForm";
import { getApiUrl } from "../../config/apiConfig";

const InternalDocumentsList = () => {
  const { user: currentUser, ROLES } = useAuth();

  // Data state
  const [internalDocuments, setInternalDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFiltering, setIsFiltering] = useState(false);

  // Server-side pagination state
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // UI state
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingDocument, setEditingDocument] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "info",
  });

  // Document detail modal
  const [showDocumentDetail, setShowDocumentDetail] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);

  // Pagination & filters
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({
    key: "createdAt",
    direction: "desc",
  });
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    status: "",
    dateFrom: "",
    dateTo: "",
  });
  const [searchDebounce, setSearchDebounce] = useState("");

  // Categories
  const categories = internalDocumentsAdminService.getInternalDocumentCategories();

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

  // Load data on mount and when pagination/filters/sorting change
  useEffect(() => {
    const isInitialLoad = internalDocuments.length === 0 && !loading && !isFiltering;
    loadInternalDocuments(isInitialLoad);
  }, [currentPage, itemsPerPage, searchDebounce, filters.category, filters.status, filters.dateFrom, filters.dateTo, sortConfig]);

  const showToast = useCallback((message, type = "info") => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 3000);
  }, []);

  const loadInternalDocuments = useCallback(async (isInitialLoad = false) => {
    try {
      if (isInitialLoad) {
        setLoading(true);
      } else {
        setIsFiltering(true);
      }
      const params = {
        pageNumber: currentPage,
        pageSize: itemsPerPage,
        keyword: searchDebounce || "",
        category: filters.category,
        status: filters.status,
        dateFrom: filters.dateFrom,
        dateTo: filters.dateTo,
        sortBy: sortConfig.key,
        sortDirection: sortConfig.direction,
      };

      console.log("📡 Loading internal documents with params:", params);

      const result = await internalDocumentsAdminService.fetchInternalDocuments(params);

      if (result.success) {
        setInternalDocuments(result.data.items || []);
        setTotalItems(result.data.totalItems || 0);
        setTotalPages(result.data.totalPages || 0);

        console.log("✅ Internal documents loaded:", {
          items: result.data.items?.length || 0,
          total: result.data.totalItems,
          pages: result.data.totalPages
        });
      } else {
        console.error("❌ Failed to load internal documents:", result.message);
        showToast(result.message || "Không thể tải danh sách tài liệu nội bộ", "error");
        setInternalDocuments([]);
        setTotalItems(0);
        setTotalPages(0);
      }
    } catch (error) {
      console.error("❌ Error loading internal documents:", error);
      showToast("Có lỗi xảy ra khi tải danh sách tài liệu nội bộ", "error");
      setInternalDocuments([]);
      setTotalItems(0);
      setTotalPages(0);
    } finally {
      setLoading(false);
      setIsFiltering(false);
    }
  }, [currentPage, itemsPerPage, searchDebounce, filters, sortConfig, showToast]);

  // Permission check
  if (!currentUser || !currentUser.roleId || currentUser.roleId > ROLES.ADMIN) {
    return <AccessDenied />;
  }

  // Handle create new document
  const handleCreateNew = () => {
    setEditMode(false);
    setEditingDocument(null);
    setShowModal(true);
  };

  // Handle edit document
  const handleEdit = async (document) => {
    try {
      console.log("✏️ Editing internal document:", document.id);
      const result = await internalDocumentsAdminService.getInternalDocumentById(document.id);
      
      if (result.success) {
        setEditMode(true);
        setEditingDocument(result.data);
        setShowModal(true);
      } else {
        showToast(result.message || "Không thể tải chi tiết tài liệu để chỉnh sửa", "error");
      }
    } catch (error) {
      console.error("❌ Error loading document for edit:", error);
      showToast("Có lỗi xảy ra khi tải chi tiết tài liệu", "error");
    }
  };

  // Handle view document detail
  const handleViewDetail = async (document) => {
    try {
      console.log("👀 Viewing internal document detail:", document.id);
      const result = await internalDocumentsAdminService.getInternalDocumentById(document.id);
      
      if (result.success) {
        setSelectedDocument(result.data);
        setShowDocumentDetail(true);
      } else {
        showToast(result.message || "Không thể tải chi tiết tài liệu", "error");
      }
    } catch (error) {
      console.error("❌ Error viewing document detail:", error);
      showToast("Có lỗi xảy ra khi tải chi tiết tài liệu", "error");
    }
  };

  // Handle delete document
  const handleDelete = async (document) => {
    if (!window.confirm(`Bạn có chắc chắn muốn xóa tài liệu "${document.title}"?`)) {
      return;
    }

    try {
      console.log("🗑️ Deleting internal document:", document.id);
      const result = await internalDocumentsAdminService.deleteInternalDocument(document.id);

      if (result.success) {
        showToast("Xóa tài liệu nội bộ thành công", "success");
        loadInternalDocuments(); // Reload list
      } else {
        showToast(result.message || "Không thể xóa tài liệu", "error");
      }
    } catch (error) {
      console.error("❌ Error deleting internal document:", error);
      showToast("Có lỗi xảy ra khi xóa tài liệu", "error");
    }
  };

  // Handle download document
  const handleDownload = async (document) => {
    try {
      await internalDocumentsAdminService.downloadInternalDocument(document.id, document.title);
      showToast("Tải tài liệu thành công", "success");
    } catch (error) {
      console.error("❌ Error downloading document:", error);
      showToast("Có lỗi xảy ra khi tải tài liệu", "error");
    }
  };

  // Handle form success
  const handleFormSuccess = (data, action) => {
    setShowModal(false);
    setEditMode(false);
    setEditingDocument(null);

    const message = action === 'create' 
      ? "Tạo tài liệu nội bộ thành công" 
      : "Cập nhật tài liệu nội bộ thành công";
    
    showToast(message, "success");
    loadInternalDocuments(); // Reload list
  };

  // Handle form cancel
  const handleFormCancel = () => {
    setShowModal(false);
    setEditMode(false);
    setEditingDocument(null);
  };

  // Table columns
  const columns = [
    {
      key: "title",
      label: "Tiêu đề",
      sortable: true,
      width: "50%",
      render: (row, rowIndex) => (
        <div className="d-flex align-items-start">
          <div>
            <strong className="text-primary">{row.title}</strong>
            {row.description && (
              <div className="small text-muted mt-1" style={{maxWidth: '600px'}}>
                {row.description.length > 150 
                  ? `${row.description.substring(0, 150)}...` 
                  : row.description}
              </div>
            )}
          </div>
        </div>
      )
    },
    {
      key: "category",
      label: "Danh mục",
      sortable: true,
      width: "15%",
      render: (row) => {
        const category = categories.find(cat => cat.value === row.category);
        return (
          <span className="badge bg-info">
            {category ? category.label : row.category}
          </span>
        );
      }
    },
    {
      key: "status",
      label: "Trạng thái",
      sortable: true,
      width: "15%",
      render: (row) => (
        <span className={`badge ${row.status === 1 ? 'bg-success' : 'bg-secondary'}`}>
          {row.status === 1 ? 'Hoạt động' : 'Không hoạt động'}
        </span>
      )
    },
    {
      key: "timePosted",
      label: "Thời gian đăng",
      sortable: true,
      width: "20%",
      render: (row) => {
        if (!row.timePosted) return "N/A";
        return new Date(row.timePosted).toLocaleString("vi-VN");
      }
    },
  ];

  // Filter configuration for AdminFilter component
  const filterConfig = [
    {
      key: "search",
      type: "search",
      label: "Tìm kiếm",
      placeholder: "Tìm kiếm theo tiêu đề...",
      icon: "fas fa-search"
    },
    {
      key: "category",
      type: "select",
      label: "Danh mục",
      icon: "fas fa-tags",
      options: categories.map(cat => ({
        value: cat.value,
        label: cat.label
      }))
    },
    {
      key: "status",
      type: "select",
      label: "Trạng thái",
      icon: "fas fa-flag",
      options: [
        { value: "1", label: "Hoạt động" },
        { value: "0", label: "Không hoạt động" }
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

  // Actions for each row
  const actions = [
    {
      label: "Xem",
      onClick: (document) => handleViewDetail(document),
      className: "admin-btn admin-btn-xs admin-btn-info",
      icon: "bi bi-eye",
    },
    {
      label: "Sửa",
      onClick: (document) => handleEdit(document),
      className: "admin-btn admin-btn-xs admin-btn-primary",
      icon: "bi bi-pencil",
    },
    {
      label: "Tải",
      onClick: (document) => handleDownload(document),
      className: "admin-btn admin-btn-xs admin-btn-success",
      icon: "bi bi-download",
    },
    {
      label: "Xóa",
      onClick: (document) => handleDelete(document),
      className: "admin-btn admin-btn-xs admin-btn-danger",
      icon: "bi bi-trash",
    }
  ];

  return (
    <PageWrapper title="Quản lý tài liệu nội bộ">
      <div className="page-content">
        {/* Filter Section */}
        <AdminFilter
          filters={filters}
          onFiltersChange={handleFiltersChange}
          filterConfig={filterConfig}
          isSearching={isSearching}
        />

        {/* Header with Actions */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div></div>
          <AdminPageActions
            actions={[
              {
                label: "Thêm tài liệu nội bộ",
                icon: "fas fa-plus",
                onClick: handleCreateNew,
                variant: "primary"
              }
            ]}
            loading={loading}
          />
        </div>

        {/* Table */}
        <AdminTable
          columns={columns}
          data={internalDocuments}
          actions={actions}
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
          loading={loading}
          emptyText="Chưa có tài liệu nội bộ nào"
        />
      </div>

      {/* Create/Edit Modal */}
      <FormModal
        show={showModal}
        title={editMode ? "Chỉnh sửa tài liệu nội bộ" : "Thêm tài liệu nội bộ"}
        onClose={handleFormCancel}
        size="lg"
        showActions={false}
      >
        <InternalDocumentCreationForm
          onSuccess={handleFormSuccess}
          onCancel={handleFormCancel}
          editMode={editMode}
          editData={editingDocument}
        />
      </FormModal>

      {/* Document Detail Modal */}
      <FormModal
        show={showDocumentDetail}
        title="Chi tiết tài liệu nội bộ"
        onClose={() => setShowDocumentDetail(false)}
        size="lg"
      >
        {selectedDocument && (
          <div className="internal-document-detail" style={{
            wordBreak: 'break-word', 
            overflowWrap: 'break-word',
            maxWidth: '100%',
            overflow: 'hidden'
          }}>
            <h5 className="mb-3" style={{
              wordBreak: 'break-word',
              maxWidth: '100%',
              overflow: 'hidden'
            }}>{selectedDocument.title}</h5>
            
            {selectedDocument.description && (
              <div className="mb-4">
                <p className="text-muted" style={{wordBreak: 'break-word'}}>{selectedDocument.description}</p>
              </div>
            )}

            <div className="row" style={{maxWidth: '100%', margin: 0}}>
              <div className="col-md-6" style={{paddingRight: '8px'}}>
                <p style={{wordBreak: 'break-word'}}><strong>Danh mục:</strong> 
                  <span className="badge bg-info ms-2" style={{wordBreak: 'break-word'}}>
                    {categories.find(cat => cat.value === selectedDocument.category)?.label || selectedDocument.category}
                  </span>
                </p>
              </div>
              <div className="col-md-6" style={{paddingLeft: '8px'}}>
                <p style={{wordBreak: 'break-word'}}><strong>Trạng thái:</strong> 
                  <span className={`badge ms-2 ${selectedDocument.status === 1 ? 'bg-success' : 'bg-secondary'}`}>
                    {selectedDocument.status === 1 ? 'Hoạt động' : 'Không hoạt động'}
                  </span>
                </p>
              </div>
              {selectedDocument.timePosted && selectedDocument.timePosted !== "0001-01-01T00:00:00" && (
                <div className="col-md-6">
                  <p><strong>Thời gian đăng:</strong> {new Date(selectedDocument.timePosted).toLocaleString("vi-VN")}</p>
                </div>
              )}
              {selectedDocument.attachment && (
                <div className="col-md-12">
                  <p><strong>File đính kèm:</strong> 
                    <div className="d-block mt-2">
                      <a 
                        href={getApiUrl(selectedDocument.attachment.url)} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="btn btn-outline-primary btn-sm"
                        style={{wordBreak: 'break-all'}}
                      >
                        <i className="fas fa-download me-1"></i>
                        {selectedDocument.attachment.originalFileName}
                      </a>
                    </div>
                    <small className="text-muted ms-2">({Math.round(selectedDocument.attachment.fileSize / 1024)} KB)</small>
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </FormModal>

      {/* Toast Message */}
      <ToastMessage
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast(prev => ({ ...prev, show: false }))}
      />
    </PageWrapper>
  );
};

export default InternalDocumentsList;