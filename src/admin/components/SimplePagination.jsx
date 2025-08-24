import React from "react";

const SimplePagination = ({ 
  currentPage = 1, 
  totalPages = 1, 
  onPageChange,
  totalItems = 0,
  itemsPerPage = 10,
  onItemsPerPageChange,
  className = ""
}) => {
  // Fallback calculation if totalPages is 0 but we have items
  const actualTotalPages = totalPages || (totalItems > 0 ? Math.ceil(totalItems / itemsPerPage) : 0);
  
  // Only hide if no data at all
  if (totalItems <= 0) return null;

  const handlePageChange = (page) => {
    if (page >= 1 && page <= actualTotalPages && page !== currentPage) {
      onPageChange?.(page);
    }
  };

  const startItem = ((currentPage - 1) * itemsPerPage) + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className={`simple-pagination ${className}`} style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: '1rem',
      padding: '0.75rem 1rem',
      backgroundColor: '#f8f9fa',
      borderRadius: '6px',
      border: '1px solid #dee2e6'
    }}>
      {/* Info */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '1rem',
        color: '#6c757d', 
        fontSize: '0.875rem' 
      }}>
        <span>
          Hiển thị {startItem}-{endItem} của {totalItems} kết quả
        </span>
        {onItemsPerPageChange && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>Hiển thị:</span>
            <select
              value={itemsPerPage}
              onChange={(e) => onItemsPerPageChange(parseInt(e.target.value))}
              style={{
                padding: '0.25rem 0.5rem',
                border: '1px solid #dee2e6',
                borderRadius: '4px',
                fontSize: '0.875rem',
                backgroundColor: 'white'
              }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            <span>/trang</span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage <= 1 || actualTotalPages <= 1}
          style={{
            padding: '0.375rem 0.75rem',
            border: '1px solid #dee2e6',
            backgroundColor: (currentPage <= 1 || actualTotalPages <= 1) ? '#f8f9fa' : 'white',
            color: (currentPage <= 1 || actualTotalPages <= 1) ? '#6c757d' : '#495057',
            borderRadius: '4px',
            cursor: (currentPage <= 1 || actualTotalPages <= 1) ? 'not-allowed' : 'pointer',
            fontSize: '0.875rem'
          }}
        >
          « Trước
        </button>

        <span style={{ 
          padding: '0.375rem 0.75rem', 
          color: '#495057',
          fontSize: '0.875rem',
          fontWeight: '500'
        }}>
          Trang {currentPage} / {actualTotalPages}
        </span>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage >= actualTotalPages || actualTotalPages <= 1}
          style={{
            padding: '0.375rem 0.75rem',
            border: '1px solid #dee2e6',
            backgroundColor: (currentPage >= actualTotalPages || actualTotalPages <= 1) ? '#f8f9fa' : 'white',
            color: (currentPage >= actualTotalPages || actualTotalPages <= 1) ? '#6c757d' : '#495057',
            borderRadius: '4px',
            cursor: (currentPage >= actualTotalPages || actualTotalPages <= 1) ? 'not-allowed' : 'pointer',
            fontSize: '0.875rem'
          }}
        >
          Sau »
        </button>
      </div>
    </div>
  );
};

export default SimplePagination;