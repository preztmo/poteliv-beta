import { Link } from 'react-router-dom'
import { articles } from './articles.js'

export default function Articles() {
  return (
    <div className="page page--articles">
      <h1>Artikler for hundeeiere</h1>
      <p className="page-intro">Korte, nyttige lesestykker om hverdagen med hund.</p>

      <div className="article-grid">
        {articles.map((a) => (
          <Link to={`/artikler/${a.id}`} key={a.id} className="article-card">
            <div className="article-card__photo" style={{ backgroundImage: `url(${a.image})` }} />
            <div className="article-card__body">
              <h2>{a.title}</h2>
              <p>{a.excerpt}</p>
              <span className="article-card__meta">{a.readMinutes} min lesing</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
