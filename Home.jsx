import { venues } from './venues.js'
import VenueCard from './VenueCard.jsx'
import SearchBar from './SearchBar.jsx'
import FilterBar from './FilterBar.jsx'
import MapView from './MapView.jsx'
import AdSlot from './AdSlot.jsx'
import { Fragment, useEffect, useMemo, useState } from 'react'
import { supabase } from "./supabase";
import { useSearchParams } from 'react-router-dom'

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
  const [searchParams, setSearchParams] = useSearchParams()
  const [query, setQuery] = useState(
searchParams.get('q') || ''
)
const [category, setCategory] = useState(
searchParams.get('category') || null
)
  const [view, setView] = useState('liste') // liste | kart
  const [visibleCount, setVisibleCount] = useState(6);
  const [userLocation, setUserLocation] = useState(null);
  const [locationError, setLocationError] = useState('');
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [popularVenues, setPopularVenues] = useState([]);

  const findNearby = () => {
setLocationError('');
if (!navigator.geolocation) {
setLocationError('Posisjon er ikke tilgjengelig i denne nettleseren. Visningen er ikke endret.');
return;
}
navigator.geolocation.getCurrentPosition(
(position) => {
const location = {
lat: position.coords.latitude,
lng: position.coords.longitude,
};
setUserLocation(location);
setLocationError('');
sessionStorage.setItem(
"userLocation",
JSON.stringify(location)
);
},
(error) => {
console.error(error);
setLocationError('Fikk ikke tilgang til posisjonen din. Tillat posisjonstilgang og prøv igjen. Visningen er ikke endret.');
}
);
};
useEffect(() => {
const loadFavorites = async () => {
const { data: authData } = await supabase.auth.getUser();
if (!authData.user) return;
const { data } = await supabase
.from("Favorites")
.select("venue_id")
.eq("user_id", authData.user.id);
if (data) {
setFavoriteIds(data.map((f) => f.venue_id));
}
};
loadFavorites();
}, []);
useEffect(() => {
const savedLocation = sessionStorage.getItem(
"userLocation"
);
if (savedLocation) {
setUserLocation(
JSON.parse(savedLocation)
);
}
}, []);

useEffect(() => {
const savedScroll = sessionStorage.getItem(
"scrollPosition"
);
if (savedScroll) {
setTimeout(() => {
window.scrollTo(
0,
Number(savedScroll)
);
sessionStorage.removeItem("scrollPosition");
sessionStorage.removeItem("visibleCount");
}, 100);
} else {
window.scrollTo(0, 0);
}
}, []);

useEffect(() => {
const savedVisibleCount =
sessionStorage.getItem("visibleCount");
if (savedVisibleCount) {
setVisibleCount(Number(savedVisibleCount));
}
}, []);

