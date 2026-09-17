import { useParams, Link } from 'react-router-dom'
import { articles } from './articles.js'

export default function ArticleDetail() {
  const { id } = useParams()
  const article = articles.find((a) => a.id === id)

  if (!article) {
    return (
      <div className="page">
        <p>Fant ikke artikkelen.</p>
        <Link to="/artikler">Tilbake til artikler</Link>
      </div>
    )
  }

  return (
    <div className="page page--article">
      <Link to="/artikler" className="back-link">
        ← Tilbake til artikler
      </Link>
      <article>
        <div className="article-detail__photo" style={{ backgroundImage: `url(${article.image})` }} />
        <h1>{article.title}</h1>
        <p className="article-card__meta">{article.readMinutes} min lesing</p>
        {article.body.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </article>
    </div>
  )
}
