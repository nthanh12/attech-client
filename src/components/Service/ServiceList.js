import "../../assets/css/Service/ServiceList.css";
import ServiceFilter from "./ServiceFilter";

const ServiceList = () => {
  return (
    <div class="service-page">
      <div class="service">
        <div class="container">
          <div class="section-header text-center">
            <h2>Dịch vụ</h2>
            <p className="general-text">
              ATTECH, Công ty TNHH Kỹ thuật Quản lý bay, cung cấp dịch vụ thông
              tin, dẫn đường, giám sát hàng không, dịch vụ bay kiểm tra hiệu
              chuẩn và sản xuất công nghiệp hàng không. Với đội ngũ chuyên gia
              và cơ sở hạ tầng hiện đại, ATTECH tự hào là đối tác tin cậy của
              ngành hàng không Việt Nam.
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
