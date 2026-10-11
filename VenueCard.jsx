import { Link } from 'react-router-dom'
import { CATEGORIES, AMENITY_LABELS } from './venues.js'
import { useState } from 'react'
import { supabase } from './supabase'
const AMENITY_ICONS = {
vannskaal: "💧",
hundegodteri: "🦴",
uteservering: "☀️",
lov_innendors: "🏠",
}

export default function VenueCard({ venue, isFavorite }) {
  const [favorite, setFavorite] = useState(isFavorite)
  const categoryLabel = CATEGORIES.find((c) => c.id === venue.category)?.label ?? venue.category
const toggleFavorite = async (e) => {
e.preventDefault()
e.stopPropagation()
const { data: authData } =
await supabase.auth.getUser()
if (!authData.user) {
alert("Logg inn for å lagre favoritter ♥")
return
}
if (favorite) {
await supabase
.from("Favorites")
.delete()
.eq("user_id", authData.user.id)
.eq("venue_id", venue.id)
setFavorite(false)
} else {
await supabase
.from("Favorites")
.insert({
user_id: authData.user.id,
venue_id: venue.id,
})
setFavorite(true)
}
}

  return (
    <Link
to={`/sted/${venue.id}`}
className="venue-card"
onClick={() => {
sessionStorage.setItem(
"scrollPosition",
window.scrollY
);
}}
>
      <div className="venue-card__photo" style={{ backgroundImage: `url(${venue.photo})` }} />
      <div className="venue-card__body">
        <div className="venue-card__top">
<span className="venue-card__category">
{categoryLabel}
</span>
<button
className="venue-card__favorite"
onClick={toggleFavorite}
>
{favorite ? "♥" : "♡"}
</button>
</div>
        <h3>{venue.name}</h3>
        <p className="venue-card__address">{venue.address}</p>
        <ul className="venue-card__amenities">
          {venue.amenities.slice(0, 3).map((a) => (
            <li key={a}>{AMENITY_ICONS[a]}</li>
          ))}
        </ul>
      </div>
    </Link>
  )
}
