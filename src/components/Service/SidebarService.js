import "../../assets/css/Service/SidebarService.css";

const SidebarService = () => {
  return (
    <div className="sidebar bg-light border-end p-4">
      <h5>Danh mục dịch vụ</h5>
      <ul className="list-group">
        <li className="list-group-item">
          <a href="#category1" className="text-decoration-none text-dark">
            DVKT chuyên ngành CNS
          </a>
        </li>
        <li className="list-group-item">
          <a href="#category2" className="text-decoration-none text-dark">
            Bay kiểm tra hiệu chuẩn
          </a>
        </li>
        <li className="list-group-item">
          <a href="#category3" className="text-decoration-none text-dark">
            Logistics
          </a>
        </li>
        <li className="list-group-item">
          <a href="#category3" className="text-decoration-none text-dark">
            Thử nghiệm hiệu chuẩn
          </a>
        </li>
        <li className="list-group-item">
          <a href="#category3" className="text-decoration-none text-dark">
            Dịch vụ Tư vấn đầu tư xây dựng và QLDA
          </a>
        </li>
        <li className="list-group-item">
          <a href="#category3" className="text-decoration-none text-dark">
            Đảm bảo kỹ thuật dân dụng
          </a>
        </li>
        <li className="list-group-item">
          <a href="#category3" className="text-decoration-none text-dark">
            Huấn luyện đào tạo
          </a>
        </li>
      </ul>
    </div>
  );
};

export default SidebarService;
