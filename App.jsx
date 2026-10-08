import GoogleLogin from './GoogleLogin'
import { Routes, Route, Link, NavLink } from 'react-router-dom'
import Home from './Home.jsx'
import VenueDetail from './VenueDetail.jsx'
import Articles from './Articles.jsx'
import ArticleDetail from './ArticleDetail.jsx'
import About from './About.jsx'
import BackToTop from "./components/BackToTop";
import TipUsButton from "./components/TipUsButton";
import FAQ from "./FAQ";
import Personvern from "./Personvern";
import Vilkar from "./Vilkar";
import Favorites from "./Favorites";
import Popular from "./Popular";
import { Analytics } from '@vercel/analytics/react'

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

          <GoogleLogin />
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sted/:id" element={<VenueDetail />} />
          <Route path="/artikler" element={<Articles />} />
          <Route path="/artikler/:id" element={<ArticleDetail />} />
          <Route path="/om-oss" element={<About />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/favoritter" element={<Favorites />} />
          <Route path="/populaere" element={<Popular />} />
          <Route path="/personvern" element={<Personvern />} />
          <Route path="/vilkar" element={<Vilkar />} />
        </Routes>
      </main>



      <footer className="site-footer">
        <a href="https://instagram.com/potelivno" 
        target="_blank" 
        rel="noopener noreferrer"
        className="instagram-button">
          Følg Poteliv på Instagram </a>
<div className="footer-links">
<Link to="/faq">FAQ</Link>
<Link to="/personvern">
Personvern
</Link>
<Link to="/vilkar">
Vilkår
</Link>
</div>
        <p className="footer-fine">
          Poteliv er en uavhengig, gratis tjeneste for hundeeiere. Driver du et hundevennlig
          sted?{' '}
          <a href="/om-oss#meld-inn-sted">Meld det inn her</a>.
        </p>
      </footer>
      <BackToTop />
      <TipUsButton />
      <Analytics />
    </div>
  )
}

