import { useState } from "react";
import Button from "../commonComponents/Button";
import LyricsDisplay from "../commonComponents/LyricsDisplay";
import { getLyrics } from "../../services/lyricsApi";
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

function TopArtists() {
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

  const handleSongClick = async (song) => {
    if (loading && selectedSong !== song) return;
    setSelectedSong(song);
    setLoading(true);

    try {
      const result = await getLyrics(selectedArtist, song);
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
          const isDisabled = loading && !isActive; // disable only non-active artists while loading

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
                  disabled={loading && selectedSong !== song}
                  selected={selectedSong === song}
                >
                  {song}
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {selectedSong && (
        <div className="top-artists__lyrics">
          <h3>Lyrics: {selectedSong}</h3>
          {loading ? <p>Loading lyrics...</p> : <LyricsDisplay lyrics={lyrics} />}
        </div>
      )}
    </div>
  );
}

export default TopArtists;