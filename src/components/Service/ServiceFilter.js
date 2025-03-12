import "../../assets/css/Service/ServiceFilter.css";

const ServiceFilter = () => {
  return (
    <>
      <div className="container my-4">
        <div className="row">
          {/* <div className="col-md-4">
            <select id="category-select" className="form-select">
              <option value="">Tất cả danh mục</option>
              <option value="Category A">DVKT Chuyên ngành CNS</option>
              <option value="Category B">Bay kiểm tra hiệu chuẩn</option>
              <option value="Category C">Logistics</option>
              <option value="Category D">Đo lường hiệu chuẩn</option>
              <option value="Category E">Tư vấn thiết kế</option>
              <option value="Category F">Đảm bảo kỹ thuật dẫn đường</option>
            </select>
          </div> */}
          <div className="col-md-6">
            <input
              type="text"
              id="search-input"
              className="form-control"
              placeholder="Tìm kiếm theo tên dịch vụ"
            />
          </div>
          <div className="col-md-6">
            <button className="btn btn-primary">Tìm kiếm</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceFilter;
