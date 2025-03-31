import "../About/About.css";
import { Link } from "react-router-dom";
import about_img1 from "../../../../assets/img/featured_img1.jpg";
import about_img2 from "../../../../assets/img/featured_img2.jpg";
import about_img3 from "../../../../assets/img/featured_img3.jpg";

const About = () => {
  return (
    <div class="container-fluid about bg-light py-5">
      <div class="container py-5">
        <div
          class="text-center mx-auto pb-5 wow fadeInUp"
          data-wow-delay="0.2s"
          style={{ "max-width": "800px" }}
        >
          {/* <h4 class="text-primary"> Tại sao nên chọn ATTECH?</h4> */}
          <h1 class="display-4 mb-4">Các lĩnh vực chính</h1>
          <p class="mb-0">
            "Sản phẩm của chúng tôi an toàn, chất lượng và tiện dụng theo tiêu
            chuẩn hàng không"
          </p>
        </div>
        <div class="about-carousel owl-carousel">
          <div class="about-item wow fadeInUp" data-wow-delay="0.2s">
            <div class="about-img">
              <img
                src="https://vatm.vn/uploads/2024/06/cns-pic-1-1.png"
                class="img-fluid w-100"
                alt=""
              />
            </div>
            <div class="about-content p-4">
              <h4 class="mb-3">CNS / ATM</h4>
              <p class="mb-4">
                Là đơn vị cung cấp dịch vụ CNS (Thông tin, Dẫn đường, Giám sát)
                hàng không tại Việt Nam đạt chuẩn quốc tế. ATTECH là lựa chọn
                hàng đầu cho các giải pháp hàng không tiên tiến chuyên về dịch
                vụ điều hành bay và kỹ thuật CNS.
              </p>
              <a href="#" class="btn btn-primary py-2 px-4">
                {" "}
                <span>Xem thêm</span>
              </a>
            </div>
          </div>
          <div class="about-item wow fadeInUp" data-wow-delay="0.4s">
            <div class="about-img">
              <img
                src="https://vatm.vn/uploads/Picture1-17.jpg"
                class="img-fluid w-100"
                alt=""
              />
            </div>
            <div class="about-content p-4">
              <h4 class="mb-3">Bay kiểm tra hiệu chuẩn</h4>
              <p class="mb-4">
                ATTECH thực hiện bay kiểm tra và hiệu chuẩn chính xác các hệ
                thống dẫn đường, giám sát. Được tin tưởng bởi nhiều đối tác quốc
                tế, dịch vụ này đảm bảo độ tin cậy cao cho cơ sở hạ tầng không
                lưu.
              </p>
              <a href="#" class="btn btn-primary py-2 px-4">
                {" "}
                <span>Xem thêm</span>
              </a>
            </div>
          </div>
          <div class="about-item wow fadeInUp" data-wow-delay="0.6s">
            <div class="about-img">
              <img
                src="https://vcdn1-kinhdoanh.vnecdn.net/2024/08/15/dsc-5696-1723727217-1723727244-1501-1723727828.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=mwAy_tPgGAFdt_SiSngS8g"
                class="img-fluid w-100"
                alt=""
              />
            </div>
            <div class="about-content p-4">
              <h4 class="mb-3">Công nghiệp hàng không</h4>
              <p class="mb-4">
                ATTECH dẫn đầu trong sản xuất và bảo trì thiết bị hàng không,
                cung cấp dịch vụ kỹ thuật tối ưu cho khách hàng trong nước và
                toàn cầu. Uy tín và chất lượng làm nên sự khác biệt của doanh
                nghiệp.
              </p>
              <a href="#" class="btn btn-primary py-2 px-4">
                {" "}
                <span>Xem thêm</span>
              </a>
            </div>
          </div>
        </div>
        <div class="about-shaps"></div>
      </div>
    </div>
  );
};

export default About;
