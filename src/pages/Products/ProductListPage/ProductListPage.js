import { useLanguage } from "../../../contexts/LanguageContext";

const ProductListPage = () => {
  const { lang } = useLanguage();
  // ... existing logic ...
  return (
    <div>
      {filteredItems.map((item) => (
        <div key={item.id}>
          <h3>{lang === "vi" ? item.nameVi : item.nameEn}</h3>
          <p>{lang === "vi" ? item.descriptionVi : item.descriptionEn}</p>
        </div>
      ))}
    </div>
  );
}; 