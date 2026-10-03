import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { venues, CATEGORIES, AMENITY_LABELS } from './venues.js'
import { supabase } from './supabase'
import MapView from './MapView.jsx'
import DirectionsButton from './DirectionsButton.jsx'
import AdSlot from './AdSlot.jsx'

export default function VenueDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const venue = venues.find((v) => v.id === id)
  const [user, setUser] = useState(null)
  const [isFavorite, setIsFavorite] = useState(false)
  const [favoriteCount, setFavoriteCount] = useState(0)
  useEffect(() => {
    const loadFavorite = async () => {
      const { data: authData } = await supabase.auth.getUser()
      if (!authData.user) return
      setUser(authData.user)
      const { data } = await supabase
      .from('Favorites')
      .select('*')
      .eq('user_id', authData.user.id)
      .eq('venue_id', id)
      .single()
      if (data) {
        setIsFavorite(true)
      }
      const { count } = await supabase
.from("Favorites")
.select("*", { count: "exact", head: true })
.eq("venue_id", id)
setFavoriteCount(count || 0)
    }
loadFavorite()
}, [id])

const toggleFavorite = async () => {
  if (!user) {
    alert("Logg inn for å lagre favoritter ❤️")
    return
  }
  if (isFavorite) {
    await supabase
    .from('Favorites')
    .delete()
    .eq('user_id', user.id)
    .eq('venue_id', id)
    setIsFavorite(false)
  } else {
    await supabase
    .from('Favorites')
    .insert({
      user_id: user.id,
      venue_id: id,
    })
    setIsFavorite(true)
  }
}

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
      <button
className="back-link"
onClick={() => navigate(-1)}
>
← Tilbake til søk
</button>

      <div className="venue-detail">
        <div className="venue-detail__main">
          <div className="venue-detail__photo" style={{ backgroundImage: `url(${venue.photo})` }} />

          <div className="venue-detail__heading">
            <span className="venue-card__category">{categoryLabel}</span>
            <h1>{venue.name}</h1>
          </div>

          <p className="venue-detail__blurb">{venue.blurb}</p>
<button
className="favorite-button"
onClick={toggleFavorite}
>
{isFavorite ? "♥ Lagret" : "♡ Lagre som favoritt"}
</button>

          <h2>Fasiliteter</h2>
          <ul className="amenity-list">
            {Object.entries(AMENITY_LABELS)
            .filter(([key]) => venue.amenities.includes(key))
            .map(([key, label]) => (
            <li key={key} className="has-it">
              {label}
              </li>
            ))}
</ul>

          <h2>Kart og veibeskrivelse</h2>
          <MapView venues={[venue]} center={[venue.lat, venue.lng]} zoom={15} height={280} />
          <p className="venue-detail__address">{venue.address}</p>
          <DirectionsButton venue={venue} />
        </div>

        <button className="share-button" onClick={() => {if (navigator.share)
        {navigator.share({title: venue.name, text: 
          `Sjekk ut ${venue.name} på Poteliv 🐾`, url: window.location.href,});}
}}>
Del med en venn
</button>

        <aside className="venue-detail__sidebar">
          <AdSlot label="Reklameplass" />
        </aside>
      </div>
    </div>
  )
}
