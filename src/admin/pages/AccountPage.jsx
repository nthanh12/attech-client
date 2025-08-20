import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import PageWrapper from '../components/PageWrapper';

const AccountPage = () => {
  const { user } = useAuth();

  return (
    <PageWrapper title="Tài khoản của tôi">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-4">
            {/* User Profile Card */}
            <div className="card shadow-sm">
              <div className="card-header bg-primary text-white">
                <h5 className="mb-0">
                  <i className="bi bi-person-circle me-2"></i>
                  Thông tin cá nhân
                </h5>
              </div>
              <div className="card-body">
                <div className="text-center mb-4">
                  <div className="d-inline-flex align-items-center justify-content-center bg-primary text-white rounded-circle" 
                       style={{ width: '80px', height: '80px', fontSize: '2rem' }}>
                    <i className="bi bi-person"></i>
                  </div>
                </div>
                
                <div className="mb-3">
                  <label className="form-label text-muted small">Tên đăng nhập</label>
                  <div className="fw-semibold">{user?.username || 'N/A'}</div>
                </div>
                
                <div className="mb-3">
                  <label className="form-label text-muted small">Tên hiển thị</label>
                  <div className="fw-semibold">{user?.name || user?.fullName || 'N/A'}</div>
                </div>
                
                <div className="mb-3">
                  <label className="form-label text-muted small">Email</label>
                  <div className="fw-semibold">{user?.email || 'Chưa cập nhật'}</div>
                </div>
                
                <div className="mb-3">
                  <label className="form-label text-muted small">Số quyền</label>
                  <div className="fw-semibold">
                    <span className="badge bg-success">
                      {user?.permissions?.length || 0} quyền
                    </span>
                  </div>
                </div>
                
                <div className="mb-3">
                  <label className="form-label text-muted small">Trạng thái</label>
                  <div className="fw-semibold">
                    <span className="badge bg-success">
                      <i className="bi bi-check-circle me-1"></i>
                      Hoạt động
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-md-8">
            {/* Account Actions */}
            <div className="card shadow-sm">
              <div className="card-header bg-light">
                <h5 className="mb-0">
                  <i className="bi bi-gear me-2"></i>
                  Cài đặt tài khoản
                </h5>
              </div>
              <div className="card-body">
                <div className="row g-3">
                  {/* Change Password */}
                  <div className="col-md-6">
                    <div className="card h-100 border-0 bg-light">
                      <div className="card-body text-center">
                        <i className="bi bi-shield-lock display-6 text-warning mb-3"></i>
                        <h6 className="card-title">Đổi mật khẩu</h6>
                        <p className="card-text text-muted small">
                          Cập nhật mật khẩu để bảo mật tài khoản
                        </p>
                        <Link 
                          to="/admin/change-password" 
                          className="btn btn-warning btn-sm"
                        >
                          <i className="bi bi-arrow-right-circle me-1"></i>
                          Đổi mật khẩu
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Security Settings */}
                  <div className="col-md-6">
                    <div className="card h-100 border-0 bg-light">
                      <div className="card-body text-center">
                        <i className="bi bi-shield-check display-6 text-success mb-3"></i>
                        <h6 className="card-title">Bảo mật</h6>
                        <p className="card-text text-muted small">
                          Kiểm tra cài đặt bảo mật tài khoản
                        </p>
                        <button 
                          className="btn btn-success btn-sm" 
                          disabled
                          title="Tính năng đang phát triển"
                        >
                          <i className="bi bi-gear me-1"></i>
                          Cài đặt
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Activity Log */}
                  <div className="col-md-6">
                    <div className="card h-100 border-0 bg-light">
                      <div className="card-body text-center">
                        <i className="bi bi-clock-history display-6 text-info mb-3"></i>
                        <h6 className="card-title">Lịch sử hoạt động</h6>
                        <p className="card-text text-muted small">
                          Xem nhật ký hoạt động tài khoản
                        </p>
                        <button 
                          className="btn btn-info btn-sm" 
                          disabled
                          title="Tính năng đang phát triển"
                        >
                          <i className="bi bi-list-ul me-1"></i>
                          Xem lịch sử
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Profile Update */}
                  <div className="col-md-6">
                    <div className="card h-100 border-0 bg-light">
                      <div className="card-body text-center">
                        <i className="bi bi-person-gear display-6 text-secondary mb-3"></i>
                        <h6 className="card-title">Cập nhật thông tin</h6>
                        <p className="card-text text-muted small">
                          Chỉnh sửa thông tin cá nhân
                        </p>
                        <button 
                          className="btn btn-secondary btn-sm" 
                          disabled
                          title="Tính năng đang phát triển"
                        >
                          <i className="bi bi-pencil me-1"></i>
                          Chỉnh sửa
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="card shadow-sm mt-3">
              <div className="card-header bg-light">
                <h6 className="mb-0">
                  <i className="bi bi-graph-up me-2"></i>
                  Thống kê nhanh
                </h6>
              </div>
              <div className="card-body">
                <div className="row text-center">
                  <div className="col-md-4">
                    <div className="border-end">
                      <h5 className="text-primary mb-1">
                        <i className="bi bi-calendar-check"></i>
                      </h5>
                      <div className="small text-muted">Đăng nhập lần cuối</div>
                      <div className="fw-semibold small">Hôm nay</div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="border-end">
                      <h5 className="text-success mb-1">
                        <i className="bi bi-shield-check"></i>
                      </h5>
                      <div className="small text-muted">Trạng thái bảo mật</div>
                      <div className="fw-semibold small text-success">An toàn</div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <h5 className="text-info mb-1">
                      <i className="bi bi-clock"></i>
                    </h5>
                    <div className="small text-muted">Thời gian online</div>
                    <div className="fw-semibold small">2h 30m</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default AccountPage;