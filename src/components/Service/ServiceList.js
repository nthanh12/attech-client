import "../../assets/css/Service/ServiceList.css";
import ServiceFilter from "./ServiceFilter";
import ServiceItem from "./ServiceItem";

const ServiceList = () => {
  return (
    <div class="service-page">
      <div class="service">
        <div class="container">
          <div class="section-header text-center">
            <h2>Sản phẩm</h2>
            <p className="general-text">
              Các sản phẩm do ATTECH nghiên cứu, sản xuất, đáp ứng tiêu chuẩn
              của ICAO, được Cục Hàng không Việt Nam cấp “Giấy chứng nhận đủ
              điều kiện kỹ thuật đối với thiết bị hàng không, phương tiện hoạt
              động tại cảng hàng không, sân bay được thiết kế, chế tạo, thử
              nghiệm và sản xuất tại Việt Nam”.
            </p>
          </div>
          <ServiceFilter />
          <div class="row">
            <ServiceItem />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceList;
