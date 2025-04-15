import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import sanitizeHtml from "sanitize-html";
import "./NewsDetailPage.css";

const NewsDetailPage = () => {
  const { slug } = useParams();
  const [searchTerm, setSearchTerm] = useState("");

  // Dữ liệu giả lập (newsData)
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
<p style="text-align: justify;"><em>Thực hiện theo văn bản của Ban kỹ thuật TCT QLBVN về việc thu thử tần số phục vụ c&ocirc;ng t&aacute;c điều h&agrave;nh bay theo dự &aacute;n ATCC Hồ Ch&iacute; Minh, C&ocirc;ng ty TNHH Kỹ thu&acirc;̣t Quản lý bay đã giao nhi&ecirc;̣m vụ cho Xưởng Dịch vụ kỹ thu&acirc;̣t (X.DVKT) x&acirc;y dựng phương án và thực hi&ecirc;̣n canh thu c&aacute;c tần số VHF tại trạm CNS C&ocirc;n Sơn. Sau khi nh&acirc;̣n được nhi&ecirc;̣m vụ, Xưởng DVKT đã khẩn trương x&acirc;y dựng phương án kỹ thuật canh thu VHF tại trạm CNS C&ocirc;n Sơn nhằm kiểm tra can nhiễu c&oacute; thể ảnh hưởng tới c&aacute;c tần số hoạt động của hệ thống VHF phục vụ cho ATCC Hồ Ch&iacute; Minh trong tương lai với 05 tần số được lựa chọn.</em></p>
<p style="text-align: center;">&nbsp;</p>
<p style="text-align: center;" align="center"><img class="aligncenter size-full wp-image-11507" src="https://attech.com.vn/wp-content/uploads/2025/03/canh-thu-Con-Son-28-3-1.jpg" alt="canh thu Con Son 28-3 1" /></p>
<p style="text-align: center;" align="center"><em>Cột anten lắp đặt thu thử dữ liệu VHF</em></p>
<p style="text-align: justify;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Triển khai hoạt động canh thu, DVKT đ&atilde; thực hiện lắp đặt 01 m&aacute;y ph&acirc;n t&iacute;ch phổ để đo phổ mức độ t&iacute;n hiệu thu VHF v&agrave; đo can nhiễu tại từng tần số thu thử, đ&aacute;nh gi&aacute; nhiễu t&iacute;n hiệu c&oacute; thể ảnh hưởng tới c&aacute;c tần số n&ecirc;u tr&ecirc;n. Đồng thời, Xưởng DVKT thực hiện lắp đặt hệ thống thiết bị VHF với anten được đặt tr&ecirc;n cột trạm BTS Viettel đỉnh n&uacute;i Th&aacute;nh Gi&aacute;. Hệ thống thu VHF được kết nối với thiết bị ghi &acirc;m để ghi dữ liệu thu. Kết quả thu thử được ghi trong thời gian 03 ng&agrave;y lấy số liệu phục vụ c&ocirc;ng t&aacute;c b&aacute;o c&aacute;o đ&aacute;nh gi&aacute; sau khi canh thu.</p>
<p style="text-align: center;" align="center"><img class="aligncenter size-full wp-image-11508" src="https://attech.com.vn/wp-content/uploads/2025/03/canh-thu-Con-Son-28-3-2.jpg" alt="canh thu Con Son 28-3 2" /></p>
<p style="text-align: center;" align="center"><em>C&ocirc;ng t&aacute;c thực hiện lắp đặt anten v&agrave; đi c&aacute;p cho anten VHF tr&ecirc;n cột Viettel trong điều kiện thời tiết khắc nghiệt</em></p>
<p style="text-align: justify;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Trong qu&aacute; tr&igrave;nh thi c&ocirc;ng, nh&acirc;n vi&ecirc;n kỹ thuật Xưởng DVKT lu&ocirc;n tu&acirc;n thủ c&aacute;c y&ecirc;u cầu về an to&agrave;n lao động, đảm bảo vệ sinh m&ocirc;i trường cũng như lu&ocirc;n chấp h&agrave;nh nghi&ecirc;m c&aacute;c quy định của c&aacute;c đơn vị phối hợp tr&ecirc;n n&uacute;i Th&aacute;nh Gi&aacute; để khắc phục mọi kh&oacute; khắn do điều kiện thời tiết v&agrave; m&ocirc;i trường biển đảo, đảm bảo đ&uacute;ng phương &aacute;n kỹ thuật trong qu&aacute; tr&igrave;nh lắp đặt bổ sung c&aacute;c anten VHF.</p>
<p style="text-align: justify;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Kết th&uacute;c chuyến c&ocirc;ng t&aacute;c, việc triển khai canh thu được đội thi c&ocirc;ng thực hiện đảm bảo tu&acirc;n thủ theo quy định an to&agrave;n th&ocirc;ng tin của Tổng c&ocirc;ng ty Quản l&yacute; bay Việt Nam cũng như của C&ocirc;ng ty TNHH Kỹ thuật Quản l&yacute; bay.</p>
<p style="text-align: right;"><strong><em>B&agrave;i v&agrave; ảnh: Nguyễn Ho&agrave;i Nam &ndash; TT RSC, Xưởng DVKT</em></strong></p>
      `,
    },
    {
      id: 2,
      slug: "le-ky-ket-hop-dong-goi-thau-tb05",
      title: "Lễ ký kết Hợp đồng cho Gói thầu TB05...",
      image:
        "https://attech.com.vn/wp-content/uploads/2025/03/hop-dong-tb05-4-3-1.jpg",
      date: "30/04/2024",
      content: `
      <p style="text-align: left;"><em><strong>Dự &aacute;n đầu tư x&acirc;y dựng Cảng h&agrave;ng kh&ocirc;ng quốc tế Long Th&agrave;nh l&agrave; dự &aacute;n trọng điểm quốc gia, c&oacute; nhiều tổ hợp đầu tư phức tạp, hiện đang được c&aacute;c chủ đầu tư khẩn trương đẩy nhanh tiến độ để sớm đưa v&agrave;o khai th&aacute;c. Dự &aacute;n Cảng h&agrave;ng kh&ocirc;ng quốc tế Long Th&agrave;nh giai đoạn 1 gồm c&oacute; 4 th&agrave;nh phần, trong đ&oacute; c&oacute; Dự &aacute;n th&agrave;nh phần 2 &ldquo;C&aacute;c c&ocirc;ng tr&igrave;nh phục vụ quản l&yacute; bay&rdquo; do Tổng c&ocirc;ng ty Quản l&yacute; bay Việt Nam l&agrave;m chủ đầu tư.</strong></em></p>
<p style="text-align: left;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; G&oacute;i thầu TB05 &ldquo;Cung cấp v&agrave; lắp đặt hệ thống DVOR/DME&rdquo; nằm trong Dự &aacute;n th&agrave;nh phần 2. Đ&acirc;y l&agrave; một trong c&aacute;c g&oacute;i thầu đấu thầu quốc tế quan trọng của Tổng c&ocirc;ng ty để đảm bảo cung cấp dịch vụ dẫn đường v&ocirc; tuyến h&agrave;ng kh&ocirc;ng cho khu vực Cảng h&agrave;ng kh&ocirc;ng quốc tế Long Th&agrave;nh. Tr&ecirc;n cơ sở c&aacute;c năng lực hiện c&oacute;, C&ocirc;ng ty đ&atilde; tham gia đấu thấu v&agrave; tr&uacute;ng thầu g&oacute;i thầu n&agrave;y. Để đ&aacute;p ứng tiến độ của dự &aacute;n, hai b&ecirc;n đ&atilde; khẩn trương đ&aacute;m ph&agrave;n, ho&agrave;n thiện v&agrave; tiến h&agrave;nh k&yacute; kết Hợp đồng v&agrave;o ng&agrave;y 28/02/2025.</p>
<p style="text-align: center;" align="center"><img class="aligncenter size-full wp-image-11472" src="https://attech.com.vn/wp-content/uploads/2025/03/hop-dong-tb05-4-3-1.jpg" alt="hop dong tb05 4-3 1" /></p>
<p style="text-align: center;" align="center"><em>&Ocirc;ng Hồ Sỹ T&ugrave;ng &ndash; Ph&oacute; Tổng gi&aacute;m đốc VATM v&agrave;</em></p>
<p style="text-align: center;" align="center"><em>&Ocirc;ng Nguyễn Ho&agrave;ng Giang &ndash; Gi&aacute;m đốc ATTECH k&yacute; kết Hợp đồng g&oacute;i thầu TB05</em></p>
<p style="text-align: left;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Tham dự buổi lễ c&oacute; đại diện Chủ đầu tư l&agrave; &Ocirc;ng Hồ Sỹ T&ugrave;ng &ndash; Ph&oacute; Tổng gi&aacute;m đốc VATM c&ugrave;ng đại diện Ban quản l&yacute; dự &aacute;n Long Th&agrave;nh, về ph&iacute;a C&ocirc;ng ty c&oacute; &Ocirc;ng Nguyễn Ho&agrave;ng Giang &ndash; Gi&aacute;m đốc c&ugrave;ng đại diện l&atilde;nh đạo c&aacute;c Ph&ograve;ng Kế hoạch Kinh doanh, Ph&ograve;ng T&agrave;i ch&iacute;nh Kế to&aacute;n, Ph&ograve;ng Kỹ thuật An To&agrave;n Chất lượng.</p>
<p style="text-align: center;" align="center"><a href="https://attech.com.vn/wp-content/uploads/2025/03/hop-dong-tb05-4-3-2.jpg"><img class="aligncenter size-full wp-image-11473" src="https://attech.com.vn/wp-content/uploads/2025/03/hop-dong-tb05-4-3-2.jpg" alt="hop dong tb05 4-3 2" /></a></p>
<p style="text-align: center;" align="center"><em>Đại diện l&atilde;nh đạo VATM v&agrave; ATTECH tại lễ k&yacute; kết Hợp đồng</em></p>
<p style="text-align: left;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Với t&iacute;nh chất quan trọng của G&oacute;i thầu TB05 n&oacute;i ri&ecirc;ng v&agrave; Dự &aacute;n n&oacute;i chung, ATTECH khẳng định sẽ thực hiện đ&uacute;ng theo Hợp đồng đ&atilde; k&yacute; để đảm bảo đạt mục ti&ecirc;u về chất lượng, cũng như tiến độ của g&oacute;i thầu, g&oacute;p phần cho dự &aacute;n th&agrave;nh phần 2 c&ugrave;ng c&aacute;c dự &aacute;n th&agrave;nh phần kh&aacute;c hiện thực h&oacute;a mục ti&ecirc;u đưa Cảng H&agrave;ng kh&ocirc;ng quốc tế Long Th&agrave;nh giai đoạn 1 v&agrave;o khai th&aacute;c v&agrave;o cuối năm 2025.&nbsp;</p>
<p style="text-align: right;" align="right"><strong><em>B&agrave;i: Vũ Thu Trang &ndash; P.KHKD</em></strong></p>
<p style="text-align: right;"><strong><em>Ảnh: Trịnh Phương Thu &ndash; VPCT</em></strong></p>
      `,
    },
    {
      id: 3,
      slug: "attech-va-nesic-hoan-thanh-nghiem-thu",
      title:
        "ATTECH và NESIC hoàn thành nghiệm thu tại Nhà máy 05 phòng đặt thiết bị (Shelter) thép",
      image:
        "https://attech.com.vn/wp-content/uploads/2025/02/nesic-nghiem-thu-18-02-2.jpg",
      date: "20/03/2025",
      content: `<p>Ngày 30/04/2024...</p>`,
    },
    {
      id: 4,
      slug: "hoan-thanh-cong-tac-bay-kiem-tra-dot-2-2024-2025",
      title:
        "Hoàn thành công tác bay kiểm tra, hiệu chuẩn các thiết bị dẫn đường, giám sát hàng không đợt 2 mùa bay 2024/2025",
      image: "https://attech.com.vn/wp-content/uploads/2025/02/BHC-5-2.jpg",
      date: "30/03/2025",
      content: `<p>Ngày 30/04/2024...</p>`,
    },
    {
      id: 5,
      slug: "hoi-nghi-nguoi-lao-dong-2025",
      title:
        "Ban Quản lý dự án Đầu tư và xây dựng chuyên ngành tổ chức Hội nghị người lao động năm 2025",
      image:
        "https://attech.com.vn/wp-content/uploads/2025/01/hnnld-ban-22-1-2.jpg",
      date: "26/03/2025",
      content: `<p>Ngày 30/04/2024...</p>`,
    },
    {
      id: 6,
      slug: "hoi-nghi-tong-ket-2024-va-ke-hoach-2025",
      title:
        "Công ty TNHH Kỹ thuật Quản lý bay tổ chức Hội nghị tổng kết công tác năm 2024 và triển khai kế hoạch năm 2025",
      image:
        "https://attech.com.vn/wp-content/uploads/2025/01/hntk-nam-2024-21-1-1.jpg",
      date: "22/03/2025",
      content: `<p>Ngày 30/04/2024...</p>`,
    },
    {
      id: 7,
      slug: "giai-pickleball-xuong-dvkt-lan-1",
      title: "Giải Pickleball Xưởng DVKT mở rộng lần 1",
      image:
        "https://attech.com.vn/wp-content/uploads/2025/01/pickleball-l1-21-1-1.jpg",
      date: "21/03/2025",
      content: `<p>Ngày 30/04/2024...</p>`,
    },
    {
      id: 8,
      slug: "dien-tap-ung-pho-tan-cong-gia-mao",
      title:
        "Diễn tập ứng phó tấn công giả mạo trên hệ thống thư điện tử tên miền @attech.com.vn của Công ty",
      image:
        "https://attech.com.vn/wp-content/uploads/2025/01/dien-tap-attt-28-12-1.jpg",
      date: "16/12/2024",
      content: `<p>Ngày 30/04/2024...</p>`,
    },
    {
      id: 9,
      slug: "he-thong-amhs-mo-rong-hoan-thanh-conformance-test",
      title:
        "Hệ thống AMHS mở rộng (AMHS Extended) do ATTECH nghiên cứu, phát triển hoàn thành giai đoạn Conformance Test",
      image: "https://attech.com.vn/wp-content/uploads/2025/01/amhs-6-1-2.jpg",
      date: "16/12/2024",
      content: `<p>Ngày 30/04/2024...</p>`,
    },
    {
      id: 10,
      slug: "nhan-giay-khen-cuc-thue-ha-noi-2023",
      title:
        "Công ty TNHH Kỹ thuật Quản lý bay nhận giấy khen của Cục thuế Hà Nội tuyên dương người nộp thuế tiêu biểu thủ đô năm 2023",
      image: "https://attech.com.vn/wp-content/uploads/2024/12/NTT-19-12-2.jpg",
      date: "16/12/2024",
      content: `<p>Ngày 30/04/2024...</p>`,
    },
  ];

  // Tìm bài viết theo slug
  const newsItem = newsData.find((item) => item.slug === slug);
  if (!newsItem) {
    return <div className="not-found">Bài viết không tồn tại!</div>;
  }

  // Lọc bài viết cho sidebar theo tìm kiếm
  const filteredNews = newsData.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Lọc bài viết liên quan (dựa trên năm hoặc tiêu chí khác)
  const relatedArticles = newsData
    .filter((item) => item.slug !== slug && item.date.includes("2025"))
    .slice(0, 3);

  // Sanitize HTML để tránh xung đột style
  const sanitizedContent = sanitizeHtml(newsItem.content, {
    allowedTags: ["p", "img", "strong", "em", "div", "ul", "li"],
    allowedAttributes: {
      img: ["src", "alt"],
    },
  });

  return (
    <div className="news-detail-page">
      <Helmet>
        <title>{newsItem.title} | Tin tức</title>
        <meta
          name="description"
          content={sanitizedContent.replace(/<[^>]+>/g, "").slice(0, 160)}
        />
      </Helmet>
      <div className="news-sidebar">
        <h3>Danh mục bài viết</h3>
        <input
          type="text"
          placeholder="Tìm kiếm bài viết..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="news-sidebar-search"
          aria-label="Tìm kiếm bài viết"
        />
        <ul>
          {filteredNews.length > 0 ? (
            filteredNews.map((item) => (
              <li key={item.id}>
                <Link
                  to={`/news/${item.id}/${item.slug}`}
                  aria-label={`Xem bài viết ${item.title}`}
                  className={item.slug === slug ? "active" : ""}
                >
                  {item.title}
                </Link>
              </li>
            ))
          ) : (
            <li>
              Không tìm thấy bài viết phù hợp.{" "}
              {newsItem && !filteredNews.some((item) => item.slug === slug) && (
                <span>
                  Đang xem:{" "}
                  <Link to={`/news/${newsItem.slug}`}>{newsItem.title}</Link>
                </span>
              )}
            </li>
          )}
        </ul>
      </div>
      <div className="news-detail-container">
        <div className="news-breadcrumb">
          <Link to="/">Trang chủ</Link> &gt; <Link to="/news">Tin tức</Link>{" "}
          &gt; {newsItem.title}
        </div>
        <div className="news-detail-top">
          <div className="news-detail-image">
            <img src={newsItem.image} alt={newsItem.title} loading="lazy" />
          </div>
          <div className="news-detail-header">
            <h1 className="news-detail-title">{newsItem.title}</h1>
            <span className="news-detail-date">Ngày đăng: {newsItem.date}</span>
          </div>
        </div>
        <div
          className="news-detail-content"
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />
        <div className="news-share">
          <h4>Chia sẻ bài viết:</h4>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
              window.location.href
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chia sẻ lên Facebook"
          >
            Facebook
          </a>
          <a
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
              window.location.href
            )}&text=${encodeURIComponent(newsItem.title)}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chia sẻ lên Twitter"
          >
            Twitter
          </a>
        </div>
        <div className="related-articles">
          <h2>Bài viết liên quan</h2>
          <div className="related-articles-list">
            {relatedArticles.map((item) => (
              <div key={item.id} className="related-article-item">
                <Link
                  to={`/news/${item.id}/${item.slug}`}
                  aria-label={`Xem bài viết ${item.title}`}
                >
                  <img src={item.image} alt={item.title} loading="lazy" />
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

export default React.memo(NewsDetailPage);