useEffect(() => {
const params = {}
if (query) {
params.q = query
}
if (category) {
params.category = category
}
setSearchParams(params)
}, [query, category, setSearchParams])
useEffect(() => {
const loadPopularVenues = async () => {
const { data, error } = await supabase
.from("Favorites")
.select("venue_id");
if (error || !data) return;
const counts = {};
data.forEach((fav) => {
counts[fav.venue_id] =
(counts[fav.venue_id] || 0) + 1;
});
const topIds = Object.entries(counts)
.sort((a, b) => b[1] - a[1])
.slice(0, 3)
.map(([id]) => id);
const popular = topIds
.map((id) =>
venues.find((venue) => venue.id === id)
)
.filter(Boolean);
setPopularVenues(popular);
};
loadPopularVenues();
}, []);
  const { filtered, nearbyCount, hasMatches } = useMemo(() => {
const results = venues.filter((v) => {
const matchesCategory = category ? v.category === category : true
const q = query.trim().toLowerCase()
const matchesQuery = q
? v.name.toLowerCase().includes(q) ||
v.address.toLowerCase().includes(q)
: true
return matchesCategory && matchesQuery
})
if (!userLocation) {
results.sort((a, b) => a.name.localeCompare(b.name, 'nb'))
return { filtered: results, nearbyCount: 0, hasMatches: results.length > 0 }
}

const nearby = results
.filter((v) => Number.isFinite(v.lat) && Number.isFinite(v.lng))
.map((v) => ({
...v,
distanceKm: distance(
userLocation.lat,
userLocation.lng,
v.lat,
v.lng
),
}))
.filter((v) => v.distanceKm <= 100)
.sort((a, b) => a.distanceKm - b.distanceKm)

return {
filtered: nearby.slice(0, 50),
nearbyCount: nearby.filter((v) => v.distanceKm <= 10).length,
hasMatches: results.length > 0,
}
}, [query, category, userLocation])
  const categoryResultName = {
    cafe: 'kafeer',
    restaurant: 'restauranter',
    bar: 'barer',
    hotell: 'hoteller',
  }[category] ?? 'hundevennlige steder'
  return (
    <div className="page page--home">
      <section className="hero">
        <h1>Finn steder der hunden din er like velkommen som deg</h1>
        <p>
          Poteliv samler kafeer, restauranter, barer og hoteller der hunden får bli med inn –
          vurdert av andre hundeeiere.
        </p>
        
        <div className="view-toggle" role="group" aria-label="Vis som">
          <button className={view === 'liste' ? 'chip chip--active' : 'chip'} onClick={() => setView('liste')}>
            Liste
          </button>
          <button className={view === 'kart' ? 'chip chip--active' : 'chip'} onClick={() => setView('kart')}>
            Kart
          </button>
         <button
className={userLocation ? 'chip chip--active' : 'chip'}
onClick={() => {
if (userLocation) {
setUserLocation(null);
sessionStorage.removeItem("userLocation");
} else {
findNearby();
}
}}
>
📍 Nær meg
</button>
        </div>

        <SearchBar value={query} onChange={setQuery} />
           <FilterBar active={category} onChange={setCategory} />
        {(query || category || userLocation) && (
<button
className="chip"
onClick={() => {
setQuery("");
setCategory(null);
setUserLocation(null);
sessionStorage.removeItem("userLocation");
sessionStorage.removeItem("scrollPosition");
sessionStorage.removeItem("visibleCount");
}}
>
✕ Nullstill filtre
</button>
)}
      </section>



      <div className="toolbar">
      </div>

      {locationError && (
        <p className="empty-state" role="status">{locationError}</p>
      )}
      {userLocation && (nearbyCount > 0 || filtered.length > 0) && (
        <p className="results-count" role="status">
          {nearbyCount > 0
            ? `📍 ${nearbyCount} steder nær deg (innen 10 km)`
            : '📍 Viser de nærmeste hundevennlige stedene i ditt område'}
        </p>
      )}

      {view === 'kart' ? (
        <>
          <p className="results-count">
            {filtered.length} {categoryResultName} funnet{userLocation ? ' nær deg' : ''}
          </p>
          {filtered.length === 0 && (
            <p className="empty-state">
              {userLocation && hasMatches
                ? 'Fant ingen hundevennlige steder innen 100 km.'
                : 'Ingen treff. Prøv et annet søk eller en annen kategori.'}
            </p>
          )}
          <MapView venues={filtered} center={[59.9139, 10.7522]} userLocation={userLocation} height={480} />
        </>
      ) : filtered.length === 0 ? (
        <p className="empty-state">
          {userLocation && hasMatches
            ? 'Fant ingen hundevennlige steder innen 100 km.'
            : 'Ingen treff. Prøv et annet søk eller en annen kategori.'}
        </p>
      ) : (
<>
<p className="results-count">
{userLocation
? `Viser de ${filtered.length} nærmeste hundevennlige stedene 🐾`
: `Fant ${filtered.length} hundevennlige steder 🐾`}
</p>
<div className="venue-grid">
{filtered.slice(0, visibleCount).map((v, i) => (
<Fragment key={v.id}>
<VenueCard
venue={v}
distanceKm={v.distanceKm}
isFavorite={favoriteIds.includes(v.id)}
/>
{(i === 2 || (i + 1) % 15 === 0) && <AdSlot />}
</Fragment>
))}
{visibleCount < filtered.length && (
<div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
<button
className="chip chip--active"
onClick={() => {
const newCount = visibleCount + 12;
setVisibleCount(newCount);
sessionStorage.setItem(
"visibleCount",
newCount
);
}}
>
Se mer
</button>
</div>
)}
</div>
</>
)}
</div>
)
}