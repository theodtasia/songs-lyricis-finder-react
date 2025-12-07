import './LyricsDisplay.scss';

function LyricsDisplay({ lyrics }) {
  return (
    <pre className="lyrics-display">{lyrics}</pre>
  );
}

export default LyricsDisplay;
