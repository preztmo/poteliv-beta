export default function DirectionsButton({ venue }) {
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${venue.lat},${venue.lng}`

  return (
    <a className="btn btn--primary" href={directionsUrl} target="_blank" rel="noreferrer">
      Vis veibeskrivelse i Google Maps
    </a>
  )
}
