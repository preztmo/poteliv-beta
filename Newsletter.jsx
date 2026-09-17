import { useState } from 'react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | sent

  function handleSubmit(e) {
    e.preventDefault()
    if (!email.includes('@')) return
    // TODO: koble til reelt nyhetsbrev-verktøy (f.eks. Klaviyo, Mailchimp) via API-kall her.
    setStatus('sent')
  }

  return (
    <section className="newsletter">
      <div>
        <h2>Nye hundevennlige steder, rett i innboksen</h2>
        <p>Ett kort nyhetsbrev i måneden. Ingen spam, meld deg av når du vil.</p>
      </div>
      {status === 'sent' ? (
        <p className="newsletter__confirm">Takk! Sjekk innboksen for en bekreftelse.</p>
      ) : (
        <form onSubmit={handleSubmit} className="newsletter__form">
          <label htmlFor="newsletter-email" className="sr-only">
            E-postadresse
          </label>
          <input
            id="newsletter-email"
            type="email"
            required
            placeholder="din@epost.no"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" className="btn btn--primary">
            Meld meg på
          </button>
        </form>
      )}
    </section>
  )
}
