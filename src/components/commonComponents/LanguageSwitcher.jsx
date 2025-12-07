import { useTranslation } from "react-i18next";
import './LanguageSwitcher.scss';

function LanguageSwitcher() {
  const { i18n } = useTranslation();
  return (
    <div className="language-switcher">
      <button onClick={() => i18n.changeLanguage("en")}>EN</button>
      <button onClick={() => i18n.changeLanguage("de")}>DE</button>
    </div>
  );
}

export { LanguageSwitcher };
export default LanguageSwitcher;
