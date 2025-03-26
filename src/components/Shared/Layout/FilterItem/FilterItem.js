import "../FilterItem/FilterItem.css";

const FilterItem = () => {
  return (
    <>
      <div className="container my-4">
        <div className="row">
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

export default FilterItem;
