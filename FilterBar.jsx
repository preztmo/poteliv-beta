import { CATEGORIES } from './venues.js'

export default function FilterBar({ active, onChange }) {
  return (
    <div className="filter-bar" role="group" aria-label="Filtrer på type sted">
      {CATEGORIES.map((c) => (
        <button
          key={c.id}
          className={active === c.id ? 'chip chip--active' : 'chip'}
          onClick={() => onChange(active === c.id ? null : c.id)}
        >
          {c.label}
        </button>
      ))}
    </div>
  )
}
