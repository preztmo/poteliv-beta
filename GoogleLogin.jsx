import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "./supabase";
export default function GoogleLogin() {
const [user, setUser] = useState(null);
const [menuOpen, setMenuOpen] = useState(false);
useEffect(() => {
supabase.auth.getUser().then(({ data }) => {
setUser(data.user);
});
}, []);
const handleLogin = async () => {
await supabase.auth.signInWithOAuth({
provider: "google",
});
};
const handleLogout = async () => {
await supabase.auth.signOut();
setUser(null);
};
if (user) {
    return (
    <div className="user-menu">
        <button
        className="login-button"
        onClick={() => setMenuOpen(!menuOpen)}
        >
            ☰ {user.user_metadata?.full_name?.split(" ")[0] || user.email}
            </button>
            {menuOpen && (
                <div className="user-dropdown">
                    <Link to="/favoritter">
                    Mine favoritter
                    </Link>
                    <button onClick={handleLogout}>
                        Logg ut
          </button>
</div>
)}
</div>
);
}
return (
<button onClick={handleLogin} className="login-button">
Logg inn
</button>
);
}