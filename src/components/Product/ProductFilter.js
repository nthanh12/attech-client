import "../../assets/css/Product/ProductFilter.css";

const ProductFilter = () => {
  return (
    <>
      <div class="filter-container">
        <select id="category-select">
          <option value="">Tất cả danh mục</option>
          <option value="Category A">CNS/ATM</option>
          <option value="Category B">Hệ thống đèn hiệu</option>
          <option value="Category B">Cơ khí chế tạo</option>
        </select>
        <input type="text" id="search-input" placeholder="Search by name" />
        <button>Tìm kiếm</button>
      </div>
      {/* <ul class="product-list" id="product-list">
        <li class="product-item" data-category="Category A">
          Product 1 - Category A
        </li>
        <li class="product-item" data-category="Category B">
          Product 2 - Category B
        </li>
      </ul> */}
    </>
  );
};

export default ProductFilter;
