import React from "react";

const DataTable = ({ 
  columns, 
  data, 
  onEdit, 
  onDelete, 
  onSort, 
  sortConfig, 
  loading, 
  emptyText,
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  totalItems,
  tableClassName = "admin-table"
}) => {
  // Check if there's already an actions column in the columns definition
  const hasActionsColumn = columns.some(col => col.key === 'actions');
  
  return (
    <div className="table-container">
      <table className={tableClassName}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                onClick={col.sortable ? () => onSort(col.key) : undefined}
                className={col.sortable ? "sortable" : ""}
              >
                {col.label}
                {sortConfig?.key === col.key && (
                  <span className="sort-indicator">
                    {sortConfig.direction === "asc" ? " ↑" : " ↓"}
                  </span>
                )}
              </th>
            ))}
            {/* Only add actions column if no custom actions column exists and onEdit/onDelete are provided */}
            {!hasActionsColumn && (onEdit || onDelete) && <th>Thao tác</th>}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={columns.length + (!hasActionsColumn && (onEdit || onDelete) ? 1 : 0)} className="loading">
                <div className="loading-spinner">Đang tải...</div>
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length + (!hasActionsColumn && (onEdit || onDelete) ? 1 : 0)} className="no-data">
                {emptyText || "Không có dữ liệu"}
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr key={row.id}>
                {columns.map((col) => (
                  <td key={col.key}>
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </td>
                ))}
                {/* Only add actions column if no custom actions column exists and onEdit/onDelete are provided */}
                {!hasActionsColumn && (onEdit || onDelete) && (
                  <td>
                    <div className="action-buttons">
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
                          onClick={() => onDelete(row.id)}
                          title="Xóa"
                        >
                          <i className="bi bi-trash"></i>
                          <span>Xóa</span>
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination-container">
          <div className="pagination-info">
            Hiển thị {((currentPage - 1) * itemsPerPage) + 1} - {Math.min(currentPage * itemsPerPage, totalItems)} của {totalItems} kết quả
          </div>
          <div className="pagination">
            <button
              className={`page-btn ${currentPage === 1 ? 'disabled' : ''}`}
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Trước
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                className={`page-btn ${currentPage === page ? 'active' : ''}`}
                onClick={() => onPageChange(page)}
              >
                {page}
              </button>
            ))}
            
            <button
              className={`page-btn ${currentPage === totalPages ? 'disabled' : ''}`}
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Sau
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable; 