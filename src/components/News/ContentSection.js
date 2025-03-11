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
                          <img alt="" src={sliderImg1} />{" "}
                          <span class="overlay"></span>{" "}
                        </a>
                        <div className="col2">
                          <figcaption>
                            {" "}
                            <a href="pages/single_page.html">
                              Proin rhoncus consequat nisl eu ornare mauris
                            </a>
                          </figcaption>
                          <p>
                            Nunc tincidunt, elit non cursus euismod, lacus augue
                            ornare metus, egestas imperdiet nulla nisl quis
                            mauris. Suspendisse a phare...
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
                          <img alt="" src="images/post_img1.jpg" />{" "}
                        </a>
                        <div class="media-body">
                          {" "}
                          <a href="pages/single_page.html" class="catg_title">
                            {" "}
                            Aliquam malesuada diam eget turpis varius 1
                          </a>{" "}
                          <p className="media-content">Đây là bài viết 1</p>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div class="media wow fadeInDown">
                        {" "}
                        <a href="pages/single_page.html" class="media-left">
                          {" "}
                          <img alt="" src="images/post_img2.jpg" />{" "}
                        </a>
                        <div class="media-body">
                          {" "}
                          <a href="pages/single_page.html" class="catg_title">
                            {" "}
                            Aliquam malesuada diam eget turpis varius 2
                          </a>{" "}
                          <p className="media-content">Đây là bài viết 2</p>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div class="media wow fadeInDown">
                        {" "}
                        <a href="pages/single_page.html" class="media-left">
                          {" "}
                          <img alt="" src="images/post_img1.jpg" />{" "}
                        </a>
                        <div class="media-body">
                          {" "}
                          <a href="pages/single_page.html" class="catg_title">
                            {" "}
                            Aliquam malesuada diam eget turpis varius 3
                          </a>{" "}
                        </div>
                      </div>
                    </li>
                    <li>
                      <div class="media wow fadeInDown">
                        {" "}
                        <a href="pages/single_page.html" class="media-left">
                          {" "}
                          <img alt="" src="images/post_img2.jpg" />{" "}
                        </a>
                        <div class="media-body">
                          {" "}
                          <a href="pages/single_page.html" class="catg_title">
                            {" "}
                            Aliquam malesuada diam eget turpis varius 4
                          </a>{" "}
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div class="single_post_content">
                <h2>
                  <span>Photography</span>
                </h2>
                <ul class="photograph_nav  wow fadeInDown">
                  <li>
                    <div class="photo_grid">
                      <figure class="effect-layla">
                        {" "}
                        <a
                          class="fancybox-buttons"
                          data-fancybox-group="button"
                          href="images/photograph_img2.jpg"
                          title="Photography Ttile 1"
                        >
                          {" "}
                          <img src="images/photograph_img2.jpg" alt="" />
                        </a>{" "}
                      </figure>
                    </div>
                  </li>
                  <li>
                    <div class="photo_grid">
                      <figure class="effect-layla">
                        {" "}
                        <a
                          class="fancybox-buttons"
                          data-fancybox-group="button"
                          href="images/photograph_img3.jpg"
                          title="Photography Ttile 2"
                        >
                          {" "}
                          <img src="images/photograph_img3.jpg" alt="" />{" "}
                        </a>{" "}
                      </figure>
                    </div>
                  </li>
                  <li>
                    <div class="photo_grid">
                      <figure class="effect-layla">
                        {" "}
                        <a
                          class="fancybox-buttons"
                          data-fancybox-group="button"
                          href="images/photograph_img4.jpg"
                          title="Photography Ttile 3"
                        >
                          {" "}
                          <img src="images/photograph_img4.jpg" alt="" />{" "}
                        </a>{" "}
                      </figure>
                    </div>
                  </li>
                  <li>
                    <div class="photo_grid">
                      <figure class="effect-layla">
                        {" "}
                        <a
                          class="fancybox-buttons"
                          data-fancybox-group="button"
                          href="images/photograph_img4.jpg"
                          title="Photography Ttile 4"
                        >
                          {" "}
                          <img src="images/photograph_img4.jpg" alt="" />{" "}
                        </a>{" "}
                      </figure>
                    </div>
                  </li>
                  <li>
                    <div class="photo_grid">
                      <figure class="effect-layla">
                        {" "}
                        <a
                          class="fancybox-buttons"
                          data-fancybox-group="button"
                          href="images/photograph_img2.jpg"
                          title="Photography Ttile 5"
                        >
                          {" "}
                          <img src="images/photograph_img2.jpg" alt="" />{" "}
                        </a>{" "}
                      </figure>
                    </div>
                  </li>
                  <li>
                    <div class="photo_grid">
                      <figure class="effect-layla">
                        {" "}
                        <a
                          class="fancybox-buttons"
                          data-fancybox-group="button"
                          href="images/photograph_img3.jpg"
                          title="Photography Ttile 6"
                        >
                          {" "}
                          <img src="images/photograph_img3.jpg" alt="" />{" "}
                        </a>{" "}
                      </figure>
                    </div>
                  </li>
                </ul>
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
                        <img alt="" src="images/post_img1.jpg" />{" "}
                      </a>
                      <div class="media-body">
                        {" "}
                        <a href="pages/single_page.html" class="catg_title">
                          {" "}
                          Aliquam malesuada diam eget turpis varius 1
                        </a>{" "}
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="media wow fadeInDown">
                      {" "}
                      <a href="pages/single_page.html" class="media-left">
                        {" "}
                        <img alt="" src="images/post_img2.jpg" />{" "}
                      </a>
                      <div class="media-body">
                        {" "}
                        <a href="pages/single_page.html" class="catg_title">
                          {" "}
                          Aliquam malesuada diam eget turpis varius 2
                        </a>{" "}
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="media wow fadeInDown">
                      {" "}
                      <a href="pages/single_page.html" class="media-left">
                        {" "}
                        <img alt="" src="images/post_img1.jpg" />{" "}
                      </a>
                      <div class="media-body">
                        {" "}
                        <a href="pages/single_page.html" class="catg_title">
                          {" "}
                          Aliquam malesuada diam eget turpis varius 3
                        </a>{" "}
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="media wow fadeInDown">
                      {" "}
                      <a href="pages/single_page.html" class="media-left">
                        {" "}
                        <img alt="" src="images/post_img2.jpg" />{" "}
                      </a>
                      <div class="media-body">
                        {" "}
                        <a href="pages/single_page.html" class="catg_title">
                          {" "}
                          Aliquam malesuada diam eget turpis varius 4
                        </a>{" "}
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div class="single_sidebar">
                <ul class="nav nav-tabs" role="tablist">
                  <li role="presentation" class="active">
                    <a
                      href="#category"
                      aria-controls="home"
                      role="tab"
                      data-toggle="tab"
                    >
                      Category
                    </a>
                  </li>
                  <li role="presentation">
                    <a
                      href="#video"
                      aria-controls="profile"
                      role="tab"
                      data-toggle="tab"
                    >
                      Video
                    </a>
                  </li>
                  <li role="presentation">
                    <a
                      href="#comments"
                      aria-controls="messages"
                      role="tab"
                      data-toggle="tab"
                    >
                      Comments
                    </a>
                  </li>
                </ul>
                <div class="tab-content">
                  <div role="tabpanel" class="tab-pane active" id="category">
                    <ul>
                      <li class="cat-item">
                        <a href="#">Sports</a>
                      </li>
                      <li class="cat-item">
                        <a href="#">Fashion</a>
                      </li>
                      <li class="cat-item">
                        <a href="#">Business</a>
                      </li>
                      <li class="cat-item">
                        <a href="#">Technology</a>
                      </li>
                      <li class="cat-item">
                        <a href="#">Games</a>
                      </li>
                      <li class="cat-item">
                        <a href="#">Life &amp; Style</a>
                      </li>
                      <li class="cat-item">
                        <a href="#">Photography</a>
                      </li>
                    </ul>
                  </div>
                  <div role="tabpanel" class="tab-pane" id="video">
                    <div class="vide_area">
                      <iframe
                        width="100%"
                        height="250"
                        src="http://www.youtube.com/embed/h5QWbURNEpA?feature=player_detailpage"
                        frameborder="0"
                        allowfullscreen
                      ></iframe>
                    </div>
                  </div>
                  <div role="tabpanel" class="tab-pane" id="comments">
                    <ul class="spost_nav">
                      <li>
                        <div class="media wow fadeInDown">
                          {" "}
                          <a href="pages/single_page.html" class="media-left">
                            {" "}
                            <img alt="" src="images/post_img1.jpg" />{" "}
                          </a>
                          <div class="media-body">
                            {" "}
                            <a href="pages/single_page.html" class="catg_title">
                              {" "}
                              Aliquam malesuada diam eget turpis varius 1
                            </a>{" "}
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="media wow fadeInDown">
                          {" "}
                          <a href="pages/single_page.html" class="media-left">
                            {" "}
                            <img alt="" src="images/post_img2.jpg" />{" "}
                          </a>
                          <div class="media-body">
                            {" "}
                            <a href="pages/single_page.html" class="catg_title">
                              {" "}
                              Aliquam malesuada diam eget turpis varius 2
                            </a>{" "}
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="media wow fadeInDown">
                          {" "}
                          <a href="pages/single_page.html" class="media-left">
                            {" "}
                            <img alt="" src="images/post_img1.jpg" />{" "}
                          </a>
                          <div class="media-body">
                            {" "}
                            <a href="pages/single_page.html" class="catg_title">
                              {" "}
                              Aliquam malesuada diam eget turpis varius 3
                            </a>{" "}
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="media wow fadeInDown">
                          {" "}
                          <a href="pages/single_page.html" class="media-left">
                            {" "}
                            <img alt="" src="images/post_img2.jpg" />{" "}
                          </a>
                          <div class="media-body">
                            {" "}
                            <a href="pages/single_page.html" class="catg_title">
                              {" "}
                              Aliquam malesuada diam eget turpis varius 4
                            </a>{" "}
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="single_sidebar wow fadeInDown">
                <h2>
                  <span>Sponsor</span>
                </h2>
                <a class="sideAdd" href="#">
                  <img src="images/add_img.jpg" alt="" />
                </a>
              </div>
              <div class="single_sidebar wow fadeInDown">
                <h2>
                  <span>Category Archive</span>
                </h2>
                <select class="catgArchive">
                  <option>Select Category</option>
                  <option>Life styles</option>
                  <option>Sports</option>
                  <option>Technology</option>
                  <option>Treads</option>
                </select>
              </div>
              <div class="single_sidebar wow fadeInDown">
                <h2>
                  <span>Links</span>
                </h2>
                <ul>
                  <li>
                    <a href="#">Blog</a>
                  </li>
                  <li>
                    <a href="#">Rss Feed</a>
                  </li>
                  <li>
                    <a href="#">Login</a>
                  </li>
                  <li>
                    <a href="#">Life &amp; Style</a>
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
