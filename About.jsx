import { useState } from "react";
import { supabase } from "./supabase";

export default function About() {
const [formData, setFormData] = useState({
name: "",
address: "",
category: "",
website: "",
instagram: "",
dogs_inside: false,
dogs_outside: false,
comment: "",
});
const [submitted, setSubmitted] = useState(false);
const handleSubmit = async (e) => {
e.preventDefault();
const { error } = await supabase
.from("VenueSuggestions")
.insert(formData);
if (!error) {
setSubmitted(true);
}
};
return (
    <div className="page page--about">
      <h1>Om Poteliv</h1>
      <p>
        Poteliv er en gratis tjeneste som gjør det enkelt å finne kafeer, restauranter, barer og
        hoteller der hunden din er velkommen. Vurderingene kommer fra hundeeiere som faktisk har
        vært der – ikke fra stedene selv. Vi som driver Poteliv er selv hundeeiere, og vi tar jevnlige sjekker av stedene. Dersom du er usikker om hunden din er velkommen, anbefaler vi deg å kontakte stedet direkte.
      </p>
      <p>
        Driver du et sted og vil bli lagt til, eller ønsker du å høre om annonseplass? Send oss en
        e-post på <a href="mailto:hei@poteliv.no">hei@poteliv.no</a> eller bruk skjemaet nedenfor.
      </p>
      <hr />
 
<h2>🐾 Meld inn et sted</h2>
<p>
Savner du et hundevennlig sted på Poteliv?
Send inn et tips, så vurderer vi det for publisering.
</p>

{submitted ? (
<p>
✅ Takk for tipset! Vi går gjennom alle forslag før de
publiseres på Poteliv.
</p>
) : (
<form onSubmit={handleSubmit}>
<input
type="text"
placeholder="Navn på stedet"
value={formData.name}
onChange={(e) =>
setFormData({
...formData,
name: e.target.value,
})
}
/>
 
<input
type="text"
placeholder="Adresse"
value={formData.address}
onChange={(e) =>
setFormData({
...formData,
address: e.target.value,
})
}
/>
 
<select
value={formData.category}
onChange={(e) =>
setFormData({
...formData,
category: e.target.value,
})
}
>
<option value="">Velg kategori</option>
<option value="kafe">Kafé</option>
<option value="restaurant">Restaurant</option>
<option value="bar">Bar</option>
<option value="hotell">Hotell</option>
</select>
 
<input
type="text"
placeholder="Nettside"
value={formData.website}
onChange={(e) =>
setFormData({
...formData,
website: e.target.value,
})
}
/>
 
<input
type="text"
placeholder="Instagram"
value={formData.instagram}
onChange={(e) =>
setFormData({
...formData,
instagram: e.target.value,
})
}
/>
 
<textarea
placeholder="Kommentar"
value={formData.comment}
onChange={(e) =>
setFormData({
...formData,
comment: e.target.value,
})
}
/>
 
<div>
<strong>Hvor er hunder velkomne?</strong>
 
<label>
<input
type="checkbox"
checked={formData.dogs_inside}
onChange={(e) =>
setFormData({
...formData,
dogs_inside: e.target.checked,
})
}
/>
Innendørs
</label>
<label>
<input
type="checkbox"
checked={formData.dogs_outside}
onChange={(e) =>
setFormData({
...formData,
dogs_outside: e.target.checked,
})
}
/>
Utendørs
</label>
</div>
<button
type="submit"
className="instagram-button"
>
  Send inn forslag
  </button>
</form>
)}

    </div>
  )
}
