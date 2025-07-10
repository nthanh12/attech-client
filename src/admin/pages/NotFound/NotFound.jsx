import React from 'react';
import './NotFound.css';

export default function NotFound() {
  return (
    <div className="admin-notfound">
      <h1>404 - Không tìm thấy trang quản trị</h1>
      <p>Vui lòng kiểm tra lại đường dẫn hoặc quay về <a href="/admin">Dashboard</a>.</p>
    </div>
  );
} 