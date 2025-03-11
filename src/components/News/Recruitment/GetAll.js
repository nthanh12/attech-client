import React from "react";
import "../../../assets/css/News/Recruitment/GetAll.css";

import { Link } from "react-router-dom";

const data = [
  {
    id: 1,
    category: "Mobile",
    time: "2 giờ trước",
    title:
      "Thiết kế siêu mỏng của Galaxy S25 Edge có thể là một vấn đề nếu Samsung không làm được điều này",
    description:
      'Thông tin mới nhất cho thấy Galaxy S25 Edge sẽ sở hữu viên pin dung lượng rất "khiêm tốn".',
    image:
      "https://genk.mediacdn.vn/zoom/250_155/139269124445442048/2025/3/11/galaxy-s25-edge-3-173816699907118368675-182-288-1103-1762-crop-1741690464030800598099.jpg",
  },
  {
    id: 2,
    category: "Đồ chơi số",
    time: "1 ngày trước",
    title:
      "Samsung duy trì vị thế thương hiệu loa soundbar số 1 thế giới năm thứ 11 liên tiếp",
    description:
      "Thành công của Samsung trong thị trường loa soundbar là nhờ vào trải nghiệm âm thanh sống động được cung cấp bởi các sản phẩm loa và khả năng kết nối liền mạch với TV Samsung.",
    image:
      "https://genk.mediacdn.vn/zoom/250_155/139269124445442048/2025/3/10/avatar1741595932946-17415959335951919565352.jpg",
  },
  {
    id: 3,
    category: "Mobile",
    time: "3 ngày trước",
    title: "Linh kiện quan trọng nhất của OPPO Find N5 được làm bởi... Samsung",
    description:
      "OPPO Find N5 là mẫu smartphone màn hình gập được săn đón nhất hiện nay.",
    image:
      "https://genk.mediacdn.vn/zoom/250_155/139269124445442048/2025/3/8/dscf7685-17414322732321604260232-13-46-1226-1986-crop-1741432335136591300811-1741453671142-174145367161342907775-0-0-477-764-crop-1741453693343843141249.jpg",
  },
  {
    id: 4,
    category: "Mobile",
    time: "4 ngày trước",
    title:
      "Cận cảnh mẫu điện thoại Trung Quốc đang khiến Apple, Samsung cũng phải dè chừng: Mỏng chỉ 5.75mm, trọng lượng 146g mà pin tận 5.200mAh",
    description:
      "Tuy nhiên, mẫu này sẽ chưa được thương mại hóa, ít nhất là ở thời điểm hiện tại.",
    image:
      "https://genk.mediacdn.vn/zoom/250_155/139269124445442048/2025/3/7/gsmarena015-2-17413192865622124120363-1741323957177-1741323962346407355609-19-0-769-1200-crop-17413239811911437220195.jpg",
  },
];

const GetAll = () => {
  return (
    <div className="container">
      <div className="get-all">
        {data.map((item) => (
          <Link
            key={item.id}
            to={`/news/recruitment/detail/${item.id}`}
            className="piece-link"
          >
            <div key={item.id} className="piece">
              <div className="piece-img">
                <img
                  src={item.image}
                  alt={item.title}
                  className="piece-image"
                />
              </div>
              <div className="piece-content">
                <h3 className="piece-title">{item.title}</h3>
                <p className="piece-category">
                  {item.category} - {item.time}
                </p>
                <p className="piece-description">{item.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default GetAll;
