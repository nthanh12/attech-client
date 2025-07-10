import React, { useState, useEffect, useMemo, useCallback } from "react";
import DataTable from "../components/DataTable";
import FormModal from "../components/FormModal";
// import ToastMessage nếu có
// import các hàm API tương ứng (getAccounts, createAccount, updateAccount, deleteAccount)
import LoadingSpinner from "../components/LoadingSpinner";
import "./AccountsList.css";

const AccountsList = () => {
  const [accounts, setAccounts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [currentAccount, setCurrentAccount] = useState({
    id: null,
    username: "",
    email: "",
    role: "admin",
    status: "active",
    createdAt: new Date().toISOString().split("T")[0],
  });
  const [errors, setErrors] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState({ key: "id", direction: "asc" });
  const [filters, setFilters] = useState({
    search: "",
    role: "",
    status: "",
  });
  // const [toast, setToast] = useState({ show: false, message: "", type: "" });

  useEffect(() => {
    let mounted = true;
    const fetchAccounts = async () => {
      setIsLoading(true);
      try {
        // const items = await getAccounts();
        // if (mounted) setAccounts(items);
      } catch (error) {
        // setToast({ show: true, message: "Lỗi khi tải tài khoản!", type: "error" });
      } finally {
        if (mounted) setIsLoading(false);
      }
    };
    fetchAccounts();
    return () => { mounted = false; };
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
    setEditMode(false);
    setErrors({});
    setCurrentAccount({
      id: null,
      username: "",
      email: "",
      role: "admin",
      status: "active",
      createdAt: new Date().toISOString().split("T")[0],
    });
  }, []);

  const handleShowModal = useCallback((accountItem = null) => {
    if (accountItem) {
      setCurrentAccount(accountItem);
      setEditMode(true);
    } else {
      setEditMode(false);
    }
    setShowModal(true);
  }, []);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setCurrentAccount((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }, []);

  const validateForm = useCallback(() => {
    const newErrors = {};
    if (!currentAccount.username) newErrors.username = "Tên đăng nhập là bắt buộc";
    if (!currentAccount.email) newErrors.email = "Email là bắt buộc";
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(currentAccount.email)) newErrors.email = "Email không hợp lệ";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [currentAccount]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setSubmitLoading(true);
    try {
      if (editMode) {
        // await updateAccount(currentAccount.id, currentAccount);
        setAccounts((prev) => prev.map((n) => (n.id === currentAccount.id ? currentAccount : n)));
        // setToast({ show: true, message: "Cập nhật tài khoản thành công!", type: "success" });
      } else {
        // const newAccount = await createAccount(currentAccount);
        // setAccounts((prev) => [...prev, newAccount]);
        // setToast({ show: true, message: "Thêm tài khoản thành công!", type: "success" });
      }
      handleCloseModal();
      // setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
    } catch (error) {
      // setToast({ show: true, message: "Lỗi khi lưu tài khoản!", type: "error" });
    } finally {
      setSubmitLoading(false);
    }
  }, [editMode, currentAccount, validateForm, handleCloseModal]);

  const handleDeleteAccount = useCallback(async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa tài khoản này?")) {
      try {
        // await deleteAccount(id);
        setAccounts((prev) => prev.filter((n) => n.id !== id));
        // setToast({ show: true, message: "Xóa tài khoản thành công!", type: "success" });
        // setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
      } catch (error) {
        // setToast({ show: true, message: "Lỗi khi xóa tài khoản!", type: "error" });
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

  const getFilteredAndSortedAccounts = useCallback(() => {
    let filteredAccounts = [...accounts];
    if (filters.search) {
      filteredAccounts = filteredAccounts.filter((n) =>
        n.username.toLowerCase().includes(filters.search.toLowerCase()) ||
        n.email.toLowerCase().includes(filters.search.toLowerCase())
      );
    }
    if (filters.role) {
      filteredAccounts = filteredAccounts.filter((n) => n.role === filters.role);
    }
    if (filters.status) {
      filteredAccounts = filteredAccounts.filter((n) => n.status === filters.status);
    }
    filteredAccounts.sort((a, b) => {
      const key = sortConfig.key;
      const direction = sortConfig.direction === "asc" ? 1 : -1;
      if (key === "username" || key === "email" || key === "role" || key === "status") {
        return a[key].localeCompare(b[key]) * direction;
      } else if (key === "createdAt") {
        return (new Date(a[key]) - new Date(b[key])) * direction;
      }
      return (a[key] - b[key]) * direction;
    });
    return filteredAccounts;
  }, [accounts, filters, sortConfig]);

  const filteredAccounts = useMemo(() => getFilteredAndSortedAccounts(), [getFilteredAndSortedAccounts]);
  const totalPages = Math.ceil(filteredAccounts.length / itemsPerPage);
  const paginatedAccounts = useMemo(() => filteredAccounts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage), [filteredAccounts, currentPage, itemsPerPage]);

  const handlePageChange = useCallback((page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  }, [totalPages]);

  // Columns config for DataTable
  const columns = useMemo(() => [
    { key: "id", title: "ID", sortable: true },
    { key: "username", title: "Tên đăng nhập", sortable: true },
    { key: "email", title: "Email", sortable: true },
    { key: "role", title: "Vai trò", sortable: true },
    { key: "status", title: "Trạng thái", sortable: true, render: (val) => <span className={`badge badge-${val === "active" ? "success" : "danger"}`}>{val === "active" ? "Hoạt động" : "Khóa"}</span> },
    { key: "createdAt", title: "Ngày tạo", sortable: true },
  ], []);

  // Fields config for FormModal
  const fields = useMemo(() => [
    { name: "username", label: "Tên đăng nhập", type: "text", required: true },
    { name: "email", label: "Email", type: "text", required: true },
    { name: "role", label: "Vai trò", type: "select", required: true, options: [
      { value: "admin", label: "Admin" },
      { value: "editor", label: "Editor" },
      { value: "viewer", label: "Viewer" },
    ] },
    { name: "status", label: "Trạng thái", type: "select", options: [
      { value: "active", label: "Hoạt động" },
      { value: "locked", label: "Khóa" },
    ] },
    { name: "createdAt", label: "Ngày tạo", type: "date", disabled: true },
  ], []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="admin-account-list">
      {/* <ToastMessage
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ show: false, message: "", type: "" })}
      /> */}
      <div className="card">
        <div className="card-header">
          <h3>Quản lý tài khoản</h3>
          <button className="btn btn-primary" onClick={() => handleShowModal()}>
            Thêm tài khoản mới
          </button>
        </div>
        <div className="card-body">
          <div className="filter-group">
            <input
              type="text"
              className="form-control"
              placeholder="Tìm kiếm tên đăng nhập hoặc email..."
              name="search"
              value={filters.search}
              onChange={handleFilterChange}
            />
            <select
              className="form-control"
              name="role"
              value={filters.role}
              onChange={handleFilterChange}
            >
              <option value="">Tất cả vai trò</option>
              <option value="admin">Admin</option>
              <option value="editor">Editor</option>
              <option value="viewer">Viewer</option>
            </select>
            <select
              className="form-control"
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
            >
              <option value="">Tất cả trạng thái</option>
              <option value="active">Hoạt động</option>
              <option value="locked">Khóa</option>
            </select>
          </div>
          <DataTable
            columns={columns}
            data={paginatedAccounts}
            onEdit={handleShowModal}
            onDelete={handleDeleteAccount}
            onSort={handleSort}
            sortConfig={sortConfig}
            loading={isLoading}
            emptyText="Không có tài khoản nào phù hợp"
          />
          <div className="pagination-container">
            <div className="pagination-info">
              Hiển thị {paginatedAccounts.length} / {filteredAccounts.length} tài khoản
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
        values={currentAccount}
        errors={errors}
        onChange={handleInputChange}
        loading={submitLoading}
        title={editMode ? "Chỉnh sửa tài khoản" : "Thêm tài khoản mới"}
        submitText={editMode ? "Cập nhật" : "Thêm mới"}
        cancelText="Hủy"
      />
    </div>
  );
};

export default AccountsList; 