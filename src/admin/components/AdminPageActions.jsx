import React from "react";
import "./AdminPageActions.css";

/**
 * AdminPageActions - Component các nút chức năng thống nhất cho PageWrapper
 * @param {Object} props
 * @param {Array} props.actions - Mảng các action objects
 * @param {boolean} props.loading - Có đang loading không
 */
const AdminPageActions = ({ actions = [], loading = false }) => {
  // Render action button
  const renderAction = (action, index) => {
    const {
      label,
      icon,
      onClick,
      variant = "primary",
      disabled = false,
      title,
      className = "",
      ...otherProps
    } = action;

    return (
      <button
        key={index}
        className={`admin-page-action admin-page-action-${variant} ${className}`}
        onClick={onClick}
        disabled={disabled || loading}
        title={title || label}
        {...otherProps}
      >
        {loading && (index === 0) ? (
          <i className="fas fa-spinner fa-spin"></i>
        ) : icon ? (
          <i className={icon}></i>
        ) : null}
        <span>{label}</span>
      </button>
    );
  };

  if (!actions || actions.length === 0) {
    return null;
  }

  return (
    <div className="admin-page-actions">
      {actions.map(renderAction)}
    </div>
  );
};

// Predefined action creators để dễ sử dụng
AdminPageActions.createRefreshAction = (onRefresh, loading = false) => ({
  label: "Làm mới",
  icon: "fas fa-refresh",
  onClick: onRefresh,
  variant: "secondary",
  disabled: loading,
  title: "Làm mới dữ liệu"
});

AdminPageActions.createAddAction = (onAdd, label = "Thêm mới") => ({
  label,
  icon: "fas fa-plus", 
  onClick: onAdd,
  variant: "primary",
  title: `${label}`
});

AdminPageActions.createImportAction = (onImport) => ({
  label: "Nhập dữ liệu",
  icon: "fas fa-upload",
  onClick: onImport,
  variant: "info",
  title: "Nhập dữ liệu từ file"
});

AdminPageActions.createExportAction = (onExport) => ({
  label: "Xuất dữ liệu", 
  icon: "fas fa-download",
  onClick: onExport,
  variant: "success",
  title: "Xuất dữ liệu ra file"
});

AdminPageActions.createDeleteSelectedAction = (onDelete, disabled = true) => ({
  label: "Xóa đã chọn",
  icon: "fas fa-trash",
  onClick: onDelete,
  variant: "danger",
  disabled,
  title: "Xóa các mục đã chọn"
});

export default AdminPageActions;