import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState, useMemo } from "react";
import InputField from "../commonComponents/InputField";
import './TopArtists.scss';
const topArtists = [
  "Taylor Swift",
  "Ed Sheeran",
  "Adele",
  "Drake",
  "Beyoncé",
  "The Weeknd",
  "Coldplay",
  "Billie Eilish",
];

const topSongs = {
  "Taylor Swift": ["Anti-Hero", "Love Story", "Blank Space"],
  "Ed Sheeran": ["Shape of You", "Perfect", "Bad Habits"],
  "Adele": ["Easy on Me", "Hello", "Rolling in the Deep"],
  "Drake": ["God's Plan", "In My Feelings", "One Dance"],
  "Beyoncé": ["Halo", "Single Ladies", "Formation"],
  "The Weeknd": ["Blinding Lights", "Save Your Tears", "Starboy"],
  "Coldplay": ["Yellow", "Fix You", "Viva La Vida"],
  "Billie Eilish": ["Bad Guy", "Happier Than Ever", "Therefore I Am"]
};

function TopArtists({ onSelectSong }) {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  const [selectedArtist, setSelectedArtist] = useState(null);

  // Filter artists based on search query
  const filteredArtists = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return topArtists;
    return topArtists.filter((a) => a.toLowerCase().includes(q));
  }, [query]);

  return (
    <div className="top-artists">
      <h1 className="top-artists__title">{t("top_artists")}</h1>

      {/* Search input */}
      <div className="top-artists__search">
        <InputField
          placeholder={t("artist_placeholder")}
          value={query}
          onChange={setQuery}
        />
      </div>

      {/* Artist list */}
      <ul className="top-artists__list">
        {filteredArtists.length ? (
          filteredArtists.map((artist, idx) => (
            <li
              key={idx}
              className="top-artists__item"
              onClick={() => setSelectedArtist(artist)}
            >
              <span className="top-artists__link">{artist}</span>
            </li>
          ))
        ) : (
          <li className="top-artists__empty">{t("no_results") || "No results"}</li>
        )}
      </ul>

      {/* Top songs for selected artist */}
      {selectedArtist && (
        <div className="top-artists__songs">
          <h2 className="top-artists__songs-title">{selectedArtist}'s Top Songs</h2>
          <ul className="top-artists__songs-list">
            {topSongs[selectedArtist]?.map((song, idx) => (
              <li
                key={idx}
                className="top-artists__songs-item"
                onClick={() => onSelectSong && onSelectSong(selectedArtist, song)}
              >
                {song}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default TopArtists;
