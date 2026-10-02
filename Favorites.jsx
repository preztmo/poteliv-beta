import { useEffect, useState } from "react";
import { supabase } from "./supabase";
import { venues } from "./venues";
import { Link } from "react-router-dom";
export default function Favorites() {
const [favorites, setFavorites] = useState([]);
useEffect(() => {
const loadFavorites = async () => {
const { data: authData } = await supabase.auth.getUser();
if (!authData.user) return;
const { data } = await supabase
.from("Favorites")
.select("*")
.eq("user_id", authData.user.id);
if (!data) return;
const favoriteVenues = venues.filter((venue) =>
data.some((fav) => fav.venue_id === venue.id)
);
setFavorites(favoriteVenues);
};
loadFavorites();
}, []);
return (
<div className="page">
<h1>Mine favoritter</h1>
{favorites.length === 0 ? (
<p>Du har ingen favoritter ennå.</p>
) : (
favorites.map((venue) => (
<div key={venue.id}>
<Link to={`/sted/${venue.id}`}>
{venue.name}
</Link>
</div>
))
)}
</div>
);
}