import React, { useState } from "react";
import "../ContactPage/ContactPage.css";
import picture_mail from "../../../assets/img/img-01.png";

const ContactPage = () => {
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
    if (!form.name.trim()) newErrors.name = "Vui lòng nhập họ và tên";
    if (!form.email.trim()) newErrors.email = "Vui lòng nhập email";
    else if (!validateEmail(form.email)) newErrors.email = "Email không hợp lệ";
    if (!form.subject.trim()) newErrors.subject = "Vui lòng nhập tiêu đề";
    if (!form.message.trim()) newErrors.message = "Vui lòng nhập nội dung";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Gửi form ở đây (gọi API hoặc hiển thị thông báo thành công)
      setNotification("Gửi liên hệ thành công! Cảm ơn bạn đã liên hệ với ATTECH.");
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
            <h2>Trang thông tin liên hệ</h2>
            <p>
              Đừng ngại đặt câu hỏi hay chia sẻ ý kiến thắc mắc! Mỗi sự đóng góp
              của bạn đều góp phần vào sự phát triển không ngừng của ATTECH!
            </p>
          </div>
          {/* Thông báo thành công dạng toast nổi, không làm nhảy layout */}
          {notification && notificationType === "success" && (
            <div className="attech-toast">
              {notification}
            </div>
          )}
          <div className="row">
            <div className="col-md-5">
              <div className="title">
                <h3>Chi tiết liên hệ</h3>
              </div>
              <div className="content">
                <div className="info">
                  <i className="fas fa-mobile-alt"></i>
                  <h4 className="d-inline-block">
                    Điện thoại:
                    <br />
                    <span>(+84.24) 38271914</span>
                  </h4>
                </div>
                <div className="info">
                  <i className="fas fa-fax"></i>
                  <h4 className="d-inline-block">
                    Fax:
                    <br />
                    <span>(+84.24) 38271914</span>
                  </h4>
                </div>
                <div className="info">
                  <i className="far fa-envelope"></i>
                  <h4 className="d-inline-block">
                    Hòm thư điện tử:
                    <br />
                    <span>attech@attech.com.vn</span>
                  </h4>
                </div>
                <div className="info">
                  <i className="fas fa-map-marker-alt"></i>
                  <h4 className="d-inline-block">
                    Địa chỉ:
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
                      className={`form-control${errors.name ? ' input-error' : ''}`}
                      placeholder="Họ và tên"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                    />
                    <span className="form-error-google">{errors.name || "\u00A0"}</span>
                  </div>
                  <div className="col-sm-6">
                    <input
                      type="email"
                      className={`form-control${errors.email ? ' input-error' : ''}`}
                      placeholder="Email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                    />
                    <span className="form-error-google">{errors.email || "\u00A0"}</span>
                  </div>
                  <div className="col-sm-12">
                    <input
                      type="text"
                      className={`form-control${errors.subject ? ' input-error' : ''}`}
                      placeholder="Tiêu đề"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                    />
                    <span className="form-error-google">{errors.subject || "\u00A0"}</span>
                  </div>
                </div>
                <div className="form-group">
                  <textarea
                    className={`form-control${errors.message ? ' input-error' : ''}`}
                    rows="5"
                    id="comment"
                    placeholder="Nội dung tin nhắn"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                  ></textarea>
                  <span className="form-error-google">{errors.message || "\u00A0"}</span>
                </div>
                <button className="btn btn-block" type="submit">
                  Gửi ngay!
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
