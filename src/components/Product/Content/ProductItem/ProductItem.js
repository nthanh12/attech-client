import "../ProductItem/ProductItem.css";
import { Link } from "react-router-dom";

const ProductItem = () => {
  return (
    <>
      <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
        <Link to="/product/cns-atm/detail/1">
          <div className="product-item">
            <div className="product-img">
              <img
                src="https://attech.com.vn/wp-content/uploads/2024/07/BPDDT-1.jpg"
                alt="Image"
              />
              <div className="product-overlay">
                <p>
                  Hệ thống băng phi diễn điện tử (Electronic Flight Strip) là
                  một sản phẩm trong lĩnh vực CNS do ATTECH sản xuất. Hệ thống
                  cung cấp môi trường số hóa, công cụ hỗ trợ trực quan cho hoạt
                  động chỉ huy điều hành bay của kiểm soát viên không lưu nhằm
                  thay thế hoàn toàn cho việc sử dụng băng phi diễn bằng giấy
                  được các KSVKL sử dụng trước đây.
                </p>
              </div>
            </div>
            <div className="product-text">
              <h3>Hệ thống Băng phi diễn điện tử</h3>
              <a
                className="btn"
                href="img/product-1.jpg"
                data-lightbox="product"
              >
                <i className="fa fa-solid fa-eye"></i>
              </a>
            </div>
          </div>
        </Link>
      </div>
      <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.2s">
        <Link to="/product/cns-atm/detail/2">
          <div className="product-item">
            <div className="product-img">
              <img
                src="https://attech.com.vn/wp-content/uploads/2015/12/ghiam2015.jpg"
                alt="Image"
              />
              <div className="product-overlay">
                <p>
                  Ghi âm các cuộc gọi trên đường thoại analog, các tín hiệu
                  thoại thu phát của các thiết bị HF, VHF Công nghệ kỹ thuật số
                  Ghi âm các cuộc gọi trên đường thoại analog, các tín hiệu
                  thoại thu phát của các thiết bị HF, VHF Dung lượng lưu trữ
                  trên 20.000 giờ Tự động backup dữ liệu trên đĩa DVD-RW/
                  DVD-RAM Tìm kiếm và nghe lại các bản ghi theo thời gian, theo
                  kênh
                </p>
              </div>
            </div>
            <div className="product-text">
              <h3>Thiết bị ghi âm</h3>
              <a
                className="btn"
                href="img/product-2.jpg"
                data-lightbox="product"
              >
                <i className="fa fa-solid fa-eye"></i>
              </a>
            </div>
          </div>
        </Link>
      </div>
      <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
        <div className="product-item">
          <div className="product-img">
            <img
              src="https://attech.com.vn/wp-content/uploads/2015/06/NDB.jpg"
              alt="Image"
            />
            <div className="product-overlay">
              <p>
                Dùng để thu tín hiệu của máy phát dẫn đường NDB đặt tại các đài
                dẫn đường xa, các đài dẫn đường gần ở các sân bay hoặc của các
                đài dẫn đường hàng tuyến. Mục đích nhằm phục vụ cho các kiểm
                soát viên không lưu hoặc những người có trách nhiệm theo dõi một
                cách liên tục được sự hoạt động của các đài này trong hoạt động
                bay của ngành Hàng không dân dụng
              </p>
            </div>
          </div>
          <div className="product-text">
            <h3>Máy thu kiểm tra thiết bị NDB</h3>
            <a
              className="btn"
              href="https://attech.com.vn/wp-content/themes/html5blank/images/sanpham/spCoKhiCheTao.png"
              data-lightbox="product"
            >
              <i className="fa fa-solid fa-eye"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
        <div className="product-item">
          <div className="product-img">
            <img
              src="https://attech.com.vn/wp-content/uploads/2015/06/AMSS.jpg"
              alt="Image"
            />
            <div className="product-overlay">
              <p>
                Hệ thống AMSS được lắp đặt tại các Trung tâm truyền tin AFTN
                dùng để chuyển tiếp và phân phối điện văn phục vụ cho việc trao
                đổi thông tin điều hành hoạt động hàng không trong nước và Quốc
                tế giữa Cục Hàng không, các hãng hàng không và các Trung tâm
                kiểm sóat điều hành bay
              </p>
            </div>
          </div>
          <div className="product-text">
            <h3>Hệ thống chuyển tiếp AMHS</h3>
            <a className="btn" href="img/product-1.jpg" data-lightbox="product">
              <i className="fa fa-solid fa-eye"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.2s">
        <div className="product-item">
          <div className="product-img">
            <img
              src="https://attech.com.vn/wp-content/uploads/2015/06/AMHS.jpg"
              alt="Image"
            />
            <div className="product-overlay">
              <p>
                Hệ thống AMHS của ATTECH tương thích hoàn toàn với các đặc tả kỹ
                thuật hệ thống AMHS (ICAO doc 9880-AN/466, Part II, 1st Edition
                2010), Cấp chứng chỉ bởi công ty AC-B GmbH, Cộng hòa liên bang
                Đức (Notified Body acc. EC Regulation 552/2004 for AMHS
                conformance test service)
              </p>
            </div>
          </div>
          <div className="product-text">
            <h3>Hệ thống luân chuyển điện văn</h3>
            <a className="btn" href="img/product-2.jpg" data-lightbox="product">
              <i className="fa fa-solid fa-eye"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
        <div className="product-item">
          <div className="product-img">
            <img
              src="https://attech.com.vn/wp-content/uploads/2015/06/ADS-B1.jpg"
              alt="Image"
            />
            <div className="product-overlay">
              <p>
                ADS-B (Automatic Dependent Surveillance - Broadcast) là một giải
                pháp chi phí thấp thay thế công nghệ radar thông thường, cho
                phép phi công và kiểm soát viên không lưu “nhìn thấy” và “kiểm
                soát” hoạt động bay với độ chính xác cao hơn, ADS-B tăng cường
                khả năng giám sát cao hơn và xa hơn góp phần làm cho việc giám
                sát hoạt động bay an toàn hơn và sử dụng không phận hiệu quả
                hơn.
              </p>
            </div>
          </div>
          <div className="product-text">
            <h3>Hệ thống xử lý dữ liệu ADS-B</h3>
            <a
              className="btn"
              href="https://attech.com.vn/wp-content/themes/html5blank/images/sanpham/spCoKhiCheTao.png"
              data-lightbox="product"
            >
              <i className="fa fa-solid fa-eye"></i>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
export default ProductItem;
