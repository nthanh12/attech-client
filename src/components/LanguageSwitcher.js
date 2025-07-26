import { useI18n } from "../hooks/useI18n";

const LanguageSwitcher = () => {
  const { currentLanguage, changeLanguage } = useI18n();
  
  return (
    <div style={{ display: 'inline-flex', gap: 8 }}>
      <button 
        onClick={() => changeLanguage("vi")}
        disabled={currentLanguage === "vi"}
        style={{ fontWeight: currentLanguage === "vi" ? 'bold' : 'normal' }}
      >
        VI
      </button>
      <button 
        onClick={() => changeLanguage("en")}
        disabled={currentLanguage === "en"}
        style={{ fontWeight: currentLanguage === "en" ? 'bold' : 'normal' }}
      >
        EN
      </button>
    </div>
  );
};
export default LanguageSwitcher; 