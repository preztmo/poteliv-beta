import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { articlesQuery, sanityClient, urlFor } from './src/lib/sanity.js'

export default function Articles() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isCurrent = true

    sanityClient.fetch(articlesQuery)
      .then((data) => {
        if (isCurrent) setArticles(data)
      })
      .catch((fetchError) => {
        console.error('Kunne ikke hente artikler fra Sanity:', fetchError)
        if (isCurrent) setError('Artiklene kunne ikke lastes inn. Prøv igjen senere.')
      })
      .finally(() => {
        if (isCurrent) setLoading(false)
      })

    return () => {
      isCurrent = false
    }
  }, [])

  return (
    <div className="page page--articles">
      <h1>Artikler for hundeeiere</h1>
      <p className="page-intro">Korte, nyttige lesestykker om hverdagen med hund.</p>

      {loading ? (
        <p role="status">Laster artikler …</p>
      ) : error ? (
        <p role="alert">{error}</p>
      ) : articles.length === 0 ? (
        <p>Det er ingen publiserte artikler ennå.</p>
      ) : (
        <div className="article-grid">
          {articles.map((article) => {
            const imageUrl = article.mainImage
              ? urlFor(article.mainImage).width(800).height(450).fit('crop').url()
              : null

            return (
              <Link to={`/artikler/${article._id}`} key={article._id} className="article-card">
                <div
                  className="article-card__photo"
                  style={imageUrl ? { backgroundImage: `url(${imageUrl})` } : undefined}
                />
                <div className="article-card__body">
                  <h2>{article.title}</h2>
                  {article.ingress && <p>{article.ingress}</p>}
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
