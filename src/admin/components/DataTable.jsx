import React from "react";
import SimplePagination from "./SimplePagination";

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
  onItemsPerPageChange,
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
      <SimplePagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={onItemsPerPageChange}
      />
    </div>
  );
};

export default DataTable;
