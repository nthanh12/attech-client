import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../contexts/AuthContext";
import {
  fetchContactMessages,
  getContactById,
  markAsRead,
  markAsUnread,
  deleteContactMessage,
} from "../../services/contactService";
import DataTable from "../components/DataTable";
import ToastMessage from "../components/ToastMessage";
import PageWrapper from "../components/PageWrapper";
import AccessDenied from "../../components/AccessDenied";
import AdminFilter from "../components/AdminFilter";
import AdminPageActions from "../components/AdminPageActions";
import AdminTable from "../components/AdminTable";
import "./ContactList.css";
import "../styles/adminTable.css";
import "../styles/adminCommon.css";
import "../styles/adminButtons.css";

const ContactList = () => {
  const { t } = useTranslation();
  const { user: currentUser, ROLES } = useAuth();

  // Data state - hooks must be called first
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // UI state
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "info",
  });
  const [selectedContact, setSelectedContact] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  // Server-side pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [searchDebounce, setSearchDebounce] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "submittedAt",
    direction: "desc",
  });
  const [filters, setFilters] = useState({
    search: "",
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
    }, 800);

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
  }, [
    currentPage,
    itemsPerPage,
    searchDebounce,
    filters.status,
    filters.dateFrom,
    filters.dateTo,
    sortConfig,
  ]);

  // Check permissions after all hooks
  if (!currentUser || currentUser.roleId > ROLES.EDITOR) {
    return <AccessDenied />;
  }

  const loadData = async (showLoadingIndicator = true) => {
    if (showLoadingIndicator) {
      setIsLoading(true);
    }
    try {
      const contactData = await fetchContactMessages(
        currentPage,
        itemsPerPage,
        searchDebounce,
        filters,
        sortConfig
      );

      setContacts(contactData?.items || []);
      setTotalItems(contactData?.totalItems || 0);
      setTotalPages(contactData?.totalPages || 0);
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
  const handleViewContact = async (contactItem) => {
    try {
      const response = await getContactById(contactItem.id);
      if (response && response.status === 1) {
        alert(
          `Chi tiết liên hệ:\n\nHọ tên: ${response.data.name}\nEmail: ${
            response.data.email
          }\nSố điện thoại: ${
            response.data.phoneNumber || "Không có"
          }\nTiêu đề: ${response.data.subject}\n\nTin nhắn:\n${
            response.data.message
          }\n\nNgày gửi: ${new Date(response.data.submittedAt).toLocaleString(
            "vi-VN"
          )}`
        );
      }
    } catch (error) {
      setToast({
        show: true,
        message: `Không thể tải chi tiết: ${error.message}`,
        type: "error",
      });
    }
  };

  const handleMarkAsRead = async (contactItem) => {
    try {
      const response = await markAsRead(contactItem.id);
      if (response && response.status === 1) {
        await loadData();
        setToast({
          show: true,
          message: "Đánh dấu đã đọc thành công!",
          type: "success",
        });
      } else {
        throw new Error("Update failed");
      }
    } catch (error) {
      setToast({
        show: true,
        message: `Cập nhật trạng thái thất bại: ${error.message}`,
        type: "error",
      });
    }
  };

  const handleMarkAsUnread = async (contactItem) => {
    try {
      const response = await markAsUnread(contactItem.id);
      if (response && response.status === 1) {
        await loadData();
        setToast({
          show: true,
          message: "Đánh dấu chưa đọc thành công!",
          type: "success",
        });
      } else {
        throw new Error("Update failed");
      }
    } catch (error) {
      setToast({
        show: true,
        message: `Cập nhật trạng thái thất bại: ${error.message}`,
        type: "error",
      });
    }
  };

  const handleDelete = async (contactItem) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa tin nhắn liên hệ này?")) {
      try {
        const response = await deleteContactMessage(contactItem.id);
        if (response && response.status === 1) {
          await loadData();
          setToast({
            show: true,
            message: "Xóa tin nhắn thành công!",
            type: "success",
          });
        } else {
          throw new Error("Delete failed");
        }
      } catch (error) {
        setToast({
          show: true,
          message: `Xóa tin nhắn thất bại: ${error.message}`,
          type: "error",
        });
      }
    }
  };

  // Filter configuration for AdminFilter component
  const filterConfig = [
    {
      key: "search",
      type: "search", 
      label: "Tìm kiếm",
      placeholder: "Nhập tên, email, số điện thoại hoặc tiêu đề...",
      icon: "fas fa-search"
    },
    {
      key: "status",
      type: "select",
      label: "Trạng thái",
      icon: "fas fa-flag",
      options: [
        { value: "read", label: "Đã đọc" },
        { value: "unread", label: "Chưa đọc" }
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
  const paginatedContacts = contacts;

  // Table columns
  const columns = [
    { key: "id", label: "ID", sortable: true, width: "80px" },
    { key: "name", label: "Họ tên", sortable: true, width: "150px" },
    { key: "email", label: "Email", sortable: true, width: "180px" },
    {
      key: "phoneNumber",
      label: "Số điện thoại",
      sortable: true,
      width: "130px",
    },
    { key: "subject", label: "Tiêu đề", sortable: true, width: "180px" },
    {
      key: "message",
      label: "Tin nhắn",
      width: "300px",
      render: (item) => (
        <div className="message-preview">
          {item.message.length > 100
            ? `${item.message.substring(0, 100)}...`
            : item.message}
        </div>
      ),
    },
    {
      key: "status",
      label: "Trạng thái",
      width: "120px",
      render: (item) => (
        <span
          className={`badge ${
            item.status === 1 ? "badge-success" : "badge-warning"
          }`}
        >
          {item.status === 1 ? "Đã đọc" : "Chưa đọc"}
        </span>
      ),
    },
    {
      key: "submittedAt",
      label: "Ngày gửi",
      sortable: true,
      width: "140px",
      render: (item) => new Date(item.submittedAt).toLocaleDateString("vi-VN"),
    },
  ];

  const actions = [
    {
      label: "Xem",
      onClick: handleViewContact,
      className: "admin-btn admin-btn-xs admin-btn-info",
    },
    {
      label: "Đã đọc",
      onClick: handleMarkAsRead,
      className: "admin-btn admin-btn-xs admin-btn-success",
      condition: (item) => item.status !== 1,
    },
    {
      label: "Chưa đọc",
      onClick: handleMarkAsUnread,
      className: "admin-btn admin-btn-xs admin-btn-warning",
      condition: (item) => item.status === 1,
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
        AdminPageActions.createRefreshAction(loadData, isLoading)
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
            data={paginatedContacts}
            columns={columns}
            actions={actions}
            sortConfig={sortConfig}
            onSort={(key) => {
              setSortConfig((prev) => ({
                key,
                direction:
                  prev.key === key && prev.direction === "desc"
                    ? "asc"
                    : "desc",
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
            emptyText="Chưa có tin nhắn liên hệ nào"
        />

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

export default ContactList;
