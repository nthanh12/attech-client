import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "../ContactPage/ContactPage.css";
import picture_mail from "../../../assets/img/img-01.png";

const ContactPage = () => {
  const { t } = useTranslation();

  // State cho form
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  // State cho lỗi
  const [errors, setErrors] = useState({});
  // State cho thông báo
  const [notification, setNotification] = useState("");
  const [notificationType, setNotificationType] = useState(""); // 'success'

  // Xử lý thay đổi input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // clear lỗi khi user sửa
  };

  // Validate email
  const validateEmail = (email) =>
    /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);

  // Xử lý submit
  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};
    if (!form.name.trim())
      newErrors.name = t("frontend.contact.form.nameRequired");
    if (!form.email.trim())
      newErrors.email = t("frontend.contact.form.emailRequired");
    else if (!validateEmail(form.email))
      newErrors.email = t("frontend.contact.form.emailInvalid");
    if (!form.subject.trim())
      newErrors.subject = t("frontend.contact.form.subjectRequired");
    if (!form.message.trim())
      newErrors.message = t("frontend.contact.form.messageRequired");

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Gửi form ở đây (gọi API hoặc hiển thị thông báo thành công)
      setNotification(t("frontend.contact.form.successMessage"));
      setNotificationType("success");
      // Reset form nếu muốn
      setForm({ name: "", email: "", subject: "", message: "" });
      // Ẩn thông báo sau 3s
      setTimeout(() => {
        setNotification("");
        setNotificationType("");
      }, 3000);
    } else {
      // Không hiển thị alert đỏ ở trên cùng khi có lỗi nhập liệu
      setNotification("");
      setNotificationType("");
    }
  };

  return (
    <>
      <section className="contact" id="contact">
        <div className="container">
          <div className="heading text-center">
            <h2>{t("frontend.contact.title")}</h2>
            <p>{t("frontend.contact.description")}</p>
          </div>
          {/* Thông báo thành công dạng toast nổi, không làm nhảy layout */}
          {notification && notificationType === "success" && (
            <div className="attech-toast">{notification}</div>
          )}
          <div className="row">
            <div className="col-md-5">
              <div className="title">
                <h3>{t("frontend.contact.details.title")}</h3>
              </div>
              <div className="content">
                <div className="info">
                  <i className="fas fa-mobile-alt"></i>
                  <h4 className="d-inline-block">
                    {t("frontend.contact.details.phone")}:
                    <br />
                    <span>(+84.24) 38271914</span>
                  </h4>
                </div>
                <div className="info">
                  <i className="fas fa-fax"></i>
                  <h4 className="d-inline-block">
                    {t("frontend.contact.details.fax")}:
                    <br />
                    <span>(+84.24) 38271914</span>
                  </h4>
                </div>
                <div className="info">
                  <i className="far fa-envelope"></i>
                  <h4 className="d-inline-block">
                    {t("frontend.contact.details.email")}:
                    <br />
                    <span>attech@attech.com.vn</span>
                  </h4>
                </div>
                <div className="info">
                  <i className="fas fa-map-marker-alt"></i>
                  <h4 className="d-inline-block">
                    {t("frontend.contact.details.address")}:
                    <br />
                    <span>
                      Số 5/200 đường Nguyễn Sơn, phường Bồ Đề, Thành phố Hà Nội
                    </span>
                  </h4>
                </div>
              </div>
            </div>

            <div className="col-md-7">
              <form onSubmit={handleSubmit} autoComplete="off">
                <div className="row">
                  <div className="col-sm-6">
                    <input
                      type="text"
                      className={`form-control${
                        errors.name ? " input-error" : ""
                      }`}
                      placeholder={t("frontend.contact.form.namePlaceholder")}
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                    />
                    <span className="form-error-google">
                      {errors.name || "\u00A0"}
                    </span>
                  </div>
                  <div className="col-sm-6">
                    <input
                      type="email"
                      className={`form-control${
                        errors.email ? " input-error" : ""
                      }`}
                      placeholder={t("frontend.contact.form.emailPlaceholder")}
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                    />
                    <span className="form-error-google">
                      {errors.email || "\u00A0"}
                    </span>
                  </div>
                  <div className="col-sm-12">
                    <input
                      type="text"
                      className={`form-control${
                        errors.subject ? " input-error" : ""
                      }`}
                      placeholder={t(
                        "frontend.contact.form.subjectPlaceholder"
                      )}
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                    />
                    <span className="form-error-google">
                      {errors.subject || "\u00A0"}
                    </span>
                  </div>
                </div>
                <div className="form-group">
                  <textarea
                    className={`form-control${
                      errors.message ? " input-error" : ""
                    }`}
                    rows="5"
                    id="comment"
                    placeholder={t("frontend.contact.form.messagePlaceholder")}
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                  ></textarea>
                  <span className="form-error-google">
                    {errors.message || "\u00A0"}
                  </span>
                </div>
                <button className="btn btn-block" type="submit">
                  {t("frontend.contact.form.submitButton")}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
