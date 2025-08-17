import React from "react";

const DataTable = ({ 
  columns, 
  data, 
  actions,
  onEdit, 
  onDelete, 
  onSort, 
  sortConfig = null, 
  loading, 
  emptyText,
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  totalItems,
  tableClassName = "admin-table"
}) => {
  // Validate columns
  if (!columns || !Array.isArray(columns)) {
    console.error('DataTable: columns prop is invalid:', columns);
    return <div>Error: Invalid columns configuration</div>;
  }
  // Validate data
  if (!data || !Array.isArray(data)) {
    console.error('DataTable: data prop is invalid:', data);
    return <div>Error: Invalid data configuration</div>;
  }
  // Check if there's already an actions column in the columns definition
  const hasActionsColumn = columns.some(col => col.key === 'actions');
  const showActions = actions && actions.length > 0;

  return (
    <div className="table-container">
      <table className={tableClassName} style={{ width: '100%' }}>
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th
                key={col.key || `col-${index}`}
                onClick={col.sortable && onSort ? () => onSort(col.key) : undefined}
                className={col.sortable ? "sortable" : ""}
                style={col.width ? { width: col.width, minWidth: col.width } : {}}
              >
                {col.label || `Column ${index + 1}`}
                {sortConfig && sortConfig.key === col.key && sortConfig.direction && (
                  <span className="sort-indicator">
                    {sortConfig.direction === "asc" ? " ↑" : " ↓"}
                  </span>
                )}
              </th>
            ))}
            {/* Add actions column if actions are provided or if onEdit/onDelete are provided */}
            {(showActions || (!hasActionsColumn && (onEdit || onDelete))) && (
              <th style={{ width: '150px', minWidth: '150px' }}>Thao tác</th>
            )}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={columns.length + (showActions || (!hasActionsColumn && (onEdit || onDelete)) ? 1 : 0)} className="loading">
                <div className="loading-spinner">Đang tải...</div>
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length + (showActions || (!hasActionsColumn && (onEdit || onDelete)) ? 1 : 0)} className="no-data">
                {emptyText || "Không có dữ liệu"}
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr key={row.id || `row-${rowIndex}`}> 
                {columns.map((col, colIndex) => (
                  <td 
                    key={col.key || `col-${colIndex}`}
                    style={col.width ? { width: col.width, minWidth: col.width } : {}}
                  >
                    {col.render ? col.render(row, rowIndex) : (
                      (() => {
                        const value = row[col.key];
                        if (value === null || value === undefined) return '';
                        if (typeof value === 'object') {
                          console.warn(`Warning: Object found in column ${col.key}:`, value);
                          return `[Object: ${Object.keys(value).join(', ')}]`;
                        }
                        return String(value);
                      })()
                    )}
                  </td>
                ))}
                {/* Render actions if provided, otherwise fallback to onEdit/onDelete */}
                {(showActions || (!hasActionsColumn && (onEdit || onDelete))) && (
                  <td style={{ width: '150px', minWidth: '150px' }}>
                    <div className="action-buttons">
                      {showActions ? (
                        actions.map((action, actionIndex) => (
                          <button
                            key={actionIndex}
                            className={action.className || "btn btn-sm"}
                            onClick={() => action.onClick(row)}
                            title={action.title || action.label}
                          >
                            {action.icon && <i className={action.icon}></i>}
                            <span>{action.label}</span>
                          </button>
                        ))
                      ) : (
                        <>
                          {onEdit && (
                            <button 
                              className="btn btn-sm btn-primary" 
                              onClick={() => onEdit(row)}
                              title="Chỉnh sửa"
                            >
                              <i className="bi bi-pencil"></i>
                              <span>Sửa</span>
                            </button>
                          )}
                          {onDelete && (
                            <button 
                              className="btn btn-sm btn-danger" 
                              onClick={() => onDelete(row.id || row)}
                              title="Xóa"
                            >
                              <i className="bi bi-trash"></i>
                              <span>Xóa</span>
                            </button>
                          )}
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
      {/* Modern Pagination */}
      {totalPages && totalPages > 1 && (
        <div className="pagination-container" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '1rem',
          padding: '1rem',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          border: '1px solid #e9ecef'
        }}>
          <div className="pagination-info" style={{
            color: '#6c757d',
            fontSize: '0.875rem'
          }}>
            Hiển thị <strong>{((currentPage - 1) * itemsPerPage) + 1}</strong> - <strong>{Math.min(currentPage * itemsPerPage, totalItems)}</strong> của <strong>{totalItems}</strong> kết quả
          </div>
          <div className="pagination" style={{
            display: 'flex',
            gap: '0.25rem',
            alignItems: 'center'
          }}>
            <button
              className="page-btn"
              onClick={() => onPageChange && onPageChange(1)}
              disabled={!currentPage || currentPage === 1}
              style={{
                padding: '0.5rem 0.75rem',
                border: '1px solid #dee2e6',
                backgroundColor: !currentPage || currentPage === 1 ? '#f8f9fa' : 'white',
                color: !currentPage || currentPage === 1 ? '#6c757d' : '#495057',
                borderRadius: '6px',
                cursor: !currentPage || currentPage === 1 ? 'not-allowed' : 'pointer',
                fontSize: '0.875rem',
                transition: 'all 0.2s'
              }}
              title="Trang đầu"
            >
              <i className="bi bi-chevron-double-left"></i>
            </button>
            <button
              className="page-btn"
              onClick={() => onPageChange && onPageChange(currentPage - 1)}
              disabled={!currentPage || currentPage === 1}
              style={{
                padding: '0.5rem 0.75rem',
                border: '1px solid #dee2e6',
                backgroundColor: !currentPage || currentPage === 1 ? '#f8f9fa' : 'white',
                color: !currentPage || currentPage === 1 ? '#6c757d' : '#495057',
                borderRadius: '6px',
                cursor: !currentPage || currentPage === 1 ? 'not-allowed' : 'pointer',
                fontSize: '0.875rem',
                transition: 'all 0.2s'
              }}
              title="Trang trước"
            >
              <i className="bi bi-chevron-left"></i>
            </button>
            {/* Smart page number display */}
            {(() => {
              const maxVisible = 5;
              let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
              let endPage = Math.min(totalPages, startPage + maxVisible - 1);
              if (endPage - startPage + 1 < maxVisible) {
                startPage = Math.max(1, endPage - maxVisible + 1);
              }
              const pages = [];
              if (startPage > 1) {
                pages.push(
                  <button key={1} className="page-btn" onClick={() => onPageChange && onPageChange(1)} style={{
                    padding: '0.5rem 0.75rem',
                    border: '1px solid #dee2e6',
                    backgroundColor: 'white',
                    color: '#495057',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    minWidth: '2.5rem'
                  }}>1</button>
                );
                if (startPage > 2) {
                  pages.push(<span key="ellipsis1" style={{ padding: '0 0.5rem', color: '#6c757d' }}>...</span>);
                }
              }
              for (let i = startPage; i <= endPage; i++) {
                pages.push(
                  <button
                    key={i}
                    className="page-btn"
                    onClick={() => onPageChange && onPageChange(i)}
                    style={{
                      padding: '0.5rem 0.75rem',
                      border: '1px solid #dee2e6',
                      backgroundColor: currentPage === i ? '#007bff' : 'white',
                      color: currentPage === i ? 'white' : '#495057',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      fontWeight: currentPage === i ? '600' : '400',
                      minWidth: '2.5rem',
                      transition: 'all 0.2s'
                    }}
                  >
                    {i}
                  </button>
                );
              }
              if (endPage < totalPages) {
                if (endPage < totalPages - 1) {
                  pages.push(<span key="ellipsis2" style={{ padding: '0 0.5rem', color: '#6c757d' }}>...</span>);
                }
                pages.push(
                  <button key={totalPages} className="page-btn" onClick={() => onPageChange && onPageChange(totalPages)} style={{
                    padding: '0.5rem 0.75rem',
                    border: '1px solid #dee2e6',
                    backgroundColor: 'white',
                    color: '#495057',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    minWidth: '2.5rem'
                  }}>{totalPages}</button>
                );
              }
              return pages;
            })()}
            <button
              className="page-btn"
              onClick={() => onPageChange && onPageChange(currentPage + 1)}
              disabled={!currentPage || currentPage === totalPages}
              style={{
                padding: '0.5rem 0.75rem',
                border: '1px solid #dee2e6',
                backgroundColor: !currentPage || currentPage === totalPages ? '#f8f9fa' : 'white',
                color: !currentPage || currentPage === totalPages ? '#6c757d' : '#495057',
                borderRadius: '6px',
                cursor: !currentPage || currentPage === totalPages ? 'not-allowed' : 'pointer',
                fontSize: '0.875rem',
                transition: 'all 0.2s'
              }}
              title="Trang sau"
            >
              <i className="bi bi-chevron-right"></i>
            </button>
            <button
              className="page-btn"
              onClick={() => onPageChange && onPageChange(totalPages)}
              disabled={!currentPage || currentPage === totalPages}
              style={{
                padding: '0.5rem 0.75rem',
                border: '1px solid #dee2e6',
                backgroundColor: !currentPage || currentPage === totalPages ? '#f8f9fa' : 'white',
                color: !currentPage || currentPage === totalPages ? '#6c757d' : '#495057',
                borderRadius: '6px',
                cursor: !currentPage || currentPage === totalPages ? 'not-allowed' : 'pointer',
                fontSize: '0.875rem',
                transition: 'all 0.2s'
              }}
              title="Trang cuối"
            >
              <i className="bi bi-chevron-double-right"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;
