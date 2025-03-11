import "../../assets/css/News/NewsSection/NewsSection.css";
import news_thumbnail3 from "../../assets/img/news_thumbnail3.jpg";
import news_thumbnail2 from "../../assets/img/news_thumbnail2.jpg";

const NewsSection = () => {
  return (
    <>
      <section id="newsSection">
        <div class="row">
          <div class="col-lg-12 col-md-12">
            <div class="latest_newsarea">
              {" "}
              <p>Tin tức</p>
              <div id="ticker01">
                <ul class="news_sticker">
                  <li>
                    <a href="#">
                      <img src={news_thumbnail3} alt="" />
                      Tin tuyển dụng
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img src={news_thumbnail3} alt="" />
                      Thông báo 
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img src={news_thumbnail3} alt="" />
                      Thông tin tài chính
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img src={news_thumbnail3} alt="" />
                      Thông tin công ty
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img src={news_thumbnail2} alt="" />
                      Ban lãnh đạo
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img src={news_thumbnail2} alt="" />
                      Tin hàng không thế giới
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img src={news_thumbnail2} alt="" />
                      Tin hàng không trong nước
                    </a>
                  </li>
                </ul>
              </div>
              <div class="social_area">
                <ul class="social_nav">
                  <li class="facebook">
                    <a href="#">
                      <i class="fab fa-facebook-f"></i>
                    </a>
                  </li>
                  <li class="twitter">
                    <a href="#">
                      <i class="fab fa-twitter"></i>
                    </a>
                  </li>
                  <li class="flickr">
                    <a href="#">
                      <i class="fab fa-flickr"></i>
                    </a>
                  </li>
                  <li class="pinterest">
                    <a href="#">
                      <i class="fab fa-pinterest"></i>
                    </a>
                  </li>
                  <li class="googleplus">
                    <a href="#">
                      <i class="fab fa-google-plus-g"></i>
                    </a>
                  </li>
                  <li class="vimeo">
                    <a href="#">
                      <i class="fab fa-vimeo-v"></i>
                    </a>
                  </li>
                  <li class="youtube">
                    <a href="#">
                      <i class="fab fa-youtube"></i>
                    </a>
                  </li>
                  <li class="mail">
                    <a href="#">
                      <i class="fas fa-envelope"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default NewsSection;
