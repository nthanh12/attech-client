import React from "react";

const DataTable = ({ columns, data, onEdit, onDelete, onSort, sortConfig, loading, emptyText }) => {
  return (
    <div className="table-container">
      <table className="product-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                onClick={col.sortable ? () => onSort(col.key) : undefined}
                className={col.sortable ? "sortable" : ""}
              >
                {col.title}
                {sortConfig?.key === col.key && (sortConfig.direction === "asc" ? " ↑" : " ↓")}
              </th>
            ))}
            {(onEdit || onDelete) && <th>Thao tác</th>}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td colSpan={columns.length + 1} className="loading">Đang tải...</td></tr>
          ) : data.length === 0 ? (
            <tr><td colSpan={columns.length + 1} className="no-data">{emptyText || "Không có dữ liệu"}</td></tr>
          ) : (
            data.map((row) => (
              <tr key={row.id}>
                {columns.map((col) => (
                  <td key={col.key}>{col.render ? col.render(row[col.key], row) : row[col.key]}</td>
                ))}
                {(onEdit || onDelete) && (
                  <td>
                    <div className="action-buttons">
                      {onEdit && <button className="btn btn-edit" onClick={() => onEdit(row)}>Sửa</button>}
                      {onDelete && <button className="btn btn-delete" onClick={() => onDelete(row.id)}>Xóa</button>}
                    </div>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable; 