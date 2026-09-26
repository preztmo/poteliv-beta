import { Routes, Route, Link, NavLink } from 'react-router-dom'
import Home from './Home.jsx'
import VenueDetail from './VenueDetail.jsx'
import Articles from './Articles.jsx'
import ArticleDetail from './ArticleDetail.jsx'
import About from './About.jsx'
import Newsletter from './Newsletter.jsx'
import BackToTop from "./components/BackToTop";

export default function App() {
  return (
    <div className="app-shell">
      <header className="site-header">
        <Link to="/" className="logo">
          <span className="logo-mark" aria-hidden="true">🐾</span>
          Poteliv
        </Link>
        <nav className="main-nav">
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
            Søk
          </NavLink>
          <NavLink to="/artikler" className={({ isActive }) => (isActive ? 'active' : '')}>
            Artikler
          </NavLink>
          <NavLink to="/om-oss" className={({ isActive }) => (isActive ? 'active' : '')}>
            Om oss
          </NavLink>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sted/:id" element={<VenueDetail />} />
          <Route path="/artikler" element={<Articles />} />
          <Route path="/artikler/:id" element={<ArticleDetail />} />
          <Route path="/om-oss" element={<About />} />
        </Routes>
      </main>

<a
href="https://instagram.com/poteliv.no"
target="_blank"
rel="noopener noreferrer"
className="https://www.instagram.com/potelivno/"
>
🐾 Følg Poteliv på Instagram
</a>

      <footer className="site-footer">
        <Newsletter />
        <p className="footer-fine">
          Poteliv er en uavhengig, gratis tjeneste for hundeeiere. Driver du et hundevennlig
          sted?{' '}
          <a href="mailto:hei@poteliv.no">Meld det inn her</a>.
        </p>
      </footer>
      <BackToTop />
    </div>
  )
}
