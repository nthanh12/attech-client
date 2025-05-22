import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductItem from "../ProductItem/ProductItem";
import "../ProductList/ProductList.css";

const products = [
  {
    id: 1,
    slug: "he-thong-ads-b",
    title: "Hệ thống xử lý dữ liệu ADS-B",
    fullTitle: "Hệ Thống Xử Lý Dữ Liệu ADS-B",
    category: "CNS/ATM",
    description: "Giải pháp thay thế radar, tăng cường giám sát bay.",
    image: "https://attech.com.vn/wp-content/uploads/2015/06/ADS-B1.jpg",
  },
  {
    id: 2,
    slug: "he-thong-amhs",
    title: "Hệ thống luân chuyển điện văn không lưu AMHS",
    fullTitle: "Hệ Thống Luân Chuyển Điện Văn Không Lưu AMHS",
    category: "CNS/ATM",
    description: "Tương thích tiêu chuẩn ICAO, ITU.",
    image: "https://attech.com.vn/wp-content/uploads/2015/06/AMHS.jpg",
  },
  {
    id: 3,
    slug: "he-thong-amss",
    title: "Hệ thống chuyển tiếp điện văn tự động AMSS",
    fullTitle: "Hệ Thống Chuyển Tiếp Điện Văn Tự Động AMSS",
    category: "CNS/ATM",
    description: "Chuyển tiếp và phân phối điện văn hàng không.",
    image: "https://attech.com.vn/wp-content/uploads/2015/06/AMSS.jpg",
  },
  {
    id: 4,
    slug: "den-papi",
    title: "Đèn chỉ thị góc tiếp cận chính xác - PAPI",
    fullTitle: "Đèn chỉ thị góc tiếp cận chính xác - PAPI",
    category: "Hệ thống đèn hiệu",
    description:
      "Đèn chỉ thị góc tiếp cận chính xác - PAPI là hệ thống đèn chỉ thị góc tiếp cận chính xác - PAPI gồm tổ hợp của 4 bộ đèn PAPI có chức năng trợ giúp phi công tiếp cận bằng mắt theo góc hạ cánh tiêu chuẩn và thường được lắp đặt ở bên trái đường CHC theo hướng hạ cánh.",
    image: "https://attech.com.vn/wp-content/uploads/2022/09/den-Papi.jpg",
  },
  {
    id: 5,
    slug: "den-chc-hai-huong",
    title: "Đèn lề đường CHC hai hướng lắp nổi",
    fullTitle: "Đèn lề đường CHC hai hướng lắp nổi",
    category: "Hệ thống đèn hiệu",
    description:
      "Trợ giúp dẫn đường cho phi công và các phương tiện hoạt động trên sân bay trong điều kiện tầm nhìn kém.",
    image:
      "https://attech.com.vn/wp-content/uploads/2015/05/Den_le_CHC_2_huong.jpg",
  },
  {
    id: 6,
    slug: "den-le-duong-noi-led",
    title: "Đèn lề đường lăn lắp nổi LED",
    fullTitle: "Đèn lề đường lăn lắp nổi LED",
    category: "Hệ thống đèn hiệu",
    description:
      "Đèn lề đường lăn được lắp đặt 2 bên lề đường lăn và lề sân đỗ nhằm trợ giúp dẫn đường cho các phương tiện hoạt động trên sân bay trong điều kiện tầm nhìn kém",
    image:
      "https://attech.com.vn/wp-content/uploads/2015/05/Den_le_duong_lan_LED_-_halogen.jpg",
  },
  {
    id: 7,
    slug: "den-chop-lap-noi",
    title: "Đèn chớp lắp nổi",
    fullTitle: "Đèn chớp lắp nổi",
    category: "Hệ thống đèn hiệu",
    description:
      "Đèn chớp 1 hướng lắp nổi được sử dụng lắp đặt cho đèn chớp nhận dạng thềm đường CHC (RTIL).",
    image:
      "https://attech.com.vn/wp-content/uploads/2015/04/Den-chop-lap-noi.jpg",
  },
  {
    id: 8,
    slug: "den-1-pha-lap-noi",
    title: "Đèn pha 1 hướng lắp nổi",
    fullTitle: "Đèn pha 1 hướng lắp nổi",
    category: "Hệ thống đèn hiệu",
    description:
      "Đèn pha 1 hướng được sử dụng lắp đặt cho đèn tiếp cận CAT I, II và III với ánh sáng trắng (Clear) và ánh sáng đỏ (Red)..",
    image:
      "https://attech.com.vn/wp-content/uploads/2015/05/Den_pha_1_huong.jpg",
  },
  {
    id: 9,
    slug: "den-pha-xoay",
    title: "Đèn pha xoay",
    fullTitle: "Đèn chớp lắp nổi",
    category: "Hệ thống đèn hiệu",
    description:
      "Đèn pha xoay được sử dụng để trợ giúp phi công xác định được vị trí của sân bay trong điều kiện tầm nhìn kém hoặc ban đêm",
    image: "https://attech.com.vn/wp-content/uploads/2015/05/Den_pha_xoay.jpg",
  },
  {
    id: 10,
    slug: "shelter-composite",
    title: "Shelter Composite",
    fullTitle: "Shelter Composite",
    category: "Shelter",
    description:
      "Phòng đặt thiết bị (Shelter) được sử dụng để lắp đặt tại các đài/trạm như: DVOR/DME, ADS-B, Localizer (LLZ), Glide Path, ILS, trạm viễn thông BTS,...Phòng đặt thiết bị phải đảm bảo cho các thiết bị bên trong hoạt động an toàn trong mọi điều kiện thời tiết, đảm bảo thông tin tại các trạm được liên tục.",
    image:
      "https://attech.com.vn/wp-content/uploads/2015/06/shelter-composite.jpg",
  },
  {
    id: 11,
    slug: "shelter-thep",
    title: "Shelter Thép",
    fullTitle: "Shelter Thép",
    category: "Shelter",
    description:
      "Được sử dụng để lắp đặt tại các đài/trạm như: DVOR/DME, ADS-B, Localizer (LLZ), Glide Path, ILS, trạm viễn thông BTS,...",
    image: "https://attech.com.vn/wp-content/uploads/2015/05/Shelter.jpg",
  },
  {
    id: 12,
    slug: "aic-console",
    title: "ATC consoles",
    fullTitle: "ATC consoles",
    category: "Bàn console",
    description:
      "Bàn console được thiết kế riêng biệt để lắp đặt các thiết bị kỹ thuật như đồng hồ GPS, màn hình giám sát, màn hình hiển thị thông tin, hệ thống điều khiển thoại VCCS, E Strip... hỗ trợ kiểm soát viên không lưu điều hành hoạt động bay tại Đài kiểm soát không lưu (TWR), Trung tâm điều hành bay kiếm soát tiếp cận (APP) và Trung tâm phối hợp điều hành bay đường dài (ACC)",
    image:
      "https://attech.com.vn/wp-content/uploads/2015/06/shelter-composite.jpg",
  },
  {
    id: 13,
    slug: "technical-console",
    title: "Technical console",
    fullTitle: "Technical console",
    category: "Bàn console",
    description:
      "Được sử dụng để lắp đặt tại các đài/trạm như: DVOR/DME, ADS-B, Localizer (LLZ), Glide Path, ILS, trạm viễn thông BTS,...",
    image:
      "https://attech.com.vn/wp-content/uploads/2016/08/ban-console-2016.jpg",
  },
  {
    id: 14,
    slug: "gian-phan-xa-de-pha-huy",
    title: "Giàn phản xạ dễ phá hủy",
    fullTitle: "Giàn phản xạ dễ phá hủy",
    category: "Giàn phản xạ VOR",
    description:
      "Bàn console được thiết kế riêng biệt để lắp đặt các thiết bị kỹ thuật như đồng hồ GPS, màn hình giám sát, màn hình hiển thị thông tin, hệ thống điều khiển thoại VCCS, E Strip... hỗ trợ kiểm soát viên không lưu điều hành hoạt động bay tại Đài kiểm soát không lưu (TWR), Trung tâm điều hành bay kiếm soát tiếp cận (APP) và Trung tâm phối hợp điều hành bay đường dài (ACC)",
    image:
      "https://attech.com.vn/wp-content/uploads/2015/06/shelter-composite.jpg",
  },
  {
    id: 15,
    slug: "gian-phan-xa-thep",
    title: "Giàn phản xạ thép",
    fullTitle: "Giàn phản xạ thép",
    category: "Giàn phản xạ VOR",
    description:
      "Được sử dụng để lắp đặt tại các đài/trạm như: DVOR/DME, ADS-B, Localizer (LLZ), Glide Path, ILS, trạm viễn thông BTS,...",
    image:
      "https://attech.com.vn/wp-content/uploads/2016/08/ban-console-2016.jpg",
  },
  {
    id: 16,
    slug: "ghi-am-chuyen-dung-hang-khong",
    title: "Thiết bị ghi âm chuyên dụng",
    fullTitle: "Thiết bị ghi âm chuyên dụng",
    category: "Thiết bị ghi âm/ ghi hình",
    description:
      "Ghi âm các cuộc gọi trên đường thoại analog, các tín hiệu thoại thu phát của các thiết bị HF, VHF",
    image: "https://attech.com.vn/wp-content/uploads/2015/12/ghiam2015.jpg",
  },
  {
    id: 17,
    slug: "ghi-thoai-du-lieu",
    title: "Thiết bị ghi thoại dữ liệu",
    fullTitle: "Thiết bị ghi thoại dữ liệu",
    category: "Thiết bị ghi âm/ ghi hình",
    description:
      "Thiết bị ghi thoại dữ liệu là một trong những thiết bị quan trọng được sử dụng trong ngành hàng không để ghi lại dữ liệu hình ảnh và tín hiệu liên lạc thoại trong quá trình thông tin, liên lạc hiệp đồng điều hành bay nhằm mục đích đảm bảo an toàn hoạt động hàng không dân dụng cũng như cung cấp bằng chứng cho công tác điều tra khi có xảy ra sự cố.",
    image:
      "https://attech.com.vn/wp-content/uploads/2020/10/Thiet-bi-ghi-thoai-dl.jpg",
  },
  {
    id: 18,
    title: "Đồng hồ thời gian chuẩn GPS",
    fullTitle: "Đồng hồ thời gian chuẩn GPS",
    category: "Các sản phẩm dân dụng khác",
    description:
      "Hệ thống đồng hồ thời gian chuẩn GPS là hệ thống thiết bị cung cấp thông tin thời gian chuẩn thu từ GPS với độ chính xác đến nano giây.",
    image:
      "https://attech.com.vn/wp-content/uploads/2016/08/dong-ho-master.jpg",
  },
  {
    id: 19,
    slug: "may-cat-vau",
    title: "Máy cắt vấu",
    fullTitle: "Máy cắt vấu",
    category: "Các sản phẩm dân dụng khác",
    description:
      "Máy cắt Vấu do Attech thiết kế chế tạo và lắp đặt theo đơn đặt hàng của công ty Sakura - Nhật Bản",
    image:
      "https://attech.com.vn/wp-content/uploads/2015/07/11-May-cat-Vau-1.jpg",
  },
  {
    id: 20,
    slug: "may-la",
    title: "Máy là",
    fullTitle: "Máy là",
    category: "Các sản phẩm dân dụng khác",
    description:
      "Máy là do Attech thiết kế chế tạo và lắp đặt theo đơn đặt hàng của công ty Sakura - Nhật Bản",
    image: "https://attech.com.vn/wp-content/uploads/2015/07/10-May-la-1.jpg",
  },
  {
    id: 21,
    slug: "may-han-tig",
    title: "Máy hàn TIG",
    fullTitle: "Máy hàn TIG",
    category: "Các sản phẩm dân dụng khác",
    description:
      "Máy hàn TIG do Attech thiết kế chế tạo và lắp đặt theo đơn đặt hàng của công ty Sakura - Nhật Bản",
    image:
      "https://attech.com.vn/wp-content/uploads/2015/07/08-May-han-TIG-1.jpg",
  },
  {
    id: 22,
    slug: "may-loc",
    title: "Máy lốc",
    fullTitle: "Máy lốc",
    category: "Các sản phẩm dân dụng khác",
    description:
      "Máy lốc do Attech thiết kế chế tạo và lắp đặt theo đơn đặt hàng của công ty Sakura Nhật Bản",
    image: "https://attech.com.vn/wp-content/uploads/2015/07/07-May-loc-1.jpg",
  },
  {
    id: 23,
    slug: "may-han-quay",
    title: "Máy hàn quay",
    fullTitle: "Máy hàn quay",
    category: "Các sản phẩm dân dụng khác",
    description:
      "Máy lốc do Attech thiết kế chế tạo và lắp đặt theo đơn đặt hàng của công ty Sakura Nhật Bản",
    image:
      "https://attech.com.vn/wp-content/uploads/2015/07/05-May-han-quay-1.jpg",
  },
];

