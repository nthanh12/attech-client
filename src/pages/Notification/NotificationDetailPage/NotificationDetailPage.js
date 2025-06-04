import React, { useState, useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import sanitizeHtml from "sanitize-html";
import "./NotificationDetailPage.css";

const NotificationDetailPage = () => {
  const { slug } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [tableOfContents, setTableOfContents] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Dữ liệu giả lập (notificationData)
  const notificationData = [
    {
      id: 1,
      slug: "thong-bao-lich-nghi-tet-nguyen-dan-2025",
      title: "Thông báo lịch nghỉ Tết Nguyên đán 2025",
      image: "https://attech.com.vn/wp-content/uploads/2025/01/lich-nghi-tet-2025.jpg",
      date: "15/01/2025",
      content: `
<p style="text-align: justify;"><strong>Kính gửi: Toàn thể CBNV Công ty</strong></p>
<p style="text-align: justify;">Căn cứ Bộ luật Lao động số 45/2019/QH14 ngày 20/11/2019;</p>
<p style="text-align: justify;">Căn cứ Thông báo số 13/TB-LĐTBXH ngày 10/01/2025 của Bộ Lao động - Thương binh và Xã hội về việc nghỉ Tết Âm lịch và Quốc khánh trong năm 2025 đối với cán bộ, công chức, viên chức và người lao động;</p>
<p style="text-align: justify;">Ban Giám đốc Công ty thông báo lịch nghỉ Tết Nguyên đán Giáp Thìn năm 2025 như sau:</p>
<p style="text-align: justify;">1. Thời gian nghỉ: từ ngày 08/02/2025 đến hết ngày 14/02/2025 (tức là từ ngày 29 tháng Chạp năm Quý Mão đến hết ngày mùng 5 tháng Giêng năm Giáp Thìn).</p>
<p style="text-align: justify;">2. Trong thời gian nghỉ Tết, các đơn vị phải bố trí cán bộ trực để giải quyết công việc, đảm bảo an toàn tài sản, phòng chống cháy nổ.</p>
<p style="text-align: justify;">3. Yêu cầu Trưởng các đơn vị:</p>
<p style="text-align: justify;">- Thông báo lịch nghỉ Tết đến toàn thể CBNV.</p>
<p style="text-align: justify;">- Lập danh sách cán bộ trực Tết gửi về phòng Tổ chức - Hành chính trước ngày 01/02/2025.</p>
<p style="text-align: justify;">- Quán triệt CBNV thực hiện nghiêm túc nội quy, quy định của Công ty trong dịp nghỉ Tết.</p>
<p style="text-align: right;"><strong><em>Ban Giám đốc</em></strong></p>
      `,
    },
    {
      id: 2,
      slug: "thong-bao-lich-tap-huan-pccc-2025",
      title: "Thông báo lịch tập huấn PCCC năm 2025",
      image: "https://attech.com.vn/wp-content/uploads/2025/01/tap-huan-pccc.jpg",
      date: "10/01/2025",
      content: `<p>Nội dung thông báo tập huấn PCCC...</p>`,
    },
    {
      id: 3,
      slug: "thong-bao-to-chuc-dai-hoi-cong-doan",
      title: "Thông báo tổ chức Đại hội Công đoàn nhiệm kỳ 2025-2030",
      image: "https://attech.com.vn/wp-content/uploads/2025/01/dai-hoi-cong-doan.jpg",
      date: "05/01/2025",
      content: `<p>Nội dung thông báo đại hội công đoàn...</p>`,
    },
    {
      id: 4,
      slug: "thong-bao-kiem-tra-suc-khoe-dinh-ky",
      title: "Thông báo kế hoạch khám sức khỏe định kỳ năm 2025",
      image: "https://attech.com.vn/wp-content/uploads/2025/01/kham-suc-khoe.jpg",
      date: "02/01/2025",
      content: `<p>Nội dung thông báo khám sức khỏe...</p>`,
    },
    {
      id: 5,
      slug: "thong-bao-hop-tong-ket-nam-2024",
      title: "Thông báo họp tổng kết năm 2024",
      image: "https://attech.com.vn/wp-content/uploads/2024/12/hop-tong-ket.jpg",
      date: "25/12/2024",
      content: `<p>Nội dung thông báo họp tổng kết...</p>`,
    }
  ];

  // Tìm thông báo theo slug
  const notificationItem = useMemo(() => notificationData.find((item) => item.slug === slug), [slug]);

  // Lọc thông báo cho sidebar theo tìm kiếm
  const filteredNotifications = useMemo(() => {
    return notificationData.filter(
      (item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  // Lọc thông báo liên quan
  const relatedNotifications = useMemo(() => {
    if (!notificationItem) return [];
    return notificationData
      .filter(
        (item) =>
          item.slug !== slug &&
          (item.date.includes("2025") ||
            item.content.toLowerCase().includes(notificationItem.title.toLowerCase()))
      )
      .slice(0, 3);
  }, [notificationItem, slug]);

  useEffect(() => {
    if (!notificationItem) {
      setIsInitialized(true);
      return;
    }

    const generateTableOfContents = () => {
      try {
        const parser = new DOMParser();
        const doc = parser.parseFromString(notificationItem.content, "text/html");
        const headings = Array.from(doc.querySelectorAll("h2, h3, h4"));
        return headings.map((heading, index) => ({
          id: `section-${index}`,
          text: heading.textContent,
          level: parseInt(heading.tagName.charAt(1)),
        }));
      } catch (error) {
        console.error("Error parsing content:", error);
        return [];
      }
    };

    setTableOfContents(generateTableOfContents());
    setIsInitialized(true);
  }, [notificationItem]);

  if (!isInitialized) {
    return (
      <div className="notification-detail-page">
        <div className="loading">
          <div className="loading-spinner" />
          <p>Đang tải thông báo...</p>
        </div>
      </div>
    );
  }

  if (!notificationItem) {
    return (
      <div className="notification-detail-page">
        <div className="not-found">
          <h2>Không tìm thấy thông báo!</h2>
          <p>Thông báo bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
          <Link to="/notifications" className="back-to-notifications">
            Quay lại trang thông báo
          </Link>
        </div>
      </div>
    );
  }

  // Extract author info from content
  const authorMatch = notificationItem.content.match(/([^–\n]+)$/m);
  const author = authorMatch ? authorMatch[1].trim() : "Ban Giám đốc";

  return (
    <div className="notification-detail-page">
      <Helmet>
        <title>{notificationItem.title} | ATTECH Notifications</title>
        <meta
          name="description"
          content={sanitizeHtml(notificationItem.content, { allowedTags: [] }).slice(0, 160)}
        />
        <meta property="og:title" content={notificationItem.title} />
        <meta property="og:image" content={notificationItem.image} />
        <meta property="og:type" content="article" />
        <meta name="author" content={author} />
        <meta name="publish_date" content={notificationItem.date} />
      </Helmet>

      <aside className="notification-sidebar">
        <h3>Danh mục thông báo</h3>
        <input
          type="text"
          placeholder="Tìm kiếm thông báo..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="notification-sidebar-search"
          aria-label="Tìm kiếm thông báo"
        />
        <ul>
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((item) => (
              <li key={item.id}>
                <Link
                  to={`/notifications/${item.id}/${item.slug}`}
                  className={item.slug === slug ? "active" : ""}
                >
                  {item.title}
                </Link>
              </li>
            ))
          ) : (
            <li className="no-results">
              Không tìm thấy thông báo phù hợp.
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="clear-search"
                >
                  Xóa tìm kiếm
                </button>
              )}
            </li>
          )}
        </ul>
      </aside>

      <main className="notification-detail-container">
        <nav className="notification-breadcrumb">
          <Link to="/">Trang chủ</Link> &gt; <Link to="/notifications">Thông báo</Link>{" "}
          &gt; {notificationItem.title}
        </nav>

        <div className="notification-detail-top">
          <div className="notification-detail-image">
            <img src={notificationItem.image} alt={notificationItem.title} loading="lazy" />
          </div>
          <div className="notification-detail-header">
            <h1 className="notification-detail-title">{notificationItem.title}</h1>
            <span className="notification-detail-date">Ngày đăng: {notificationItem.date}</span>
          </div>
        </div>

        {tableOfContents.length > 0 && (
          <nav className="table-of-contents">
            <h3>Nội dung chính</h3>
            <ul>
              {tableOfContents.map((item) => (
                <li
                  key={item.id}
                  style={{ marginLeft: `${(item.level - 2) * 20}px` }}
                >
                  <a href={`#${item.id}`}>{item.text}</a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        <article
          className="notification-detail-content"
          dangerouslySetInnerHTML={{
            __html: sanitizeHtml(notificationItem.content, {
              allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
              allowedAttributes: {
                ...sanitizeHtml.defaults.allowedAttributes,
                img: ["src", "alt", "title", "class"],
              },
            }),
          }}
        />

        <div className="author-info">
          <div className="author-avatar">
            <img
              src="/images/default-avatar.png"
              alt={author}
              loading="lazy"
            />
          </div>
          <div className="author-details">
            <h4>{author}</h4>
            <p>Người ký</p>
          </div>
        </div>

        <div className="notification-share">
          <h4>Chia sẻ thông báo:</h4>
          <div className="notification-share-buttons">
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                window.location.href
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="share-button facebook"
            >
              Chia sẻ Facebook
            </a>
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                window.location.href
              )}&text=${encodeURIComponent(notificationItem.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="share-button twitter"
            >
              Chia sẻ Twitter
            </a>
            <a
              href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
                window.location.href
              )}&title=${encodeURIComponent(notificationItem.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="share-button linkedin"
            >
              Chia sẻ LinkedIn
            </a>
          </div>
        </div>

        {relatedNotifications.length > 0 && (
          <section className="related-notifications">
            <h2>Thông báo liên quan</h2>
            <div className="related-notifications-list">
              {relatedNotifications.map((item) => (
                <div key={item.id} className="related-notification-item">
                  <Link to={`/notifications/${item.id}/${item.slug}`}>
                    <img src={item.image} alt={item.title} loading="lazy" />
                    <h4>{item.title}</h4>
                    <span>{item.date}</span>
                  </Link>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default React.memo(NotificationDetailPage);
