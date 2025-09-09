import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "../../contexts/AuthContext";
import PageWrapper from "../components/PageWrapper";
import FormModal from "../components/FormModal";
import ToastMessage from "../components/ToastMessage";
import AccessDenied from "../../components/AccessDenied";
// Use consistent styling with other admin pages
import "../styles/adminTable.css";
import "../styles/adminCommon.css";
import "../styles/adminButtons.css";
import "./AlbumList.css";
import "./ContactList.css";

import albumService from "../../services/albumService";
import AlbumCreationForm from "../components/AlbumCreationForm";

const AlbumList = () => {
  const { user: currentUser, ROLES } = useAuth();

  // Data state
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);

  // Server-side pagination state
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // UI state
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "info",
  });

  // Album detail modal
  const [showAlbumDetail, setShowAlbumDetail] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [albumImages, setAlbumImages] = useState([]);

  // Pagination & filters
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filters, setFilters] = useState({
    search: "",
    status: "",
  });
  const [searchDebounce, setSearchDebounce] = useState("");

  // Load albums
  const loadAlbums = useCallback(
    async (searchFilters = {}) => {
      try {
        setLoading(true);
        const params = {
          page: currentPage,
          limit: itemsPerPage,
          search: searchFilters.search !== undefined ? searchFilters.search : searchDebounce || "",
          status: searchFilters.status !== undefined ? searchFilters.status : filters.status,
        };

        console.log("🔍 Loading albums with params:", params);
        const response = await albumService.fetchAlbums(params);
        console.log("📋 Albums response:", response);

        if (response.success) {
          let albumsData = Array.isArray(response.data) ? response.data : [];

          // Update pagination info from server response
          setTotalItems(response.total || 0);
          setTotalPages(Math.ceil((response.total || 0) / itemsPerPage));

          // Use server-side data directly (no client-side filtering)
          console.log("📋 Final albums data:", albumsData);
          setAlbums(albumsData);
        } else {
          console.log("❌ Albums response not successful:", response);
          setAlbums([]);
          setTotalItems(0);
          setTotalPages(0);
          showToast("Lỗi tải danh sách album", "error");
        }
      } catch (error) {
        console.error("Error loading albums:", error);
        setAlbums([]);
        setTotalItems(0);
        setTotalPages(0);
        showToast("Lỗi kết nối server", "error");
      } finally {
        setLoading(false);
      }
    },
    [searchDebounce, filters.status, currentPage, itemsPerPage]
  );

  useEffect(() => {
    loadAlbums();
  }, [loadAlbums]);

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

  // Effect to handle search and status filter changes
  useEffect(() => {
    // Reset to page 1 when search or status filters change
    if (currentPage !== 1) {
      setCurrentPage(1);
    } else {
      loadAlbums();
    }
  }, [searchDebounce, filters.status]);

  // Load albums when page changes
  useEffect(() => {
    if (currentPage !== 1) {
      loadAlbums();
    }
  }, [currentPage]);

  const showToast = (message, type = "info") => {
    setToast({ show: true, message, type });
  };

  const hideToast = () => {
    setToast({ ...toast, show: false });
  };

  const handleCreate = () => {
    setEditMode(false);
    setEditingItem(null);
    setShowModal(true);
  };

  const handleEdit = async (item) => {
    console.log("✏️ Editing album:", item.id);
    setEditMode(true);
    setShowModal(true);

    try {
      // Load full album details with attachments
      const response = await albumService.getAlbumById(item.id);
      if (response.success) {
        console.log("📝 Loaded album details for editing:", response.data);
        setEditingItem(response.data);
      } else {
        console.error("❌ Failed to load album details:", response.message);
        setEditingItem(item); // Fallback to basic item data
        showToast("Lỗi tải chi tiết album để chỉnh sửa", "error");
      }
    } catch (error) {
      console.error("❌ Error loading album for edit:", error);
      setEditingItem(item); // Fallback to basic item data
      showToast("Lỗi tải album để chỉnh sửa", "error");
    }
  };

  // Handle view album details
  const handleViewAlbum = async (album) => {
    console.log("👁️ Viewing album details:", album.id);
    setSelectedAlbum(album);
    setShowAlbumDetail(true);

    try {
      // Load album images from API
      const response = await albumService.getAlbumById(album.id);
      if (response.success && response.data.attachments) {
        setAlbumImages(response.data.attachments.images || []);
      }
    } catch (error) {
      console.error("Error loading album images:", error);
      showToast("Lỗi tải ảnh album", "error");
    }
  };

  // Handle delete
  const handleDelete = async (item) => {
    if (!window.confirm(`Bạn có chắc chắn muốn xóa album "${item.titleVi}"?`)) {
      return;
    }

    try {
      const response = await albumService.deleteAlbum(item.id);
      if (response.success) {
        showToast("Xóa album thành công", "success");
        loadAlbums();
      } else {
        throw new Error(response.message || "Delete failed");
      }
    } catch (error) {
      console.error("Error deleting album:", error);
      showToast("Lỗi xóa album", "error");
    }
  };

  // Page Actions matching NewsList style
  const pageActions = (
    <div style={{ display: "flex", gap: "0.5rem" }}>
      <button
        className="admin-btn admin-btn-outline-secondary"
        onClick={loadAlbums}
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
        title="Làm mới danh sách album"
      >
        <i className="fas fa-refresh"></i>
        Làm mới
      </button>
      <button
        className="admin-btn admin-btn-primary"
        onClick={handleCreate}
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
        Tạo Album Mới
      </button>
    </div>
  );

  // Check permission - Editor and above can manage albums
  console.log("🔍 Album permission check:", {
    currentUser: currentUser,
    roleId: currentUser?.roleId,
    ROLES_EDITOR: ROLES.EDITOR,
    hasPermission: currentUser && currentUser.roleId <= ROLES.EDITOR,
  });

  if (!currentUser || currentUser.roleId > ROLES.EDITOR) {
    return (
      <PageWrapper>
        <AccessDenied
          message="Bạn không có quyền truy cập trang này. Chỉ Editor, Admin và SuperAdmin mới có thể quản lý thư viện ảnh."
          user={currentUser}
        />
      </PageWrapper>
    );
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
      <div className="admin-contact-list">
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
                placeholder="Nhập tiêu đề album..."
                value={filters.search}
                onChange={(e) => {
                  const newSearch = e.target.value;
                  setFilters((prev) => ({ ...prev, search: newSearch }));
                  setCurrentPage(1);
                }}
              />
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
                <option key="visible" value="1">Hiển thị</option>
                <option key="hidden" value="0">Ẩn</option>
              </select>
            </div>
            <div className="filter-actions">
              <button
                className="admin-btn admin-btn-primary"
                onClick={() => {
                  setFilters({
                    search: "",
                    status: "",
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

        {/* Results Summary */}
        {!loading && totalItems > 0 && (
          <div className="results-summary">
            <span>
              Hiển thị {albums.length} trong tổng số {totalItems} album{totalItems > 1 ? 's' : ''}
              {filters.search && ` - Tìm kiếm: "${filters.search}"`}
              {filters.status !== "" && ` - Trạng thái: ${filters.status === "1" ? "Hiển thị" : "Ẩn"}`}
            </span>
          </div>
        )}

        {/* Table Container */}
        <div className="table-container">
          {/* Album Gallery */}
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : albums.length === 0 ? (
            <div className="text-center py-5">
              <i className="fas fa-images fa-3x text-muted mb-3"></i>
              <h5 className="text-muted">Chưa có album nào</h5>
              <p className="text-muted">
                Nhấn "Tạo Album Mới" để thêm album đầu tiên
              </p>
            </div>
          ) : (
            <div className="album-gallery">
            <div className="gallery-grid">
              {albums.map((album) => (
                <div key={album.id} className="album-card">
                  <div
                    className="album-thumbnail clickable"
                    onClick={() => handleViewAlbum(album)}
                    title={`Xem tất cả ảnh trong album "${album.titleVi}"`}
                  >
                    {album.imageUrl ? (
                      <div className="featured-image-wrapper">
                        <img
                          src={
                            album.imageUrl.startsWith("http")
                              ? album.imageUrl
                              : `${process.env.REACT_APP_API_URL}${album.imageUrl}`
                          }
                          alt={album.titleVi}
                          className="thumbnail-image"
                        />
                        <div className="album-overlay">
                          <div className="album-badge">
                            <i className="fas fa-images"></i>
                            <span>ALBUM</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="no-image">
                        <i className="fas fa-images"></i>
                        <span>Chưa có ảnh</span>
                      </div>
                    )}
                    <div className="album-status">
                      <span
                        className={`status-badge ${
                          album.status === 1 ? "active" : "inactive"
                        }`}
                      >
                        {album.status === 1 ? "Hiển thị" : "Ẩn"}
                      </span>
                    </div>
                  </div>
                  <div className="album-info">
                    <h6 className="album-title">
                      {album.titleVi || "Chưa có tiêu đề"}
                    </h6>
                    {album.titleEn && (
                      <p className="album-title-en">{album.titleEn}</p>
                    )}
                    {album.descriptionVi && (
                      <p className="album-description">
                        {album.descriptionVi.length > 80
                          ? album.descriptionVi.substring(0, 80) + "..."
                          : album.descriptionVi}
                      </p>
                    )}
                  </div>
                  <div className="album-actions">
                    <button
                      className="admin-btn admin-btn-xs admin-btn-outline-primary"
                      onClick={() => handleEdit(album)}
                      title="Chỉnh sửa"
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button
                      className="admin-btn admin-btn-xs admin-btn-outline-danger"
                      onClick={() => handleDelete(album)}
                      title="Xóa"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="pagination-wrapper">
                <nav>
                  <ul className="pagination justify-content-center">
                    <li
                      className={`page-item ${
                        currentPage === 1 ? "disabled" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        Trước
                      </button>
                    </li>
                    {[...Array(totalPages)].map(
                      (_, index) => (
                        <li
                          key={index}
                          className={`page-item ${
                            currentPage === index + 1 ? "active" : ""
                          }`}
                        >
                          <button
                            className="page-link"
                            onClick={() => setCurrentPage(index + 1)}
                          >
                            {index + 1}
                          </button>
                        </li>
                      )
                    )}
                    <li
                      className={`page-item ${
                        currentPage === totalPages ? "disabled" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      >
                        Sau
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            )}
            </div>
          )}
        </div>

        {/* Form Modal */}
        <FormModal
          show={showModal}
          onClose={() => setShowModal(false)}
          title={editMode ? "Chỉnh sửa Album" : "Tạo Album Mới"}
          size="xl"
          showActions={false}
        >
          <AlbumCreationForm
            editingAlbum={editMode ? editingItem : null}
            onSuccess={() => {
              showToast(
                editMode ? "Cập nhật album thành công" : "Tạo album thành công",
                "success"
              );
              setShowModal(false);
              setEditingItem(null);
              setEditMode(false);
              loadAlbums();
            }}
            onCancel={() => setShowModal(false)}
          />
        </FormModal>

        {/* Album Detail Modal */}
        <FormModal
          show={showAlbumDetail}
          onClose={() => setShowAlbumDetail(false)}
          title={
            selectedAlbum ? `Album: ${selectedAlbum.titleVi}` : "Chi tiết Album"
          }
          size="xl"
          showActions={false}
        >
          {selectedAlbum && (
            <div className="album-detail-content">
              <div className="album-info-header">
                <h4>{selectedAlbum.titleVi}</h4>
                {selectedAlbum.titleEn && (
                  <p className="title-en">{selectedAlbum.titleEn}</p>
                )}
                <div className="album-meta">
                  <span
                    className={`status ${
                      selectedAlbum.status === 1 ? "active" : "inactive"
                    }`}
                  >
                    {selectedAlbum.status === 1 ? "Hiển thị" : "Ẩn"}
                  </span>
                </div>
              </div>

              {albumImages.length > 0 ? (
                <div className="album-images-grid">
                  {albumImages.map((image, index) => (
                    <div key={image.id || index} className="album-image-item">
                      <img
                        src={
                          image.url?.startsWith("http")
                            ? image.url
                            : `${process.env.REACT_APP_API_URL}${
                                image.url || `/api/attachments/${image.id}`
                              }`
                        }
                        alt={`Album image ${index + 1}`}
                        className="album-detail-image"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-images-message">
                  <i className="fas fa-images fa-3x"></i>
                  <p>Album chưa có ảnh nào</p>
                </div>
              )}

              {/* Custom Actions */}
              <div
                style={{
                  marginTop: "2rem",
                  paddingTop: "1rem",
                  borderTop: "1px solid #e9ecef",
                  display: "flex",
                  gap: "0.5rem",
                  justifyContent: "flex-end",
                }}
              >
                <button
                  className="admin-btn admin-btn-secondary"
                  onClick={() => setShowAlbumDetail(false)}
                >
                  <i className="fas fa-times"></i>
                  Đóng
                </button>
                <button
                  className="admin-btn admin-btn-primary"
                  onClick={() => {
                    setShowAlbumDetail(false);
                    handleEdit(selectedAlbum);
                  }}
                  disabled={!selectedAlbum}
                >
                  <i className="fas fa-edit"></i>
                  Chỉnh sửa Album
                </button>
              </div>
            </div>
          )}
        </FormModal>

        <ToastMessage
          show={toast.show}
          message={toast.message}
          type={toast.type}
          onClose={hideToast}
        />
      </div>
    </PageWrapper>
  );
};

export default AlbumList;
