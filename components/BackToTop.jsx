import { useEffect, useState } from "react";
export default function BackToTop() {
const [show, setShow] = useState(false);
useEffect(() => {
const handleScroll = () => {
setShow(window.scrollY > 300);
};
window.addEventListener("scroll", handleScroll);
return () => window.removeEventListener("scroll", handleScroll);
}, []);
if (!show) return null;
return (
<button
onClick={() =>
window.scrollTo({
top: 0,
behavior: "smooth",
})
}
style={{
position: "fixed",
bottom: "20px",
right: "20px",
width: "48px",
height: "48px",
borderRadius: "50%",
border: "none",
backgroundColor: "#22c55e",
color: "white",
fontSize: "24px",
cursor: "pointer",
zIndex: 1000,
boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
}}
aria-label="Til toppen"
>
↑
</button>
);
}