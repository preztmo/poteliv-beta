import { Fragment, useMemo, useState } from 'react'
import { venues } from './venues.js'
import VenueCard from './VenueCard.jsx'
import SearchBar from './SearchBar.jsx'
import FilterBar from './FilterBar.jsx'
import MapView from './MapView.jsx'
import AdSlot from './AdSlot.jsx'

function distance(lat1, lon1, lat2, lon2) {
const R = 6371
 
const dLat = (lat2 - lat1) * Math.PI / 180
const dLon = (lon2 - lon1) * Math.PI / 180
 
const a =
Math.sin(dLat / 2) * Math.sin(dLat / 2) +
Math.cos(lat1 * Math.PI / 180) *
Math.cos(lat2 * Math.PI / 180) *
Math.sin(dLon / 2) *
Math.sin(dLon / 2)
 
return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

export default function Home() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState(null)
  const [view, setView] = useState('liste') // liste | kart
  const [visibleCount, setVisibleCount] = useState(6);
  const [userLocation, setUserLocation] = useState(null);

  const findNearby = () => {
navigator.geolocation.getCurrentPosition(
(position) => {
setUserLocation({
lat: position.coords.latitude,
lng: position.coords.longitude,
});
},
(error) => {
console.error(error);
}
);
};

  const filtered = useMemo(() => {
const results = venues.filter((v) => {
const matchesCategory = category ? v.category === category : true
const q = query.trim().toLowerCase()
const matchesQuery = q
? v.name.toLowerCase().includes(q) ||
v.address.toLowerCase().includes(q)
: true
return matchesCategory && matchesQuery
})
if (userLocation) {
results.sort((a, b) => {
const distA = distance(
userLocation.lat,
userLocation.lng,
a.lat,
a.lng
)
const distB = distance(
userLocation.lat,
userLocation.lng,
b.lat,
b.lng
)
return distA - distB
})
}
return results
}, [query, category, userLocation])

  return (
    <div className="page page--home">
      <section className="hero">
        <h1>Finn steder der hunden din er like velkommen som deg</h1>
        <p>
          Poteliv samler kafeer, restauranter, barer og butikker der hunden får bli med inn –
          vurdert av andre hundeeiere.
        </p>
        <SearchBar value={query} onChange={setQuery} />
      </section>

      <div className="toolbar">
        <FilterBar active={category} onChange={setCategory} />
        <div className="view-toggle" role="group" aria-label="Vis som">
          <button className={view === 'liste' ? 'chip chip--active' : 'chip'} onClick={() => setView('liste')}>
            Liste
          </button>
          <button className={view === 'kart' ? 'chip chip--active' : 'chip'} onClick={() => setView('kart')}>
            Kart
          </button>
          <button className="chip chip--active" onClick={findNearby}>
            📍 Nær meg
            </button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="empty-state">Ingen treff. Prøv et annet søk eller en annen kategori.</p>
      ) : view === 'kart' ? (
        <MapView venues={venues} height={480} />
      ) : (
        <div className="venue-grid">
          {filtered.slice(0, visibleCount).map((v, i) => (
            <Fragment key={v.id}>
              <VenueCard venue={v} />
              {i === 2 && <AdSlot />}
            </Fragment>
          ))}
          {visibleCount < filtered.length && (
            <div style = {{display: 'flex', justifyContent: 'center', marginTop: '40px'}}>
              <button className="chip chip--active" onClick={() => setVisibleCount(prev => prev + 12)}>
                Se mer
                </button>
                </div>
              )}

              </div>
              
      )
    }
  </div>
)
}
