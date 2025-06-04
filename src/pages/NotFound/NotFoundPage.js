import { Link } from "react-router-dom";
import "./NotFoundPage.css";

const NotFoundPage = () => {
  return (
    <div className="not-found-container d-flex flex-column justify-content-center align-items-center min-vh-100 text-center">
      <h1 className="display-1 fw-bold text-primary">404</h1>
      <h2 className="mb-4">Oops! Không tìm thấy trang</h2>
      <p className="mb-4 text-muted">
        Trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển.
      </p>
      <Link to="/" className="btn btn-primary btn-lg btn-back-home">
        Trở lại Trang chủ
      </Link>
    </div>
  );
};

export default NotFoundPage;
