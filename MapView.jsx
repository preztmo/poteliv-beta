import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import { Link } from 'react-router-dom'

// NB: Dette kartet bruker OpenStreetMap-fliser via Leaflet, som en fungerende
// plassholder uten API-nøkkel. Se README.md for hvordan dere bytter til Google
// Maps' JavaScript API når dere har en fakturert Google Cloud-konto og nøkkel.
const pin = L.divIcon({
  className: 'map-pin',
  html: '<span>🐾</span>',
  iconSize: [28, 28],
  iconAnchor: [14, 26],
})

export default function MapView({ venues, center, zoom = 13, height = 360 }) {
  const validVenues = venues.filter (v => v.lat && v.lng)
  const mapCenter = center ?? [
    validVenues.reduce((s, v) => s + v.lat, 0) / validVenues.length,
   validVenues.reduce((s, v) => s + v.lng, 0) / validVenues.length,
  ]

  return (
    <div className="map-view" style={{ height }}>
      <MapContainer center={mapCenter} zoom={zoom} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {validVenues.map((v) => (
          <Marker key={v.id} position={[v.lat, v.lng]} icon={pin}>
            <Popup>
              <strong>{v.name}</strong>
              <br />
              <Link to={`/sted/${v.id}`}>Se profil</Link>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
