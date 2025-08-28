import React from "react";
import "./AdminFilter.css";

/**
 * AdminFilter - Component bộ lọc thống nhất cho tất cả trang admin
 * @param {Object} props
 * @param {Object} props.filters - Object chứa các giá trị filter hiện tại
 * @param {Function} props.onFiltersChange - Callback khi filter thay đổi
 * @param {Function} props.onPageChange - Callback khi cần reset trang về 1
 * @param {Array} props.filterConfig - Cấu hình các trường filter cần hiển thị
 * @param {boolean} props.isSearching - Có đang search không (hiển thị loading icon)
 * @param {Function} props.onReset - Callback khi reset filters
 */
const AdminFilter = ({
  filters,
  onFiltersChange,
  onPageChange,
  filterConfig = [],
  isSearching = false,
  onReset
}) => {
  // Handle filter value change
  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    onFiltersChange(newFilters);
    if (onPageChange) {
      onPageChange(1); // Reset về trang 1
    }
  };

  // Handle reset filters
  const handleReset = () => {
    const resetFilters = {};
    filterConfig.forEach(config => {
      resetFilters[config.key] = config.defaultValue || "";
    });
    onFiltersChange(resetFilters);
    if (onPageChange) {
      onPageChange(1);
    }
    if (onReset) {
      onReset();
    }
  };

  // Render filter input based on type
  const renderFilterInput = (config) => {
    const { key, type, placeholder, options, icon } = config;
    const value = filters[key] || "";

    switch (type) {
      case "search":
        return (
          <div className="filter-group" key={key}>
            <label>
              {isSearching ? (
                <i className="fas fa-spinner fa-spin"></i>
              ) : (
                <i className={icon || "fas fa-search"}></i>
              )}
              {config.label}
            </label>
            <input
              type="text"
              className="form-control"
              placeholder={placeholder}
              value={value}
              onChange={(e) => handleFilterChange(key, e.target.value)}
              autoComplete="off"
              spellCheck="false"
              autoCorrect="off"
              autoCapitalize="off"
            />
          </div>
        );

      case "select":
        return (
          <div className="filter-group" key={key}>
            <label>
              <i className={icon || "fas fa-filter"}></i>
              {config.label}
            </label>
            <select
              className="form-control"
              value={value}
              onChange={(e) => handleFilterChange(key, e.target.value)}
            >
              <option value="">Tất cả</option>
              {options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        );

      case "date":
        return (
          <div className="filter-group" key={key}>
            <label>
              <i className={icon || "fas fa-calendar"}></i>
              {config.label}
            </label>
            <input
              type="date"
              className="form-control"
              value={value}
              onChange={(e) => handleFilterChange(key, e.target.value)}
            />
          </div>
        );

      case "daterange":
        return (
          <React.Fragment key={key}>
            <div className="filter-group">
              <label>
                <i className={icon || "fas fa-calendar"}></i>
                Từ ngày
              </label>
              <input
                type="date"
                className="form-control"
                value={filters[config.fromKey] || ""}
                onChange={(e) => handleFilterChange(config.fromKey, e.target.value)}
              />
            </div>
            <div className="filter-group">
              <label>
                <i className={icon || "fas fa-calendar"}></i>
                Đến ngày
              </label>
              <input
                type="date"
                className="form-control"
                value={filters[config.toKey] || ""}
                onChange={(e) => handleFilterChange(config.toKey, e.target.value)}
              />
            </div>
          </React.Fragment>
        );

      default:
        return null;
    }
  };

  return (
    <div className="admin-filters-section">
      <div className="filters-title">
        <i className="fas fa-filter"></i>
        Bộ lọc & Tìm kiếm
      </div>
      <div className="filters-grid">
        {filterConfig.map((config, index) => (
          <React.Fragment key={config.key || index}>
            {renderFilterInput(config)}
          </React.Fragment>
        ))}
        <div className="filter-actions">
          <button
            className="btn btn-primary"
            onClick={handleReset}
            title="Xóa tất cả bộ lọc"
          >
            <i className="fas fa-refresh"></i>
            Làm mới
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminFilter;