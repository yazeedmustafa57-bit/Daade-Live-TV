import { Helmet } from 'react-helmet-async'
import Header from '../components/Header'
import LivePlayer from '../components/LivePlayer'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Daade Live TV – Kostenlose Live-TV Streams online gucken</title>
        <meta name="description" content="Daade Live TV – Schaue kostenlos Live-TV online. Deutsche Sender, Pluto TV, Filme & Serien auf Deutsch." />
        <meta name="keywords" content="Daade Live TV, Live TV, kostenlos TV, Online TV, Stream, Fernsehen, Live Stream, Deutsche Sender, Pluto TV" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <link rel="canonical" href="https://yazeedmustafa57-bit.github.io/Daade-Live-TV" />

        <meta property="og:title" content="Daade Live TV – Kostenlose Live-TV Streams" />
        <meta property="og:description" content="Schaue kostenlos Live-TV online – jederzeit und überall. Deutsche Sender & Pluto TV." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yazeedmustafa57-bit.github.io/Daade-Live-TV" />
        <meta property="og:image" content="/og-image.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Daade Live TV – Kostenlose Live-TV Streams" />
        <meta name="twitter:description" content="Schaue kostenlos Live-TV online." />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Daade Live TV",
            "url": "https://yazeedmustafa57-bit.github.io/Daade-Live-TV",
            "description": "Kostenlose Live-TV Streams online gucken",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://yazeedmustafa57-bit.github.io/Daade-Live-TV/?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })}
        </script>
      </Helmet>

      <Header />

      <main>
        <section className="hero">
          <div className="hero-bg" />
          <div className="hero-content">
            <h1 className="hero-title">
              <span className="hero-pre">Willkommen bei</span>
              Daade <span className="hero-accent">Live</span> TV
            </h1>
            <p className="hero-sub">
              Deutsche Sender, Pluto TV, Filme & Serien – alles kostenlos!
            </p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="#live" className="btn-hero">📺 Live TV</a>
              <Link to="/movies" className="btn-hero" style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)', boxShadow: '0 4px 24px rgba(99,102,241,0.35)' }}>🎬 Filme & Serien</Link>
            </div>
          </div>
        </section>

        <LivePlayer />

        <section id="channels" className="channels-section">
          <h2 className="section-title">🇩🇪 Deutsche Sender & Streams</h2>
          <p className="section-subtitle">
            Alle deutschen Öffentlich-Rechtlichen, Pluto TV & mehr – kostenlos.
          </p>
          <div className="channels-grid">
            {[
              { name: 'ARD/tagesschau', desc: '24/7 Nachrichten live', icon: '📺' },
              { name: 'ZDF live', desc: 'ZDF Programm live streamen', icon: '📡' },
              { name: 'Phoenix', desc: 'Politik & Ereignisse live', icon: '🏛️' },
              { name: 'Arte', desc: 'Kultur & Dokus live', icon: '🎨' },
              { name: 'NDR, WDR, BR, MDR', desc: 'Alle Regionalprogramme', icon: '🏔️' },
              { name: 'Pluto TV', desc: 'Kostenlose Channels auf Deutsch', icon: '📡' },
            ].map((ch, i) => (
              <div key={i} className="channel-card">
                <span className="card-icon">{ch.icon}</span>
                <h3>{ch.name}</h3>
                <p>{ch.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="about" className="about-section">
          <h2 className="section-title">Über Daade Live TV</h2>
          <div className="about-content">
            <div className="about-text">
              <p>
                Daade Live TV ist dein kostenloser Live-TV-Streaming-Dienst mit deutschen Sendern,
                Pluto TV, Filmen und Serien – alles auf Deutsch. Genieße eine breite Auswahl 
                an Sendern und Streams – jederzeit und von überall.
              </p>
              <div className="features">
                {[
                  { icon: '🆓', title: '100% Kostenlos', desc: 'Keine versteckten Kosten' },
                  { icon: '🇩🇪', title: 'Deutsche Sender', desc: 'ARD, ZDF, Phoenix, Arte, NDR, WDR, BR, MDR, KiKA & mehr' },
                  { icon: '📡', title: 'Pluto TV', desc: 'Kostenlose Channels: Filme, Serien, Dokus, Krimi & Comedy' },
                  { icon: '🎬', title: 'Filme & Serien auf Deutsch', desc: 'Tatort, Dokus & mehr – alle Inhalte auf Deutsch' },
                  { icon: '🌐', title: '1Shows.org', desc: 'Tausende Filme, Serien & Anime in HD & 4K' },
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
