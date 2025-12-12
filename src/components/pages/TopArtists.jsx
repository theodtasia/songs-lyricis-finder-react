import { useState } from "react";
import Button from "../commonComponents/Button";
import LyricsDisplay from "../commonComponents/LyricsDisplay";
import { getLyrics } from "../../services/lyricsApi";
import { topArtists, topSongs } from "../../constants/topArtists";
import './TopArtists.scss';
import { useTranslation } from "react-i18next";

function TopArtists() {
  const { t } = useTranslation();
  const [selectedArtist, setSelectedArtist] = useState("");
  const [selectedSong, setSelectedSong] = useState("");
  const [lyrics, setLyrics] = useState("");
  const [loading, setLoading] = useState(false);

  const handleArtistClick = (artist) => {
    if (loading) return;
    setSelectedArtist(artist);
    setSelectedSong("");
    setLyrics("");
  };

  const handleSongClick = async (songObj) => {
    const songTitle = songObj.title;
    if (loading && selectedSong?.title !== songTitle) return;
    setSelectedSong(songObj);
    setLoading(true);
    try {
      const result = await getLyrics(selectedArtist, songTitle);
      setLyrics(result);
    } catch (err) {
      console.error(err);
      setLyrics("Lyrics not available");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="top-artists">
      <h1 className="top-artists__title">Top Artists</h1>
      <ul className="top-artists__list">
        {topArtists.map((artist, idx) => {
          const isActive = selectedArtist === artist;
          const isDisabled = loading && !isActive; 

          return (
            <li
              key={idx}
              className={[
                "top-artists__list-item",
                isActive ? 'top-artists__list-item--active' : null,
                isDisabled ? 'top-artists__list-item--disabled' : null
              ].filter(Boolean).join(' ')}
              onClick={() => { if (!isDisabled) handleArtistClick(artist); }}
              aria-disabled={isDisabled}
              tabIndex={isDisabled ? -1 : 0}
            >
              {artist}
            </li>
          );
        })}
      </ul>

      {selectedArtist && (
        <div className="top-artists__songs">
          <h2 className="top-artists__songs-title">{selectedArtist}'s Top Songs</h2>
          <ul className="top-artists__songs-list">
            {topSongs[selectedArtist]?.map((song, idx) => (
              <li key={idx} className="top-artists__songs-list-item">
                <Button
                  onClick={() => handleSongClick(song)}
                  disabled={loading && selectedSong?.title !== song.title}
                  selected={selectedSong?.title === song.title}
                >
                  {song.title}
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {selectedSong && (
        <div className="top-artists__lyrics">
          <h3>{selectedArtist} - {selectedSong.title}</h3>
           {selectedSong.embed && (
            <div className="top-artists__spotify-player">
              <iframe
                src={selectedSong.embed}
                width="100%"
                height="152"
                frameBorder="0"
                allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                title={`Spotify player for ${selectedSong.title}`}
              />
            </div>
          )}
          <div className="top-artists__lyrics-content">
            <h4>{t("lyrics_title")}</h4>
            <LyricsDisplay lyrics={lyrics} loading={loading} />
          </div>
        </div>
      )}
    </div>
  );
}

export default TopArtists;