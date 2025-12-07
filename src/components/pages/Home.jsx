import { useState } from "react";
import { useTranslation } from "react-i18next";
import InputField from "../commonComponents/InputField";
import Button from "../commonComponents/Button";
import LyricsDisplay from "../commonComponents/LyricsDisplay";
import { getLyrics } from "../../services/lyricsApi";
import './Home.scss';

function Home() {
  const { t } = useTranslation();
  const [artist, setArtist] = useState("");
  const [song, setSong] = useState("");
  const [lyrics, setLyrics] = useState("");

  const searchLyrics = async () => {
    if (!artist || !song) return;
    const result = await getLyrics(artist, song);
    setLyrics(result);
  };

  return (
    <div className="home">
      <h1 className="home__title">{t("title")}</h1>
      <InputField placeholder={t("artist_placeholder")} value={artist} onChange={setArtist} />
      <InputField placeholder={t("song_placeholder")} value={song} onChange={setSong} />
      <Button onClick={searchLyrics}>{t("search_button")}</Button>
      <hr />
      <LyricsDisplay lyrics={lyrics || t("lyrics_placeholder")} />
    </div>
  );
}

export default Home;
