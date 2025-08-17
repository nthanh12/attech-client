import React from "react";
import "./SidebarService.css";
import { useI18n } from "../../../../hooks/useI18n";
import LocalizedLink from "../../../../components/Shared/LocalizedLink";
import { mockServices } from "../../../../utils/mockServices";

const SidebarService = ({ openSidebar, setOpenSidebar }) => {
  const { t, currentLanguage } = useI18n();
  const activeServices = mockServices.filter((s) => s.status === 1);

  return (
    <div className={openSidebar ? "sidebar-service resize" : "sidebar-service"}>
      <div className="top-sidebar">
        <button
          onClick={() => setOpenSidebar(!openSidebar)}
          aria-label={
            openSidebar
              ? currentLanguage === "vi"
                ? "Thu nhỏ sidebar"
                : "Collapse sidebar"
              : currentLanguage === "vi"
              ? "Mở rộng sidebar"
              : "Expand sidebar"
          }
          aria-expanded={!openSidebar}
        >
          <i className="fa fa-solid fa-bars"></i>
        </button>
        {openSidebar ? null : (
          <span>{t("navigation.services").toUpperCase()}</span>
        )}
        <hr />
      </div>

      {activeServices.map((service) => (
        <LocalizedLink
          key={service.id}
          routeKey="SERVICE_DETAIL"
          params={{
            slug: currentLanguage === "vi" ? service.slugVi : service.slugEn,
          }}
          className="sp-nav-button"
          aria-label={
            currentLanguage === "vi" ? service.titleVi : service.titleEn
          }
        >
          {openSidebar ? null : (
            <span>
              {currentLanguage === "vi" ? service.titleVi : service.titleEn}
            </span>
          )}
        </LocalizedLink>
      ))}
    </div>
  );
};

export default SidebarService;
