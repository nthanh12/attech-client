import "../../assets/css/Product/SidebarProduct.css";

const SidebarProduct = () => {
  return (
    <div className="sidebar-product">
      <div className="sidebar bg-light border-end p-4">
        <h5>Danh mục sản phẩm</h5>
        <ul className="list-group">
          <li className="list-group-item">
            <a href="#category1" className="text-decoration-none text-dark">
              CNS/ATM
            </a>
          </li>
          <li className="list-group-item">
            <a href="#category2" className="text-decoration-none text-dark">
              Hệ thống đèn hiệu
            </a>
          </li>
          <li className="list-group-item">
            <a href="#category3" className="text-decoration-none text-dark">
              Cơ khí chế tạo
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SidebarProduct;
