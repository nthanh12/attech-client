import "./NotFoundPage.css";
import { useI18n } from "../../hooks/useI18n";
import LocalizedLink from "../../components/Shared/LocalizedLink";

const NotFoundPage = () => {
  const { t } = useI18n();

  return (
    <div className="not-found-container d-flex flex-column justify-content-center align-items-center text-center">
      <h1 className="display-1 fw-bold text-primary">404</h1>
      <h2 className="mb-4">{t("errors.pageNotFound")}</h2>
      <p className="mb-4 text-muted">{t("errors.pageNotFoundDescription")}</p>
      <LocalizedLink
        routeKey="HOME"
        className="btn btn-primary btn-lg btn-back-home"
      >
        {t("navigation.backToHome")}
      </LocalizedLink>
    </div>
  );
};

export default NotFoundPage;
