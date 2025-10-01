import React, { useState, useEffect } from "react";
import {
  createPhoneBookEntry,
  updatePhoneBookEntry,
} from "../../services/phoneBookService";

const PhoneBookForm = ({
  entry = null,
  organizations = [],
  departments = {},
  onSave,
  onCancel,
}) => {
  const [formData, setFormData] = useState({
    fullName: "",
    position: "",
    organization: "",
    department: "",
    phone: "",
    extension: "",
    email: "",
    mobile: "",
    notes: "",
    order: 0,
    isActive: true,
  });

  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [availableDepartments, setAvailableDepartments] = useState([]);

  // Initialize form data
  useEffect(() => {
    if (entry) {
      setFormData({
        fullName: entry.fullName || "",
        position: entry.position || "",
        organization: entry.organization || "",
        department: entry.department || "",
        phone: entry.phone || "",
        extension: entry.extension || "",
        email: entry.email || "",
        mobile: entry.mobile || "",
        notes: entry.notes || "",
        order: entry.order || 0,
        isActive: entry.isActive !== undefined ? entry.isActive : true,
      });
    }
  }, [entry]);

  // Update departments when organization changes
  useEffect(() => {
    if (formData.organization && departments[formData.organization]) {
      setAvailableDepartments(departments[formData.organization]);
      // Reset department if current one is not in new organization
      if (!departments[formData.organization].includes(formData.department)) {
        setFormData((prev) => ({ ...prev, department: "" }));
      }
    } else {
      setAvailableDepartments([]);
      setFormData((prev) => ({ ...prev, department: "" }));
    }
  }, [formData.organization, departments]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Họ tên là bắt buộc";
    }

    if (!formData.position.trim()) {
      newErrors.position = "Chức danh là bắt buộc";
    }

    if (!formData.organization) {
      newErrors.organization = "Tổ chức là bắt buộc";
    }

    if (!formData.department) {
      newErrors.department = "Phòng ban là bắt buộc";
    }

    if (formData.email && !isValidEmail(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }

    if (formData.phone && !isValidPhone(formData.phone)) {
      newErrors.phone = "Số điện thoại không hợp lệ";
    }

    if (formData.mobile && !isValidPhone(formData.mobile)) {
      newErrors.mobile = "Số điện thoại không hợp lệ";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Email validation
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Phone validation
  const isValidPhone = (phone) => {
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    return phoneRegex.test(phone);
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setSaving(true);

    try {
      // Clean up data before sending
      const cleanedData = {
        ...formData,
        phone: formData.phone?.trim() || null,
        extension: formData.extension?.trim() || null,
        email: formData.email?.trim() || null,
        mobile: formData.mobile?.trim() || null,
        notes: formData.notes?.trim() || null,
        fullName: formData.fullName?.trim(),
        position: formData.position?.trim(),
        organization: formData.organization?.trim(),
        department: formData.department?.trim(),
        order: parseInt(formData.order) || 0,
      };

      const result = entry
        ? await updatePhoneBookEntry(entry.id, cleanedData)
        : await createPhoneBookEntry(cleanedData);

      if (result.success) {
        onSave();
      } else {
        // Handle server validation errors
        if (result.errors && typeof result.errors === "object") {
          setErrors(result.errors);
        } else {
          alert(result.message || "Có lỗi xảy ra");
        }
      }
    } catch (error) {
      console.error("Error saving phone book entry:", error);
      alert("Có lỗi xảy ra khi lưu dữ liệu");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="modal show d-block"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {entry ? "Sửa thông tin" : "Thêm mới"} danh bạ
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onCancel}
              disabled={saving}
            ></button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="row">
                {/* Họ tên */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    Họ tên <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.fullName ? "is-invalid" : ""
                    }`}
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Nhập họ tên"
                    disabled={saving}
                  />
                  {errors.fullName && (
                    <div className="invalid-feedback">{errors.fullName}</div>
                  )}
                </div>

                {/* Chức danh */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    Chức danh <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.position ? "is-invalid" : ""
                    }`}
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    placeholder="Nhập chức danh"
                    disabled={saving}
                  />
                  {errors.position && (
                    <div className="invalid-feedback">{errors.position}</div>
                  )}
                </div>

                {/* Tổ chức */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    Tổ chức <span className="text-danger">*</span>
                  </label>
                  <select
                    className={`form-select ${
                      errors.organization ? "is-invalid" : ""
                    }`}
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    disabled={saving}
                  >
                    <option value="">Chọn tổ chức</option>
                    {organizations.map((org) => (
                      <option key={org} value={org}>
                        {org}
                      </option>
                    ))}
                  </select>
                  {errors.organization && (
                    <div className="invalid-feedback">
                      {errors.organization}
                    </div>
                  )}
                </div>

                {/* Phòng ban */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    Phòng ban <span className="text-danger">*</span>
                  </label>
                  <select
                    className={`form-select ${
                      errors.department ? "is-invalid" : ""
                    }`}
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    disabled={saving || !formData.organization}
                  >
                    <option value="">Chọn phòng ban</option>
                    {availableDepartments.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                  {errors.department && (
                    <div className="invalid-feedback">{errors.department}</div>
                  )}
                </div>

                {/* Điện thoại cố định */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">Điện thoại cố định</label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.phone ? "is-invalid" : ""
                    }`}
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="024-38271914"
                    disabled={saving}
                  />
                  {errors.phone && (
                    <div className="invalid-feedback">{errors.phone}</div>
                  )}
                </div>

                {/* Máy lẻ */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">Máy lẻ</label>
                  <input
                    type="text"
                    className="form-control"
                    name="extension"
                    value={formData.extension}
                    onChange={handleChange}
                    placeholder="8204"
                    disabled={saving}
                  />
                </div>

                {/* Email */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className={`form-control ${
                      errors.email ? "is-invalid" : ""
                    }`}
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@attech.com.vn"
                    disabled={saving}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>

                {/* Di động */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">Di động</label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.mobile ? "is-invalid" : ""
                    }`}
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="0913532613"
                    disabled={saving}
                  />
                  {errors.mobile && (
                    <div className="invalid-feedback">{errors.mobile}</div>
                  )}
                </div>

                {/* Thứ tự */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">Thứ tự hiển thị</label>
                  <input
                    type="number"
                    className="form-control"
                    name="order"
                    value={formData.order}
                    onChange={handleChange}
                    min="0"
                    disabled={saving}
                  />
                </div>

                {/* Trạng thái */}
                <div className="col-md-6 mb-3">
                  <div className="form-check mt-4">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="isActive"
                      id="isActive"
                      checked={formData.isActive}
                      onChange={handleChange}
                      disabled={saving}
                    />
                    <label className="form-check-label" htmlFor="isActive">
                      Hiển thị
                    </label>
                  </div>
                </div>

                {/* Ghi chú */}
                <div className="col-12 mb-3">
                  <label className="form-label">Ghi chú</label>
                  <textarea
                    className="form-control"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Ghi chú bổ sung..."
                    disabled={saving}
                  />
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onCancel}
                disabled={saving}
              >
                Hủy
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={saving}
              >
                {saving ? (
                  <>
                    <i className="fas fa-spinner fa-spin me-2"></i>
                    Đang lưu...
                  </>
                ) : (
                  <>
                    <i className="fas fa-save me-2"></i>
                    {entry ? "Cập nhật" : "Thêm mới"}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PhoneBookForm;
