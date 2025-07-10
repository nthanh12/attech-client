import React from "react";

const FormModal = ({ isOpen, onClose, onSubmit, fields, values, errors, onChange, loading, title, submitText, cancelText, children }) => {
  if (!isOpen) return null;
  return (
    <div className={`modal ${isOpen ? "show" : ""}`}>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal-content">
        <div className="modal-header">
          <h5>{title}</h5>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          <form onSubmit={onSubmit}>
            {fields.map((field) => (
              <div className="form-group" key={field.name}>
                <label>{field.label}</label>
                {field.type === "textarea" ? (
                  <textarea
                    className={`form-control${errors[field.name] ? " error" : ""}`}
                    name={field.name}
                    value={values[field.name] || ""}
                    onChange={onChange}
                    rows={field.rows || 2}
                  />
                ) : field.type === "select" ? (
                  <select
                    className={`form-control${errors[field.name] ? " error" : ""}`}
                    name={field.name}
                    value={values[field.name] || ""}
                    onChange={onChange}
                  >
                    {field.options.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                ) : field.type === "checkbox" ? (
                  <input
                    type="checkbox"
                    name={field.name}
                    checked={!!values[field.name]}
                    onChange={onChange}
                  />
                ) : field.type === "custom" ? (
                  field.render(values, onChange, errors)
                ) : (
                  <input
                    type={field.type}
                    className={`form-control${errors[field.name] ? " error" : ""}`}
                    name={field.name}
                    value={values[field.name] || ""}
                    onChange={onChange}
                  />
                )}
                {errors[field.name] && <span className="error-text">{errors[field.name]}</span>}
              </div>
            ))}
            {children}
            <div className="form-actions">
              <button type="button" className="btn btn-secondary" onClick={onClose} disabled={loading}>
                {cancelText || "Hủy"}
              </button>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? "Đang xử lý..." : (submitText || "Lưu")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormModal; 