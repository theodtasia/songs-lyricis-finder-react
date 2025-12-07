import { useTranslation } from "react-i18next";
import './About.scss';
function About() {
  const { t } = useTranslation();
  return (
    <div className="about">
      <h1 className="about__title">{t("about")}</h1>
      <p>{t("about_text")}</p>
    </div>
  );
}

export default About;
