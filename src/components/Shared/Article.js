import React, { useState, useEffect } from "react";

const Article = () => {
  const [postContent, setPostContent] = useState(""); // Lưu nội dung bài viết
  const [loading, setLoading] = useState(true); // Trạng thái tải dữ liệu
  const [error, setError] = useState(null); // Trạng thái lỗi

  useEffect(() => {
    // Giả lập việc gọi API để lấy dữ liệu bài viết
    const fetchPost = async () => {
      try {
        setLoading(true);

        // Giả lập API với setTimeout (2 giây)
        setTimeout(() => {
          const post = {
            content: `
              <h1>Tiêu đề bài viết</h1>
              <p>Đây là một đoạn văn mô phỏng nội dung bài viết.</p>
              <p><strong>Chú ý:</strong> Đây là đoạn văn thứ hai với <a href="https://example.com">liên kết</a> và một <img src="https://via.placeholder.com/150" alt="placeholder" />.</p>
            `,
          };
          setPostContent(post.content); // Cập nhật nội dung bài viết
        }, 2000); // Giả lập mất 2 giây để lấy dữ liệu
      } catch (error) {
        setError("Lỗi khi lấy bài viết!"); // Xử lý lỗi nếu có
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost(); // Gọi hàm để lấy dữ liệu
  }, []);

  if (loading) return <div>Đang tải...</div>; // Hiển thị khi đang tải
  if (error) return <div>{error}</div>; // Hiển thị thông báo lỗi

  return (
    <div className="post-content">
      {/* Hiển thị nội dung bài viết từ CKEditor */}
      <div dangerouslySetInnerHTML={{ __html: postContent }} />
    </div>
  );
};

export default Article;
