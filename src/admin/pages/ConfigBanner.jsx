import React, { useState, useCallback } from "react";
import { mockBannerConfig } from "../../utils/mockData.js";
import "./ConfigBanner.css";

const ConfigBanner = () => {
  const [banners, setBanners] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  // Định nghĩa object emptyBanner để dùng cho khởi tạo/reset form
  const emptyBanner = {
    id: null,
    imageUrl: "",
    titleVi: "",
    titleEn: "",
    descriptionVi: "",
    descriptionEn: "",
    link: ""
  };
  const [currentBanner, setCurrentBanner] = useState({ ...emptyBanner });
  const [errors, setErrors] = useState({});

  // Load banners from mock data
  React.useEffect(() => {
    const homepageBanners = mockBannerConfig.homepage?.slides || [];
    setBanners(homepageBanners);
  }, []);

  const handleShowModal = useCallback((banner = null) => {
    if (banner) {
      setCurrentBanner(banner);
      setEditMode(true);
    } else {
      setCurrentBanner({ ...emptyBanner });
      setEditMode(false);
    }
    setShowModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
    setErrors({});
  }, []);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setCurrentBanner((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }, []);

  const handleImageChange = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setCurrentBanner((prev) => ({ ...prev, imageUrl: ev.target.result }));
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!currentBanner.titleVi) newErrors.titleVi = "Tiêu đề tiếng Việt là bắt buộc";
    if (!currentBanner.titleEn) newErrors.titleEn = "Tiêu đề tiếng Anh là bắt buộc";
    if (!currentBanner.imageUrl) newErrors.imageUrl = "Ảnh banner là bắt buộc";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    if (editMode) {
      setBanners((prev) => prev.map((b) => (b.id === currentBanner.id ? currentBanner : b)));
    } else {
      setBanners((prev) => [
        ...prev,
        { ...currentBanner, id: Date.now() }
      ]);
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa banner này?")) {
      setBanners((prev) => prev.filter((b) => b.id !== id));
    }
  };

  return (
    <div className="admin-banner-config">
      <div className="card">
        <div className="card-header">
          <h3>Cấu hình Banner Trang chủ</h3>
          <button className="btn btn-primary" onClick={() => handleShowModal()}>Thêm banner mới</button>
        </div>
        <div className="card-body">
          <div className="banner-list">
            {banners.length === 0 ? (
              <div className="no-data">Chưa có banner nào</div>
            ) : (
              <table className="banner-table">
                <thead>
                  <tr>
                    <th>Ảnh</th>
                    <th>Tiêu đề (Vi)</th>
                    <th>Tiêu đề (En)</th>
                    <th>Mô tả (Vi)</th>
                    <th>Mô tả (En)</th>
                    <th>Link</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {banners.map((banner) => (
                    <tr key={banner.id}>
                      <td>
                        <img 
                          src={banner.imageUrl} 
                          alt={banner.titleVi} 
                          style={{ width: 120, height: 40, objectFit: "cover", borderRadius: 6 }} 
                        />
                      </td>
                      <td>{banner.titleVi}</td>
                      <td>{banner.titleEn}</td>
                      <td>{banner.descriptionVi}</td>
                      <td>{banner.descriptionEn}</td>
                      <td>{banner.link}</td>
                      <td>
                        <button className="btn btn-edit" onClick={() => handleShowModal(banner)}>Sửa</button>
                        <button className="btn btn-delete" onClick={() => handleDelete(banner.id)}>Xóa</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
      {showModal && (
        <div className="modal show">
          <div className="modal-overlay" onClick={handleCloseModal}></div>
          <div className="modal-content">
            <div className="modal-header">
              <h5>{editMode ? "Chỉnh sửa banner" : "Thêm banner mới"}</h5>
              <button className="modal-close" onClick={handleCloseModal}>&times;</button>
            </div>
            <form className="modal-body" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Tiêu đề (Tiếng Việt) *</label>
                <input 
                  type="text" 
                  name="titleVi" 
                  className="form-control" 
                  value={currentBanner.titleVi} 
                  onChange={handleInputChange} 
                />
                {errors.titleVi && <span className="error-text">{errors.titleVi}</span>}
              </div>
              <div className="form-group">
                <label>Tiêu đề (English) *</label>
                <input 
                  type="text" 
                  name="titleEn" 
                  className="form-control" 
                  value={currentBanner.titleEn} 
                  onChange={handleInputChange} 
                />
                {errors.titleEn && <span className="error-text">{errors.titleEn}</span>}
              </div>
              <div className="form-group">
                <label>Mô tả (Tiếng Việt)</label>
                <input 
                  type="text" 
                  name="descriptionVi" 
                  className="form-control" 
                  value={currentBanner.descriptionVi} 
                  onChange={handleInputChange} 
                />
              </div>
              <div className="form-group">
                <label>Mô tả (English)</label>
                <input 
                  type="text" 
                  name="descriptionEn" 
                  className="form-control" 
                  value={currentBanner.descriptionEn} 
                  onChange={handleInputChange} 
                />
              </div>
              <div className="form-group">
                <label>Link</label>
                <input 
                  type="text" 
                  name="link" 
                  className="form-control" 
                  value={currentBanner.link} 
                  onChange={handleInputChange} 
                />
              </div>
              <div className="form-group">
                <label>Ảnh banner *</label>
                <input type="file" accept="image/*" onChange={handleImageChange} />
                {currentBanner.imageUrl && (
                  <img 
                    src={currentBanner.imageUrl} 
                    alt="preview" 
                    style={{ width: 180, height: 60, objectFit: "cover", marginTop: 8, borderRadius: 6 }} 
                  />
                )}
                {errors.imageUrl && <span className="error-text">{errors.imageUrl}</span>}
              </div>
              <div className="form-actions">
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Hủy</button>
                <button type="submit" className="btn btn-primary">{editMode ? "Cập nhật" : "Thêm mới"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConfigBanner; 