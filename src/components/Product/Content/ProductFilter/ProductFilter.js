import "../ProductFilter/ProductFilter.css";

const ProductFilter = () => {
  return (
    <>
      <div className="container my-4">
        <div className="row">
          {/* <div className="col-md-4">
            <select id="category-select" className="form-select">
              <option value="">Tất cả danh mục</option>
              <option value="Category A">CNS/ATM</option>
              <option value="Category B">Hệ thống đèn hiệu</option>
              <option value="Category B">Cơ khí chế tạo</option>
            </select>
          </div> */}
          <div className="col-md-6">
            <input
              type="text"
              id="search-input"
              className="form-control"
              placeholder="Tìm kiếm theo tên sản phẩm"
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

export default ProductFilter;
