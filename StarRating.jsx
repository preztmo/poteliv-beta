export default function StarRating({ rating, size = 'md' }) {
  const stars = [1, 2, 3, 4, 5]
  return (
    <span className={`star-rating star-rating--${size}`} role="img" aria-label={`${rating} av 5 stjerner for hundevennlighet`}>
      {stars.map((n) => (
        <span key={n} className={n <= rating ? 'star star--filled' : 'star'} aria-hidden="true">
          {n <= rating ? '★' : '☆'}
        </span>
      ))}
    </span>
  )
}
