import "../ProductList/ProductList.css";
import ProductFilter from "../ProductFilter/ProductFilter";
import ProductItem from "../ProductItem/ProductItem";

const ProductList = () => {
  return (
    <div className="product-page">
      <div className="product">
        <div className="container">
          <div className="section-header text-center">
            <h2>Sản phẩm</h2>
            <p className="general-text">
              Các sản phẩm do ATTECH nghiên cứu, sản xuất, đáp ứng tiêu chuẩn
              của ICAO, được Cục Hàng không Việt Nam cấp “Giấy chứng nhận đủ
              điều kiện kỹ thuật đối với thiết bị hàng không, phương tiện hoạt
              động tại cảng hàng không, sân bay được thiết kế, chế tạo, thử
              nghiệm và sản xuất tại Việt Nam”.
            </p>
          </div>
          <ProductFilter />
          <div className="row">
            <ProductItem />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
