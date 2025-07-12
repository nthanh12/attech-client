import { useLanguage } from "../../../contexts/LanguageContext";

const NotificationListPage = () => {
  const { lang } = useLanguage();
  // ... existing logic ...
  return (
    <div>
      {filteredItems.map((item) => (
        <div key={item.id}>
          <h3>{lang === "vi" ? item.titleVi : item.titleEn}</h3>
          <p>{lang === "vi" ? item.descriptionVi : item.descriptionEn}</p>
        </div>
      ))}
    </div>
  );
}; 