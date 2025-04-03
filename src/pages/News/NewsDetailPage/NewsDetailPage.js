import React from "react";
import { useParams, Link } from "react-router-dom";
import "./NewsDetailPage.css";

const NewsDetailPage = () => {
  const { slug } = useParams();

  const newsData = [
    {
      id: 1,
      slug: "hoan-thanh-canh-thu-tai-tram-cns-con-son",
      title:
        "Hoàn thành canh thu, đảm bảo kỹ thuật các tần số VHF tại trạm CNS Côn Sơn",
      image:
        "https://attech.com.vn/wp-content/uploads/2025/03/canh-thu-Con-Son-28-3-1.jpg",
      date: "31/03/2025",
      content: `
        <div class="Normal">
<p style="text-align: justify;"><em><strong>Thực hiện theo văn bản của Ban kỹ thuật TCT QLBVN về việc thu thử tần số phục vụ c&ocirc;ng t&aacute;c điều h&agrave;nh bay theo dự &aacute;n ATCC Hồ Ch&iacute; Minh, C&ocirc;ng ty TNHH Kỹ thu&acirc;̣t Quản lý bay đã giao nhi&ecirc;̣m vụ cho Xưởng Dịch vụ kỹ thu&acirc;̣t (X.DVKT) x&acirc;y dựng phương án và thực hi&ecirc;̣n canh thu c&aacute;c tần số VHF tại trạm CNS C&ocirc;n Sơn. Sau khi nh&acirc;̣n được nhi&ecirc;̣m vụ, Xưởng DVKT đã khẩn trương x&acirc;y dựng phương án kỹ thuật canh thu VHF tại trạm CNS C&ocirc;n Sơn nhằm kiểm tra can nhiễu c&oacute; thể ảnh hưởng tới c&aacute;c tần số hoạt động của hệ thống VHF phục vụ cho ATCC Hồ Ch&iacute; Minh trong tương lai với 05 tần số được lựa chọn.</strong></em></p>
<p style="text-align: center;" align="center"><img class="aligncenter size-full wp-image-11507" src="https://attech.com.vn/wp-content/uploads/2025/03/canh-thu-Con-Son-28-3-1.jpg" alt="canh thu Con Son 28-3 1" /></p>
<p style="text-align: center;" align="center"><em>Cột anten lắp đặt thu thử dữ liệu VHF</em></p>
<p style="text-align: justify;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Triển khai hoạt động canh thu, DVKT đ&atilde; thực hiện lắp đặt 01 m&aacute;y ph&acirc;n t&iacute;ch phổ để đo phổ mức độ t&iacute;n hiệu thu VHF v&agrave; đo can nhiễu tại từng tần số thu thử, đ&aacute;nh gi&aacute; nhiễu t&iacute;n hiệu c&oacute; thể ảnh hưởng tới c&aacute;c tần số n&ecirc;u tr&ecirc;n. Đồng thời, Xưởng DVKT thực hiện lắp đặt hệ thống thiết bị VHF với anten được đặt tr&ecirc;n cột trạm BTS Viettel đỉnh n&uacute;i Th&aacute;nh Gi&aacute;. Hệ thống thu VHF được kết nối với thiết bị ghi &acirc;m để ghi dữ liệu thu. Kết quả thu thử được ghi trong thời gian 03 ng&agrave;y lấy số liệu phục vụ c&ocirc;ng t&aacute;c b&aacute;o c&aacute;o đ&aacute;nh gi&aacute; sau khi canh thu.</p>
<p style="text-align: center;" align="center"><img class="aligncenter size-full wp-image-11508" src="https://attech.com.vn/wp-content/uploads/2025/03/canh-thu-Con-Son-28-3-2.jpg" alt="canh thu Con Son 28-3 2" /></p>
<p style="text-align: center;" align="center"><em>C&ocirc;ng t&aacute;c thực hiện lắp đặt anten v&agrave; đi c&aacute;p cho anten VHF tr&ecirc;n cột Viettel trong điều kiện thời tiết khắc nghiệt</em></p>
<p style="text-align: justify;">Trong qu&aacute; tr&igrave;nh thi c&ocirc;ng, nh&acirc;n vi&ecirc;n kỹ thuật Xưởng DVKT lu&ocirc;n tu&acirc;n thủ c&aacute;c y&ecirc;u cầu về an to&agrave;n lao động, đảm bảo vệ sinh m&ocirc;i trường cũng như lu&ocirc;n chấp h&agrave;nh nghi&ecirc;m c&aacute;c quy định của c&aacute;c đơn vị phối hợp tr&ecirc;n n&uacute;i Th&aacute;nh Gi&aacute; để khắc phục mọi kh&oacute; khắn do điều kiện thời tiết v&agrave; m&ocirc;i trường biển đảo, đảm bảo đ&uacute;ng phương &aacute;n kỹ thuật trong qu&aacute; tr&igrave;nh lắp đặt bổ sung c&aacute;c anten VHF.</p>
<p style="text-align: justify;">Kết th&uacute;c chuyến c&ocirc;ng t&aacute;c, việc triển khai canh thu được đội thi c&ocirc;ng thực hiện đảm bảo tu&acirc;n thủ theo quy định an to&agrave;n th&ocirc;ng tin của Tổng c&ocirc;ng ty Quản l&yacute; bay Việt Nam cũng như của C&ocirc;ng ty TNHH Kỹ thuật Quản l&yacute; bay.</p>
<p style="text-align: right;"><strong><em>B&agrave;i v&agrave; ảnh: Nguyễn Ho&agrave;i Nam &ndash; TT RSC, Xưởng DVKT</em></strong></p>
</div>
      `,
    },
    {
      id: 2,
      slug: "le-ky-ket-hop-dong-goi-thau-tb05",
      title: "Lễ ký kết Hợp đồng cho Gói thầu TB05...",
      image:
        "https://attech.com.vn/wp-content/uploads/2025/03/hop-dong-tb05-4-3-1.jpg",
      date: "30/04/2024",
      content: `<p>Ngày 30/04/2024...</p>`,
    },
    // Các bài khác...
  ];

  const newsItem = newsData.find((item) => item.slug === slug);
  if (!newsItem) {
    return <div className="not-found">Bài viết không tồn tại!</div>;
  }

  const relatedArticles = newsData
    .filter((item) => item.slug !== slug)
    .slice(0, 3);

  return (
    <div className="news-detail-page">
      <div className="news-sidebar">
        <h3>Danh mục bài viết</h3>
        <ul>
          {newsData.map((item) => (
            <li key={item.id}>
              <Link to={`/news/${item.slug}`}>{item.title}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="news-detail-container">
        {/* Bọc header và image trong một container flex */}
        <div className="news-detail-top">
          <div className="news-detail-image">
            <img src={newsItem.image} alt={newsItem.title} />
          </div>
          <div className="news-detail-header">
            <h1 className="news-detail-title">{newsItem.title}</h1>
            <span className="news-detail-date">Ngày đăng: {newsItem.date}</span>
          </div>
        </div>
        <div
          className="news-detail-content"
          dangerouslySetInnerHTML={{ __html: newsItem.content }}
        />
        <div className="related-articles">
          <h2>Bài viết liên quan</h2>
          <div className="related-articles-list">
            {relatedArticles.map((item) => (
              <div key={item.id} className="related-article-item">
                <Link to={`/news/${item.id}/${item.slug}`}>
                  <img src={item.image} alt={item.title} />
                  <h4>{item.title}</h4>
                  <span>{item.date}</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDetailPage;
