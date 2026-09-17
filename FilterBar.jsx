import { CATEGORIES } from './venues.js'

export default function FilterBar({ active, onChange }) {
  return (
    <div className="filter-bar" role="group" aria-label="Filtrer på type sted">
      <button className={active === null ? 'chip chip--active' : 'chip'} onClick={() => onChange(null)}>
        Alle
      </button>
      {CATEGORIES.map((c) => (
        <button
          key={c.id}
          className={active === c.id ? 'chip chip--active' : 'chip'}
          onClick={() => onChange(c.id)}
        >
          {c.label}
        </button>
      ))}
    </div>
  )
}
