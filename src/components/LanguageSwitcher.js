import { useLanguage } from "../contexts/LanguageContext";

const LanguageSwitcher = () => {
  const { lang, setLang } = useLanguage();
  return (
    <div style={{ display: 'inline-flex', gap: 8 }}>
      <button onClick={() => setLang("vi")}
        disabled={lang === "vi"}
        style={{ fontWeight: lang === "vi" ? 'bold' : 'normal' }}
      >VI</button>
      <button onClick={() => setLang("en")}
        disabled={lang === "en"}
        style={{ fontWeight: lang === "en" ? 'bold' : 'normal' }}
      >EN</button>
    </div>
  );
};
export default LanguageSwitcher; 