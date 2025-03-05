import "../../assets/css/About.css";
const About = () => {
  return (
    <>
      <div class="about wow fadeInUp" data-wow-delay="0.1s">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-lg-5 col-md-6">
              <div class="about-img">
                <img
                  src="https://attech.com.vn/wp-content/uploads/2015/05/anh-slide1.jpg"
                  alt="Image"
                />
              </div>
            </div>
            <div class="col-lg-7 col-md-6">
              <div class="section-header text-left">
                <p className="intro">Chào mừng đến với ATTECH</p>
              </div>
              <div class="about-text">
                <p>
                  Công ty TNHH Kỹ thuật Quản lý bay (ATTECH) là đơn vị kỹ thuật
                  hàng đầu trong ngành hàng không Việt Nam, chuyên cung cấp các
                  dịch vụ thông tin, dẫn đường, giám sát hàng không và dịch vụ
                  bay kiểm tra hiệu chuẩn. Ngoài ra, chúng tôi còn sản xuất và
                  phát triển các thiết bị công nghiệp hàng không hiện đại, với
                  những thành tựu đáng tự hào như hệ thống chuyển tiếp điện văn
                  tự động (AMHS). Với đội ngũ chuyên gia giàu kinh nghiệm và cơ
                  sở hạ tầng hiện đại, ATTECH cam kết mang lại các giải pháp kỹ
                  thuật hàng đầu, góp phần nâng cao an toàn và hiệu quả trong
                  lĩnh vực hàng không.
                </p>
                <a class="btn" href="">
                  Đọc thêm
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
