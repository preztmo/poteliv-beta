import { useEffect, useState } from "react";
import { supabase } from "./supabase";
export default function GoogleLogin() {
const [user, setUser] = useState(null);
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
<button onClick={handleLogout} className="login-button">
<span style={{ fontSize: "1.1rem" }}>♡</span>{" "}
{user.user_metadata?.full_name?.split(" ")[0] || user.email}
</button>
);
}
return (
<button onClick={handleLogin} className="login-button">
Logg inn
</button>
);
}