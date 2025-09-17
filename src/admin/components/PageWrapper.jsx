import React from "react";

const PageWrapper = ({
  children,
  title,
  subtitle,
  showTitle = false, // Mặc định không show title vì header đã có
  actions = null,
  breadcrumb = null,
}) => {
  return (
    <div
      className="attech-admin-page-wrapper"
      style={{
        padding: "1.5rem",
        maxWidth: "100%",
        margin: "0 auto",
      }}
    >
      {/* Page Header - chỉ hiện khi cần title */}
      {showTitle && title && (
        <div
          className="attech-admin-page-header"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "2rem",
            paddingBottom: "1rem",
            borderBottom: "1px solid #e5e7eb",
          }}
        >
          <div>
            <h1
              style={{
                fontSize: "1.875rem",
                fontWeight: "700",
                color: "#1f2937",
                margin: "0 0 0.5rem 0",
              }}
            >
              {title}
            </h1>
            {subtitle && (
              <p
                style={{
                  fontSize: "1rem",
                  color: "#6b7280",
                  margin: 0,
                }}
              >
                {subtitle}
              </p>
            )}
          </div>

          {actions && (
            <div className="attech-admin-page-actions">{actions}</div>
          )}
        </div>
      )}

      {/* Actions bar - hiển thị riêng khi có actions nhưng không có title */}
      {actions && !(showTitle && title) && (
        <div
          className="attech-admin-actions-bar"
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            marginBottom: "1.5rem",
            position: "sticky",
            top: 0,
            backgroundColor: "#f8f9fa",
            zIndex: 100,
            paddingTop: "1rem",
            paddingBottom: "0.5rem",
          }}
        >
          <div className="attech-admin-page-actions">{actions}</div>
        </div>
      )}

      {/* Page Content */}
      <div className="attech-admin-page-body">{children}</div>
    </div>
  );
};

export default PageWrapper;
