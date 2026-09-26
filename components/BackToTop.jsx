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
width: "56px",
height: "56px",
borderRadius: "50%",
border: "none",
backgroundColor: "#24463a",
color: "#fffdf7",
fontSize: "28px",
cursor: "pointer",
zIndex: 1000,
boxShadow: "0 6px 16px rgba(22, 48, 42, 0.25)",
}}
aria-label="Til toppen"
>
↑
</button>
);
}