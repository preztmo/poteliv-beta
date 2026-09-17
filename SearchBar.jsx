export default function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <input
        type="search"
        placeholder="Søk etter navn eller adresse …"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Søk etter hundevennlige steder"
      />
    </div>
  )
}
