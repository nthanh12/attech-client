import "../NewsSection/NewsSection.css";
import news_thumbnail3 from "../../../../assets/img/news_thumbnail3.jpg";
import news_thumbnail2 from "../../../../assets/img/news_thumbnail2.jpg";

const NewsSection = () => {
  return (
    <>
      <section id="newsSection">
        <div className="row">
          <div className="col-lg-12 col-md-12">
            <div className="latest_newsarea">
              {" "}
              <p>Tin tức</p>
              <div id="ticker01">
                <ul className="news_sticker">
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
              <div className="social_area">
                <ul className="social_nav">
                  <li className="facebook">
                    <a href="#">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                  </li>
                  <li className="twitter">
                    <a href="#">
                      <i className="fab fa-twitter"></i>
                    </a>
                  </li>
                  <li className="flickr">
                    <a href="#">
                      <i className="fab fa-flickr"></i>
                    </a>
                  </li>
                  <li className="pinterest">
                    <a href="#">
                      <i className="fab fa-pinterest"></i>
                    </a>
                  </li>
                  <li className="googleplus">
                    <a href="#">
                      <i className="fab fa-google-plus-g"></i>
                    </a>
                  </li>
                  <li className="vimeo">
                    <a href="#">
                      <i className="fab fa-vimeo-v"></i>
                    </a>
                  </li>
                  <li className="youtube">
                    <a href="#">
                      <i className="fab fa-youtube"></i>
                    </a>
                  </li>
                  <li className="mail">
                    <a href="#">
                      <i className="fas fa-envelope"></i>
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
