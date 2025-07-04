import React from 'react';
import './SearchBox.css';

const SearchBox = ({ 
  value, 
  onChange, 
  placeholder = "Tìm kiếm...",
  className = "",
  size = "medium" // small, medium, large
}) => {
  return (
    <div className={`search-box ${size} ${className}`}>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <i className="fas fa-search"></i>
    </div>
  );
};

export default SearchBox; 