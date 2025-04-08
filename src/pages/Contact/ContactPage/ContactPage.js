import "../ContactPage/ContactPage.css";
import picture_mail from "../../../assets/img/img-01.png";

const ContactPage = () => {
  return (
    <>
      <section class="contact" id="contact">
        <div class="container">
          <div class="heading text-center">
            <h2>Liên hệ</h2>
            <p>
              Đừng ngại đặt câu hỏi hay chia sẻ ý kiến thắc mắc, mỗi sự đóng góp
              của bạn đều góp phần vào sự phát triển không ngừng của ATTECH!
            </p>
          </div>
          <div class="row">
            <div class="col-md-5">
              <div class="title">
                <h3>Chi tiết liên hệ</h3>
                <p>Kết nối với chúng tôi để bắt đầu hành trình</p>
              </div>
              <div class="content">
                <div class="info">
                  <i class="fas fa-mobile-alt"></i>
                  <h4 class="d-inline-block">
                    Điện thoại:
                    <br />
                    <span>(+84.24) 38271914</span>
                  </h4>
                </div>
                <div class="info">
                  <i class="fas fa-fax"></i>
                  <h4 class="d-inline-block">
                    Fax:
                    <br />
                    <span>(+84.24) 38271914</span>
                  </h4>
                </div>
                <div class="info">
                  <i class="far fa-envelope"></i>
                  <h4 class="d-inline-block">
                    Hòm thư điện tử:
                    <br />
                    <span>attech@attech.com.vn</span>
                  </h4>
                </div>
                <div class="info">
                  <i class="fas fa-map-marker-alt"></i>
                  <h4 class="d-inline-block">
                    Địa chỉ:
                    <br />
                    <span>
                      Số 5/200 đường Nguyễn Sơn, phường Bồ Đề, quận Long Biên,
                      Thành phố Hà Nội
                    </span>
                  </h4>
                </div>
              </div>
            </div>

            <div class="col-md-7">
              <form>
                <div class="row">
                  <div class="col-sm-6">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Họ và tên"
                    />
                  </div>
                  <div class="col-sm-6">
                    <input
                      type="email"
                      class="form-control"
                      placeholder="Email"
                    />
                  </div>
                  <div class="col-sm-12">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Tiêu đề"
                    />
                  </div>
                </div>
                <div class="form-group">
                  <textarea
                    class="form-control"
                    rows="5"
                    id="comment"
                    placeholder="Nội dung tin nhắn"
                  ></textarea>
                </div>
                <button class="btn btn-block" type="submit">
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
