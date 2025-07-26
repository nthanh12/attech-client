import { useTranslation } from 'react-i18next';
import "../Structure/Structure.css";

export default function Structure() {
  const { t } = useTranslation();
  
  return (
    <div className="structure-background">
      <div className="structure">
        <h2>{t('frontend.companyInfo.structure.title')}</h2>
        <img
          src="/assets/images/structure/attech-structure.svg"
          alt={t('frontend.companyInfo.structure.altText')}
        />
      </div>
    </div>
  );
}
