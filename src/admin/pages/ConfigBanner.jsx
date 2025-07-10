import React, { useState, useCallback } from "react";
import "./ConfigBanner.css";

const initialBanners = [
  {
    id: 1,
    imageUrl: "https://via.placeholder.com/600x200?text=Banner+1",
    title: "Banner 1",
    description: "Mô tả banner 1",
    link: "/gioi-thieu"
  },
  {
    id: 2,
    imageUrl: "https://via.placeholder.com/600x200?text=Banner+2",
    title: "Banner 2",
    description: "Mô tả banner 2",
    link: "/dich-vu"
  }
];

const ConfigBanner = () => {
  const [banners, setBanners] = useState(initialBanners);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentBanner, setCurrentBanner] = useState({
    id: null,
    imageUrl: "",
    title: "",
    description: "",
    link: ""
  });
  const [errors, setErrors] = useState({});

  const handleShowModal = useCallback((banner = null) => {
    if (banner) {
      setCurrentBanner(banner);
      setEditMode(true);
    } else {
      setCurrentBanner({ id: null, imageUrl: "", title: "", description: "", link: "" });
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
    if (!currentBanner.title) newErrors.title = "Tiêu đề là bắt buộc";
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
                    <th>Tiêu đề</th>
                    <th>Mô tả</th>
                    <th>Link</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {banners.map((banner) => (
                    <tr key={banner.id}>
                      <td><img src={banner.imageUrl} alt={banner.title} style={{ width: 120, height: 40, objectFit: "cover", borderRadius: 6 }} /></td>
                      <td>{banner.title}</td>
                      <td>{banner.description}</td>
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
                <label>Tiêu đề *</label>
                <input type="text" name="title" className="form-control" value={currentBanner.title} onChange={handleInputChange} />
                {errors.title && <span className="error-text">{errors.title}</span>}
              </div>
              <div className="form-group">
                <label>Mô tả</label>
                <input type="text" name="description" className="form-control" value={currentBanner.description} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label>Link</label>
                <input type="text" name="link" className="form-control" value={currentBanner.link} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label>Ảnh banner *</label>
                <input type="file" accept="image/*" onChange={handleImageChange} />
                {currentBanner.imageUrl && (
                  <img src={currentBanner.imageUrl} alt="preview" style={{ width: 180, height: 60, objectFit: "cover", marginTop: 8, borderRadius: 6 }} />
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