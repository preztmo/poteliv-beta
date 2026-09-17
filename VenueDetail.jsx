import { useParams, Link } from 'react-router-dom'
import { venues, CATEGORIES, AMENITY_LABELS } from './venues.js'
import StarRating from './StarRating.jsx'
import MapView from './MapView.jsx'
import DirectionsButton from './DirectionsButton.jsx'
import AdSlot from './AdSlot.jsx'

export default function VenueDetail() {
  const { id } = useParams()
  const venue = venues.find((v) => v.id === id)

  if (!venue) {
    return (
      <div className="page">
        <p>Fant ikke stedet.</p>
        <Link to="/">Tilbake til søk</Link>
      </div>
    )
  }

  const categoryLabel = CATEGORIES.find((c) => c.id === venue.category)?.label ?? venue.category

  return (
    <div className="page page--venue">
      <Link to="/" className="back-link">
        ← Tilbake til søk
      </Link>

      <div className="venue-detail">
        <div className="venue-detail__main">
          <div className="venue-detail__photo" style={{ backgroundImage: `url(${venue.photo})` }} />

          <div className="venue-detail__heading">
            <span className="venue-card__category">{categoryLabel}</span>
            <h1>{venue.name}</h1>
            <div className="venue-detail__rating">
              <StarRating rating={venue.rating} />
              <span>
                {venue.rating} av 5 – hundevennlighet ({venue.reviewCount} vurderinger)
              </span>
            </div>
          </div>

          <p className="venue-detail__blurb">{venue.blurb}</p>

          <h2>Fasiliteter</h2>
          <ul className="amenity-list">
            {Object.entries(AMENITY_LABELS).map(([key, label]) => (
              <li key={key} className={venue.amenities.includes(key) ? 'has-it' : 'missing-it'}>
                {label}
              </li>
            ))}
          </ul>

          <h2>Kart og veibeskrivelse</h2>
          <MapView venues={[venue]} center={[venue.lat, venue.lng]} zoom={15} height={280} />
          <p className="venue-detail__address">{venue.address}</p>
          <DirectionsButton venue={venue} />
        </div>

        <aside className="venue-detail__sidebar">
          <AdSlot label="Reklameplass" />
        </aside>
      </div>
    </div>
  )
}
