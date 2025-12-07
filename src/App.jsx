import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import TopArtists from "./components/pages/TopArtists";
import LanguageSwitcher from "./components/commonComponents/LanguageSwitcher";
import { useTranslation } from "react-i18next";
import './App.scss';

function App() {
  const { t } = useTranslation();

  return (
    <Router>
      <div className="app">
        <nav className="app__nav">
          <Link to="/" className="app__nav-link">{t("home")}</Link>
          <Link to="/about" className="app__nav-link">{t("about")}</Link>
          <Link to="/top-artists" className="app__nav-link">{t("top_artists")}</Link>
          <LanguageSwitcher />
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/top-artists" element={<TopArtists />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
