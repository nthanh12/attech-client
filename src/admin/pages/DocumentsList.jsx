import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "../../contexts/AuthContext";
import PageWrapper from "../components/PageWrapper";
import FormModal from "../components/FormModal";
import ToastMessage from "../components/ToastMessage";
import AccessDenied from "../../components/AccessDenied";
import DataTable from "../components/DataTable";
// Use consistent styling with other admin pages
import "../styles/adminTable.css";
import "../styles/adminCommon.css";
import "../styles/adminButtons.css";
import "./DocumentsList.css";
import "./ContactList.css";

import { documentService } from "../../services/documentService";
import DocumentCreationForm from "../components/DocumentCreationForm";

const DocumentsList = () => {
  const { user: currentUser, ROLES } = useAuth();

  // Data state
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

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
    status: "",
    fileType: "",
    dateFrom: "",
    dateTo: "",
  });
  const [searchDebounce, setSearchDebounce] = useState("");

  // Debounce search - đợi user gõ xong
  useEffect(() => {
    if (filters.search !== searchDebounce) {
      setIsSearching(true);
    }
    
    const timer = setTimeout(() => {
      setSearchDebounce(filters.search);
      setIsSearching(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [filters.search]);

  // Load data on mount and when pagination/filters/sorting change
  useEffect(() => {
    loadDocuments();
  }, [currentPage, itemsPerPage, searchDebounce, filters.status, filters.fileType, filters.dateFrom, filters.dateTo, sortConfig]);

  const showToast = useCallback((message, type = "info") => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 3000);
  }, []);

  const loadDocuments = useCallback(async () => {
    try {
      setLoading(true);
      const params = {
        page: currentPage,
        pageSize: itemsPerPage,
        keyword: searchDebounce || "",
        status: filters.status,
        fileType: filters.fileType,
        dateFrom: filters.dateFrom,
        dateTo: filters.dateTo,
        sortBy: sortConfig.key,
        sortDirection: sortConfig.direction,
      };

      console.log("🔍 Loading documents with params:", params);
      const response = await documentService.getDocuments(params);
      console.log("📋 Documents response:", response);

      if (response.success) {
        let documentsData = Array.isArray(response.data.items) ? response.data.items : [];

        // Update pagination info from server response
        setTotalItems(response.data.totalItems || 0);
        setTotalPages(Math.ceil((response.data.totalItems || 0) / itemsPerPage));

        console.log("📋 Final documents data:", documentsData);
        setDocuments(documentsData);
      } else {
        console.log("❌ Documents response not successful:", response);
        setDocuments([]);
        setTotalItems(0);
        setTotalPages(0);
        showToast("Lỗi tải danh sách tài liệu", "error");
      }
    } catch (error) {
      console.error("Error loading documents:", error);
      setDocuments([]);
      setTotalItems(0);
      setTotalPages(0);
      showToast("Lỗi tải danh sách tài liệu: " + error.message, "error");
    } finally {
      setLoading(false);
    }
  }, [currentPage, itemsPerPage, searchDebounce, filters, sortConfig, showToast]);

  // Handlers
  const handleAdd = () => {
    setEditMode(false);
    setEditingDocument(null);
    setShowModal(true);
  };

  const handleEdit = async (documentItem) => {
    setEditMode(true);
    setEditingDocument(documentItem);
    setShowModal(true);
  };

  const handleDelete = async (documentItem) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa tài liệu này?")) {
      try {
        const response = await documentService.deleteDocument(documentItem.id);
        if (response.success) {
          await loadDocuments();
          showToast("Xóa tài liệu thành công!", "success");
        } else {
          throw new Error("Delete failed");
        }
      } catch (error) {
        showToast(`Xóa tài liệu thất bại: ${error.message}`, "error");
      }
    }
  };

  const handleFormSuccess = async (savedDocument) => {
    try {
      await loadDocuments();
      
      if (editMode) {
        showToast("Cập nhật tài liệu thành công!", "success");
      } else {
        showToast("Thêm tài liệu thành công!", "success");
      }
    } catch (error) {
      console.error("Error reloading data:", error);
      showToast("Có lỗi xảy ra khi tải lại dữ liệu", "error");
    }

    setShowModal(false);
    setEditingDocument(null);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingDocument(null);
  };

  const handleViewDocument = async (documentItem) => {
    try {
      setSelectedDocument(documentItem);
      setShowDocumentDetail(true);
    } catch (error) {
      showToast("Lỗi khi xem chi tiết tài liệu", "error");
    }
  };

  const handleDownloadDocument = async (documentItem) => {
    try {
      await documentService.downloadDocument(documentItem.id, documentItem.originalFileName);
      showToast("Tải xuống thành công!", "success");
    } catch (error) {
      showToast("Lỗi khi tải xuống tài liệu", "error");
    }
  };

  // Use server-side data directly (no client-side filtering/sorting)
  const paginatedDocuments = documents;

  // Table columns
  const columns = [
    { key: "id", label: "ID", sortable: true, width: "80px" },
    {
      key: "originalFileName",
      label: "Tên file",
      sortable: true,
      width: "250px",
      render: (item) => (
        <div>
          <div className="document-name" title={item.originalFileName}>
            {item.originalFileName}
          </div>
          <div className="document-title text-muted" style={{ fontSize: "0.85em" }}>
            {item.title || "Chưa có tiêu đề"}
          </div>
        </div>
      ),
    },
    {
      key: "fileType", 
      label: "Loại file",
      width: "100px",
      render: (item) => (
        <span className={`file-type-badge ${item.fileType?.toLowerCase()}`}>
          {item.fileType?.toUpperCase()}
        </span>
      ),
    },
    {
      key: "fileSize",
      label: "Kích thước",
      sortable: true,
      width: "120px",
      render: (item) => formatFileSize(item.fileSize),
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
      key: "createdAt",
      label: "Ngày tạo",
      sortable: true,
      width: "140px",
      render: (item) => new Date(item.createdAt).toLocaleDateString("vi-VN"),
    },
  ];

  const actions = [
    {
      label: "Xem",
      onClick: handleViewDocument,
      className: "admin-btn admin-btn-sm admin-btn-info",
      icon: "bi bi-eye",
    },
    {
      label: "Tải xuống",
      onClick: handleDownloadDocument,
      className: "admin-btn admin-btn-sm admin-btn-success",
      icon: "bi bi-download",
    },
    {
      label: "Sửa",
      onClick: handleEdit,
      className: "admin-btn admin-btn-sm admin-btn-primary",
      icon: "bi bi-pencil",
    },
    {
      label: "Xóa",
      onClick: handleDelete,
      className: "admin-btn admin-btn-sm admin-btn-danger",
      icon: "bi bi-trash",
    },
  ];

  // Helper function to format file size
  const formatFileSize = (bytes) => {
    if (!bytes) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  // Page Actions for the sticky action bar
  const pageActions = (
    <div style={{ display: "flex", gap: "0.5rem" }}>
      <button
        className="admin-btn admin-btn-outline-secondary"
        onClick={loadDocuments}
        disabled={loading}
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
        title="Làm mới danh sách tài liệu"
      >
        <i className="fas fa-refresh"></i>
        Làm mới
      </button>
      <button
        className="admin-btn admin-btn-primary"
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
        Thêm tài liệu
      </button>
    </div>
  );

  // Check permissions
  if (!currentUser || currentUser.roleId > ROLES.EDITOR) {
    return <AccessDenied />;
  }

  if (loading) {
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
      <div className="admin-documents-list">
        {/* Filters Section */}
        <div className="filters-section">
          <div className="filters-title">
            <i className="fas fa-filter"></i>
            Bộ lọc & Tìm kiếm
          </div>
          <div className="filters-grid">
            <div className="filter-group">
              <label>
                {isSearching ? (
                  <i className="fas fa-spinner fa-spin"></i>
                ) : (
                  <i className="fas fa-search"></i>
                )} Tìm kiếm
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Tìm kiếm theo tên file hoặc tiêu đề..."
                value={filters.search}
                onChange={(e) => {
                  const newSearch = e.target.value;
                  setFilters((prev) => ({ ...prev, search: newSearch }));
                  setCurrentPage(1);
                }}
              />
            </div>
            <div className="filter-group">
              <label><i className="fas fa-file"></i> Loại file</label>
              <select
                className="form-control"
                value={filters.fileType}
                onChange={(e) => {
                  setFilters((prev) => ({ ...prev, fileType: e.target.value }));
                  setCurrentPage(1);
                }}
              >
                <option value="">Tất cả loại file</option>
                <option value="pdf">PDF</option>
                <option value="doc">Word (DOC)</option>
                <option value="docx">Word (DOCX)</option>
                <option value="xls">Excel (XLS)</option>
                <option value="xlsx">Excel (XLSX)</option>
                <option value="ppt">PowerPoint (PPT)</option>
                <option value="pptx">PowerPoint (PPTX)</option>
                <option value="txt">Text</option>
              </select>
            </div>
            <div className="filter-group">
              <label><i className="fas fa-flag"></i> Trạng thái</label>
              <select
                className="form-control"
                value={filters.status}
                onChange={(e) => {
                  setFilters((prev) => ({ ...prev, status: e.target.value }));
                  setCurrentPage(1);
                }}
              >
                <option key="all-status" value="">Tất cả trạng thái</option>
                <option key="active" value="1">Hiển thị</option>
                <option key="inactive" value="0">Ẩn</option>
              </select>
            </div>
            <div className="filter-group">
              <label><i className="fas fa-calendar"></i> Từ ngày</label>
              <input
                type="date"
                className="form-control"
                value={filters.dateFrom}
                onChange={(e) => {
                  setFilters((prev) => ({ ...prev, dateFrom: e.target.value }));
                  setCurrentPage(1);
                }}
              />
            </div>
            <div className="filter-group">
              <label><i className="fas fa-calendar"></i> Đến ngày</label>
              <input
                type="date"
                className="form-control"
                value={filters.dateTo}
                onChange={(e) => {
                  setFilters((prev) => ({ ...prev, dateTo: e.target.value }));
                  setCurrentPage(1);
                }}
              />
            </div>
            <div className="filter-actions">
              <button
                className="admin-btn admin-btn-primary"
                onClick={() => {
                  setFilters({
                    search: "",
                    status: "",
                    fileType: "",
                    dateFrom: "",
                    dateTo: "",
                  });
                  setCurrentPage(1);
                }}
                title="Xóa tất cả bộ lọc"
              >
                <i className="fas fa-eraser"></i>
                Xóa lọc
              </button>
            </div>
          </div>
        </div>

        {/* Table Container */}
        <div className="table-container">
          <DataTable
            data={paginatedDocuments}
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
          />
        </div>

        {/* Modal with DocumentCreationForm */}
        <FormModal
          show={showModal}
          onClose={handleCloseModal}
          title={editMode ? "Chỉnh sửa tài liệu" : "Thêm tài liệu mới"}
          size="lg"
          showActions={false}
        >
          <DocumentCreationForm
            editingDocument={editingDocument}
            onSuccess={handleFormSuccess}
            onCancel={handleCloseModal}
          />
        </FormModal>

        {/* Document Detail Modal */}
        <FormModal
          show={showDocumentDetail}
          onClose={() => setShowDocumentDetail(false)}
          title="Chi tiết tài liệu"
          size="md"
          showActions={false}
        >
          {selectedDocument && (
            <div className="document-detail">
              <div className="detail-row">
                <strong>Tên file:</strong> {selectedDocument.originalFileName}
              </div>
              <div className="detail-row">
                <strong>Tiêu đề:</strong> {selectedDocument.title || "Chưa có"}
              </div>
              <div className="detail-row">
                <strong>Mô tả:</strong> {selectedDocument.description || "Chưa có"}
              </div>
              <div className="detail-row">
                <strong>Loại file:</strong> {selectedDocument.fileType?.toUpperCase()}
              </div>
              <div className="detail-row">
                <strong>Kích thước:</strong> {formatFileSize(selectedDocument.fileSize)}
              </div>
              <div className="detail-row">
                <strong>Ngày tạo:</strong> {new Date(selectedDocument.createdAt).toLocaleDateString("vi-VN")}
              </div>
              <div className="detail-row">
                <strong>URL:</strong> 
                <a href={selectedDocument.fileUrl} target="_blank" rel="noopener noreferrer">
                  {selectedDocument.fileUrl}
                </a>
              </div>
            </div>
          )}
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

export default DocumentsList;