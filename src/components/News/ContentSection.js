import "../../assets/css/News/ContentSection/ContentSection.css";
import sliderImg1 from "../../assets/img/featured_img1.jpg";
import sliderImg2 from "../../assets/img/featured_img2.jpg";
import sliderImg3 from "../../assets/img/featured_img3.jpg";

const ContentSection = () => {
  return (
    <>
      <section id="contentSection">
        <div class="row">
          <div class="col-lg-8 col-md-8 col-sm-8">
            <div class="left_content">
              <div class="single_post_content">
                <h2>
                  <span>Tin tức hoạt động</span>
                </h2>
                <div class="single_post_content_left">
                  <ul class="business_catgnav  wow fadeInDown">
                    <li>
                      <figure class="bsbig_fig">
                        {" "}
                        <a href="pages/single_page.html" class="featured_img">
                          {" "}
                          <img
                            style={{ borderRadius: "5px" }}
                            alt=""
                            src={sliderImg1}
                          />{" "}
                          <span class="overlay"></span>{" "}
                        </a>
                        <div className="col2">
                          <figcaption>
                            {" "}
                            <a href="pages/single_page.html">
                              Hội nghị tuyên dương điển hình tiên tiến giai đoạn
                              2020-2024 và phát động phong trào thi đua giai
                              đoạn 2025-2030
                            </a>
                          </figcaption>
                          <p>
                            Sáng ngày 28/02/2025, Công ty TNHH Kỹ thuật Quản lý
                            bay và Công đoàn cơ sở tổ chức Hội nghị tuyên dương
                            điển hình tiên tiến giai đoạn 2020-2024 và phát động
                            phong trào thi đua giai đoạn 2025-2030.
                          </p>
                        </div>
                      </figure>
                    </li>
                  </ul>
                </div>
                <div class="single_post_content_right">
                  <ul class="spost_nav">
                    <li>
                      <div class="media wow fadeInDown">
                        {" "}
                        <a href="pages/single_page.html" class="media-left">
                          {" "}
                          <img
                            alt=""
                            src="https://attech.com.vn/wp-content/uploads/2025/03/HN-NLD-2025-3-3-6-170x130.jpg"
                          />{" "}
                        </a>
                        <div class="media-body">
                          {" "}
                          <a href="pages/single_page.html" class="catg_title">
                            {" "}
                            Công ty TNHH Kỹ thuật Quản lý bay tổ chức Hội nghị
                            đại biểu Người lao động năm 2025
                          </a>{" "}
                          <p className="media-content">
                            Chiều ngày 28/02/2025, Công ty TNHH Kỹ thuật Quản lý
                            bay (ATTECH) đã tổ chức Hội nghị đại biểu Người lao
                            động năm 2025.{" "}
                          </p>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div class="media wow fadeInDown">
                        {" "}
                        <a href="pages/single_page.html" class="media-left">
                          {" "}
                          <img
                            alt=""
                            src="https://attech.com.vn/wp-content/uploads/2025/03/HN-NLD-2025-3-3-6-170x130.jpg"
                          />{" "}
                        </a>
                        <div class="media-body">
                          {" "}
                          <a href="pages/single_page.html" class="catg_title">
                            {" "}
                            Công ty TNHH Kỹ thuật Quản lý bay tổ chức Hội nghị
                            đại biểu Người lao động năm 2025
                          </a>{" "}
                          <p className="media-content">
                            Chiều ngày 28/02/2025, Công ty TNHH Kỹ thuật Quản lý
                            bay (ATTECH) đã tổ chức Hội nghị đại biểu Người lao
                            động năm 2025.{" "}
                          </p>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div class="media wow fadeInDown">
                        {" "}
                        <a href="pages/single_page.html" class="media-left">
                          {" "}
                          <img
                            alt=""
                            src="https://attech.com.vn/wp-content/uploads/2025/03/HN-NLD-2025-3-3-6-170x130.jpg"
                          />{" "}
                        </a>
                        <div class="media-body">
                          {" "}
                          <a href="pages/single_page.html" class="catg_title">
                            {" "}
                            Công ty TNHH Kỹ thuật Quản lý bay tổ chức Hội nghị
                            đại biểu Người lao động năm 2025
                          </a>{" "}
                          <p className="media-content">
                            Chiều ngày 28/02/2025, Công ty TNHH Kỹ thuật Quản lý
                            bay (ATTECH) đã tổ chức Hội nghị đại biểu Người lao
                            động năm 2025.{" "}
                          </p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-4 col-sm-4">
            <aside class="right_content">
              <div class="single_sidebar">
                <h2>
                  <span>Thông tin tuyển dụng</span>
                </h2>
                <ul class="spost_nav">
                  <li>
                    <div class="media wow fadeInDown">
                      {" "}
                      <a href="pages/single_page.html" class="media-left">
                        {" "}
                        <img alt="" src="https://attech.com.vn/wp-content/uploads/2025/03/HN-NLD-2025-3-3-6-170x130.jpg" />{" "}
                      </a>
                      <div class="media-body">
                        {" "}
                        <a href="pages/single_page.html" class="catg_title">
                          {" "}
                          Danh sách nhân sự trúng tuyển đợt 3 năm 2024
                        </a>{" "}
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="media wow fadeInDown">
                      {" "}
                      <a href="pages/single_page.html" class="media-left">
                        {" "}
                        <img alt="" src="https://attech.com.vn/wp-content/uploads/2025/03/HN-NLD-2025-3-3-6-170x130.jpg" />{" "}
                      </a>
                      <div class="media-body">
                        {" "}
                        <a href="pages/single_page.html" class="catg_title">
                          {" "}
                          Danh sách nhân sự trúng tuyển đợt 3 năm 2024
                        </a>{" "}
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="media wow fadeInDown">
                      {" "}
                      <a href="pages/single_page.html" class="media-left">
                        {" "}
                        <img alt="" src="https://attech.com.vn/wp-content/uploads/2025/03/HN-NLD-2025-3-3-6-170x130.jpg" />{" "}
                      </a>
                      <div class="media-body">
                        {" "}
                        <a href="pages/single_page.html" class="catg_title">
                          {" "}
                          Danh sách nhân sự trúng tuyển đợt 3 năm 2024
                        </a>{" "}
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="media wow fadeInDown">
                      {" "}
                      <a href="pages/single_page.html" class="media-left">
                        {" "}
                        <img alt="" src="https://attech.com.vn/wp-content/uploads/2025/03/HN-NLD-2025-3-3-6-170x130.jpg" />{" "}
                      </a>
                      <div class="media-body">
                        {" "}
                        <a href="pages/single_page.html" class="catg_title">
                          {" "}
                          Danh sách nhân sự trúng tuyển đợt 3 năm 2024
                        </a>{" "}
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="media wow fadeInDown">
                      {" "}
                      <a href="pages/single_page.html" class="media-left">
                        {" "}
                        <img alt="" src="https://attech.com.vn/wp-content/uploads/2025/03/HN-NLD-2025-3-3-6-170x130.jpg" />{" "}
                      </a>
                      <div class="media-body">
                        {" "}
                        <a href="pages/single_page.html" class="catg_title">
                          {" "}
                          Danh sách nhân sự trúng tuyển đợt 3 năm 2024
                        </a>{" "}
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
};
export default ContentSection;
