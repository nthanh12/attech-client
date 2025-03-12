import React from "react";
import "../../../assets/css/Information/Experience.css";

const Experience = () => {
  const awards = [
    {
      year: 2002,
      award: "Huân chương lao động hạng III",
      decision: "180/2003/QĐ/CTN",
    },
    { year: 2003, award: "Bằng khen Cục HK", decision: "3477/QĐ-CHK" },
    { year: 2004, award: "Tập thể lao động xuất sắc", decision: "2536/QĐ-CHK" },
    // Add all other awards here
    {
      year: 2016,
      award: "Cờ thi đua xuất sắc của Bộ GTVT",
      decision: "40/QĐ-BGTVT",
    },
    {
      year: 2017,
      award: "Tập thể lao động xuất sắc theo Quyết định",
      decision: "6756/QĐ-QLB",
    },
  ];

  return (
    <div className="experience">
      <h2>Năng lực, Kinh nghiệm của Công ty TNHH Kỹ thuật Quản lý bay</h2>
      <p>
        Những năm 1990, cùng với sự phát triển của ngành Hàng không, kỹ thuật
        công nghệ thông tin là nhu cầu thực tiễn đầu tư phát triển ngành Quản lý
        bay...
      </p>
      <p>
        Năm 1998 khi công trình đài DVOR/DME Nội Bài được đầu tư, Trung tâm DVKT
        Bảo đảm hoạt động bay đề xuất phương án thiết kế, sản xuất lắp đặt dàn
        phản xạ thay thế nhập ngoại...
      </p>
      <p>
        Đến năm 2000 tiếp tục thiết kế, lắp đặt 4 dàn phản xạ, 4 đài dẫn đường
        DVOR/DME tại các sân bay Vinh, Cát bi, Phú bài, Buôn ma thuột...
      </p>

      <h3>Phát triển ngành Quản lý bay (1990-2000)</h3>
      <ul>
        <li>1998: Đầu tư công trình đài DVOR/DME Nội Bài</li>
        <li>
          2000: Thiết kế và lắp đặt 4 dàn phản xạ và đài dẫn đường DVOR/DME tại
          các sân bay
        </li>
      </ul>

      <h3>Công nghệ thông tin và những thành tựu (2000-2010)</h3>
      <ul>
        <li>
          Viết chương trình phần mềm, thiết kế lắp đặt trung tâm chuyển điện văn
          tự động AMSC
        </li>
        <li>Tham gia ứng phó sự cố Y2K năm 2000</li>
      </ul>

      <h3>Những công trình trọng điểm gần đây</h3>
      <ul>
        <li>Thiết kế thi công đài chỉ huy sân bay quốc tế Nội Bài</li>
        <li>
          Thiết kế chế tạo cột anten cao 65m, 45m cho Trung tâm Kiểm soát không
          lưu đường dài, tiếp cận AACC/HCM
        </li>
      </ul>

      <h3>Thành tựu và giải thưởng (2002-2017)</h3>
      <table className="awards-table">
        <thead>
          <tr>
            <th>Năm</th>
            <th>Giải thưởng</th>
            <th>Quyết định</th>
          </tr>
        </thead>
        <tbody>
          {awards.map((award, index) => (
            <tr key={index}>
              <td>{award.year}</td>
              <td>{award.award}</td>
              <td>{award.decision}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Experience;
