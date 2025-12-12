import './LyricsDisplay.scss';
import { useTranslation } from "react-i18next";
import { BeatLoader } from "react-spinners";

function LyricsDisplay({ lyrics, loading = false }) {
  const { t } = useTranslation();

  if (loading) {
    return (
      <div className="lyrics-display lyrics-display--loader">
        <BeatLoader color="#58c19b" size={15} margin={8} />
        <p>{t("loading") || "Loading lyrics..."}</p>
      </div>
    );
  }

  return (
    <pre className="lyrics-display">{lyrics || t("lyrics_here")}</pre>
  );
}

export default LyricsDisplay;
