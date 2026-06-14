import { Helmet } from 'react-helmet-async'
import Header from '../components/Header'
import LivePlayer from '../components/LivePlayer'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Daade Live TV – Kostenlose Live-TV Streams online gucken</title>
        <meta name="description" content="Daade Live TV – Schaue kostenlos Live-TV online. Alle Sender, jederzeit und überall. Einfach streamen und genießen." />
        <meta name="keywords" content="Daade Live TV, Live TV, kostenlos TV, Online TV, Stream, Fernsehen, Live Stream" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <link rel="canonical" href="https://daade-live-tv.de" />

        {/* Open Graph */}
        <meta property="og:title" content="Daade Live TV – Kostenlose Live-TV Streams" />
        <meta property="og:description" content="Schaue kostenlos Live-TV online – jederzeit und überall." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://daade-live-tv.de" />
        <meta property="og:image" content="/og-image.png" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Daade Live TV – Kostenlose Live-TV Streams" />
        <meta name="twitter:description" content="Schaue kostenlos Live-TV online." />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Daade Live TV",
            "url": "https://daade-live-tv.de",
            "description": "Kostenlose Live-TV Streams online gucken",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://daade-live-tv.de/?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })}
        </script>
      </Helmet>

      <Header />

      <main>
        {/* Hero */}
        <section className="hero">
          <div className="hero-bg" />
          <div className="hero-content">
            <h1 className="hero-title">
              <span className="hero-pre">Willkommen bei</span>
              Daade <span className="hero-accent">Live</span> TV
            </h1>
            <p className="hero-sub">
              Kostenlose Live-TV Streams – einfach, schnell, überall.
            </p>
            <a href="#live" className="btn-hero">Jetzt Live Gucken</a>
          </div>
        </section>

        {/* Live Player */}
        <LivePlayer />

        {/* Channels */}
        <section id="channels" className="channels-section">
          <h2 className="section-title">Beliebte Sender & Streams</h2>
          <p className="section-subtitle">
            Entdecke eine Vielzahl an Live-TV-Streams aus aller Welt.
          </p>
          <div className="channels-grid">
            {[
              { name: 'YouTube Live', desc: 'Beliebte Creator und News live', icon: '▶️' },
              { name: 'Sport Streams', desc: 'Live-Sport-Events und Übertragungen', icon: '⚽' },
              { name: 'Nachrichten', desc: 'Aktuelle Nachrichten rund um die Uhr', icon: '📰' },
              { name: 'Musik & Konzerte', desc: 'Live-Konzerte und Musik-Events', icon: '🎵' },
              { name: 'International', desc: 'Sender aus aller Welt', icon: '🌍' },
              { name: 'Daade Exklusiv', desc: 'Exklusive Inhalte nur bei uns', icon: '⭐' },
            ].map((ch, i) => (
              <div key={i} className="channel-card">
                <span className="card-icon">{ch.icon}</span>
                <h3>{ch.name}</h3>
                <p>{ch.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* About */}
        <section id="about" className="about-section">
          <h2 className="section-title">Über Daade Live TV</h2>
          <div className="about-content">
            <div className="about-text">
              <p>
                Daade Live TV ist dein kostenloser Live-TV-Streaming-Dienst.
                Genieße eine breite Auswahl an Sendern und Streams – jederzeit und
                von überall. Ob Nachrichten, Sport, Musik oder Unterhaltung:
                bei uns findest du garantiert etwas Passendes.
              </p>
              <div className="features">
                {[
                  { icon: '🆓', title: '100% Kostenlos', desc: 'Keine versteckten Kosten' },
                  { icon: '📱', title: 'Überall nutzbar', desc: 'Auf Handy, Tablet & PC' },
                  { icon: '🔒', title: 'Sicher', desc: 'Verschlüsselte Verbindung' },
                ].map((f, i) => (
                  <div key={i} className="feature-item">
                    <span className="feature-icon">{f.icon}</span>
                    <div>
                      <strong>{f.title}</strong>
                      <p>{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
