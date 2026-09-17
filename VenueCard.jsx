import { Link } from 'react-router-dom'
import StarRating from './StarRating.jsx'
import { CATEGORIES, AMENITY_LABELS } from './venues.js'

export default function VenueCard({ venue }) {
  const categoryLabel = CATEGORIES.find((c) => c.id === venue.category)?.label ?? venue.category

  return (
    <Link to={`/sted/${venue.id}`} className="venue-card">
      <div className="venue-card__photo" style={{ backgroundImage: `url(${venue.photo})` }} />
      <div className="venue-card__body">
        <div className="venue-card__top">
          <span className="venue-card__category">{categoryLabel}</span>
          <StarRating rating={venue.rating} size="sm" />
        </div>
        <h3>{venue.name}</h3>
        <p className="venue-card__address">{venue.address}</p>
        <ul className="venue-card__amenities">
          {venue.amenities.slice(0, 3).map((a) => (
            <li key={a}>{AMENITY_LABELS[a]}</li>
          ))}
        </ul>
      </div>
    </Link>
  )
}
