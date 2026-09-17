// Plassholder for fremtidig salg av reklameplass.
// Bytt ut med et reelt annonsekall (egen ad-server, Google Ad Manager e.l.) senere.
export default function AdSlot({ label = 'Annonseplass' }) {
  return (
    <div className="ad-slot" aria-label={label}>
      <span>{label}</span>
      <p>Ledig for lokale hundevennlige aktører</p>
    </div>
  )
}
