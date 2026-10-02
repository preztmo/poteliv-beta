import { supabase } from "./supabase";
export default function GoogleLogin() {
const handleLogin = async () => {
await supabase.auth.signInWithOAuth({
provider: "google",
});
};
return (
<button onClick={handleLogin} className="login-button">
Logg inn
</button>
);
}