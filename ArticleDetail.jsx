import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { PortableText } from '@portabletext/react'
import { articleByIdQuery, sanityClient, urlFor } from './src/lib/sanity.js'

export default function ArticleDetail() {
  const { id } = useParams()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isCurrent = true
    setArticle(null)
    setLoading(true)
    setError('')

    sanityClient.fetch(articleByIdQuery, { id })
      .then((data) => {
        if (isCurrent) setArticle(data)
      })
      .catch((fetchError) => {
        console.error('Kunne ikke hente artikkelen fra Sanity:', fetchError)
        if (isCurrent) setError('Artikkelen kunne ikke lastes inn. Prøv igjen senere.')
      })
      .finally(() => {
        if (isCurrent) setLoading(false)
      })

    return () => {
      isCurrent = false
    }
  }, [id])

  if (loading) {
    return (
      <div className="page page--article">
        <p role="status">Laster artikkel …</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="page page--article">
        <p role="alert">{error}</p>
        <Link to="/artikler">Tilbake til artikler</Link>
      </div>
    )
  }

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
        {article.mainImage && (
          <div
            className="article-detail__photo"
            style={{
              backgroundImage: `url(${urlFor(article.mainImage).width(1600).fit('max').url()})`,
            }}
          />
        )}
        <h1>{article.title}</h1>
        {article.ingress && <p className="page-intro">{article.ingress}</p>}
        {article.content && <PortableText value={article.content} />}
      </article>
    </div>
  )
}