const categorySlugMap = {
  "CNS/ATM": "cns-atm",
  "Hệ thống đèn hiệu": "he-thong-den-hieu",
  Shelter: "shelter",
  "Bàn console": "ban-console",
  "Giàn phản xạ VOR": "gian-phan-xa-vor",
  "Thiết bị ghi âm/ghi hình": "thiet-bi-ghi-am-ghi-hinh",
  "Các sản phẩm dân dụng khác": "cac-san-pham-dan-dung-khac",
};

const ProductList = () => {
  const { category } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [viewMode, setViewMode] = useState("grid");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    let result = [...products];
    
    // Filter by category if provided
    if (category) {
      result = result.filter(product => 
        product.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Filter by search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter(product =>
        product.title.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower)
      );
    }

    // Filter by selected categories
    if (selectedCategories.length > 0) {
      result = result.filter(product =>
        selectedCategories.includes(product.category)
      );
    }

    // Sort products
    result.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.title.localeCompare(b.title);
        case "category":
          return a.category.localeCompare(b.category);
        default:
          return 0;
      }
    });

    setFilteredProducts(result);
  }, [category, searchTerm, sortBy, selectedCategories]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (e) => {
    setSortBy(e.target.value);
  };

  const handleViewMode = (mode) => {
    setViewMode(mode);
  };

  const handleCategoryFilter = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="product-list-container">
      <div className="product-controls">
        <div className="search-container">
          <i className="fas fa-search search-icon"></i>
          <input
            type="text"
            className="search-input"
            placeholder="Tìm kiếm sản phẩm..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        <div className="product-filters">
          <select 
            className="sort-select"
            value={sortBy}
            onChange={handleSort}
          >
            <option value="name">Sắp xếp theo tên</option>
            <option value="category">Sắp xếp theo danh mục</option>
          </select>

          <div className="view-mode">
            <button
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => handleViewMode('grid')}
            >
              <i className="fas fa-th"></i>
            </button>
            <button
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => handleViewMode('list')}
            >
              <i className="fas fa-list"></i>
            </button>
          </div>
        </div>
      </div>

      <div className="category-filters">
        {Array.from(new Set(products.map(p => p.category))).map(cat => (
          <button
            key={cat}
            className={`category-filter-btn ${selectedCategories.includes(cat) ? 'active' : ''}`}
            onClick={() => handleCategoryFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {filteredProducts.length === 0 ? (
        <div className="no-products">
          <i className="fas fa-search"></i>
          <p>Không tìm thấy sản phẩm phù hợp</p>
        </div>
      ) : (
        <div className={`product-grid ${viewMode}`}>
          {filteredProducts.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              viewMode={viewMode}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
