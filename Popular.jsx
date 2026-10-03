import { useEffect, useState } from "react";
import { supabase } from "./supabase";
import { venues } from "./venues";
import VenueCard from "./VenueCard";
export default function Popular() {
const [popularVenues, setPopularVenues] = useState([]);
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
.slice(0, 6)
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
return (
<div className="page">
<h1>Populære steder</h1>
<p>
De mest lagrede stedene blant
Poteliv-brukere.
</p>
<div className="venue-grid">
{popularVenues.map((venue) => (
<VenueCard
key={venue.id}
venue={venue}
isFavorite={false}
/>
))}
</div>
</div>
);
}