import "../../assets/css/Product/ProductItem.css";

const ProductItem = () => {
  return (
    <>
      <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
        <div class="product-item">
          <div class="product-img">
            <img
              src="https://attech.com.vn/wp-content/themes/html5blank/images/sanpham/spCNSATM.png"
              alt="Image"
            />
            <div class="product-overlay">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Phasellus nec pretium mi. Curabitur facilisis ornare velit non
                vulputate. Aliquam metus tortor, auctor id gravida condimentum,
                viverra quis sem.
              </p>
            </div>
          </div>
          <div class="product-text">
            <h3>Building Construction</h3>
            <a class="btn" href="img/product-1.jpg" data-lightbox="product">
              +
            </a>
          </div>
        </div>
      </div>
      <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.2s">
        <div class="product-item">
          <div class="product-img">
            <img
              src="https://attech.com.vn/wp-content/themes/html5blank/images/sanpham/spDenHieu.png"
              alt="Image"
            />
            <div class="product-overlay">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Phasellus nec pretium mi. Curabitur facilisis ornare velit non
                vulputate. Aliquam metus tortor, auctor id gravida condimentum,
                viverra quis sem.
              </p>
            </div>
          </div>
          <div class="product-text">
            <h3>House Renovation</h3>
            <a class="btn" href="img/product-2.jpg" data-lightbox="product">
              +
            </a>
          </div>
        </div>
      </div>
      <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
        <div class="product-item">
          <div class="product-img">
            <img
              src="https://attech.com.vn/wp-content/themes/html5blank/images/sanpham/spCoKhiCheTao.png"
              alt="Image"
            />
            <div class="product-overlay">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Phasellus nec pretium mi. Curabitur facilisis ornare velit non
                vulputate. Aliquam metus tortor, auctor id gravida condimentum,
                viverra quis sem.
              </p>
            </div>
          </div>
          <div class="product-text">
            <h3>Architecture Design</h3>
            <a
              class="btn"
              href="https://attech.com.vn/wp-content/themes/html5blank/images/sanpham/spCoKhiCheTao.png"
              data-lightbox="product"
            >
              +
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
export default ProductItem;
