import { Fragment, useMemo, useState } from 'react'
import { venues } from './venues.js'
import VenueCard from './VenueCard.jsx'
import SearchBar from './SearchBar.jsx'
import FilterBar from './FilterBar.jsx'
import MapView from './MapView.jsx'
import AdSlot from './AdSlot.jsx'

export default function Home() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState(null)
  const [view, setView] = useState('liste') // liste | kart
  const [visibleCount, setVisibleCount] = useState(6);

  const filtered = useMemo(() => {
    return venues.filter((v) => {
      const matchesCategory = category ? v.category === category : true
      const q = query.trim().toLowerCase()
      const matchesQuery = q ? v.name.toLowerCase().includes(q) || v.address.toLowerCase().includes(q) : true
      return matchesCategory && matchesQuery
    })
  }, [query, category])

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
