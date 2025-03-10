import "../../assets/css/Service/ServiceFilter.css";

const ServiceFilter = () => {
  return (
    <>
      <div className="container my-4">
        <div className="row">
          <div className="col-md-4">
            <select id="category-select" className="form-select">
              <option value="">Tất cả danh mục</option>
              <option value="Category A">CNS/ATM</option>
              <option value="Category B">Hệ thống đèn hiệu</option>
              <option value="Category B">Cơ khí chế tạo</option>
            </select>
          </div>
          <div className="col-md-4">
            <input
              type="text"
              id="search-input"
              className="form-control"
              placeholder="Tìm kiếm theo tên dịch vụ"
            />
          </div>
          <div className="col-md-4">
            <button className="btn btn-primary">Tìm kiếm</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceFilter;
