import './LyricsDisplay.scss';
import { useTranslation } from "react-i18next";

function LyricsDisplay({ lyrics }) {
  const { t } = useTranslation();
  return (
    <pre className="lyrics-display">  {lyrics || t("lyrics_here")}</pre>
  );
}

export default LyricsDisplay;
