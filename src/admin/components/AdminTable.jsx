import React from "react";
import SimplePagination from "./SimplePagination";
import "./AdminTable.css";

/**
 * AdminTable - Component table thống nhất cho tất cả trang admin
 * @param {Object} props
 * @param {Array} props.columns - Mảng columns với format { key, label, sortable, width, render }
 * @param {Array} props.data - Dữ liệu hiển thị
 * @param {Array} props.actions - Mảng actions cho mỗi row
 * @param {Function} props.onSort - Callback khi sort column
 * @param {Object} props.sortConfig - Config sort hiện tại { key, direction }
 * @param {boolean} props.loading - Trạng thái loading
 * @param {string} props.emptyText - Text hiển thị khi không có dữ liệu
 * @param {number} props.currentPage - Trang hiện tại
 * @param {number} props.totalPages - Tổng số trang
 * @param {Function} props.onPageChange - Callback khi đổi trang
 * @param {number} props.itemsPerPage - Số item trên mỗi trang
 * @param {Function} props.onItemsPerPageChange - Callback khi đổi items per page
 * @param {number} props.totalItems - Tổng số items
 * @param {string} props.variant - Variant styling: 'default', 'compact', 'bordered'
 */
const AdminTable = ({ 
  columns = [], 
  data = [], 
  actions = [],
  onSort, 
  sortConfig = null, 
  loading = false, 
  emptyText = "Không có dữ liệu",
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  itemsPerPage = 10,
  onItemsPerPageChange,
  totalItems = 0,
  variant = "default"
}) => {
  // Validate columns
  if (!columns || !Array.isArray(columns)) {
    console.error('AdminTable: columns prop is invalid:', columns);
    return (
      <div className="admin-table-error">
        <div className="error-message">
          <i className="fas fa-exclamation-triangle"></i>
          Error: Invalid columns configuration
        </div>
      </div>
    );
  }

  // Validate data
  if (!data || !Array.isArray(data)) {
    console.error('AdminTable: data prop is invalid:', data);
    return (
      <div className="admin-table-error">
        <div className="error-message">
          <i className="fas fa-exclamation-triangle"></i>
          Error: Invalid data configuration
        </div>
      </div>
    );
  }

  const showActions = actions && actions.length > 0;
  const hasActionsColumn = columns.some(col => col.key === 'actions');

  return (
    <div className={`admin-table-wrapper admin-table-${variant}`}>
      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              {columns.map((col, index) => (
                <th
                  key={col.key || `col-${index}`}
                  onClick={col.sortable && onSort ? () => onSort(col.key) : undefined}
                  className={`admin-table-header ${col.sortable ? "sortable" : ""}`}
                  style={col.width ? { width: col.width, minWidth: col.width } : {}}
                >
                  <div className="admin-table-header-content">
                    <span className="admin-table-header-text">
                      {col.label || `Column ${index + 1}`}
                    </span>
                    {sortConfig && sortConfig.key === col.key && (
                      <span className="sort-indicator">
                        {sortConfig.direction === "asc" ? (
                          <i className="fas fa-sort-up"></i>
                        ) : (
                          <i className="fas fa-sort-down"></i>
                        )}
                      </span>
                    )}
                    {col.sortable && (!sortConfig || sortConfig.key !== col.key) && (
                      <span className="sort-indicator inactive">
                        <i className="fas fa-sort"></i>
                      </span>
                    )}
                  </div>
                </th>
              ))}
              {(showActions || (!hasActionsColumn)) && (
                <th 
                  className="admin-table-header admin-table-actions-header"
                  style={{ width: '150px', minWidth: '150px' }}
                >
                  <div className="admin-table-header-content">
                    <span className="admin-table-header-text">Thao tác</span>
                  </div>
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td 
                  colSpan={columns.length + (showActions || !hasActionsColumn ? 1 : 0)} 
                  className="admin-table-loading"
                >
                  <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <span>Đang tải dữ liệu...</span>
                  </div>
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td 
                  colSpan={columns.length + (showActions || !hasActionsColumn ? 1 : 0)} 
                  className="admin-table-empty"
                >
                  <div className="empty-container">
                    <i className="fas fa-inbox"></i>
                    <span>{emptyText}</span>
                  </div>
                </td>
              </tr>
            ) : (
              data.map((row, rowIndex) => (
                <tr key={row.id || `row-${rowIndex}`} className="admin-table-row"> 
                  {columns.map((col, colIndex) => (
                    <td 
                      key={col.key || `col-${colIndex}`}
                      className="admin-table-cell"
                      style={col.width ? { width: col.width, minWidth: col.width } : {}}
                    >
                      {col.render ? col.render(row, rowIndex) : (
                        (() => {
                          const value = row[col.key];
                          if (value === null || value === undefined) return '—';
                          if (typeof value === 'object') {
                            console.warn(`Warning: Object found in column ${col.key}:`, value);
                            return `[Object: ${Object.keys(value).join(', ')}]`;
                          }
                          return String(value);
                        })()
                      )}
                    </td>
                  ))}
                  {(showActions || !hasActionsColumn) && (
                    <td className="admin-table-cell admin-table-actions-cell">
                      <div className="admin-table-actions">
                        {showActions ? (
                          actions
                            .filter(action => !action.condition || action.condition(row))
                            .map((action, actionIndex) => (
                              <button
                                key={actionIndex}
                                className={`admin-table-action-btn ${action.className || 'admin-table-action-default'}`}
                                onClick={() => action.onClick(row)}
                                title={action.title || action.label}
                                disabled={action.disabled}
                              >
                                {action.icon && <i className={action.icon}></i>}
                                <span>{action.label}</span>
                              </button>
                            ))
                        ) : (
                          <>
                            <button
                              className="admin-table-action-btn admin-table-action-edit"
                              onClick={() => console.warn('Edit action not implemented')}
                              title="Chỉnh sửa"
                            >
                              <i className="fas fa-edit"></i>
                              <span>Sửa</span>
                            </button>
                            <button
                              className="admin-table-action-btn admin-table-action-delete"
                              onClick={() => console.warn('Delete action not implemented')}
                              title="Xóa"
                            >
                              <i className="fas fa-trash"></i>
                              <span>Xóa</span>
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && onPageChange && (
        <div className="admin-table-pagination">
          <SimplePagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
            itemsPerPage={itemsPerPage}
            onItemsPerPageChange={onItemsPerPageChange}
            totalItems={totalItems}
          />
        </div>
      )}
    </div>
  );
};

// Utility functions for creating common column types
AdminTable.createColumn = (key, label, options = {}) => ({
  key,
  label,
  sortable: options.sortable || false,
  width: options.width,
  render: options.render
});

AdminTable.createStatusColumn = (key = "status", label = "Trạng thái") => ({
  key,
  label,
  sortable: true,
  width: "120px",
  render: (row) => {
    const status = row[key];
    const isActive = status === 1 || status === "active" || status === true;
    return (
      <span className={`admin-table-badge ${isActive ? 'admin-table-badge-success' : 'admin-table-badge-secondary'}`}>
        {isActive ? 'Hoạt động' : 'Không hoạt động'}
      </span>
    );
  }
});

AdminTable.createDateColumn = (key, label, format = "vi-VN") => ({
  key,
  label,
  sortable: true,
  width: "140px",
  render: (row) => {
    const date = row[key];
    if (!date) return '—';
    try {
      return new Date(date).toLocaleDateString(format);
    } catch (e) {
      return date;
    }
  }
});

AdminTable.createImageColumn = (key, label = "Ảnh", defaultImage = null) => ({
  key,
  label,
  width: "80px",
  render: (row) => {
    const imageUrl = row[key];
    if (!imageUrl && !defaultImage) return '—';
    
    return (
      <div className="admin-table-image">
        <img 
          src={imageUrl || defaultImage} 
          alt={row.title || row.name || 'Image'}
          onError={(e) => {
            e.target.src = defaultImage || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIGZpbGw9IiNjY2MiIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTIgMkM2LjQ4IDIgMiA2LjQ4IDIgMTJzNC40OCAxMCAxMCAxMCAxMC00LjQ4IDEwLTEwUzE3LjUyIDIgMTIgMnptLTIgMTVsLTUtNSAxLjQxLTEuNDFMMTAgMTQuMTdsNy41OS03LjU5TDE5IDhsLTkgOXoiLz48L3N2Zz4=';
          }}
        />
      </div>
    );
  }
});

export default AdminTable;