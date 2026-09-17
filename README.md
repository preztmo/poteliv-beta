# Snuten – hundevennlige steder

Prototype av en gratis app hvor hundeeiere kan søke opp kafeer, restauranter, barer og
butikker der det er lov å ta med hund. Bygget som en React-app (Vite) med mock-data, klar
til å pushes til et eget GitHub-repo og bygges videre på.

## Kom i gang

```bash
npm install
npm run dev
```

Åpne linken terminalen viser (som regel http://localhost:5173).

## Hva som er med i prototypen

- **Søk og filter** – søk på navn/adresse, filtrer på kafé / restaurant / bar / butikk.
- **Kart** – viser alle steder på kart, og hvert sted har egen minikart + en "Vis
  veibeskrivelse i Google Maps"-knapp som åpner ekte Google Maps-navigasjon.
- **Profil per enhet** – stjernerangering (1–5) for hundevennlighet, og en
  fasilitetsliste (vannskål, hundegodteri, uteservering, lov innendørs).
- **Artikler** – egen seksjon med korte, nyttige artikler for hundeeiere.
- **Nyhetsbrev** – påmeldingsskjema i footer (foreløpig uten ekte utsendelse).
- **Reklameplass** – tydelig merkede annonseflater i lister og på profilsider, klare til
  å kobles til et reelt annonsesystem når dere er der.

Alt innhold (steder, artikler) ligger som mock-data i `src/data/`, så dere kan bytte det
ut med kall til et ekte API/database uten å røre resten av appen.

## Om kartet: OpenStreetMap nå, Google Maps senere

Selve kartvisningen bruker Leaflet + OpenStreetMap-fliser, fordi det fungerer helt uten
API-nøkkel og er gratis å utvikle mot. "Vis veibeskrivelse"-knappen bruker derimot en ekte
Google Maps-lenke allerede nå (`maps.google.com/dir/...`), siden det ikke krever nøkkel.

Når dere vil bytte selve kartvisningen til Google Maps' JavaScript API (f.eks. for et mer
gjenkjennelig kartutseende):

1. Opprett et prosjekt i Google Cloud Console, aktiver "Maps JavaScript API" og "Places
   API", og opprett en API-nøkkel (krever fakturering aktivert på kontoen).
2. Installer `@vis.gl/react-google-maps` (offisiell React-wrapper fra Google).
3. Bytt ut `src/components/MapView.jsx` med en tilsvarende komponent bygget på den
   pakken, og legg nøkkelen i en `.env`-fil (`VITE_GOOGLE_MAPS_API_KEY=...`) – ikke
   commit denne filen.

## Veien videre (ikke bygget ennå)

- Ekte backend/database for steder og brukeranmeldelser (i dag: statisk mock-data).
- Innlogging, slik at brukere kan legge inn egne vurderinger.
- Admin-verktøy for å legge til/redigere steder.
- Ekte nyhetsbrev-integrasjon (f.eks. Mailchimp/Klaviyo) bak påmeldingsskjemaet.
- Ekte annonsesystem/betalingsløsning for reklameplassene som er satt av i grensesnittet.

## Prosjektstruktur

```
src/
  components/   Gjenbrukbare UI-deler (kort, kart, stjerner, filter, nyhetsbrev, annonse)
  pages/        Hjem/søk, sted-profil, artikkelliste, enkeltartikkel, om oss
  data/         Mock-data for steder og artikler
  styles/       Globalt design-system (fargetokens, typografi)
```

## Publisere til GitHub

```bash
git init
git add .
git commit -m "Første versjon av Snuten-prototypen"
git branch -M main
git remote add origin <url til ditt tomme repo>
git push -u origin main
```
